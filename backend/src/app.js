// Modules
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
// Add routes here
//const departmentRoute = require('./populate/populate_departments')
//const employeeRoute = require('./populate/populate_employee')
//Middleware
const app = express();

const Sponsored_Member = require('./model/sponsored_member')
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('it works?')
})
app.get('/api/cases', async (req,res)=>{
    try {
        
        const cases = await Sponsored_Member.find({})
        .limit(2) 
        .lean();  
        
        res.json(cases);
    } catch (error) {
        console.error('Error fetching cases:', error);
        res.status(500).json({ 
        message: 'Error retrieving case data',
        error: error.message 
        });
    }
})
////app.use('/employee',employeeRoute);
//app.use('/department',departmentRoute)

module.exports = app;