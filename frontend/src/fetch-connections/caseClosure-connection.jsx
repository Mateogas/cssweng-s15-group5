/**
 *   Fetches the case data
 *   @param {*} caseID Case selected
 *   @returns Sponsored member object
 */
const apiUrl = import.meta.env.VITE_API_URL || '/api';
export const fetchCaseData = async(caseID) => {
     try {
          const response = await fetch(`${apiUrl}/case-closure/${caseID}`,{
            method: 'GET',
            credentials: 'include',
        });
          
          if (!response.ok) 
               throw new Error('API error');

          const rawData = await response.json();
          // localID = rawData._id

          /*if (rawData.dob) {
               const dobDate = new Date(rawData.dob);
               const yyyy = dobDate.getFullYear();
               const mm = String(dobDate.getMonth() + 1).padStart(2, '0');
               const dd = String(dobDate.getDate()).padStart(2, '0');
               rawData.dob = `${yyyy}-${mm}-${dd}`;
          }*/
          return rawData
     } catch (err) {
          console.error('Error fetching case data:', err);
          return null;
     }
};

export const fetchCaseClosureData = async (caseId, formId) => {
    try {
        const response = await fetch(`${apiUrl}/case-closure/${caseId}/${formId}`,{
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) throw new Error('API error');
        return await response.json();
    } catch (error) {
        console.error('Error fetching financial intervention data:', error);
        return null;
    }
};

export const createCaseClosureForm = async(createdData, caseID) => {
     try {
          const response = await fetch(`${apiUrl}/create/case-closure/${caseID}`, {
               method: 'PUT',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify(createdData),
          });
          
          if (!response.ok) 
               throw new Error('API error');

          const newCaseClose = await response.json();
          console.log(newCaseClose)
     } catch (err) {
          console.error('Error creating form:', err);
          return null;
     }
};