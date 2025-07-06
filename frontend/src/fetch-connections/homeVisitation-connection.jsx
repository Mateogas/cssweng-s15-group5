var localID;

export const fetchCaseData = async(caseID) => {
     try {
          const response = await fetch(`/api/intervention/home-visit-form/${caseID}`);
          
          if (!response.ok) 
               throw new Error('API error');

          const rawData = await response.json();
          localID = rawData.case._id

          return rawData
     } catch (err) {
          console.error('Error fetching case data:', err);
          return defaultCaseData;
     }
};

export const createHomeVis = async(createdData) => {
     try {
          const response = await fetch(`/api/intervention/create/home-visit-form/${localID}`, {
               method: 'PUT',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify(createdData),
          });
          
          if (!response.ok) 
               throw new Error('API error');

          const newHomeVis = await response.json();
          console.log(newHomeVis)
     } catch (err) {
          console.error('Error creating form:', err);
          return null;
     }
};