const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadResume, analyzeResume } = require("../controllers/analysisController");

router.post("/upload-resume", upload.single("resume"), uploadResume);
router.post("/analyze", analyzeResume);

module.exports = router;