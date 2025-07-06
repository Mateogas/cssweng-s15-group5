const express = require('express');
const router = express.Router();

const progressReportController = require('../controller/progressReportController');

router.get('/:id', progressReportController.getProgressReportById);
router.post('/add/:id', progressReportController.addProgressReport);
router.delete('/delete/:id', progressReportController.deleteProgressReport);
router.put('/edit/:id', progressReportController.editProgressReport);

module.exports = router;