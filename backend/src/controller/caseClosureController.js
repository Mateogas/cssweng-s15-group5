/**
 *   CASE CLOSURE FORM CONTROLLER
 */

const mongoose = require('mongoose');

const Sponsored_Member = require('../model/sponsored_member');
const Case_Closure = require('../model/case_closure');

const homeVisitFormValidate = require('./validators/homeVisitValidator');

// ================================================== //

/**
 *   Fetches the avaliable sponsored member data
 *   @returns the data needed for sponsored member
 */
const loadCaseData = async(req, res) => {
     try {
          const caseSelected = await Sponsored_Member.findById(req.params.caseID) 

          if (!caseSelected)
               return res.status(404).json({ message: "Sponsored member not found" });

          return res.status(200).json(caseSelected)
     } catch(error) {

     }
} 

/**
 *   Fetches the case closure form of the sponsored member
 *   @returns the data of the case closure form
 */
const loadCaseClosureForm = async(req, res) => {
    const sponsor_id = req.params.caseID;
    const formId = req.params.formID;

    if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(sponsor_id)) {
        return res.status(400).json({ message: 'Invalid Sponsored Member or Form' });
    }
     try {
            const caseSelected = await Sponsored_Member.findById(sponsor_id) 
                .lean();
            
            if (!caseSelected)
                return res.status(404).json({ message: "Sponsored member not found" });
            
            const formData = await Case_Closure.findById(formId).lean()

            const mergedData = {
                sponsored_member: {
                    first_name: caseSelected.first_name,
                    middle_name: caseSelected.middle_name,
                    last_name: caseSelected.last_name,
                    sm_number: caseSelected.sm_number,
                    dob: caseSelected.dob,
                    religion: caseSelected.religion,
                    address: caseSelected.address,
                    spu: caseSelected.spu
                },
                form: formData
            };

          return res.status(200).json(mergedData)
     } catch(error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
     }
} 

/**
 *   Creates new case closure form and updates the sponsored member to inactive
 *   @returns New intervention made
 */
const createCaseClosureForm = async(req, res) => {
     try {
          const caseSelected = await Sponsored_Member.findById(req.params.caseID) 
          const formData = req.body

          if (!caseSelected) {
               return res.status(404).json({ message: "Sponsored member not found" });
          }

          // Validation
          const requiredFields = [
               "closure_date",
               "reason_for_retirement",
               "sm_awareness",
               "evaluation",
               "recommendation",
          ];
          const missingFields = requiredFields.filter(field => !formData[field]);
          if (missingFields.length > 0) {
               console.log("Missing field/s found.")
               return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
          }

          if (formData.sm_awareness === "yes") {
               formData.sm_awareness = true

               if (!formData.sm_notification || formData.sm_notification === "") {
                    console.log("Missing field/s found.")
                    return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
               }
          }
          else 
               formData.sm_awareness = false

          // New Object
          const newCaseClose = new Case_Closure({
               sm: caseSelected._id,
               closure_date: formData.closure_date,
               sponsorship_date: formData.sponsorship_date,
               reason_for_retirement: formData.reason_for_retirement,
               sm_awareness: formData.sm_awareness,
               sm_notification: formData.sm_notification,
               services_provided: formData.services_provided,
               evaluation: formData.evaluation,
               recommendation: formData.recommendation
          })
          await newCaseClose.validate()
          await newCaseClose.save()

          // Update sponsored member to inactive
          caseSelected.is_active = false
          await caseSelected.save()

          return res.status(200).json(newCaseClose)
     } catch(error) {
          console.error('Error creating new case closure:', error);
          res.status(500).json({ message: 'Failed to create case closure', error });
     }
} 

module.exports = {
     loadCaseData,
     loadCaseClosureForm,
     createCaseClosureForm
}