// Modules
const mongoose = require('mongoose');
const app = require('./app')
const dotenv = require('dotenv');

dotenv.config();


const PORT =  process.env.PORT

//Connecting to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || ''; // here put if you have local db

mongoose
  .connect(MONGODB_URI, { })
  .then(() => {
    console.log('MongoDB connected')

    //Starts the Server when mongodb is connected
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      
      console.log('FRONTEND APP: Click here to open → http://localhost:5174/\n');
    });

  })
  .catch((err) => console.error('MongoDB connection error:', err));

