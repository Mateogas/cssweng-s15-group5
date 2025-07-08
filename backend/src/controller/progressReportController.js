const mongoose = require('mongoose');
const Intervention_Counseling = require('../model/intervention_counseling');
const Intervention_Home_Visitation = require('../model/intervention_homevisit');
const Intervention_Correspondence = require('../model/intervention_correspondence');
const Intervention_Financial_Assessment = require('../model/intervention_financial');
const Progress_Report = require('../model/progress_report');

/**
 * Fetches a progress report by its ID.
 * 
 * @route GET /api/progress-report/:reportId
 * 
 * @param {string} reportId - The ID of the progress report to fetch.
 * 
 * @returns {Object} 200 - Progress report object.
 * @returns {Object} 400 - Invalid report ID or missing report.
 * @returns {Object} 404 - Progress report not found.
 * @returns {Object} 500 - Internal server error.
 */
const getProgressReportById = async (req, res) => {
    try {
        const reportId = req.params.reportId;

        // Validate progress report ID
        if (!mongoose.Types.ObjectId.isValid(reportId)) {
            return res.status(400).json({ error: 'Invalid progress report ID' });
        }

        // Find the progress report by ID
        const progressReport = await Progress_Report.findById(reportId);
        if (!progressReport) {
            return res.status(404).json({ error: 'Progress report not found' });
        }

        return res.status(200).json(progressReport);
    } catch (error) {
        console.error('Error fetching progress report:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Adds a progress report to an intervention.
 * 
 * @route POST /api/progress-report/add/:interventionId
 * 
 * @param {string} interventionId - The ID of the intervention.
 * 
 * @param {Object} req.body - The progress report data.
 * @param {string} req.body.intervention_type - The type of intervention.
 * 
 * @returns {Object} 201 - Progress report added successfully.
 * @returns {Object} 400 - Invalid intervention ID, type, or missing required fields.
 * @returns {Object} 404 - Intervention not found.
 * @returns {Object} 500 - Internal server error.
 */
const addProgressReport = async (req, res) => {
    try {
        const interventionId = req.params.interventionId;
        const interventionType = req.body.intervention_type;

        // Validate intervention ID
        if (!mongoose.Types.ObjectId.isValid(interventionId)) {
            return res.status(400).json({ error: 'Invalid intervention ID' });
        }

        // Validate intervention type
        if (!['Intervention Counseling', 'Intervention Home Visitation', 'Intervention Correspondence', 'Intervention Financial Assessment'].includes(interventionType)) {
            return res.status(400).json({ error: 'Invalid intervention type' });
        }

        // Find the intervention by ID and type
        let intervention;

        switch (interventionType) {
            case 'Intervention Counseling':
                intervention = await Intervention_Counseling.findById(interventionId);
                break;
            case 'Intervention Home Visitation':
                intervention = await Intervention_Home_Visitation.findById(interventionId);
                break;
            case 'Intervention Correspondence':
                intervention = await Intervention_Correspondence.findById(interventionId);
                break;
            case 'Intervention Financial Assessment':
                intervention = await Intervention_Financial_Assessment.findById(interventionId);
                break;
            default:
                return res.status(400).json({ error: 'Invalid intervention type' });
        }
        if (!intervention) {
            return res.status(404).json({ error: 'Intervention not found' });
        }
        console.log('Found intervention:', intervention);

        // Validate required fields
        const requiredFields = [
            'sponsor_name',
            'sponsorship_date',
            'sm_update',
            'family_update',
            'services_to_family',
            'participation',
            'relation_to_sponsor',
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: 'Missing required fields', 
                missingFields 
            });
        }

        // Check if sponsorship date is valid
        const sponsorshipDate = new Date(req.body.sponsorship_date).setHours(0, 0, 0, 0);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        if (sponsorshipDate > currentDate) {
            return res.status(400).json({
                error: 'Invalid sponsorship date',
                message: 'Sponsorship date cannot be in the future.'
            });
        }

        // Check if date accomplished is valid
        if (req.body.date_accomplished) {
            const dateAccomplished = new Date(req.body.date_accomplished).setHours(0, 0, 0, 0);
            if (dateAccomplished > currentDate || dateAccomplished < sponsorshipDate) {
                return res.status(400).json({
                    error: 'Invalid date accomplished',
                    message: 'Date accomplished cannot be in the future or before the sponsorship date.'
                });
            }
        }

        // Validate relation_to_sponsor structure
        if (!req.body.relation_to_sponsor || 
            typeof req.body.relation_to_sponsor.q1 === 'undefined' ||
            typeof req.body.relation_to_sponsor.q2 === 'undefined' ||
            typeof req.body.relation_to_sponsor.q3 === 'undefined') {
            return res.status(400).json({ 
                error: 'Invalid relation_to_sponsor structure',
                message: 'relation_to_sponsor must include q1, q2, and q3 properties'
            });
        }

        // Create new progress report
        const progressReportData = {
            sponsor_name: req.body.sponsor_name,
            sponsorship_date: new Date(req.body.sponsorship_date),
            date_accomplished: req.body.date_accomplished ? new Date(req.body.date_accomplished) : null,
            period_covered: req.body.period_covered || '',
            sm_update: req.body.sm_update,
            family_update: req.body.family_update,
            services_to_family: req.body.services_to_family,
            participation: req.body.participation,
            relation_to_sponsor: {
                know_sponsor_name: req.body.relation_to_sponsor.q1,
                cooperative: req.body.relation_to_sponsor.q2,
                personalized_letter: req.body.relation_to_sponsor.q3,
            },
        };

        const progressReport = new Progress_Report(progressReportData);
        await progressReport.save();
        console.log('Progress report created:', progressReport);

        // Add the progress report to the intervention
        intervention.progress_reports.push(progressReport._id);
        await intervention.save();
        console.log('Progress report added to intervention');

        return res.status(201).json({
            message: 'Progress report added successfully',
            progressReport,
            interventionId: intervention._id,
            interventionType: interventionType
        });
    } catch (error) {
        console.error('Error adding progress report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Deletes a progress report from an intervention.
 * 
 * @route DELETE /api/progress-report/delete/:reportId
 * 
 * @param {string} reportId - The ID of the progress report to delete.
 * @param {string} req.body.intervention_type - The type of intervention.
 * 
 * @returns {Object} 200 - Progress report deleted successfully.
 * @returns {Object} 400 - Invalid report ID or intervention type.
 * @returns {Object} 404 - Progress report or intervention not found.
 * @returns {Object} 500 - Internal server error.
 */
const deleteProgressReport = async (req, res) => {
    try {
        const reportId = req.params.reportId;
        const interventionType = req.body.intervention_type;

        // Validate progress report ID
        if (!mongoose.Types.ObjectId.isValid(reportId)) {
            return res.status(400).json({ error: 'Invalid progress report ID' });
        }

        // Find the progress report
        const progressReport = await Progress_Report.findById(reportId);
        if (!progressReport) {
            return res.status(404).json({ error: 'Progress report not found' });
        }

        // Validate intervention type
        if (!['Intervention Counseling', 'Intervention Home Visitation', 'Intervention Correspondence', 'Intervention Financial Assessment'].includes(interventionType)) {
            return res.status(400).json({ error: 'Invalid intervention type' });
        }

        let interventionModel;

        switch (interventionType) {
            case 'Intervention Counseling':
                interventionModel = Intervention_Counseling;
                break;
            case 'Intervention Home Visitation':
                interventionModel = Intervention_Home_Visitation;
                break;
            case 'Intervention Correspondence':
                interventionModel = Intervention_Correspondence;
                break;
            case 'Intervention Financial Assessment':
                interventionModel = Intervention_Financial_Assessment;
                break;
            default:
                return res.status(400).json({ error: 'Invalid intervention type' });
        }

        // Find the intervention that contains the progress report and remove it
        const intervention = await interventionModel.findOneAndUpdate(
            { progress_reports: reportId },
            { $pull: { progress_reports: reportId } },
            { new: true }
        );
        
        if (!intervention) {
            return res.status(404).json({ error: 'Intervention not found' });
        }
        console.log('Progress report removed from intervention');

        // Delete the progress report
        await Progress_Report.findByIdAndDelete(reportId);
        console.log('Progress report deleted:', reportId);

        return res.status(200).json({ message: 'Progress report deleted successfully' });
    } catch (error) {
        console.error('Error deleting progress report:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Edits an existing progress report.
 * 
 * @route PUT /api/progress-report/edit/:reportId
 * 
 * @param {string} reportId - The ID of the progress report to edit.
 * @param {Object} req.body - The updated progress report data.
 * 
 * @returns {Object} 200 - Progress report updated successfully.
 * @returns {Object} 400 - Invalid report ID, missing required fields, or invalid sponsorship date.
 * @returns {Object} 404 - Progress report not found.
 * @returns {Object} 500 - Internal server error.
 */ 
const editProgressReport = async (req, res) => {
    try {
        const reportId = req.params.reportId;

        // Find the progress report
        const progressReport = await Progress_Report.findById(reportId);

        if (!progressReport) {
            return res.status(404).json({ error: 'Progress report not found' });
        }

        // Validate required fields
        const requiredFields = [
            'sponsor_name',
            'sponsorship_date',
            'sm_update',
            'family_update',
            'services_to_family',
            'participation',
            'relation_to_sponsor',
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: 'Missing required fields', 
                missingFields 
            });
        }

        // Check if sponsorship date is valid
        const sponsorshipDate = new Date(req.body.sponsorship_date).setHours(0, 0, 0, 0);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        if (sponsorshipDate > currentDate) {
            return res.status(400).json({
                error: 'Invalid sponsorship date',
                message: 'Sponsorship date cannot be in the future.'
            });
        }
        // Check if date accomplished is valid
        if (req.body.date_accomplished) {
            const dateAccomplished = new Date(req.body.date_accomplished).setHours(0, 0, 0, 0);
            if (dateAccomplished > currentDate || dateAccomplished < sponsorshipDate) {
                return res.status(400).json({
                    error: 'Invalid date accomplished',
                    message: 'Date accomplished cannot be in the future or before the sponsorship date.'
                });
            }
        }

        // Validate relation_to_sponsor structure
        if (!req.body.relation_to_sponsor || 
            typeof req.body.relation_to_sponsor.q1 === 'undefined' ||
            typeof req.body.relation_to_sponsor.q2 === 'undefined' ||
            typeof req.body.relation_to_sponsor.q3 === 'undefined') {
            return res.status(400).json({ 
                error: 'Invalid relation_to_sponsor structure',
                message: 'relation_to_sponsor must include q1, q2, and q3 properties'
            });
        }

        // Update the progress report
        progressReport.sponsor_name = req.body.sponsor_name;
        progressReport.sponsorship_date = new Date(req.body.sponsorship_date);
        progressReport.date_accomplished = req.body.date_accomplished ? new Date(req.body.date_accomplished) : null;
        progressReport.period_covered = req.body.period_covered || '';
        progressReport.sm_update = req.body.sm_update;
        progressReport.family_update = req.body.family_update;
        progressReport.services_to_family = req.body.services_to_family;
        progressReport.participation = req.body.participation;
        progressReport.relation_to_sponsor = {
            know_sponsor_name: req.body.relation_to_sponsor.q1,
            cooperative: req.body.relation_to_sponsor.q2,
            personalized_letter: req.body.relation_to_sponsor.q3,
        };
        await progressReport.save();
        console.log('Progress report updated:', progressReport);

        return res.status(200).json({
            message: 'Progress report updated successfully',
            progressReport,
        });
    } catch (error) {
        console.error('Error editing progress report:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getProgressReportById,
    addProgressReport,
    deleteProgressReport,
    editProgressReport,
}