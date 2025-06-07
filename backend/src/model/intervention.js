const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterventionsSchema = new Schema ({
     intervention_type: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Intervention Type',

          required: true
     },
     sponsor_id: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Sponsored Member',

          required: true,
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