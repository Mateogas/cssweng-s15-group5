const Schema = mongoose.Schema;

const InterventionTypeSchema = new Schema ({
     intervention_name: {
          type: String,

          required: true
     },
}, { timestamps: true });

const Intervention_Type = mongoose.model('Intervention Type', InterventionTypeSchema);
module.exports = Intervention_Type;