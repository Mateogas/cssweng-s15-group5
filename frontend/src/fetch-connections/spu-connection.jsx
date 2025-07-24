// Fetch all SPUs
export const fetchAllSpus = async () => {
    try {
        const response = await fetch('/api/spu/getAllSpu');
        if (!response.ok) throw new Error("Failed to fetch SPUs");
        return await response.json();
    } catch (error) {
        console.error("Error fetching SPUs:", error);
        return [];
    }
};

// Create a new SPU
export const createSpu = async (spu_name) => {
    try {
        const response = await fetch('/api/spu/addSpu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spu_name }),
        });
        if (!response.ok) throw new Error("Failed to create SPU");
        return await response.json();
    } catch (error) {
        console.error("Error creating SPU:", error);
        return null;
    }
};

// Delete an SPU by ID
export const deleteSpu = async (spuId) => {
    try {
        const response = await fetch(`/api/spu/deleteSpu/${spuId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error("Failed to delete SPU");
        return await response.json();
    } catch (error) {
        console.error("Error deleting SPU:", error);
        return null;
    }
};