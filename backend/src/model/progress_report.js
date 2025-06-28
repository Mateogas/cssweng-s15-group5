const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressReportSchema = new Schema ({
     results: {
          type: String,

          required: true
     },
     person_responsible: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Employee',

          required: true
     },
}, { timestamps: true });

const Progress_Report = mongoose.model('Progress Report', ProgressReportSchema);
module.exports = Progress_Report;