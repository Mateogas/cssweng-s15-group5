const mongoose = require('mongoose');
const Sponsored_Member = require('../model/sponsored_member');
const Intervention_Counseling = require('../model/intervention_counseling');

/**
 * Retrieves a counseling intervention by its ID, including detailed intervention data
 * and associated sponsored member information.
 *
 * @route GET /api/intervention/counseling/intervention/:counselingId
 *
 * @param {string} req.params.counselingId - ID of the counseling intervention to retrieve
 *
 * @returns {Object} 200 - JSON object with counseling intervention and sponsored member details
 * @returns {Object} 404 - If intervention or sponsored member is not found
 * @returns {Object} 500 - If a server error occurs
 */
const getCounselingInterventionById = async (req, res) => {
    try {
        const counselingId = req.params.counselingId;

        // Find the counseling intervention by ID
        const intervention = await Intervention_Counseling.findById(counselingId);
        if (!intervention) {
            console.log('Intervention not found');
            return res.status(404).json({ error: 'Counseling intervention not found' });
        }

        // Populate the sponsored member details
        const sponsored_member = await Sponsored_Member.findOne({
            'interventions.intervention': counselingId
        }).populate('interventions.intervention');

        if (!sponsored_member) {
            return res.status(404).json({ error: 'Sponsored member not found' });
        }

        // Get the intervention number associated with the counseling intervention
        /*const intervention_number = sponsored_member.interventions.find(
            entry => entry.intervention.toString() === counselingId
        )?.intervention_number;*/

        return res.status(200).json({
            message: 'Counseling intervention retrieved successfully',
            //intervention_number,
            grade_year_level: intervention.grade_year_level,
            school: intervention.school,
            area_self_help: intervention.area_self_help,
            counseling_date: new Date(intervention.counseling_date).toISOString().split('T')[0],
            reason_for_counseling: intervention.reason_for_counseling,
            corrective_action: intervention.corrective_action,
            recommendation: intervention.recommendation,
            sm_comments: intervention.sm_comments,
            progress_reports: intervention.progress_reports,
            first_name: sponsored_member.first_name,
            middle_name: sponsored_member.middle_name,
            last_name: sponsored_member.last_name,
            ch_number: sponsored_member.sm_number,
            subproject: sponsored_member.spu,
            address: sponsored_member.present_address,
        });
    } catch (error) {
        console.error('Error fetching counseling intervention:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Retrieves all counseling interventions for a sponsored member by their ID.
 * Filters interventions to include only those of type 'Intervention Counseling'.
 * 
 * @route GET /api/intervention/counseling/member/:memberID
 * 
 * @param {string} req.params.memberID - ID of the sponsored member
 * 
 * @returns {Object} 200 - JSON object with counseling interventions and sponsored member details
 * @returns {Object} 404 - If sponsored member is not found
 * @returns {Object} 500 - If a server error occurs
 */
const getAllCounselingInterventionsByMemberId = async (req, res) => {
    try {
        const memberID = req.params.memberID;

        // Find the sponsored member by ID
        const sponsored_member = await Sponsored_Member.findById(memberID).populate('interventions.intervention');
        if (!sponsored_member) {
            return res.status(404).json({ error: 'Sponsored member not found' });
        }

        // Filter interventions of type 'Intervention Counseling'
        const counselingInterventions = sponsored_member.interventions.filter(intervention => 
            intervention.interventionType === 'Intervention Counseling'
        );

        return res.status(200).json({
            message: 'Counseling interventions retrieved successfully',
            interventions: counselingInterventions,
            sponsored_member: {
                id: sponsored_member._id,
                first_name: sponsored_member.first_name,
                middle_name: sponsored_member.middle_name,
                last_name: sponsored_member.last_name,
                ch_number: sponsored_member.sm_number,
                subproject: sponsored_member.spu,
                address: sponsored_member.present_address,
            },
        });
    } catch (error) {
        console.error('Error fetching counseling interventions:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Adds a new counseling intervention for a sponsored member.
 * 
 * @route POST /api/intervention/counseling/add/:memberID
 * 
 * @param {string} req.params.memberID - ID of the sponsored member
 * @param {Object} req.body - Data for the new counseling intervention
 * 
 * @returns {Object} 200 - JSON object with success message, intervention details, and sponsored member info
 * @returns {Object} 400 - If required fields are missing or counseling date is invalid
 * @returns {Object} 404 - If sponsored member is not found
 * @returns {Object} 500 - If a server error occurs
 */
const addCounselingIntervention = async (req, res) => {
    try {
        const memberID = req.params.memberID;

        const sponsored_member = await Sponsored_Member.findById(memberID);
        if (!sponsored_member) {
            return res.status(404).json({ error: 'Sponsored member not found' });
        };
        console.log('found sm');

        // Validate the required fields
        const requiredFields = [
            'grade_year_level', 
            'school', 
            'area_self_help', 
            'counseling_date', 
            'reason_for_counseling',
            'corrective_action',
            'recommendation'
        ];
        console.log('checking required fields');

        // Check for missing fields
        const missingFields = requiredFields.filter(field => !req.body[field]);

        console.log('missing fields:', missingFields);
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: 'Missing required fields', 
                missingFields 
            });
        }
        console.log('all fields are present');

        // Check if counseling date is valid
        const counselingDate = new Date(req.body.counseling_date).setHours(0, 0, 0, 0);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        if (counselingDate > currentDate) {
            return res.status(400).json({
                error: 'Invalid counseling date',
                message: 'Counseling date cannot be in the future.'
            });
        }

        const interventionData = {
            grade_year_level: req.body.grade_year_level,
            school: req.body.school,
            area_self_help: req.body.area_self_help,
            counseling_date: req.body.counseling_date,
            reason_for_counseling: req.body.reason_for_counseling,
            corrective_action: req.body.corrective_action,
            recommendation: req.body.recommendation,
            sm_comments: req.body.sm_comments || '',
            progress_reports: [],
        }

        console.log('creating intervention');
        // Create new counseling intervention
        const intervention = new Intervention_Counseling({
            ...interventionData,
        })
        await intervention.save();
        console.log('intervention saved');

        // Add the intervention ID to the sponsored member's interventions array
        if (!sponsored_member.interventions) {
            sponsored_member.interventions = [];
        }

        // Ensure the intervention ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(intervention._id)) {
            return res.status(500).json({ error: 'Invalid intervention ID' });
        }
        console.log('intervention ID is valid');

        // Relate the new intervention to the sponsored member
        sponsored_member.interventions.push({
            intervention: intervention._id,
            interventionType: 'Intervention Counseling',
            intervention_number: sponsored_member.interventions.length + 1
        });
        await sponsored_member.save();
        console.log('sponsored member updated with intervention');

        return res.status(200).json({
            message: 'Counseling intervention added successfully',
            intervention: intervention,
            sponsored_member: {
                id: sponsored_member._id,
                first_name: sponsored_member.first_name,
                middle_name: sponsored_member.middle_name,
                last_name: sponsored_member.last_name,
                ch_number: sponsored_member.sm_number,
                subproject: sponsored_member.spu,
                address: sponsored_member.present_address,
            },
        });
    } catch (error) {
        console.error('Error adding counseling intervention:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Deletes a counseling intervention by its ID and removes it from the sponsored member's interventions.
 * 
 * @route DELETE /api/intervention/counseling/delete/:counselingId
 * 
 * @param {string} req.params.counselingId - ID of the counseling intervention to delete
 * 
 * @returns {Object} 200 - JSON object with success message and intervention ID
 * @returns {Object} 404 - If intervention or sponsored member is not found
 * @returns {Object} 500 - If a server error occurs
 */
const deleteCounselingIntervention = async (req, res) => {
    try {
        const counselingId = req.params.counselingId;

        const intervention = await Intervention_Counseling.findById(counselingId);

        if (!intervention) {
            return res.status(404).json({ error: 'Counseling intervention not found' });
        }

        // Remove the intervention from the sponsored member's interventions array
        const sponsored_member = await Sponsored_Member.findOneAndUpdate(
            { 'interventions.intervention': counselingId },
            { $pull: { interventions: { intervention: counselingId } } },
            { new: true }
        );

        if (!sponsored_member) {
            return res.status(404).json({ error: 'Sponsored member not found' });
        }

        // Delete the intervention
        await Intervention_Counseling.findByIdAndDelete(counselingId);

        // Return success response
        return res.status(200).json({
            message: 'Counseling intervention deleted successfully',
            interventionId: counselingId,
            sponsored_member: {
                id: sponsored_member._id,
            },
        });
    } catch (error) {
        console.error('Error deleting counseling intervention:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Edits an existing counseling intervention by its ID.
 * Validates required fields and updates the intervention data.
 * 
 * @route PUT /api/intervention/counseling/edit/:counselingId
 * 
 * @param {string} req.params.counselingId - ID of the counseling intervention to edit
 * @param {Object} req.body - Data to update the counseling intervention
 * 
 * @return {Object} 200 - JSON object with success message and updated intervention details
 * @return {Object} 400 - If required fields are missing or counseling date is invalid
 * @return {Object} 404 - If counseling intervention is not found
 * @return {Object} 500 - If a server error occurs
 */
const editCounselingIntervention = async (req, res) => {
    try {
        const counselingId = req.params.counselingId;
        const intervention = await Intervention_Counseling.findById(counselingId);
        if (!intervention) {
            return res.status(404).json({ error: 'Counseling intervention not found' });
        }

        // Validate the required fields
        const requiredFields = [
            'grade_year_level', 
            'school',
            'area_self_help',
            'counseling_date',
            'reason_for_counseling',
            'corrective_action',
            'recommendation'
        ];

        // Check for missing fields
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: 'Missing required fields', 
                missingFields 
            });
        }
        
        // Check if counseling date is valid
        const counselingDate = new Date(req.body.counseling_date).setHours(0, 0, 0, 0);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        if (counselingDate > currentDate) {
            return res.status(400).json({
                error: 'Invalid counseling date',
                message: 'Counseling date cannot be in the future.'
            });
        }
        
        // Update the intervention with the new data
        intervention.grade_year_level = req.body.grade_year_level;
        intervention.school = req.body.school;
        intervention.area_self_help = req.body.area_self_help;
        intervention.counseling_date = req.body.counseling_date;
        intervention.reason_for_counseling = req.body.reason_for_counseling;
        intervention.corrective_action = req.body.corrective_action;
        intervention.recommendation = req.body.recommendation;
        intervention.sm_comments = req.body.sm_comments || '';
        await intervention.save();
        
        // Return success response
        return res.status(200).json({
            message: 'Counseling intervention updated successfully',
            intervention: intervention,
        });
    } catch (error) {
        console.error('Error editing counseling intervention:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getCounselingInterventionById,
    getAllCounselingInterventionsByMemberId,
    addCounselingIntervention,
    deleteCounselingIntervention,
    editCounselingIntervention,
}