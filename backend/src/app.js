/**
 *  Require modules
 */
const express = require('express');
const dotenv = require('dotenv');


/**
 *  Configuration/Initialization
 */
dotenv.config();

const app = express();
app.use(express.json());


/**
 *  Require controllers
 */
caseController = require("./controller/caseController");


/**
 *  Routes
 */
app.get('/',(req,res)=>{
    res.send('it works?')
})

app.get('/api/cases', caseController.getCase);

// ========== FAMILY COMPOSITION ========== //
/**
 *  > Gets the family composition
 * 
 *  Parameter:
 *      > :caseID should be the OBJECT ID of the sponsored member
 * 
 *  Return:
 *      > all family members with these fields:
 *          id (OBJECT ID)
 *          firstName
 *          middleName
 *          lastName
 *          name (this is just the formatted full name)
 *          age
 *          income
 *          civilStatus
 *          occupation
 *          education
 *          relationship
 *          status
 */
app.get(`/api/cases/get-family-compositon/:caseID`, caseController.getFamilyMembers);

/**
 *  > Edits the chosen family member
 * 
 *  Parameter:
 *      > :caseID should be the OBJECT ID of the sponsored member
 *      > :famID should be the OBJECT ID of the chosen family member
 * 
 *  Return:
 *      > the updated family member with these fields
 *          id (OBJECT ID)
 *          firstName
 *          middleName
 *          lastName
 *          name (this is just the formatted full name)
 *          age
 *          income
 *          civilStatus
 *          occupation
 *          education
 *          relationship
 *          status
 */
app.put(`/api/cases/edit-family-composition/:caseID/:famID`, caseController.editFamilyMember);

/**
 *  > Deletes the chosen family member
 * 
 *  Parameter:
 *      > :caseID should be the OBJECT ID of the sponsored member
 *      > :famID should be the OBJECT ID of the chosen family member
 * 
 *  Return:
 *      > calls the getFamilyMembers again
 */
app.put(`/api/cases/delete-family-member/:caseID/:famID`, caseController.deleteFamilyMember);

/**
 *  > Edits the chosen family member
 * 
 *  Parameter:
 *      > :caseID should be the OBJECT ID of the sponsored member
 * 
 *  Return:
 *      > the added family member with these fields
 *          id (OBJECT ID)
 *          firstName
 *          middleName
 *          lastName
 *          name (this is just the formatted full name)
 *          age
 *          income
 *          civilStatus
 *          occupation
 *          education
 *          relationship
 *          status
 */
app.put(`/api/cases/add-family-member/:caseID`, caseController.addFamilyMember);

module.exports = app;