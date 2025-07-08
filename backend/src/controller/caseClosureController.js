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
const loadCaseClosureForm = async(req, res) => {
     try {
          const caseSelected = await Sponsored_Member.findById(req.params.caseID) 

          if (!caseSelected)
               return res.status(404).json({ message: "Sponsored member not found" });

          return res.status(200).json(caseSelected)
     } catch(error) {

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
               reason_for_retirement: formData.reason_for_retirement,
               sm_awareness: formData.sm_awareness,
               sm_notification: formData.sm_notification,
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
     loadCaseClosureForm,
     createCaseClosureForm
}