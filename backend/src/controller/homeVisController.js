/**
 *   HOME VISITATION FORM CONTROLLER
 */

const mongoose = require('mongoose');

const Family_Relationship = require('../model/family_relationship');
const Sponsored_Member = require('../model/sponsored_member');
const Family_Member = require('../model/family_member');
const InterventionHomeVisit = require('../model/intervention_homevisit');

const homeVisitFormValidate = require('./validators/homeVisitValidator');

// ================================================== //

/**
 *   Fetches the avaliable sponsored member data
 *   @returns the data needed for sponsored member
 */
const loadHomeVisitationForm = async(req, res) => {
     try {
          const caseSelected = await Sponsored_Member.findById(req.params.caseID) 

          if (!caseSelected)
               throw error

          // Match family IDs and relationship to client
          const relationships = await Family_Relationship.find({ sponsor_id: caseSelected });
          const familyData = relationships.map(rel => ({
               id: rel.family_id._id.toString(),
               relationship_to_sm: rel.relationship_to_sm,
               _id: rel._id 
          }));
          const familyMembers = await Family_Member.find({
               _id: { $in: familyData.map(fam => fam.id) }
          });
          const FamilyRelationshipMap = familyMembers.map(member => {
               const rel = familyData.find(fam => fam.id === member._id.toString());
               return {
                    ...member.toObject(),
                    relationship_to_sm: rel.relationship_to_sm,
                    relationship_id: rel._id.toString()
               };
          });

          const fatherData = FamilyRelationshipMap.find(member =>
               member.relationship_to_sm === "Father" || member.relationship_to_sm === "father"
          );
          const motherData = FamilyRelationshipMap.find(member =>
               member.relationship_to_sm === "Mother" || member.relationship_to_sm === "mother"
          );
          const otherFamilyMembers = FamilyRelationshipMap.filter(member => {
               if (fatherData && member._id.toString() === fatherData._id.toString()) return false;
               if (motherData && member._id.toString() === motherData._id.toString()) return false;
               return true;
          });

          return res.status(200).json({ case: caseSelected, 
                                        father: fatherData, 
                                        mother: motherData, 
                                        otherFamily: otherFamilyMembers })
     } catch(error) {
          console.error('Error creating loading home intervention:', error);
          res.status(500).json({ message: 'Failed to load home intervention', error });
     }
} 

/**
 *   Creates home visitation intervention and adds it to the sponsored member intervention array
 *   @returns New intervention made
 */
const createHomVis = async(req, res) => {
     try {
          const caseSelected = await Sponsored_Member.findById(req.params.caseID) 
          const formData = req.body
          console.log(formData)

          if (!caseSelected) {
               return res.status(404).json({ message: "Sponsored member not found" });
          }

          // Validation
          const requiredFields = [
               "grade_year_course",
               "years_in_program",
               "date",
               "community",
               "sponsor_name",
               "family_type",
               "sm_progress",
               "family_progress",
          ];
          const missingFields = requiredFields.filter(field => !formData[field]);
          if (missingFields.length > 0) {
               console.log("Missing field/s found.")
               return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
          }

          // Family Members Map
          const otherFamilyMembers = formData.rawOtherFamilyData
          const familyMembersArray = otherFamilyMembers.map(member => ({
               family_member_details: member._id,
               family_member_relationship: member.relationship_id
          }));
          console.log(familyMembersArray)

          // Creating new intervention
          const newForm = new InterventionHomeVisit({
               grade_year_course: formData.grade_year_course,
               years_in_program: formData.years_in_program,
               date: formData.date,
               community: formData.community,
               sponsor_name: formData.sponsor_name,
               family_type: formData.family_type,

               father: {
                    father_details: formData.rawFatherData._id,
                    father_relationship: formData.rawFatherData.relationship_id
               },
               mother: {
                    mother_details: formData.rawMotherData._id,
                    mother_relationship: formData.rawMotherData.relationship_id
               },
               familyMembers: familyMembersArray,

               sm_progress: formData.sm_progress,
               family_progress: formData.family_progress,
               recommendation: formData.recommendation,
               agreement: formData.agreement,

               observation_findings: formData.observation_findings,
               interventions: formData.interventions,
          });
          console.log("NEW FORM: ", newForm)

          await newForm.validate()
          await newForm.save()

          // add to the case
          const updatedCase = await Sponsored_Member.findByIdAndUpdate(
               req.params.caseID,
               {
                    $push: {
                         interventions: {
                         intervention: newForm._id,
                         interventionType: 'Intervention Home Visit'
                         }
                    }
               },
               { new: true }
          );
          return res.status(200).json(newForm)
     } catch(error) {
          console.error('Error creating new home intervention:', error);
          res.status(500).json({ message: 'Failed to create home intervention', error });
     }
} 

/**
 *   NOT YET TESTED WITH FRONT END
 *   
 *   Edits the home visitation form selected
 *   @returns The edited home visitation object
 */
const editHomeVis = async(req, res) => {
     try {
          const caseSelected = await Sponsored_Member.findById(req.params.caseID) 
          const interventionSelected = await InterventionHomeVisit.findById(req.params.homeVisID)
          const formData = req.body

          if (!caseSelected) {
               return res.status(404).json({ message: "Case not found" });
          }
          if (!interventionSelected) {
               return res.status(404).json({ message: "Intervention not found" });
          }

          // run through the family data again if ever there are changes
          const relationships = await Family_Relationship.find({ sponsor_id: caseSelected });
          const familyData = relationships.map(rel => ({
               id: rel.family_id._id.toString(),
               relationship_to_sm: rel.relationship_to_sm,
               _id: rel._id 
          }));
          const familyMembers = await Family_Member.find({
               _id: { $in: familyData.map(fam => fam.id) }
          });
          const FamilyRelationshipMap = familyMembers.map(member => {
               const rel = familyData.find(fam => fam.id === member._id.toString());
               return {
                    ...member.toObject(),
                    relationship_to_sm: rel.relationship_to_sm,
                    relationship_id: rel._id.toString()
               };
          });

          const fatherData = FamilyRelationshipMap.find(member =>
               member.relationship_to_sm === "Father" || member.relationship_to_sm === "father"
          );
          const motherData = FamilyRelationshipMap.find(member =>
               member.relationship_to_sm === "Mother" || member.relationship_to_sm === "mother"
          );
          const otherFamilyMembers = FamilyRelationshipMap.filter(member => {
               if (fatherData && member._id.toString() === fatherData._id.toString()) return false;
               if (motherData && member._id.toString() === motherData._id.toString()) return false;
               return true;
          });
          const familyMembersArray = otherFamilyMembers.map(member => ({
               family_member_details: member._id,
               family_member_relationship: member.relationship_id
          }));
          console.log(familyMembersArray)

          const updatedData = {
               grade_year_course: formData.grade_year_course || interventionSelected.grade_year_course,
               years_in_program: formData.years_in_program || interventionSelected.years_in_program,
               date: formData.date || interventionSelected.date,
               community: formData.community || interventionSelected.community,
               sponsor_name: formData.sponsor_name || interventionSelected.sponsor_name,
               family_type: formData.family_type || interventionSelected.family_type,

               father: {
                    father_details: fatherData._id,
                    father_relationship: fatherData.relationship_id
               },
               mother: {
                    mother_details: motherData._id,
                    mother_relationship: motherData.relationship_id
               },
               familyMembers: familyMembersArray,

               sm_progress: formData.sm_progress || interventionSelected.sm_progress,
               family_progress: formData.family_progress || interventionSelected.family_progress,
               recommendation: formData.recommendation,
               agreement: formData.agreement,

               observation_findings: formData.observation_findings,
               interventions: formData.interventions,
          }

          // update
          const updatedIntervention = await InterventionHomeVisit.findByIdAndUpdate(
               interventionSelected._id,
               updatedData,
               { new: true, runValidators: true }
          );

          return res.status(200).json(updatedIntervention)
     } catch(error) {
          console.error('Error editing home intervention:', error);
          res.status(500).json({ message: 'Failed to edit home intervention', error });
     }
}

module.exports = {
     loadHomeVisitationForm,
     createHomVis,
     editHomeVis
}