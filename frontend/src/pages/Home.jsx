import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume, analyzeResume } from "../services/api";
import Loader from "../components/Loader";

const Home = () => {
    const [file, setFile] = useState(null);
    const [jobRole, setJobRole] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async() => {
        if (!file || !jobRole) {
            alert("Please upload a resume and enter a job role!");
            return;
        }
        try {
            setLoading(true);
            const { resumeText } = await uploadResume(file);
            const result = await analyzeResume(resumeText, jobRole);
            navigate("/result", { state: result });
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return ( <
        div style = {
            { minHeight: "100vh", backgroundColor: "#0f0f1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }
        } >
        <
        h1 style = {
            { color: "#fff", fontSize: "2.5rem" }
        } > SkillSync AI🚀 < /h1> <
        p style = {
            { color: "#888", marginBottom: "40px" }
        } > Smart Resume Analyzer < /p> <
        div style = {
            { backgroundColor: "#1a1a2e", padding: "40px", borderRadius: "16px", width: "400px", display: "flex", flexDirection: "column", gap: "16px" }
        } >
        <
        label style = {
            { color: "#fff" }
        } > Upload Resume(PDF) < /label> <
        input type = "file"
        accept = ".pdf"
        onChange = {
            (e) => setFile(e.target.files[0])
        }
        style = {
            { padding: "10px", borderRadius: "8px", border: "1px solid #444", backgroundColor: "#0f0f1a", color: "#fff" }
        }
        /> <
        label style = {
            { color: "#fff" }
        } > Job Role < /label> <
        input type = "text"
        placeholder = "e.g. Backend Developer"
        value = { jobRole }
        onChange = {
            (e) => setJobRole(e.target.value)
        }
        style = {
            { padding: "10px", borderRadius: "8px", border: "1px solid #444", backgroundColor: "#0f0f1a", color: "#fff" }
        }
        /> {
        loading ? < Loader / > : < button onClick = { handleSubmit }
        style = {
            { padding: "12px", borderRadius: "8px", border: "none", backgroundColor: "#6c63ff", color: "#fff", cursor: "pointer" }
        } > Analyze Resume🔍 < /button>} < /
        div > <
        /div>
    );
};

export default Home;