const Spu = require('../model/spu');

const createSpu = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newSpu = new Spu({ name, description });
        await newSpu.save();
        res.status(201).json(newSpu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSpu = async (req, res) => {
    try {
        const { spuId } = req.params;
        await Spu.findByIdAndDelete(spuId);
        res.status(200).json({ message: 'SPU deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllSpus = async (req, res) => {
    try {
        const spus = await Spu.find();
        res.status(200).json(spus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createSpu,
    deleteSpu,
    getAllSpus,

}