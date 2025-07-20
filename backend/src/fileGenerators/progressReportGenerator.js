const mongoose = require('mongoose')
const Sponsored_Member = require('../model/sponsored_member')
const Progress_Report = require('../model/progress_report')

const {
    calculateAge,
    formatDate,
    formatProgressReport,
} = require('./helpers')

const generateProgressReport = async (req, res) => {
    try {
        const reportSelected = await Progress_Report.findById(req.params.reportId);
        if (!reportSelected)
            return res.status(404).json({ message: "Invalid report ID." });

        const sponsored_member = await Sponsored_Member.findOne({ 'progress_reports.progress_report': reportSelected._id });
        if (!sponsored_member)
            return res.status(404).json({ message: "Sponsored member not found." });

        const formattedData = formatProgressReport(reportSelected);

        // additional fields
        formattedData.last_name = sponsored_member.last_name || '';
        formattedData.first_name = sponsored_member.first_name || '';
        formattedData.middle_name = sponsored_member.middle_name || '';
        formattedData.sm_number = sponsored_member.sm_number || '';
        formattedData.spu = sponsored_member.spu || '';
        formattedData.dob = formatDate(sponsored_member.dob) || '';
        formattedData.age = calculateAge(sponsored_member.dob) || '0';

        //console.log('FORMATTED PROGRESS REPORT: ', formattedData);
        return res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error generating progress report:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    generateProgressReport
}