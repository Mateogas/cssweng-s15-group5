const express = require('express');
const router = express.Router();

const progressReportController = require('../controller/progressReportController');

// router.get('/progress-report/:id', progressReportController.getProgressReportById);
router.post('/progress-report/add/:id', progressReportController.addProgressReport);
router.delete('/progress-report/delete/:id', progressReportController.deleteProgressReport);
router.put('/progress-report/edit/:id', progressReportController.editProgressReport);

module.exports = router;