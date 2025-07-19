const express = require('express');
const router = express.Router();

const { generateCaseData } = require('../fileGenerators/caseDataGenerator');
const { generateCorrespondenceForm } = require('../fileGenerators/correspondenceFormGenerator');

/*
    File Generator Routes
    /api/file-generator
*/
router.get('/case-data/:id', generateCaseData);
router.get('/correspondence-form/:correspondenceId', generateCorrespondenceForm);

module.exports = router;