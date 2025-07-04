const express = require('express');
const router = express.Router();

const caseController = require('../controller/caseController');
const interventionCounselingController = require('../controller/interventionCounselingController');

// Counseling Intervention Routes
router.get('/counseling/add/:id', caseController.getCaseById);
router.get('/counseling/intervention/:id', interventionCounselingController.getCounselingInterventionById);
router.get('/counseling/member/:id', interventionCounselingController.getAllCounselingInterventionsByMemberId);
router.post('/counseling/add/:id', interventionCounselingController.addCounselingIntervention);
router.delete('/counseling/delete/:id', interventionCounselingController.deleteCounselingIntervention);
router.put('/counseling/edit/:id', interventionCounselingController.editCounselingIntervention);

// Home Visitation Routes



// Correspondence Routes



// Financial Intervention Routes



module.exports = router;