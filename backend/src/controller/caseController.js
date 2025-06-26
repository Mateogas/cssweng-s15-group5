/**
 *   CASE CONTROLLER
 *        > handles creating, editing, and terminating of case
 */

const Family_Relationship = require('../model/family_relationship');
const Sponsored_Member = require('../model/sponsored_member')
const Family_Member = require('../model/family_member'); 
const caseSchemaValidate = require('./validators/caseValidator')
// ================================================== //

/**
 * @route   GET /api/cases/:id
 * @desc    Retrieves a Sponsored Member case by its ObjectId, including its related family members
 * 
 * @required
 *    - :id URL parameter: ObjectId of the Sponsored Member case to retrieve
 * 
 * @notes
 *    - Validates if the provided id is a valid Mongo ObjectId
 *    - Fetches the case by its _id
 *    - Looks up all family relationships for the given case via sponsor_id
 *    - For each family relationship, retrieves the corresponding family member details by family_id
 *    - Combines each family member’s info with their relationship_to_sm
 * 
 * @returns
 *    - 200 OK: case data with its family members (even if none found)
 *    - 400 Bad Request: if the provided id is invalid
 *    - 500 Internal Server Error: if something goes wrong during the process
 */

const getCaseById = async (req, res) => {
     //for now lets do static but replace with req.params.id

     //checks if its a valid ObjectId
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
     return res.status(400).json({ message: 'Invalid case' });
     }  
     const id = req.params.id;
     try {
          //finds an id in our mongo
        const caseItem = await Sponsored_Member.findById(id)
        .lean();  

        const famRelationship = await Family_Relationship.find({
          sponsor_id:id
        })

        //This will basically loop through all the fam relationship records then uses the id to get info about family member then returns an array containing everything
        const familyMembersPromises = famRelationship.map(async (relationship) => {
            const familyMember = await Family_Member.findById(relationship.family_id).lean();
            return {
                ...familyMember,
                relationship_to_sm: relationship.relationship_to_sm
            };
        });

        const familyMembers = await Promise.all(familyMembersPromises);

        //responsds with json of case item and its family_members
        res.json({
          ...caseItem,
          family_members : familyMembers || []});
    } catch (error) {

        console.error('Error fetching cases:', error);
        res.status(500).json({ 
        message: 'Error retrieving case data',
        error: error.message 
        });
    }
}
/**  
 *   Edits all cases that are viable to be seen based on user priveleges
 */
const getAllCaseViable = async (req,res) =>{
     const userPriv = req.userId 
      try {
        const cases = await Sponsored_Member.find({
          assigned_sdw: userPriv,
          isActive:"true"
        }) 

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
 *   Gets all cases 
 */
const getAllCases = async(req,res)=>{
      try {
        const cases = await Sponsored_Member.find({}) 
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


/**
 * @route   POST /api/cases/assign-sdw
 * @desc    Assigns a Social Development Worker (SDW) to an existing Sponsored Member case
 * 
 * @required
 *    - caseId: ObjectId of the Sponsored Member case to update
 *    - assigned_sdw: ObjectId of the Employee to assign as SDW
 * 
 * @notes
 *    - Both caseId and assigned_sdw must be valid Mongo ObjectIds
 *    - The request should use Content-Type: application/json
 *    - Populates the assigned_sdw field to return full Employee details in the response
 * 
 * @returns
 *    - 200 OK: if SDW assignment is successful
 *    - 400 Bad Request: if caseId or assigned_sdw is invalid
 *    - 404 Not Found: if the case is not found
 *    - 500 Internal Server Error: if something else goes wrong
 */

const addSDW = async(req,res) => {
     //this gets the case and also the assigned_sdw ids
     const { caseId, assigned_sdw } = req.body;
     if (!mongoose.Types.ObjectId.isValid(caseId) || !mongoose.Types.ObjectId.isValid(assigned_sdw)) {
    return res.status(400).json({ message: 'Invalid case or sdw' });
     }

     try{
          const updatedCase = await Sponsored_Member.findByIdAndUpdate(
               caseId, 
               {assigned_sdw},
               {new: true}
          ).populate('assigned_sdw')
          .lean()
          if(!updatedCase){
               return res.status(404).json({message:"Case not found xD"});
          }
          res.status(200).json(
               {
                    message: "SDW Assigned Succsefully",
                    updatedCase
               }
          );


     }catch(error){
          console.error('Error assigning SDW:', error);
          res.status(500).json({ message: 'Error assigning SDW', error });
     }
     
}

/**
 * @route   POST /case-frontendapi/addcase (note this can change )
 * @desc    Adds a new Sponsored Member case
 * 
 * @required
 *    - last_name
 *    - first_name
 *    - sex
 *    - present_address
 *    - dob
 *    - pob
 *    - civil_status
 *    - problem_presented
 *    - is_active
 *    - assigned_sdw: valid Employee ObjectId
 * 
 * @notes
 *    - sm_number is auto-generated (no need to pass)
 *    - use application/json for request body
 *    - interventions optional (array of ObjectIds)
 */

const addNewCase = async(req,res) => {
     const newCaseData = req.body;

     if(!newCaseData){
          return res.status(400).json({ message: 'Invalid case' });
     }

     try{
          const latestCase = await Sponsored_Member.findOne().sort({ sm_number: -1 }).lean();
          let smNewNumber;
          //checks if latest case is ok and assigns a new sm number case
          if(latestCase){
               smNewNumber = Number(latestCase.sm_number) +1;
          }
          //assigns newCase with our current newData
          const newCase = new Sponsored_Member({
          ...caseData,
          sm_number: smNewNumber
          });
          //here we just validate the newCase before saving it
          const { error } = caseSchemaValidate.validate(newCase);

          if (error) {
          return res.status(400).json({
               message: 'Validation error',
               details: error.details.map(detail => detail.message)
          });
          }
          
          const savedCase = await newCase.save();
          res.status(201).json({
               message: 'New case created successfully',
               case: savedCase
          });

     }catch(error){
          console.error('Error creating new case:', error);
          res.status(500).json({ message: 'Failed to create case', error });
     }
}
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
     getCaseById,
     getAllCases,
     getAllCaseViable,
     addSDW
}