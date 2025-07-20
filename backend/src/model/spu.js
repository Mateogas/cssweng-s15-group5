const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpuSchema = new Schema({
    spu_name: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

const Spu = mongoose.model('Spu', SpuSchema);
module.exports = Spu;