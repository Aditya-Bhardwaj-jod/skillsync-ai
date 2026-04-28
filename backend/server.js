const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SkillSync AI Backend chal raha hai 🚀");
});

try {
    const analysisRoutes = require("./routes/analysisRoutes");
    app.use("/api", analysisRoutes);
} catch (err) {
    console.error("Routes error:", err.message);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});