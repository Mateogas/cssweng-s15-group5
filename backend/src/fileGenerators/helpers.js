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

function formatDate(date) {
	if (!date) return '';
	return new Date(date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

/* Return format:
{
	name_of_sponsor: String,
	date_of_sponsorship: Date,
	identified_problem: String,
	assesment: String,
	objective: String,
	recommendation: String,
}
*/
function formatCorrespondenceData(correspondence) {
	if (!correspondence) return {};
    // console.log('formatCorrespondenceData', correspondence);
    return {
		name_of_sponsor: correspondence.name_of_sponsor || '',
		date_of_sponsorship: formatDate(correspondence.date_of_sponsorship) || '',
		identified_problem: correspondence.identified_problem || '',
		assesment: correspondence.assesment || '',
		objective: correspondence.objective || '',
		recommendation: correspondence.recommendation || '',
	}
}

/* Return format:
{
	grade_year_level: String,
	school: String,
	counseling_date: Date,
	area_self_help: String,
	reason_for_counseling: String,
	corrective_action: String,
	recommendation: String,
	sm_comments: String,
}
*/
function formatCounselingData(counseling) {
	if (!counseling) return {};
    // console.log('formatCounselingData', counseling);
    return {
		grade_year_level: counseling.grade_year_level || '',
		school: counseling.school || '',
		counseling_date: formatDate(counseling.counseling_date) || '',
		area_self_help: counseling.area_self_help || '',
		reason_for_counseling: counseling.reason_for_counseling || '',
		corrective_action: counseling.corrective_action || '',
		recommendation: counseling.recommendation || '',
		sm_comments: counseling.sm_comments || '',
	}
}

/* Return format:
{
	type_of_assistance: {
		// a1 to a8 is either '✓' or ''
		a1: String,
		a2: String,
		a3: String,
		a4: String,
		a5: String,
		a6: String,
		a7: String,
		a8: String,
		other: String,
	},
	problem_presented: String,
	recommendation: String,
}
*/
function formatFinancialData(financial) {
    if (!financial) return {};
	// console.log('formatFinancialData', financial);
	const type_of_assistance = financial.type_of_assistance;
	let formatted_type_of_assistance = {
			a1: '',
			a2: '',
			a3: '',
			a4: '',
			a5: '',
			a6: '',
			a7: '',
			a8: '',
			other: '',
		};
	if (type_of_assistance) {
		formatted_type_of_assistance = {
			a1: type_of_assistance.includes('Funeral Assistance to the Family Member') ? '✓' : '',
			a2: type_of_assistance.includes('Funeral Assistance to the Sponsored Member') ? '✓' : '',
			a3: type_of_assistance.includes('Medical Assistance to the Family Member') ? '✓' : '',
			a4: type_of_assistance.includes('Medical Assistance to the Sponsored Member') ? '✓' : '',
			a5: type_of_assistance.includes('Food Assistance') ? '✓' : '',
			a6: type_of_assistance.includes('Home Improvement/Needs') ? '✓' : '',
			a7: type_of_assistance.includes('IGP Capital') ? '✓' : '',
			a8: type_of_assistance.includes('Other: Please Indicate Below') ? '✓' : '',
			other: financial.other_assistance_detail || '',
		}
	}
    return {
		type_of_assistance: formatted_type_of_assistance,
		problem_presented: financial.problem_presented || '',
		recommendation: financial.recommendation || '',
	}
}

/* Return format:
{
	grade_year_course: String,
	years_in_program: String,
	family_type: String,
	father: {
		name: String,
		occupation: String,
		income: String,
	},
	mother: {
		name: String,
		occupation: String,
		income: String,
	},
	otherFamily: {
		last_name: String,
		first_name: String,
		middle_name: String,
		age: String,
		civil_status: String,
		relationship_to_sm: String,
		occupation: String,
		edu_attainment: String,
		income: String,
	},
	sm_progress: String,
	family_progress: String,
	observation_findings: String,
	interventions: String,
	recommendations: String,
	agreement: String,
}
*/
function formatHomeVisitData(homevisit) {
    if (!homevisit) return {};
	// console.log('formatHomeVisitData', homevisit);

	const formattedFather = homevisit.father ? {
		name: homevisit.father.father_details.last_name + ', ' + homevisit.father.father_details.first_name || '',
		occupation: homevisit.father.father_details.occupation || '',
		income: homevisit.father.father_details.income || '',
	} : {
		name: '',
		occupation: '',
		income: '',
	};

	const formattedMother = homevisit.mother ? {
		name: homevisit.mother.mother_details.last_name + ', ' + homevisit.mother.mother_details.first_name || '',
		occupation: homevisit.mother.mother_details.occupation || '',
		income: homevisit.mother.mother_details.income || '',
	} : {
		name: '',
		occupation: '',
		income: '',
	};

	const formattedOtherFamilyMembers = homevisit.familyMembers.map(member => {
		const familyMemberDetails = member.family_member_details;
		return {
			last_name: familyMemberDetails.last_name || '',
			first_name: familyMemberDetails.first_name || '',
			middle_name: familyMemberDetails.middle_name || '',
			age: familyMemberDetails.age || '',
			civil_status: familyMemberDetails.civil_status || '',
			relationship_to_sm: member.relationship_to_sm || '',
			occupation: familyMemberDetails.occupation || '',
			edu_attainment: familyMemberDetails.edu_attainment || '',
			income: familyMemberDetails.income || '',
		};
	});

	// console.log('Formatted Father:', formattedFather);
	// console.log('Formatted Mother:', formattedMother);
	// console.log('OTHER FAMILY:', formattedOtherFamilyMembers);

    return {
		grade_year_course: homevisit.grade_year_course || '',
		years_in_program: homevisit.years_in_program || '',
		family_type: homevisit.family_type || '',
		father: formattedFather,
		mother: formattedMother,
		otherFamily: formattedOtherFamilyMembers,
		sm_progress: homevisit.sm_progress || '',
		family_progress: homevisit.family_progress || '',
		observation_findings: homevisit.observation_findings || '',
		interventions: homevisit.interventions || '',
		recommendations: homevisit.recommendations || '',
		agreement: homevisit.agreement || '',
	}
}

/*
{
    report_num: Number,
    sponsor_name: String,
    sponsorship_date: Date,
    date_accomplished: Date,
    period_covered: String,
    sm_update: String,
    family_update: String,
    services_to_family: String,
    participation: String,
    relation_to_sponsor: {
        // Can only be 'Yes', 'Sometimes', or 'No'
        know_sponsor_name: String,
        cooperative: String,
        personalized_letter: String,
    }
}
*/
function formatProgressReport(report) {
    console.log('formatProgressReport', report);
    return report
}

module.exports = {
    calculateAge,
    formatCorrespondenceData,
    formatCounselingData,
    formatFinancialData,
    formatHomeVisitData,
    formatProgressReport,
};