// config/db.js
// Connects to MongoDB using Mongoose.
// Call connectDB() once in server entry point.

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error(`⚠️ Keeping server process alive for debugging. API requests will report DB issues instead of refusing connection.`);
  }
};

module.exports = connectDB;
