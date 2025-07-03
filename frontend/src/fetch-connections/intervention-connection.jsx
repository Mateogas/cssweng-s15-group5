// ========== COUNSELING INTERVENTION CONNECTION ==========
export const fetchCounselingInformation = async (caseID) => {
    try {
        const response = await fetch(`/api/intervention/counseling/${caseID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch counseling information");
        }

        const sm_data = await response.json();

        const counselingData = {
            first_name: sm_data.first_name || "",
            middle_name: sm_data.middle_name || "",
            last_name: sm_data.last_name || "",
            ch_number: sm_data.sm_number || "",
            address: sm_data.present_address || "",
            subproject: sm_data.spu || "",
        };

        return counselingData;
    } catch (error) {
        console.error("Error fetching counseling information:", error);
        throw error;
    }
};

export const addCounselingIntervention = async (data, caseID) => {
    try {
        const response = await fetch(`/api/intervention/counseling/add/${caseID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to add counseling intervention");
        }

        const result = await response.json();        
        return result;
    } catch (error) {
        console.error("Error adding counseling intervention:", error);
        throw error;
    }
};

export const deleteCounselingIntervention = async (interventionID) => {
    try {
        const response = await fetch(`/api/intervention/counseling/delete/${interventionID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete counseling intervention");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error deleting counseling intervention:", error);
        throw error;
    }
}