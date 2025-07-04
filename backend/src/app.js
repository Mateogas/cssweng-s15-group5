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
const caseController = require("./controller/caseController");
const caseRoutes = require('./route/caseRoutes')
const interventFinRoutes = require('./route/interventFinRoute.js');
/**
 *  ============ Routes ==============
 */

// Log requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// all case routes
app.use('/api/cases', caseRoutes);
app.use('/api/interventions/financial',interventFinRoutes);
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