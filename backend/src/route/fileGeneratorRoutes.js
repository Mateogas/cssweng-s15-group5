const express = require('express');
const router = express.Router();

const fileGenerator = require('../fileGenerators/caseDataGenerator');

/*
    File Generator Routes
    /api/file-generator
*/
router.get('/case-data/:id', fileGenerator.generateCaseData);

module.exports = router;