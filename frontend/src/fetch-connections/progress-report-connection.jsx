export const fetchProgressReport = async (reportID) => {
    try {
        const response = await fetch(`/api/progress-report/${reportID}`);

        if (!response.ok) {
            throw new Error("Failed to fetch progress report");
        }

        const report = await response.json();
        return report;
    } catch (error) {
        console.error("Error fetching progress report:", error);
        throw error;
    }
}

export const fetchCaseData = async (caseID) => {
    try {
        const response = await fetch(`/api/progress-report/add/${caseID}`);

        if (!response.ok) {
            throw new Error("Failed to fetch case data");
        }

        const caseData = await response.json();
        return caseData;
    } catch (error) {
        console.error("Error fetching case data:", error);
        throw error;
    }
}

export const addProgressReport = async (data, interventionID) => {
    try {
        const response = await fetch(`/api/progress-report/add/${interventionID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to add progress report");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error adding progress report:", error);
        throw error;
    }
}

export const deleteProgressReport = async (reportID) => {
    try {
        const response = await fetch(`/api/progress-report/delete/${reportID}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete progress report");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error deleting progress report:", error);
        throw error;
    }
}

export const editProgressReport = async (reportID, data) => {
    try {
        const response = await fetch(`/api/progress-report/edit/${reportID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to edit progress report");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error editing progress report:", error);
        throw error;
    }
}