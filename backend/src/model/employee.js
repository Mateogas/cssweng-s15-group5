const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: '',
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        default: null,
        required: false
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departments',
        default: null,
        required: false
    },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

// Add methods here



module.exports = {
    Employee,
    
};