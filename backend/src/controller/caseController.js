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

module.exports = {
     getCase
}