export const createAccount = async (req, res) => {
    try {
        const response = await fetch('/api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ message: errorData.message });
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}