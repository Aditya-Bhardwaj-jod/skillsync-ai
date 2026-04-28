import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const uploadResume = async(file) => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await axios.post(`${BASE_URL}/upload-resume`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const analyzeResume = async(resumeText, jobRole) => {
    const response = await axios.post(`${BASE_URL}/analyze`, {
        resumeText,
        jobRole,
    });

    return response.data;
};