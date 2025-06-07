const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
     UPDATE: Removed sponsor_id as interventions can already be referenced from sponsored_member object.
 */
const InterventionsSchema = new Schema ({
     intervention_type: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Intervention Type',

          required: true
     },
     objective: {
          type: String, 

          required: true
     },
     sdw_assessment: {
          type: String, 

          required: true
     },
     recommendation: {
          type: String, 

          required: true
     },
}, { timestamps: true });

const Intervention = mongoose.model('Intervention', InterventionsSchema);
module.exports = Intervention;