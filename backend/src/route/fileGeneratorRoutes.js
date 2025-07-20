const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
const { requireCaseAccess } = require('../middlewares/caseAuthMiddleware');

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
router.get('/case-data/:id', requireCaseAccess, generateCaseData);
router.get('/correspondence-form/:correspondenceId', isAuthenticated, generateCorrespondenceForm);
router.get('/counseling-form/:counselingId', isAuthenticated, generateCounselingForm);
router.get('/financial-assessment-form/:financialId', isAuthenticated, generateFinancialAssessmentForm);
router.get('/home-visit-form/:homeVisitId', isAuthenticated, generateHomeVisitForm);
router.get('/progress-report/:reportId', isAuthenticated, generateProgressReport);

module.exports = router;