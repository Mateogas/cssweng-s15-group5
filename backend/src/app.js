/**
 *  Require modules
 */
const express = require('express');
const dotenv = require('dotenv');
// const path = require('path');

/**
 *  Configuration/Initialization
 */
dotenv.config();

const app = express();
app.use(express.json());

/**
 *  Session Proper
 */
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

app.use(cookieParser());
app.use(
    session({
        secret: "secret-key", 
        resave: false,        
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            collectionName: "sessions",
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, 
            httpOnly: true, 
            secure: false,
        }
    })
);

/**
 *  Require controllers and routes
 */
const caseRoutes = require('./route/caseRoutes');
const accountRoutes = require('./route/accountRoutes');

const caseClosureController = require("./controller/caseClosureController");

const interventionRoutes = require('./route/interventionRoutes');
const progressReportRoutes = require('./route/progressReportRoutes');
const interventFinRoutes = require('./route/interventFinRoute.js');
const interventCorrespRoutes = require('./route/interventCorrespForm.js');
const homeVisRoutes = require('./route/interventHomeVisitRoutes.js');

const authController = require('./controller/authController.js')

/**
 *  ============ Routes ==============
 */

// Log requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// To test sessions, please go to localhost:3000
app.get("/test-session", (req, res) => {
    // Check if a value already exists in the session
    if (req.session.views) {
        req.session.views++;
        res.send(`You have visited this page ${req.session.views} times.`);
    } else {
        req.session.views = 1;
        res.send("Welcome to this page for the first time! Refresh to count views.");
    }
});

// All case routes
app.use('/api/cases', caseRoutes);

// All account routes
app.use('/api', accountRoutes);

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

// Log in and log out route
app.put('/api/login', authController.loginUser)
app.put('/api/logout', authController.logoutUser)

app.get('/api/session', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(200).json({ user: null });
  }
});


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