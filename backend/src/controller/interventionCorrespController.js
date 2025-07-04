const mongoose = require('mongoose');
const Sponsored_Member = require('../model/sponsored_member');
const Intervention_Correspondence = require('../model/intervention_correspondence');
const interCorespValidtor  = require('./validators/interCorespValidator');

const createCorespForm = async(req,res)=>{
    const newData = req.body;
    const smId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(smId)){
        return res.status(400).json({message: 'Invalid Sponsor Member Id'});

    }
    try{
        interCorespValidtor.validate(newData);
        
        const newForm = new Intervention_Correspondence({
            ...newData
        });
        await newForm.save();

        const sponsoredMember = await Sponsored_Member.findById(smId);

        if (!sponsoredMember) {
            return res.status(404).json({ message: 'Sponsored Member not found' });
        }
       const interventions = sponsoredMember.interventions || [];
        
        //Just filters through the same type of intervention in the sponsored member
        const sameTypeInterventions = interventions.filter(
            i => i.interventionType === 'Intervention Correspondence'
        );

        //gets last number
        const maxNumber = sameTypeInterventions.length > 0
            ? Math.max(...sameTypeInterventions.map(i => i.intervention_number))
            : 0;

        //pushes 
        sponsoredMember.interventions = sponsoredMember.interventions || [];
        sponsoredMember.interventions.push({
            intervention: newForm._id,
            intervention_number: maxNumber + 1,
            interventionType: 'Intervention Correspondence'
        });

        await sponsoredMember.save();
        return res.status(201).json(newForm);
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const getCorrespondenceForm = async(req,res)=>{
    const sponsor_id = req.params.smId;
    const formId = req.params.formId;
    if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(sponsor_id)) {
        return res.status(400).json({ message: 'Invalid Sponsored Member or Form' });
    }
    try{
        const sponsoredData = await Sponsored_Member.findById(sponsor_id).select('first_name middle_name last_name sm_number dob present_address')
            .lean();
        const formData = await Intervention_Correspondence.findById(formId).lean()

        if (!sponsoredData || !formData) {
            return res.status(404).json({ message: 'Sponsored Member or Form not found' });
        }

        const mergedData = {
            sponsored_member: {
                first_name: sponsoredData.first_name,
                middle_name: sponsoredData.middle_name,
                last_name: sponsoredData.last_name,
                sm_number: sponsoredData.sm_number,
                dob: sponsoredData.spu,
                present_address: sponsoredData.present_address,
            },
            form: formData
        };
        
        return res.status(200).json(mergedData);
    }catch(error){

        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllCorrespondenceInterventions = async (req, res) => {
    const sponsored_id = req.params.smId;

    if (!mongoose.Types.ObjectId.isValid(sponsored_id)) {
        return res.status(400).json({ message: 'Invalid Sponsored Member ID' });
    }

    try {
        const sponsoredMember = await Sponsored_Member.findById(sponsored_id)
            .populate({
                path: 'interventions.intervention',
                match: { interventionType: 'Intervention Correspondence' }
            })
            .lean();

        if (!sponsoredMember) {
            return res.status(404).json({ message: 'Sponsored Member not found' });
        }

        // Return both id and intervention_number for each correspondence intervention
       const correspondenceInterventions = (sponsoredMember.interventions || [])
        .filter(i => i.interventionType === 'Intervention Correspondence')
        .map(i => ({
            id: i.intervention ? i.intervention._id : i.intervention, // could be null
            intervention_number: i.intervention_number
        }));

        return res.status(200).json(correspondenceInterventions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const editCorrespondenceForm = async(req,res) =>{
    const formId = req.params.formId
    const newData = req.body
    if (!mongoose.Types.ObjectId.isValid(formId)) {
        return res.status(400).json({ message: 'Invalid Form ID' });
    }    

    try{
        interCorespValidtor.validate(newData);

        const updatedForm = await Intervention_Correspondence.findByIdAndUpdate(
            formId,
            newData,
            {
                new:true
            }).lean();
        
        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }        

        res.status(200).json({
            message:'Form updated succesfully',
            form: updatedForm,
        })

    }catch(error){

        console.error('Error updating form:', error);
        res.status(500).json({ 
            message: 'Failed to update form', 
            error: error.message 
        });
    }

}

module.exports = {
    createCorespForm,
    getCorrespondenceForm,
    getAllCorrespondenceInterventions,
    editCorrespondenceForm,
}