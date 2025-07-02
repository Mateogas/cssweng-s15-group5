const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *   Needed information:
 *        > General Info
 *        > Family Type
 *        > Father, Mother
 *        > Progress in the Family
 *             > SM
 *             > Family
 *             > Worker's Observation/Findings (array of string)
 *             > Interventions made (array of string)
 *        > Recommendations
 *        > Agreement
 */
const InterventionHomeVisitSchema = new Schema ({
     grade_year_course: {
          type: String,
          required: true
     },
     years_in_program: {
          type: Number,
          required: true
     },
     date: {
          type: Date,
          required: true
     },
     community: {
          type: String,
          required: true
     },
     sponsor_name: {
          type: String,
          required: True
     },
     family_type: {
          type: String,
          enum: [], // Add family type here
          required: true
     },
     father_details: {
          father_first_name: {
               type: String,
               required: true
          },
          father_middle_name: {
               type: String,
               required: false
          },
          father_last_name: {
               type: String,
               required: true
          },
          father_work: {
               type: String,
               required: true
          },
          father_income: {
               type: Number,
               required: true
          }
     },
     mother_details: {
          mother_first_name: {
               type: String,
               required: true
          },
          mother_middle_name: {
               type: String,
               required: false
          },
          mother_last_name: {
               type: String,
               required: true
          },
          mother_work: {
               type: String,
               required: true
          },
          mother_income: {
               type: Number,
               required: true
          }
     },
     familyMembers: {
          type: [mongoose.Schema.Types.ObjectId], 
          ref: 'Family Member',

          required: false
     },
     sm_progress: {
          type: String,
          required: true
     },
     family_progress: {
          type: String,
          required: true
     },
     observation_findings: {
          type: [String],
          required: false
     },
     interventions: {
          type: [String],
          required: false
     },
     recommendations: {
          type: String,
          required: false
     },
     agreement: {
          type: String,
          required: false
     },
     progress_reports: {
          type: [mongoose.Schema.Types.ObjectId], 
          ref: 'Progress Report',

          required: false
     }     
}, { timestamps: true });

const InterventionHomeVisit = mongoose.model('Intervention Home Visit', InterventionHomeVisitSchema);
module.exports = InterventionHomeVisit;