/**
 *  Require modules
 */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//const path = require('path');
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
//Cors is used for cross origin communication between servers 
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? [
            'https://unboundgroup.vercel.app',
            'https://unboundgroup-git-vercel-frontend-kmdcs-projects.vercel.app'
          ]
        : 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.set('trust proxy', 1);
app.use(
    session({
        secret: process.env.SECRET_KEY||"secret-key", 
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
const authController = require('./controller/authController.js')  
const interventionRoutes = require('./route/interventionRoutes');
const progressReportRoutes = require('./route/progressReportRoutes');
const interventFinRoutes = require('./route/interventFinRoute.js');
const interventCorrespRoutes = require('./route/interventCorrespForm.js');
const homeVisRoutes = require('./route/interventHomeVisitRoutes.js');
const isAuthenticated = require('./middlewares/isAuthenticated.js')
const createAccountController = require('./controller/createAccountController');
const profileRoute = require('../src/route/employeeRoute.js');
const fetchingRoute = require('./route/fetchingRoute.js');
const fileGenerator = require('./route/fileGeneratorRoutes.js');
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

// Log in and log out route
app.put('/api/login', authController.loginUser)
app.put('/api/logout', authController.logoutUser)

// ALL ROUTES AFTER THIS ARE NOW GETTING AUTHENTICATED
app.use(isAuthenticated);
// All case routes
app.use('/api/cases', caseRoutes);
// All account routes
app.use('/api', accountRoutes);
app.use('/api', fetchingRoute);
// Intervention routes
app.use('/api/intervention', interventionRoutes);
app.use('/api/interventions/financial',interventFinRoutes);
app.use('/api/interventions/correspondence',interventCorrespRoutes);
app.use('/api/intervention', homeVisRoutes);
// Progress Report routes
app.use('/api/progress-report', progressReportRoutes);
// Case Closure routes
app.get('/api/case-closure/:caseID', caseClosureController.loadCaseData);
app.get('/api/case-closure/:caseID/:formID', caseClosureController.loadCaseClosureForm);
app.put('/api/create/case-closure/:caseID', caseClosureController.createCaseClosureForm);

// Log in and log out route
app.use('/api/file-generator', fileGenerator);

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



module.exports = app;