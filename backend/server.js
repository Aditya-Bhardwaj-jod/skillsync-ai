const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const analysisRoutes = require("./routes/analysisRoutes");
app.use("/api", analysisRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("SkillSync AI Backend chal raha hai 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});