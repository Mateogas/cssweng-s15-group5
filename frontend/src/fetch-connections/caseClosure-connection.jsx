var localID;

/**
 *   Fetches the case data
 *   @param {*} caseID Case selected
 *   @returns Sponsored member object
 */
export const fetchCaseData = async(caseID) => {
     try {
          const response = await fetch(`/api/case-closure/${caseID}`);
          
          if (!response.ok) 
               throw new Error('API error');

          const rawData = await response.json();
          localID = rawData._id

          if (rawData.dob) {
               const dobDate = new Date(rawData.dob);
               const yyyy = dobDate.getFullYear();
               const mm = String(dobDate.getMonth() + 1).padStart(2, '0');
               const dd = String(dobDate.getDate()).padStart(2, '0');
               rawData.dob = `${yyyy}-${mm}-${dd}`;
          }
          return rawData
     } catch (err) {
          console.error('Error fetching case data:', err);
          return null;
     }
};

export const createCaseClosureForm = async(createdData) => {
     try {
          const response = await fetch(`/api/create/case-closure/${localID}`, {
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