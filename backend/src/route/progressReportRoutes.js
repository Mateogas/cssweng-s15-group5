const express = require('express');
const router = express.Router();

const progressReportController = require('../controller/progressReportController');

// Progress Report Routes
// /api/progress-report
router.get('/:reportId', progressReportController.getProgressReportById);
router.get('/add/:caseId', progressReportController.getCaseData);
router.post('/add/:interventionId', progressReportController.addProgressReport);
router.delete('/delete/:reportId', progressReportController.deleteProgressReport);
router.put('/edit/:reportId', progressReportController.editProgressReport);

module.exports = router;