// export const createAccount = async (req, res) => {
//     try {
//         const response = await fetch('/api/create-account', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(req.body),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             return res.status(response.status).json({ message: errorData.message });
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error creating account:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// fetch-connections/create-account-connection.js

export const createAccount = async (payload) => {
  try {
    const response = await fetch('/api/create-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Error creating account:", error);
    return { ok: false, data: { message: "Network error" } };
  }
};
