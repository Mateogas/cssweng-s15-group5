const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterventionFinancialAssessmentSchema = new Schema ({
    interventionType:{
        type:String,
        default:'Intervention Financial Assessment',
        required:true
    },
    type_of_assistance: {
        type: String,
        enum: ['Funeral Assistance to the family member',
                'Medical Assistance to Family Member',
                'Food Assistance',
                'IGP Capital',
                'Funeral Assistance to Sponsored Member',
                'Medical Assistance to Sponsored Member',
                'Home Improvement/Needs',
                'Other'], 
        required: true
    },
    other_assistance_detail: {
        type: String,
        required: function() {
            return this.type_of_assistance === 'Other';
        }
    },
    area_and_subproject: {
        type: String,
        required: true
    },
    problem_presented: {
        type: String,
        required: true        
    },
    recommendation: {
        type: String,
        required: true        
    },
     progress_reports: {
          type: [mongoose.Schema.Types.ObjectId], 
          ref: 'Progress Report',

          required: false
     }         
}, { timestamps: true });

const Intervention_Financial_Assessment = mongoose.model('Intervention Financial Assessment', InterventionFinancialAssessmentSchema);
module.exports = Intervention_Financial_Assessment;