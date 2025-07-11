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
const homeVisRoutes = require('./route/interventHomeVisitRoutes.js');

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
app.use('/api/intervention', homeVisRoutes);

// Case Closure routes
app.get('/api/case-closure/:caseID', caseClosureController.loadCaseData);
app.get('/api/case-closure/:caseID/:formID', caseClosureController.loadCaseClosureForm);
app.put('/api/create/case-closure/:caseID', caseClosureController.createCaseClosureForm);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

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