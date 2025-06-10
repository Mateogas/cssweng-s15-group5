const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseClosureSchema = new Schema ({
     sm: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Sponsored Member',
          required: true
     },
     reason: {
          type: String,

          required: true
     },
     known: {
          type: Boolean,

          required: true,
     },
}, { timestamps: true });

const Case_Closure = mongoose.model('Case Closure', CaseClosureSchema);
module.exports = Case_Closure;