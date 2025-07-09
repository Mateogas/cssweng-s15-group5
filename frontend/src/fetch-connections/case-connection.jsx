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
     if (!response.ok) throw new Error('Failed to fetch case data');

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
          sdw_id: rawData.assigned_sdw?._id || rawData.assigned_sdw || '', 
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
export const updateCoreCaseData = async(updatedData, caseID) => {
     try {
          const targetID = caseID || localID;
          const preparedData = {
               sm_number: Number(updatedData.sm_number),
               last_name: updatedData.last_name,
               first_name: updatedData.first_name,
               middle_name: updatedData.middle_name || '',
               spu: updatedData.spu_id,
               assigned_sdw: updatedData.sdw_id,
               is_active: updatedData.is_active ?? true,
               classifications: updatedData.classifications
          };          
               
          if (typeof preparedData.sdw_id === 'number' || preparedData.sdw_id) {
               preparedData.assigned_sdw = preparedData.sdw_id; // Always use a valid ObjectId
               delete preparedData.sdw_id;
          }
 
          if (preparedData.spu_id) {
               preparedData.spu = preparedData.spu_id;
               delete preparedData.spu_id;
          }          

          if (preparedData.sm_number === undefined || preparedData.sm_number === null || preparedData.sm_number === '') {
          throw new Error('sm_number must be a numeric value.');
          }

          if (typeof preparedData.sm_number === 'string') {
          preparedData.sm_number = preparedData.sm_number.trim();
          if (preparedData.sm_number === '') {
               throw new Error('sm_number must be a numeric value.');
          }
          preparedData.sm_number = Number(preparedData.sm_number);
          }

          if (
          typeof preparedData.sm_number !== 'number' ||
          !Number.isInteger(preparedData.sm_number) ||
          isNaN(preparedData.sm_number)
          ) {
          throw new Error('sm_number must be a whole numeric value.');
          }
          
         

          if (!preparedData.middle_name) {
               preparedData.middle_name = ''; 
          }
          
  
          if (preparedData.is_active === undefined) {
               preparedData.is_active = true;
          }
          

          // if (preparedData.classifications) {
          //      delete preparedData.classifications;
          // }

          console.log("Sending data:", preparedData);

          const response = await fetch(`/api/cases/edit/core/${targetID}`, {
               method: 'PUT',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(preparedData),
          });

          if (!response.ok) {
               const errorData = await response.json();
               console.error("Validation errors:", errorData);
               throw new Error(`Failed to update case: ${errorData.message}`);
          }

          return await response.json();
     } catch (error) {
          console.error('Error updating case:', error);
          throw error;
     }
};
/**
 *   Edits chosen data
 * 
 *   @returns updated case data
 */
export const updateIdentifyingCaseData = async(updatedData, caseID) => {
     try {
          const targetID = caseID || localID;
          const preparedData = { ...updatedData };
          //console.log("Sending data:", preparedData);

          const response = await fetch(`/api/cases/edit/identifyingdata/${targetID}`, {
               method: 'PUT',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(preparedData),
          });

          if (!response.ok) {
               const errorData = await response.json();
               console.error("Validation errors:", errorData);
               throw new Error(`Failed to update case: ${errorData.message}`);
          }

          return await response.json();
     } catch (error) {
          console.error('Error updating case:', error);
          throw error;
     }
};
export const fetchSDWs = async () => {
    try {
        const response = await fetch('/api/cases/getsdw');
        if (!response.ok) throw new Error('Failed to fetch SDWs');
        const data = await response.json();
        // Map to expected format
        return data.map(sdw => ({
            id: sdw._id,
            username: `${sdw.first_name} ${sdw.last_name}`,
            spu_id: sdw.spu_id || '', // Adjust as needed
        }));
    } catch (err) {
        console.error('Error fetching SDWs:', err);
        return [];
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


/**
 * Fetches all sponsored member cases.
 * @returns {Promise<Array<{id: string, name: string, ch_number: string, assigned_sdw_name: string|null}>>}
 *   Returns an array of objects with:
 *     - id: string (case ObjectId)
 *     - name: string (full name of the sponsored member)
 *     - ch_number: string (case number)
 *     - assigned_sdw_name: string|null (full name of assigned SDW, or null if none)
 */
export const fetchAllCases = async () => {
    try {
        const response = await fetch('/api/cases');
        if (!response.ok) throw new Error('API error');
        return await response.json();
    } catch (err) {
        console.error('Error fetching all cases:', err);
        return [];
    }
};

