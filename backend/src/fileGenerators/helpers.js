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

}

/* Return format:
{
	grade_year_level: String,
	school: String,
	address: String,
	counseling_date: Date,
	area_self_help: String,
	reason_for_counseling: String,
	corrective_action: String,
	recommendation: String,
	sm_comments: String,
}
*/
function formatCounselingData(counseling) {

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
		name: String,
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

}

module.exports = {
    calculateAge,
    formatCorrespondenceData,
    formatCounselingData,
    formatFinancialData,
    formatHomeVisitData,
};