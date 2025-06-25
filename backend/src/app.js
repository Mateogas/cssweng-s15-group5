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
caseController = require("./controller/caseController");


/**
 *  Routes
 */
app.get('/',(req,res)=>{
    res.send('it works?')
})

app.get('/api/cases', caseController.getCase);

module.exports = app;