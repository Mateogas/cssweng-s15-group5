/**
 *  Require modules
 */
const express = require('express');
const dotenv = require('dotenv');


/**
 *  Configuration/Initialization
 */
dotenv.config();

const app = express();
app.use(express.json());


/**
 *  Require controllers
 */
const caseController = require("./controller/caseController");


/**
 *  Routes
 */
app.get('/',(req,res)=>{
    res.send('it works?')
})

app.get('/api/cases', caseController.getCase);

app.get('/api/cases/:id', caseController.getCaseById);

app.post('/api/cases/update-problems-findings', caseController.editProblemsAndFindings);
app.post('/api/cases/update-assessment', caseController.editAssessment);
module.exports = app;