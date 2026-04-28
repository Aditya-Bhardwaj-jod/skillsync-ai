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

const uploadRouter = express.Router();
const analyzeRouter = express.Router();

const multer = require("multer");
const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk");
const ResumeAnalysis = require("./models/ResumeAnalysis");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

uploadRouter.post("/", upload.single("resume"), async(req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded!" });
        const pdfData = await pdfParse(req.file.buffer);
        res.status(200).json({ resumeText: pdfData.text });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

analyzeRouter.post("/", async(req, res) => {
    try {
        const { resumeText, jobRole } = req.body;
        const prompt = `Analyze the following resume and compare it with the job role: ${jobRole}\n\nResume:\n${resumeText}\n\nReturn ONLY a valid JSON object:\n{"match_score": "75%","skills_found": [],"missing_skills": [],"suggestions": []}`;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are a resume analyzer. Always respond with valid JSON only. No markdown, no backticks." },
                { role: "user", content: prompt }
            ],
        });

        const aiResponse = response.choices[0].message.content.trim();
        const cleanResponse = aiResponse.replace(/```json|```/g, "").trim();
        const result = JSON.parse(cleanResponse);

        const analysis = new ResumeAnalysis({
            resumeText,
            jobRole,
            matchScore: result.match_score,
            skillsFound: result.skills_found,
            missingSkills: result.missing_skills,
            suggestions: result.suggestions,
        });
        await analysis.save();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.use("/api/upload-resume", uploadRouter);
app.use("/api/analyze", analyzeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});