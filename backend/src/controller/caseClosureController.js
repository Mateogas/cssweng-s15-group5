/**
 *   CASE CLOSURE FORM CONTROLLER
 */

const mongoose = require('mongoose');

const Sponsored_Member = require('../model/sponsored_member');
const Case_Closure = require('../model/case_closure');
const Employee = require('../model/employee');

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

          const formSelected = await Case_Closure.findOne({ sm: caseSelected._id })
          if (formSelected)
               loadExistingCaseClosureForm(req, res)

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

          if (formData.sm_awareness == "yes" || formData.sm_awareness == true) {
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

          return res.status(200).json(newCaseClose)
     } catch(error) {
          console.error('Error creating new case closure:', error);
          res.status(500).json({ message: 'Failed to create case closure', error });
     }
} 

const loadExistingCaseClosureForm = async (req, res) => {
     try {          
          const caseSelected = await Sponsored_Member.findById(req.params.caseID)
          if (!caseSelected)
               return res.status(404).json({ message: "Sponsored member (case) not found." });

          const formSelected = await Case_Closure.findOne({ sm: caseSelected._id })
          if (!formSelected)
               return res.send(404).json({ message: "No termination request found." })

          return res.send(200).json({ form: formSelected, case: caseSelected })
     } catch(error) {
          return res.status(500).json({ message: "An error occured. Please try again." });
     }
}

const editCaseClosureForm = async (req, res) => {
     try {
          const active_user = req.session.user
          if (active_user.role != "sdw" || active_user.role != "SDW")
               return res.send(403).json({ message: "Unauthorized access." })

          const caseSelected = await Sponsored_Member.findById(req.params.caseID) 
          const formSelected = await Case_Closure.findById(req.params.formID)
          const formData = req.body

          if (!caseSelected || !formSelected)
               return res.send(404).json({ message: "Case or form not found." })
          if (!caseSelected._id.equals(formSelected.sm))
               return res.send(404).json({ message: "Case selected does not match the form." })
          if (!caseSelected.assigned_sdw.equals(active_user._id))
               return res.send(404).json({ message: "You do not have permissions for this case." })

          if (formData.sm_awareness == "yes" || formData.sm_awareness == true) {
                    formData.sm_awareness = true

               if (!formData.sm_notification || formData.sm_notification === "") {
                    console.log("Missing field/s found.")
                    return res.status(400).json({ message: `Missing field found.` });
               }
          }
          else  {
               formData.sm_awareness = false
               formData.sm_notification = ""
          }

          const updatedFormData = {
               sm: formSelected._id,
               closure_date: formData.closure_date || formSelected.closure_date,
               reason_for_retirement: formData.reason_for_retirement || formSelected.reason_for_retirement,
               sm_awareness: formData.sm_awareness !== undefined ? formData.sm_awareness : formSelected.sm_awareness,
               sm_notification: formData.sm_notification,
               evaluation: formData.evaluation || formSelected.evaluation,
               recommendation: formData.recommendation || formSelected.recommendation
          }

          // update
          Object.assign(formSelected, updatedFormData);
          await formSelected.save();

          return res.status(200).json({ message: "Case closure form updated successfully.", case: caseSelected, form: formSelected });
     } catch (error) {
          return res.status(500).json({ message: "An error occured. Please try again." });
     }
}

const deleteCaseClosureForm = async (req, res) => {
     try {
          const caseSelected = await Sponsored_Member.findById(req.params.caseID)
          if (!caseSelected)
               return res.send(404).json({ message: "Case not found." })

          const formSelected = await Case_Closure.findById(req.params.formID)
          if (!formSelected)
               return res.send(404).json({ message: "No termination request found." })

          if (!caseSelected._id.equals(formSelected.sm))
               return res.send(404).json({ message: "Case selected does not match the form." })

          if (!caseSelected.assigned_sdw.equals(active_user._id))
               return res.send(404).json({ message: "You do not have permissions for this case." })

          // delete
          await formSelected.deleteOne();
          return res.status(200).json({ message: "Case closure form deleted successfully." });
     } catch (error) {
          return res.status(500).json({ message: "An error occured. Please try again." });
     }
}

const confirmCaseTermination = async (req, res) => {
     try {
          const caseSelected = await Sponsored_Member.findById(req.params.caseID)
          if (!caseSelected)
               return res.send(404).json({ message: "Case not found." })

          const formSelected = await Case_Closure.findById(req.params.formID)
          if (!formSelected)
               return res.send(404).json({ message: "No termination request found." })

          if (!caseSelected._id.equals(formSelected.sm))
               return res.send(404).json({ message: "Case selected does not match the form." })

          // assuming sessions is already set up
          const active_user = req.session.user
          if (!active_user)
               return res.send(403).json({ message: "Unauthorized access." })

          // check if it is the appropriate supervisor or head
          const handler = await Employee.findById(caseSelected.assigned_sdw)
          var supervisor
          if (active_user.role == "super") {
               if (handler.role === "sdw") {
                    supervisor = await Employee.findById(handler.manager);
                    if (!supervisor || !supervisor._id.equals(active_user._id)) {
                         return res.status(403).json({ message: "Unauthorized access." });
                    }
               } else if (handler.role === "super") {
                    if (!handler._id.equals(active_user._id)) {
                         return res.status(403).json({ message: "Unauthorized access." });
                    }
               } else if (handler.role === "head") {
                    if (!active_user.manager || !active_user.manager.equals(handler._id)) {
                         return res.status(403).json({ message: "Unauthorized access." });
                    }
               }
          } 
          else if (active_user.role == "head") {
               if (handler.role == "sdw") {
                    supervisor = await Employee.findById(handler.manager);
                    if (!supervisor || !supervisor.manager.equals(active_user._id)) {
                         return res.status(403).json({ message: "Unauthorized access." });
                    }
               } else if (handler.role === "super") {
                    if (!handler.manager.equals(active_user._id)) {
                         return res.status(403).json({ message: "Unauthorized access." });
                    }
               } else if (handler.role === "head") {
                    if (!active_user._id.equals(handler._id)) {
                         return res.status(403).json({ message: "Unauthorized access." });
                    }
               }
          }
          else {
               return res.send(403).json({ message: "Unauthorized access." })
          }

          // security checks passed, proceed to deactivation
          caseSelected.is_active = false
          await caseSelected.save()

          // return case selected again, status should now be inactive
          return res.status(200).json({ message: "Case successfully terminated.", case: caseSelected });
     } catch(error) {
          return res.status(500).json({ message: "An error occured. Please try again." });
     }
}

module.exports = {
     loadCaseClosureForm,
     createCaseClosureForm,
     loadExistingCaseClosureForm,
     editCaseClosureForm,
     deleteCaseClosureForm,
     confirmCaseTermination
}