const express = require('express');
const router = express.Router();
const homVisController = require('../controller/interventionHomeVisController');

/**
 *   Home Visitation Intervention Routes
 * 
 *   /api/intervention
 */
router.get('/home-visit-form/:caseID', homVisController.loadHomeVisitationForm);
router.get('/home-visit-form/:caseID/:formID', homVisController.loadHomeVisitationFormEdit);
router.put('/create/home-visit-form/:caseID', homVisController.createHomVis);
router.put('/edit/home-visit-form/:caseID/:formID', homVisController.editHomeVis);

module.exports = router;