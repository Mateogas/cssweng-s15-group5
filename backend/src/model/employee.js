const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    last_name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    middle_name: {
        type: String,
        default: null,
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
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
    spu_id: {
        type: String,
        enum: ['MNL', 'CEB', 'DVO', 'BAG','ILO','ZAM'], // Add other SPUs as needed
        required: true
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee