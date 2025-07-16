const mongoose = require('mongoose')
const Sponsored_Member = require('../model/sponsored_member')
const Family_Relationship = require('../model/family_relationship')
const Family_Member = require('../model/family_member')
const Intervention_Correspondence = require('../model/intervention_correspondence')
const Intervention_Counseling = require('../model/intervention_counseling')
const Intervention_Financial_Assessment = require('../model/intervention_financial')
const Intervention_Home_Visit = require('../model/intervention_homevisit')
const Progress_Report = require('../model/progress_report')

function calculateAge(dateValue) {
    const birthday = new Date(dateValue);
    const today = new Date();

    let age = today.getFullYear() - birthday.getFullYear();

    const birthdayDone =
        today.getMonth() > birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() &&
            today.getDate() >= birthday.getDate());

    if (!birthdayDone) {
        age--;
    }

    return age;
}

const generateCaseData = async (req, res) => {
    try {
		const sponsoredMemberId = req.params.id;
		// Validate the sponsored member ID
		if (!mongoose.Types.ObjectId.isValid(sponsoredMemberId)) {
			throw new Error("Invalid sponsored member ID");
		}

		// Fetch the sponsored member data
		const sponsoredMember = await Sponsored_Member.findById(
			sponsoredMemberId
		);
		if (!sponsoredMember) {
			throw new Error("Sponsored member not found");
		}

		// Match family IDs and relationship to client
		const relationships = await Family_Relationship.find({
			sponsor_id: sponsoredMemberId,
		});
		const familyData = relationships.map((rel) => ({
			id: rel.family_id._id.toString(),
			relationship_to_sm: rel.relationship_to_sm,
		}));
		const familyMembers = await Family_Member.find({
			_id: { $in: familyData.map((fam) => fam.id) },
		});
		const FamilyRelationshipMap = familyMembers.map((member) => {
			const rel = familyData.find(
				(fam) => fam.id === member._id.toString()
			);
			return {
				...member.toObject(),
				relationship_to_sm: rel.relationship_to_sm,
			};
		});

		// Format family members data
		const formattedFamilyMembers = FamilyRelationshipMap.map((member) => ({
			first_name: member.first_name || "",
			middle_name: member.middle_name || "",
			last_name: member.last_name || "",
			age: member.age || "",
			income: member.income || "",
			civil_status: member.civil_status || "",
			occupation: member.occupation || "",
			edu_attainment: member.edu_attainment || "",
			relationship_to_sm: member.relationship_to_sm || "",
		}));

		
        // Fetch intervention data
        // Fetch progress reports

		// Format data for the document
		const caseData = {
			last_name: sponsoredMember.last_name,
			first_name: sponsoredMember.first_name,
			middle_name: sponsoredMember.middle_name,
			sex: sponsoredMember.sex,
			present_address: sponsoredMember.present_address,
			dob: sponsoredMember.dob,
			pob: sponsoredMember.pob,
			age: calculateAge(sponsoredMember.dob),
			civil_status: sponsoredMember.civil_status,
			edu_attainment: sponsoredMember.edu_attainment,
			religion: sponsoredMember.religion,
			occupation: sponsoredMember.occupation,
			contact_no: sponsoredMember.contact_no,
			relationship_to_client: sponsoredMember.relationship_to_client,
			family_members: formattedFamilyMembers,
			problem_presented: sponsoredMember.problem_presented,
			history_problem: sponsoredMember.history_problem,
			observation_findings: sponsoredMember.observation_findings,
			assessment: sponsoredMember.assessment,
			// interventions: {

			// },
			// progress reports: {

			// },
			evaluation: sponsoredMember.evaluation,
			recommendation: sponsoredMember.recommendation,
		};

		return caseData;
	} catch (error) {
        console.error('Error generating case data:', error)
        throw error
    }
}

module.exports = {
    generateCaseData
}