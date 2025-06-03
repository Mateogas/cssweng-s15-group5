const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamilyMemberSchema = new Schema ({
     last_name: {
          type: String,

          required: true,
     },
     first_name: {
          type: String, 

          required: true
     },
     // Default is NULL, considered those without middle names
     middle_name: {
          type: String, 

          default: null,
          required: false
     },
     edu_attainment: {
          type: String, 

          required: true
     },
     occupation: {
          type: String, 

          required: true
     },
     income: {
          type: String, 

          required: true
     },
}, { timestamps: true });

const Family_Member = mongoose.model('Family Member', FamilyMemberSchema);
module.exports = Family_Member;