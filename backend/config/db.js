const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4,
        });
        console.log("MongoDB connected ✅");
    } catch (error) {
        console.error("MongoDB error:", error.message);
    }
};

module.exports = connectDB;