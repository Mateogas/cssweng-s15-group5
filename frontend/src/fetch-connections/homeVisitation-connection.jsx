export const fetchCaseData = async (caseID) => {
    try {
        const response = await fetch(
            `/api/intervention/home-visit-form/${caseID}`,
        );

        if (!response.ok) throw new Error("API error");

        const rawData = await response.json();
        // localID = rawData.case._id

        return rawData;
    } catch (err) {
        console.error("Error fetching case data:", err);
        return defaultCaseData;
    }
};

export const fetchFormData = async (caseID, formID) => {
    try {
        const response = await fetch(
            `/api/intervention/home-visit-form/${caseID}/${formID}`,
        );

        if (!response.ok) throw new Error("API error");

        const rawData = await response.json();
        // rawData.dob = new Date(rawData.dob).toISOString().split("T")[0];
        // localID = rawData.case._id

        return rawData;
    } catch (err) {
        console.error("Error fetching form data:", err);
        return null;
    }
};

export const fetchAllHomeVisitForms = async (caseID) => {
    try {
        const response = await fetch(`/api/intervention/home-visit-form/all/${caseID}`);

        if (!response.ok) {
            throw new Error("Failed to fetch home visit interventions");
        }

        const interventions = await response.json();
        return interventions;
    } catch (error) {
        console.error("Error fetching home visit interventions:", error);
        throw error;
    }
}

export const createHomeVis = async (createdData, caseID) => {
    try {
        const response = await fetch(
            `/api/intervention/create/home-visit-form/${caseID}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(createdData),
            },
        );

        if (!response.ok) throw new Error("API error");

        const newHomeVis = await response.json();
        console.log(newHomeVis);
    } catch (err) {
        console.error("Error creating form:", err);
        return null;
    }
};

export const editHomeVis = async (updatedData, caseID, formID) => {
    try {
        const response = await fetch(
            `/api/intervention/edit/home-visit-form/${caseID}/${formID}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            },
        );

        if (!response.ok) throw new Error("API error");

        const editedHomeVis = await response.json();
        console.log(editedHomeVis);
    } catch (err) {
        console.error("Error editing form:", err);
        return null;
    }
};

export const deleteHomeVis = async (formID) => {
    try {
        const response = await fetch(`/api/intervention/delete/home-visit-form/${formID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete home visit intervention");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error deleting home visit intervention:", error);
        throw error;
    }
}
