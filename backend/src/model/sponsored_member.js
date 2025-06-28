const mongoose = require('mongoose');

/*
     UPDATE: 
        > Added sm_number
        > Changed intervention to of type array
 */
const SponsoredMemberSchema = new mongoose.Schema({
    sm_number: {
        type: String,
        required: true,
    },
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
        required: false,
    },
    sex: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    pob: {
        type: String,
        required: true
    },
    civil_status: {
        type: String,
        required: true
    },
    edu_attainment: {
        type: String,
        required: false
    },
    religion: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    contact_no: {
        type: String,
        required: false
    },
    problem_presented: {
        type: String,
        required: true
    },
    observation_findings: {
        type: String,
        required: false
    },
    recommendation: {
        type: String,
        required: false
    },
    interventions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intervention',
        default: [],
        required: false
    }],
    history_problem: {
        type: String,
        required: false
    },
    evaluation: {
        type: String,
        required: false
    },
    assigned_sdw: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        default: null,
        required: true
    },
    is_active: {
        type: String,
        required: true
    },
});

const Sponsored_Member = mongoose.model('Sponsored Member', SponsoredMemberSchema);

// Add methods here


module.exports =Sponsored_Member;