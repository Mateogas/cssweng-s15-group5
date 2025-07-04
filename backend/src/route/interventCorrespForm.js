

const express = require('express');
const router = express.Router();
const interventionCorrespController = require('../controller/interventionCorrespController');

router.post('/create-form/:id',interventionCorrespController.createCorespForm);
router.get('/viewform/:smId/:formId',interventionCorrespController.getCorrespondenceForm);
router.get('/getAllForms/:smId',interventionCorrespController.getAllCorrespondenceInterventions);
router.put('/edit-form/:formId',interventionCorrespController.editCorrespondenceForm);

module.exports = router;