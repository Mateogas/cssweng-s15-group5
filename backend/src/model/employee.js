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
    spu_id: {
        type: String,
        enum: ['AMP', 'FDQ', 'MPH', 'MS', 'AP', 'AV', 'MM', 'MMP'], // Updated SPU IDs
        required: true
    },

      sdw_id: {
        type: Number,
        required: false
    },

    contact_no: {
        type: String,
        required: false
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

// Add methods here



module.exports = {
    Employee,

};