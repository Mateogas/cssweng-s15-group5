const express = require('express');
const router = express.Router();

const { generateCaseData } = require('../fileGenerators/caseDataGenerator');
const { generateCorrespondenceForm } = require('../fileGenerators/correspondenceFormGenerator');
const { generateCounselingForm } = require('../fileGenerators/counselingFormGenerator');
const { generateFinancialAssessmentForm } = require('../fileGenerators/financialAssessmentFormGenerator');
const { generateHomeVisitForm } = require('../fileGenerators/homeVisitFormGenerator');
const { generateProgressReport } = require('../fileGenerators/progressReportGenerator');

/*
    File Generator Routes
    /api/file-generator
*/
router.get('/case-data/:id', generateCaseData);
router.get('/correspondence-form/:correspondenceId', generateCorrespondenceForm);
router.get('/counseling-form/:counselingId', generateCounselingForm);
router.get('/financial-assessment-form/:financialId', generateFinancialAssessmentForm);
router.get('/home-visit-form/:homeVisitId', generateHomeVisitForm);
router.get('/progress-report/:reportId', generateProgressReport);

module.exports = router;