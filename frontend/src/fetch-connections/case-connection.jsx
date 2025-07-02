// ======== Local Variables ======== // 
// Default Case
const defaultCaseData = {
     first_name: '',
     middle_name: '',
     last_name: '',

     dob: '',
     pob: '',
     sex: '',
     religion: '',

     civil_status: '',
     edu_attainment: '',
     occupation: '',
     present_address: '',
     contact_no: '',

     relationship_to_client: '',

     sm_number: '',
     sub_id: '0',
     sdw_id: '1',
     spu_id: 'MNL',
};
// Saved ID locally so no need to pass evertyime
var localID

// ======== API calls ======== // 
/**
 *   Fetches case data
 * 
 *   @param {*} caseID Case ID to fetch
 *   @returns Case data object 
 */
export const fetchCaseData = async(caseID) => {
     try {
     const response = await fetch(`/api/cases/${caseID}`);
     if (!response.ok) throw new Error('API error');

     const rawData = await response.json();
     localID = rawData._id

     // Format DoB
     const formattedDob = rawData.dob
            ? new Date(rawData.dob).toISOString().split('T')[0]
            : '';

     return {
          ...defaultCaseData,
          ...rawData,
          dob: formattedDob,
     };
     } catch (err) {
          console.error('Error fetching case data:', err);
          return defaultCaseData;
     }
};
/**
 *   Edits chosen data
 * 
 *   @returns updated case data
 */
export const updateCaseData = async(updatedData) => {
     try {
          const response = await fetch(`/api/cases/edit/${localID}`, {
               method: 'PUT',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify(updatedData),
          });

          if (!response.ok) {
               throw new Error('Failed to update case');
          }

          const updated = await response.json(); 
          return updated
     } catch (error) {
          console.error('Error updating case:', error);
          throw error;
     }
};

/**
 *   Fetches all family members
 * 
 *   @returns All family members object
 */
export const fetchFamilyMembers = async() => {
     try {
          const response = await fetch(`/api/cases/get-family-compositon/${localID}`)

          if (!response.ok) {
               throw new Error(`API error: ${response.status}`)
          }

          const familyMembers = await response.json()
          return familyMembers
     } catch (err) {
          console.error('Error fetching family members:', err)
     }
}

/**
 *   Edits a chosen family member
 * 
 *   @param {*} famID Object ID of the chosen family member
 *   @param {*} updatedData Object containing the updated data
 * 
 *   @returns The updated Family Member object 
 */
export const updateFamilyMember = async(famID, updatedData) => {
     try {
          const response = await fetch(`/api/cases/edit-family-composition/${localID}/${famID}`, {
               method: 'PUT',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify(updatedData),
          });

          if (!response.ok) {
               throw new Error('Failed to update family member');
          }

          const updated =  await response.json(); 
          return updated
     } catch (error) {
          console.error('Error updating family member:', error);
          throw error;
     }
};

/**
 *   Adds a family member
 * 
 *   @param {*} updatedData Object containing the updated data
 *   @returns New Family Member object 
 */
export const addFamilyMember = async(updatedData) => {
     try {
          const response = await fetch(`/api/cases/add-family-member/${localID}`, {
               method: 'PUT',
               headers: {
               'Content-Type': 'application/json',
               }, 
               body: JSON.stringify(updatedData),
          });

          if (!response.ok) {
               throw new Error('Failed to update family member');
          }

          return await response.json(); 
     } catch (error) {
          if (errorMsg == "Empty field found.")
               return errorMsg

          console.error('Error adding family member:', error);
          throw error;
     }
}

/**
 *   Deletes a chosen family member
 * 
 *   @param {*} famID Object ID of the family member
 *   @returns The updated list of family members 
 */
export const deleteFamilyMember = async(famID) => {
     try {
          const response = await fetch(`/api/cases/delete-family-member/${localID}/${famID}`, {
               method: 'PUT',
               headers: {
               'Content-Type': 'application/json',
               },
          });

          if (!response.ok) {
               throw new Error('Failed to delete family member');
          }

          return await response.json(); 
     } catch (error) {
          console.error('Error deleting family member:', error);
          throw error;
     }
}

/**
 *   Edits all fields under problems and findings
 * 
 *   @param {*} caseID Case to edit
 *   @param {*} updatedData Object containing updated fields
 * 
 *   @returns Updated fields
 */
export const editProblemsFindings = async(caseID, updatedData) => {
     try {
          const response = await fetch(`/api/cases/update-problems-findings/${caseID}`, {
               method: 'PUT',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify(updatedData),
          });

          if (!response.ok) {
               throw new Error('Failed to update problems and findings');
          }

          const updated = await response.json(); 
          const returnData = {
               problemPresented: updated.case.problem_presented,
               historyProblem: updated.case.history_problem,
               observationFindings: updated.case.observation_findings
          }
          return returnData
     } catch (error) {
          console.error('Error updating problems and findings:', error);
          throw error;
     }
}

/**
 *   Edits assessment
 * 
 *   @param {*} caseID Case to edit
 *   @param {*} updatedData Object containing updated fields
 * 
 *   @returns Updated fields
 */
export const editAssessment = async(caseID, updatedData) => {
     try {
          const response = await fetch(`/api/cases/update-assessment/${caseID}`, {
               method: 'PUT',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify(updatedData),
          });

          if (!response.ok) {
               throw new Error('Failed to update problems and findings');
          }

          const updated = await response.json(); 
          const returnData = {
               caseAssessment: updated.case.assessment,
          }
          return returnData
     } catch (error) {
          console.error('Error updating problems and findings:', error);
          throw error;
     }
}

/**
 *   Edits assessment
 * 
 *   @param {*} caseID Case to edit
 *   @param {*} updatedData Object containing updated fields
 * 
 *   @returns Updated fields
 */
export const editEvalReco = async(caseID, updatedData) => {
     try {
          const response = await fetch(`/api/cases/update-evaluation-recommendation/${caseID}`, {
               method: 'PUT',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify(updatedData),
          });

          if (!response.ok) {
               throw new Error('Failed to update problems and findings');
          }

          const updated = await response.json(); 
          const returnData = {
               caseEvalutation: updated.case.evaluation,
               caseRecommendation: updated.case.recommendation
          }
          return returnData
     } catch (error) {
          console.error('Error updating problems and findings:', error);
          throw error;
     }
}