// Modules
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

//Middleware
const app = express();
app.use(express.json());

// Add routes here




module.exports = app;