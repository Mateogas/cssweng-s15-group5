/**
 *   CASE CONTROLLER
 *        > handles creating, editing, and terminating of case
 */

const Sponsored_Member = require('../model/sponsored_member')

// ================================================== //

/**  
 *   Gets a case
 */
const getCase = async (req, res) => {
     try {
        const cases = await Sponsored_Member.find({})
        .limit(2) 
        .lean();  
        
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
 *   Adds a family member
 */
const addFamilyMember = async (req, res) => {
     // code here
}

/**  
 *   Edits a chosen family member
 */
const editFamilyMember = async (req, res) => {
     // code here
}

/**  
 *   Edits a case's problem presented
 */
const editProblemPresented = async (req, res) => {
     try {
          const { sm_number, problem_presented } = req.body;
          if (!sm_number || !problem_presented) {
               return res.status(400).json({ 
                    message: 'sm_number and problem_presented are required' 
               });
          }

          // find the case by sm_number
          const caseToUpdate = await Sponsored_Member.findOne({ sm_number });
          if (!caseToUpdate) {
               return res.status(404).json({ 
                    message: 'Case not found' 
               });
          }

          // update problem_presented
          caseToUpdate.problem_presented = problem_presented;
          await caseToUpdate.save();
          
          res.status(200).json({ 
               message: 'Problem presented updated successfully', 
               case: caseToUpdate 
          });
     } catch (error) {
          console.error('Error editing problem presented:', error);
          res.status(500).json({ 
               message: 'Error editing problem presented',
               error: error.message 
          });
     }
}

/**  
 *   Edits a case's history of problem
 */
const editHistOfProblem = async (req, res) => {
     try {
          const { sm_number, history_problem } = req.body;
          if (!sm_number || !history_problem) {
               return res.status(400).json({ 
                    message: 'sm_number and history_problem are required' 
               });
          }

          // find the case by sm_number
          const caseToUpdate = await Sponsored_Member.findOne({ sm_number });
          if (!caseToUpdate) {
               return res.status(404).json({ 
                    message: 'Case not found' 
               });
          }

          // update history_problem
          caseToUpdate.history_problem = history_problem;
          await caseToUpdate.save();
          
          res.status(200).json({ 
               message: 'History of problem updated successfully', 
               case: caseToUpdate 
          });
     } catch (error) {
          console.error('Error editing history of problem:', error);
          res.status(500).json({ 
               message: 'Error editing history of problem',
               error: error.message 
          });
          
     }
}

/**  
 *   Edits a case's findings
 */
const editFindings = async (req, res) => {
     try {
          const { sm_number, observation_findings } = req.body;
          if (!sm_number || !observation_findings) {
               return res.status(400).json({ 
                    message: 'sm_number and observation_findings are required' 
               });
          }

          // find the case by sm_number
          const caseToUpdate = await Sponsored_Member.findOne({ sm_number });
          if (!caseToUpdate) {
               return res.status(404).json({ 
                    message: 'Case not found' 
               });
          }

          // update observation_findings
          caseToUpdate.observation_findings = observation_findings;
          await caseToUpdate.save();
          
          res.status(200).json({ 
               message: 'Findings updated successfully', 
               case: caseToUpdate 
          });
     } catch (error) {
          console.error('Error editing findings:', error);
          res.status(500).json({ 
               message: 'Error editing findings',
               error: error.message 
          });
     }
}

/**  
 *   Edits a case's assessment
 */
const editAssessment = async (req, res) => {
     try {
          const { sm_number, assessment } = req.body;
          if (!sm_number || !assessment) {
               return res.status(400).json({ 
                    message: 'sm_number and assessment are required' 
               });
          }

          // find the case by sm_number
          const caseToUpdate = await Sponsored_Member.findOne({ sm_number });
          if (!caseToUpdate) {
               return res.status(404).json({ 
                    message: 'Case not found' 
               });
          }

          // update assessment
          caseToUpdate.assessment = assessment;
          await caseToUpdate.save();
          
          res.status(200).json({ 
               message: 'Assessment updated successfully', 
               case: caseToUpdate 
          });
     } catch (error) {
          console.error('Error editing assessment:', error);
          res.status(500).json({ 
               message: 'Error editing assessment',
               error: error.message 
          });
     }
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

module.exports = {
     getCase,
     editProblemPresented,
     editHistOfProblem,
     editFindings,
     editAssessment,
}