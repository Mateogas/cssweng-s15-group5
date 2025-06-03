// Modules
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
// Add routes here
const departmentRoute = require('./populate/populate_departments')
const employeeRoute = require('./populate/populate_employee')
//Middleware
const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('it works?')
})

app.use('/employee',employeeRoute);
app.use('/department',departmentRoute)

module.exports = app;