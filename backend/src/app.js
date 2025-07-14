/**
 *  Require modules
 */
const express = require('express');
const dotenv = require('dotenv');
//const path = require('path');

/**
 *  Configuration/Initialization
 */
dotenv.config();

const app = express();
app.use(express.json());


/**
 *  Require controllers and routes
 */
const caseRoutes = require('./route/caseRoutes');
const caseClosureController = require("./controller/caseClosureController");

const interventionRoutes = require('./route/interventionRoutes');
const progressReportRoutes = require('./route/progressReportRoutes');
const interventFinRoutes = require('./route/interventFinRoute.js');
const interventCorrespRoutes = require('./route/interventCorrespForm.js');

const createAccountController = require('./controller/createAccountController');

/**
 *  ============ Routes ==============
 */

// Log requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// All case routes
app.use('/api/cases', caseRoutes);

// Intervention routes
app.use('/api/intervention', interventionRoutes);

// Progress Report routes
app.use('/api/progress-report', progressReportRoutes);

app.use('/api/interventions/financial',interventFinRoutes);
app.use('/api/interventions/correspondence',interventCorrespRoutes);

// Case Closure routes
app.get('/api/case-closure/:caseID', caseClosureController.loadCaseClosureForm)
app.put('/api/case-closure/create/:caseID', caseClosureController.createCaseClosureForm)
app.put('/api/case-closure/edit/:caseID', caseClosureController.editCaseClosureForm)
app.put('/api/case-closure/edit/:caseID/:formID', caseClosureController.editCaseClosureForm)
app.put('/api/case-closure/terminate/:caseID', caseClosureController.confirmCaseTermination)
app.put('/api/case-closure/terminate/:caseID/:formID', caseClosureController.confirmCaseTermination)
app.delete('/api/case-closure/delete/:caseID', caseClosureController.deleteCaseClosureForm)
app.delete('/api/case-closure/delete/:caseID/:formID', caseClosureController.deleteCaseClosureForm)

// Create Account routes
app.post('/api/create-account', createAccountController.createAccount);

/**
 *  ============ Extras ==============
 */

/*
Code below was added by gpt as a bug fix to when you reload it turns into json, this happens because of routing issues with
vite+react to be able to use this tho you first need to build the front end

// Serve static files (JS, CSS, images, etc.)
app.use(express.static(path.join(__dirname, '../frontend-dev-test/dist')))

// Serve index.html for any other route (React handles client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend-dev-test/dist/index.html'))
})
*/

module.exports = app;