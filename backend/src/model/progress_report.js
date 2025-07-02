const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressReportSchema = new Schema ({
    date_accomplished: {
        type: Date,
        required: true
    },
    recommendation: {
        type: String,
        required: true
    },
    date_accomplished: {
        type: Date,
        required: false
    },
    period_covered: {
        type: String,
        required: true
    },
    sm_update: {
        type: String,
        required: true
    },
    family_update: {
        type: String,
        required: true
    },
    services_to_family: {
        type: String,
        required: true
    },
    participation: {
        type: String,
        required: true
    },
    relation_to_sponsor: {
          know_sponsor_name: {
               type: String,
               enum: ["Yes", "Sometimes", "No"],
               required: true
          },
          cooperative: {
               type: String,
               enum: ["Yes", "Sometimes", "No"],
               required: true
          },
          personalized_letter: {
              type: String,
              enum: ["Yes", "Sometimes", "No"],
              required: true
          },
    },
}, { timestamps: true });

const Progress_Report = mongoose.model('Progress Report', ProgressReportSchema);
module.exports = Progress_Report;