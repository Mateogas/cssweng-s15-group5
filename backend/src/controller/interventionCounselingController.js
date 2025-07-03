const mongoose = require('mongoose');
const Sponsored_Member = require('../model/sponsored_member');
const Intervention_Counseling = require('../model/intervention_counseling');

/**
 * Adds a new counseling intervention record to the database.
 */
const addCounselingIntervention = async (req, res) => {
    try {
        const id = req.params.id;

        const sponsored_member = await Sponsored_Member.findById(id);
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

const deleteCounselingIntervention = async (req, res) => {
    try {
        const id = req.params.id;

        const intervention = await Intervention_Counseling.findById(id);

        if (!intervention) {
            return res.status(404).json({ error: 'Counseling intervention not found' });
        }

        // Remove the intervention from the sponsored member's interventions array
        const sponsored_member = await Sponsored_Member.findOneAndUpdate(
            { 'interventions.intervention': id },
            { $pull: { interventions: { intervention: id } } },
            { new: true }
        );

        if (!sponsored_member) {
            return res.status(404).json({ error: 'Sponsored member not found' });
        }

        // Delete the intervention
        await Intervention_Counseling.findByIdAndDelete(id);

        // Return success response
        return res.status(200).json({
            message: 'Counseling intervention deleted successfully',
            interventionId: id,
            sponsored_member: {
                id: sponsored_member._id,
            },
        });
    } catch (error) {
        console.error('Error deleting counseling intervention:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addCounselingIntervention,
    deleteCounselingIntervention,
}