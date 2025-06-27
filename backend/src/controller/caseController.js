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

const getCaseById = async (req, res) => {
     try {
          const { id } = req.params; // Assuming the ID is passed as a URL parameter
          
          // Find the case by ID
          const caseData = await Sponsored_Member.findOne({ sm_number: id }).lean();
          if (!caseData) {
               return res.status(404).json({ 
                    message: 'Case not found' 
               });
          }

          // Return the case data
          res.status(200).json(caseData);
     } catch (error) {
          console.error('Error fetching case by ID:', error);
          res.status(500).json({ 
               message: 'Error retrieving case data by ID',
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
 *   Edits a case's problems and findings
 */
const editProblemsAndFindings = async (req, res) => {
     try {
          const { sm_number, problem_presented, history_problem, observation_findings } = req.body;
          
          // Validate required fields
          if (!sm_number) {
               return res.status(400).json({
                    message: 'sm_number is required'
               });
          }
          
          // At least one of the fields can't be empty
          if ( problem_presented === undefined && 
               history_problem === undefined && 
               observation_findings === undefined) {
               return res.status(400).json({
                    message: 'At least one of the fields is updated'
               });
          }

          // Find the case by sm_number
          const caseToUpdate = await Sponsored_Member.findOne({ sm_number });
          if (!caseToUpdate) {
               return res.status(404).json({ 
                    message: 'Case not found' 
               });
          }

          // Update fields if provided
          if (problem_presented !== undefined) {
               caseToUpdate.problem_presented = problem_presented;
          }
          if (history_problem !== undefined) {
               caseToUpdate.history_problem = history_problem;
          }
          if (observation_findings !== undefined) {
               caseToUpdate.observation_findings = observation_findings;
          }

          // Save the updated case
          await caseToUpdate.save();

          // Return success response
          return res.status(200).json({
               message: 'Problems and findings updated successfully',
               case: caseToUpdate
          });
     } catch (error) {
          console.error('Error editing problems and findings:', error);
          return res.status(500).json({ 
               message: 'Error editing problems and findings',
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
     getCaseById,
     editProblemsAndFindings,
     editAssessment,
}