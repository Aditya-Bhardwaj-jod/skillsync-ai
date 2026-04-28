const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            family: 4,
            tls: true,
            tlsAllowInvalidCertificates: true,
            directConnection: false,
        });
        console.log("MongoDB connected ✅");
    } catch (error) {
        console.error("MongoDB error:", error.message);
    }
};

module.exports = connectDB;