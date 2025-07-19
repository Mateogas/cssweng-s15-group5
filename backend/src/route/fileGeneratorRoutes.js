const express = require('express');
const router = express.Router();

const { generateCaseData } = require('../fileGenerators/caseDataGenerator');
const { generateCorrespondenceForm } = require('../fileGenerators/correspondenceFormGenerator');
const { generateCounselingForm } = require('../fileGenerators/counselingFormGenerator');

/*
    File Generator Routes
    /api/file-generator
*/
router.get('/case-data/:id', generateCaseData);
router.get('/correspondence-form/:correspondenceId', generateCorrespondenceForm);
router.get('/counseling-form/:counselingId', generateCounselingForm);

module.exports = router;