const mongoose = require('mongoose')
const Sponsored_Member = require('../model/sponsored_member')
const Intervention_Home_Visit = require('../model/intervention_homevisit')

const {
	calculateAge,
	formatDate,
    formatHomeVisitData
} = require('./helpers')

const generateHomeVisitForm = async (req, res) => {
    try {
        const formSelected = await Intervention_Home_Visit.findById(req.params.homeVisitId);
        if (!formSelected)
            return res.status(404).json({message: "Invalid form ID."})

        const sponsored_member = await Sponsored_Member.findOne({ 'interventions.intervention': formSelected._id });
        if (!sponsored_member)
            return res.status(404).json({ message: "Sponsored member not found." });

        const formattedData = formatHomeVisitData(formSelected);

        // additional fields
        formattedData.last_name = sponsored_member.last_name || '';
        formattedData.first_name = sponsored_member.first_name || '';
        formattedData.middle_name = sponsored_member.middle_name || '';
        formattedData.sm_number = sponsored_member.sm_number || '';

        //console.log('FORMATTED HOME VISIT FORM: ', formattedData);
        return res.status(200).json(formattedData)
    } catch (error) {
        console.error("Error generating home visitation form:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    generateHomeVisitForm,
}