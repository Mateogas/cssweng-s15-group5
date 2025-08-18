//Last edited 18/08/2025
// Modules
const mongoose = require('mongoose');
const app = require('./app')
const dotenv = require('dotenv');

dotenv.config();
const PORT =  process.env.PORT

// Connecting to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { })
  .then(() => {
    //console.log('MongoDB connected')

    //Starts the Server when mongodb is connected
    app.listen(PORT, () => {
       //console.log(`Server running on http://localhost:${PORT}`);
    });

  })
  .catch((err) => console.error('MongoDB connection error:', err));