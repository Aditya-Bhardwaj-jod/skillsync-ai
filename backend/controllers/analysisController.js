const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk");
const ResumeAnalysis = require("../models/ResumeAnalysis");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const uploadResume = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded!" });
        }
        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text;
        res.status(200).json({ resumeText });
    } catch (error) {
        console.error("PDF Parse error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

const analyzeResume = async(req, res) => {
    try {
        const { resumeText, jobRole } = req.body;

        const prompt = `Analyze the following resume and compare it with the job role: ${jobRole}\n\nResume:\n${resumeText}\n\nReturn ONLY a valid JSON object, no markdown, no backticks, no extra text:\n{\n  "match_score": "75%",\n  "skills_found": ["skill1", "skill2"],\n  "missing_skills": ["skill1", "skill2"],\n  "suggestions": ["suggestion1", "suggestion2"]\n}`;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{
                    role: "system",
                    content: "You are a resume analyzer. Always respond with valid JSON only. No markdown, no backticks, no explanation.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const aiResponse = response.choices[0].message.content.trim();
        const cleanResponse = aiResponse.replace(/```json|```/g, "").trim();
        const result = JSON.parse(cleanResponse);

        // Save to MongoDB
        const analysis = new ResumeAnalysis({
            resumeText,
            jobRole,
            matchScore: result.match_score,
            skillsFound: result.skills_found,
            missingSkills: result.missing_skills,
            suggestions: result.suggestions,
        });
        await analysis.save();
        console.log("Analysis saved to MongoDB ✅");

        res.status(200).json(result);
    } catch (error) {
        console.error("Analysis error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadResume, analyzeResume };