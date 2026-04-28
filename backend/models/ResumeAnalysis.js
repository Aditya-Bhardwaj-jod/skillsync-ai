const mongoose = require("mongoose");

const ResumeAnalysisSchema = new mongoose.Schema({
    resumeText: {
        type: String,
        required: true,
    },
    jobRole: {
        type: String,
        required: true,
    },
    matchScore: {
        type: String,
    },
    skillsFound: {
        type: [String],
    },
    missingSkills: {
        type: [String],
    },
    suggestions: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ResumeAnalysis", ResumeAnalysisSchema);