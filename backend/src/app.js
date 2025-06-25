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

app.post('/api/cases/:id/problem_presented', caseController.editProblemPresented);
app.post('/api/cases/:id/history_problem', caseController.editHistOfProblem);
app.post('/api/cases/:id/observation_findings', caseController.editFindings);
app.post('/api/cases/:id/assessment', caseController.editAssessment);

module.exports = app;