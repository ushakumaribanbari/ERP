const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        console.log("Connecting to MongoDB...");

        const conn = await mongoose.connect(
            process.env.MONGO_URI,
            {
                serverSelectionTimeoutMS: 5000
            }
        );


        console.log(
            `✅ MongoDB Connected: ${conn.connection.host}`
        );


    } catch(error){

        console.error(
            "❌ MongoDB Error:",
            error.message
        );

    }

};


module.exports = connectDB;