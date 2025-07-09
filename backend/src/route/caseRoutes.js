const express = require('express');
const router = express.Router();
const caseController = require('../controller/caseController'); // Changed from controllers to controller

//Employees specific routes
router.get('/getsdw',caseController.getAllSDWs);

// Case-Specific Routes
router.get('/allCases', caseController.getAllCases);
router.get('/:id', caseController.getCaseById);
router.get('/',caseController.getAllCases);
router.post('/case-create',caseController.addNewCase);
router.put('/edit/core/:id', caseController.editCaseCore);
router.put('/edit/identifyingdata/:id', caseController.editCaseIdentifyingData);

// Family Composition Routes
router.get('/get-family-compositon/:caseID', caseController.getFamilyMembers);
router.put('/edit-family-composition/:caseID/:famID', caseController.editFamilyMember);
router.put(`/add-family-member/:caseID`, caseController.addFamilyMember);
router.put(`/delete-family-member/:caseID/:famID`, caseController.deleteFamilyMember);

// Text-heavy Fields Routes
router.put('/update-problems-findings/:caseID', caseController.editProblemsAndFindings);
router.put('/update-assessment/:caseID', caseController.editAssessment);
router.put('/update-evaluation-recommendation/:caseID', caseController.editEvaluationAndRecommendation);




module.exports = router;