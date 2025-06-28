/**
 *   CASE CONTROLLER
 *        > handles creating, editing, and terminating of case
 */

const Sponsored_Member = require('../model/sponsored_member')
const Family_Member = require('../model/family_member')
const Family_Relationship = require('../model/family_relationship')

// ================================================== //

/**  
 *   Gets a case
 */
const getCase = async (req, res) => {
     try {
        const cases = await Sponsored_Member.findOne();
        
        res.json(cases);
     } catch (error) {
          console.error('Error fetching cases:', error);
          res.status(500).json({ 
          message: 'Error retrieving case data',
          error: error.message 
          });
     }
}

/**
 *   Functions as add a new case
 * 
 *   Required Fields -- do note that these fields are required based on the DB structure:
 *        > sm_number
 *        > last name, first name, middle name
 *        > sex, pob, dob
 *        > civil status
 *        > problem presented
 *        > assigned sdw (must be the same sdw logged in)
 *        > by default, is_active must be set to true
 */
const addIdentification = async (req, res) => {
     // code here
}

/**  
 *   Edits a case's identification
 */
const editIdentification = async (req, res) => {
     // code here
}

/**  
 *   Gets the family member/s
 */
const getFamilyMembers = async (req, res) => {
     try {
          const caseSelected = req.params.caseID;
          
          // Match family IDs and relationship to client
          const relationships = await Family_Relationship.find({ sponsor_id: caseSelected });
          const familyData = relationships.map(rel => ({
               id: rel.family_id._id.toString(),
               relationship_to_sm: rel.relationship_to_sm
          }));
          const familyMembers = await Family_Member.find({
               _id: { $in: familyData.map(fam => fam.id) }
          });
          const FamilyRelationshipMap = familyMembers.map(member => {
               const rel = familyData.find(fam => fam.id === member._id.toString());
               return {
                    ...member.toObject(),
                    relationship_to_sm: rel.relationship_to_sm
               };
          });

          // Transform so it would match the HTML variables
          const formattedFamilyMembers = FamilyRelationshipMap.map((member) => ({
               id: member._id.toString(),

               firstName: member.first_name || '',
               middleName: member.middle_name || '',
               last_name: member.last_name || '',
               name: fullname_Formatter(member) || '',
               
               age: member.age || '',
               income: member.income || '',
               civilStatus: member.civil_status || '',
               occupation: member.occupation || '',
               education: member.edu_attainment || '',
               relationship: member.relationship_to_sm || '',

               status: member.status || ''
          }));

          // Return response
          res.status(200).json(formattedFamilyMembers);
     } catch (error) {
          console.error('Error fetching:', error);
          res.status(500).json({ 
               message: 'Error retrieving family composition',
               error: error.message 
          });
     }
}

/**  
 *   Adds a family member
 *   
 *   [TO UPDATE]: Separate name fields to follow, hardcoded names are provided
 */
const addFamilyMember = async (req, res) => {
     // code here
     try {
          const caseSelected = await Sponsored_Member.findById(req.params.caseID);
          const updateDetails = req.body;

          for (const [key, value] of Object.entries(updateDetails)) {
               if (key === "middle_name" || key === "income") continue;

               if (value === null || value === undefined || value === "") {
                    console.log("Empty field found.")
                    return res.status(400).json();
               }
          }

          const newMember = new Family_Member({
               first_name: "Tyler",
               middle_name: "",
               last_name: "Joseph",
               age: updateDetails.age,
               income: updateDetails.income || 0,
               civil_status: updateDetails.civilStatus,
               occupation: updateDetails.occupation,
               edu_attainment: updateDetails.education,
               status: updateDetails.status || "Living"
          })
          console.log(newMember);
          await newMember.validate();

          const newRelationship = new Family_Relationship({
               family_id: newMember._id,
               sponsor_id: caseSelected._id,
               relationship_to_sm: updateDetails.relationship
          });
          console.log(newRelationship)
          await newRelationship.validate();

          await newMember.save();
          await newRelationship.save();

          // Format the return data again
          const returnData = {
               id: newMember._id.toString(),
               
               firstName: newMember.first_name,
               middleName: newMember.middle_name || '',
               last_name: newMember.last_name,
               name: fullname_Formatter(newMember),

               age: newMember.age,
               income: newMember.income,
               civilStatus: newMember.civil_status,
               occupation: newMember.occupation,
               education: newMember.edu_attainment,
               relationship: updateDetails.relationship,

               status: newMember.status
          }
          console.log(returnData);

          // Response
          res.status(200).json(returnData);
     } catch (error) {
        console.error("Error adding family member:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**  
 *   Deletes a family member
 */
const deleteFamilyMember = async (req, res) => {
     // code here
     try {
          const familySelected = await Family_Member.findById(req.params.famID);
          const caseSelected = await Sponsored_Member.findById(req.params.caseID);

          if (!familySelected || !caseSelected) {
               return res.status(400).json({ message: `Cannot proceed action, missing IDs.` });
          }

          await Family_Relationship.deleteOne({
               family_id: familySelected, 
               sponsor_id: caseSelected
          })

          var flag = await Family_Relationship.findOne({ family_id: familySelected })
          if (!flag) {
               await Family_Member.deleteOne({
                    _id: familySelected
               })
          }

          return getFamilyMembers(req, res);
     } catch (error) {
        console.error("Error deleting family member:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**  
 *   Edits a chosen family member
 */
const editFamilyMember = async (req, res) => {
     try {
          const updateDetails = req.body;

          const familySelected = await Family_Member.findById(req.params.famID);
          const caseSelected = await Sponsored_Member.findById(req.params.caseID);

          /**
           *   Updating part
           * 
           *   In case that the updateDetails is an empty string, the default value is retrieved
           */
          const updatedData = {
               firstName: updateDetails.first_name || familySelected.first_name,
               middleName: updateDetails.middle_name || familySelected.middle_name,
               last_name: updateDetails.last_name || familySelected.last_name,

               age: updateDetails.age || familySelected.age,
               income: updateDetails.income || familySelected.income,
               civil_status: updateDetails.civilStatus || familySelected.civil_status,
               occupation: updateDetails.occupation || familySelected.occupation,
               edu_attainment: updateDetails.education || familySelected.edu_attainment,
          };
          await Family_Member.findByIdAndUpdate(familySelected, updatedData);

          var relationshipSelected = await Family_Relationship.findOne(
               { 
                    family_id: familySelected, 
                    sponsor_id: caseSelected
               },
          )
          if (updateDetails.relationship) {
               relationshipSelected = await Family_Relationship.findOneAndUpdate(
                    { 
                         family_id: familySelected, 
                         sponsor_id: caseSelected
                    },
                    { relationship_to_sm: updatedData.relationship || relationshipSelected.relationship_to_sm },
                    { new: true }
               );
          }

          // Format the return data again
          const returnData = {
               id: familySelected._id,
               
               firstName: familySelected.first_name,
               middleName: familySelected.middle_name,
               last_name: familySelected.last_name,
               name: fullname_Formatter(familySelected),

               age: familySelected.age,
               income: familySelected.income,
               civilStatus: familySelected.civil_status,
               occupation: familySelected.occupation,
               education: familySelected.edu_attainment,
               relationship: relationshipSelected.relationship_to_sm,

               status: familySelected.status
          }

          // Response
          res.status(200).json(returnData);
     } catch (error) {
        console.error("Error updating family member:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**  
 *   Edits a case's problem presented
 */
const editProblemPresented = async (req, res) => {
     // code here
}

/**  
 *   Edits a case's history of problem
 */
const editHistOfProblem = async (req, res) => {
     // code here
}

/**  
 *   Edits a case's findings
 */
const editFindings = async (req, res) => {
     // code here
}

/**  
 *   Edits a case's assessment
 */
const editAssessment = async (req, res) => {
     // code here
}

/**  
 *   Edits a case's evaluation
 */
const editEvaluation = async (req, res) => {
     // code here
}

/**  
 *   Edits a case's recommendation
 */
const editRecommendation = async (req, res) => {
     // code here
}

/**  
 *   Creates a new intervention
 */
const addIntervention = async (req, res) => {
     // code here
}

// ================================================== //

/**
 *   Formats full names
 *   @param {*} member : Object to be updated
 *   @returns : The formatted full name
 */
function fullname_Formatter(member) {
     const first = member.first_name || '';
     const middle = member.middle_name ? ` ${member.middle_name}` : '';
     const last = member.last_name || '';

     return `${first}${middle} ${last}`.trim();
}

// ================================================== //

module.exports = {
     getCase,
     getFamilyMembers,
     editFamilyMember,
     deleteFamilyMember,
     addFamilyMember
}