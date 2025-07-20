const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpuSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

const Spu = mongoose.model('Spu', SpuSchema);
module.exports = Spu;