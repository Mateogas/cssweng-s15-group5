const mongoose = require('mongoose');

const DepartmentsSchema = new mongoose.Schema({
    department_name: {
        type: String,
        required: true,
        unique: true
    },
    department_id: {
        type: String,
        required: true,
        unique: true
    }
});

const Departments = mongoose.model('Departments', DepartmentsSchema);

// Add methods here



module.exports = {
    Departments,

};