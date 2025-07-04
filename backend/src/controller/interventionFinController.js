//this is the controller for intervention financial form

const mongoose =require('mongoose');
const Sponsored_Member = require('../model/sponsored_member');
const Intervention_Financial = require('../model/intervention_financial');
const interFinSchemaValidator = require('./validators/interFinValidator');


/**
 * @route   POST /api/interventions/financial/:id
 * @desc    Creates a new Intervention Financial Assessment form and links it to a Sponsored Member
 * 
 * @required
 *    - :id URL parameter: ObjectId of the Sponsored Member to link the intervention to
 *    - Request body: Valid Intervention Financial Assessment data
 * 
 * @notes
 *    - Validates if the provided id is a valid Mongo ObjectId
 *    - Validates the request body using Joi schema
 *    - Creates a new Intervention Financial Assessment document
 *    - Pushes the new intervention's ObjectId into the Sponsored Member's interventions array
 * 
 * @returns
 *    - 201 Created: The newly created intervention form
 *    - 400 Bad Request: if the provided id is invalid or validation fails
 *    - 500 Internal Server Error: if something goes wrong during the process
 */
const createFinForm = async (req, res) => {
    const newData = req.body;
    const smId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(smId)) {
        return res.status(400).json({ message: 'Invalid Sponsored Member' });
    }

    try {
        interFinSchemaValidator.validate(newData);

        const newForm = new Intervention_Financial({
            ...newData
        });
        await newForm.save();

        
        const sponsoredMember = await Sponsored_Member.findById(smId);

        if (!sponsoredMember) {
            return res.status(404).json({ message: 'Sponsored Member not found' });
        }

        // Make sure interventions exists and is an array before filtering
        const interventions = sponsoredMember.interventions || [];
        
        //Just filters through the same type of intervention in the sponsored member
        const sameTypeInterventions = interventions.filter(
            i => i.interventionType === 'Intervention Financial Assessment'
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
            interventionType: 'Intervention Financial Assessment'
        });

        await sponsoredMember.save();

        return res.status(201).json(newForm);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
/**
 * @route   GET /api/interventions/financial/form/:caseId/:formId
 * @desc    Retrieves a specific Intervention Financial Assessment form and basic Sponsored Member info
 * 
 * @required
 *    - :caseId URL parameter: ObjectId of the Sponsored Member
 *    - :formId URL parameter: ObjectId of the Intervention Financial Assessment form
 * 
 * @notes
 *    - Validates if the provided ids are valid Mongo ObjectIds
 *    - Fetches the Sponsored Member's name, sm_number, and spu
 *    - Fetches the full Intervention Financial Assessment form data
 *    - Combines both into a single response object
 * 
 * @returns
 *    - 200 OK: Object containing sponsored_member info and full form data
 *    - 400 Bad Request: if any provided id is invalid
 *    - 404 Not Found: if the Sponsored Member or form does not exist
 *    - 500 Internal Server Error: if something goes wrong during the process
 */

const getFinancialForm = async(req,res)=>{
    const sponsor_id = req.params.smId;
    const formId = req.params.formId;
    if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(sponsor_id)) {
        return res.status(400).json({ message: 'Invalid Sponsored Member or Form' });
    }
    try{
        const sponsoredData = await Sponsored_Member.findById(sponsor_id).select('first_name middle_name last_name sm_number spu')
            .lean();
        const formData = await Intervention_Financial.findById(formId).lean()

        if (!sponsoredData || !formData) {
            return res.status(404).json({ message: 'Sponsored Member or Form not found' });
        }

        const mergedData = {
            sponsored_member: {
                first_name: sponsoredData.first_name,
                middle_name: sponsoredData.middle_name,
                last_name: sponsoredData.last_name,
                sm_number: sponsoredData.sm_number,
                spu: sponsoredData.spu
            },
            form: formData
        };
        
        return res.status(200).json(mergedData);
    }catch(error){

        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
/**
 * @route   GET /api/interventions/financial/all/:id
 * @desc    Retrieves all "Intervention Financial Assessment" interventions for a Sponsored Member
 * 
 * @required
 *    - :id URL parameter: ObjectId of the Sponsored Member whose interventions are to be retrieved
 * 
 * @notes
 *    - Validates if the provided id is a valid Mongo ObjectId
 *    - Fetches the Sponsored Member by its _id
 *    - Populates the interventions array with only those interventions whose interventionType is "Intervention Financial Assessment"
 *    - Filters out any null interventions (in case of mismatched types or missing documents)
 * 
 * @returns
 *    - 200 OK: Array of all "Intervention Financial Assessment" intervention documents for the Sponsored Member
 *    - 400 Bad Request: if the provided id is invalid
 *    - 404 Not Found: if the Sponsored Member does not exist
 *    - 500 Internal Server Error: if something goes wrong during the process
 */
const getAllFinancialInterventions = async (req, res) => {
    const sponsored_id = req.params.smId;

    if (!mongoose.Types.ObjectId.isValid(sponsored_id)) {
        return res.status(400).json({ message: 'Invalid Sponsored Member ID' });
    }

    try {
        // Find the sponsored member and populate only interventions of the correct type
        const sponsoredMember = await Sponsored_Member.findById(sponsored_id)
            .populate({
                path: 'interventions.intervention',
                match: { interventionType: 'Intervention Financial Assessment' }
            })
            .lean();

        if (!sponsoredMember) {
            return res.status(404).json({ message: 'Sponsored Member not found' });
        }

        // Filter out nulls (if any interventions are not of the correct type)
        const financialInterventions = (sponsoredMember.interventions || [])
            .map(i => i.intervention)
            .filter(i => i);

        return res.status(200).json(financialInterventions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = {
    createFinForm,
    getFinancialForm,
    getAllFinancialInterventions,
}
