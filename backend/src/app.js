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
const fetchingRoute = require('./route/fetchingRoute.js');
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
app.put('/api/create/case-closure/:caseID', caseClosureController.createCaseClosureForm)

// Create Account routes
app.post('/api/create-account', createAccountController.createAccount);

// Fetching for viewing

app.use('/api/dashboard',fetchingRoute);



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
for testing
//const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretHere', // use env or fallback
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));
  //For testing
app.get('/setTestSession', (req, res) => {
  req.session.user = { role: 'head', name: 'Test Head User',spu_id : 'AMP', _id: '686e92a03c1f53d3ee65962b'};
  res.send('Session set!');
});*/


module.exports = app;