const express = require('express');
const router = express.Router();

const caseController = require('../controller/caseController');
const interventionCounselingController = require('../controller/interventionCounselingController');

// Counseling Intervention Routes
router.get('/counseling/:id', caseController.getCaseById);
router.post('/counseling/add/:id', interventionCounselingController.addCounselingIntervention);
router.delete('/counseling/delete/:id', interventionCounselingController.deleteCounselingIntervention);


// Home Visitation Routes



// Correspondence Routes



// Financial Intervention Routes



module.exports = router;