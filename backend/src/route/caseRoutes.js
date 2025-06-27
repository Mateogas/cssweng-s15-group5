const express = require('express');
const router = express.Router();
const caseController = require('../controller/caseController'); // Changed from controllers to controller

// Route definitions here
router.get('/allCases', caseController.getAllCases);
router.get('/:id', caseController.getCaseById);
router.get('/',caseController.getAllCases);
router.post('/case-create',caseController.addNewCase);
module.exports = router;