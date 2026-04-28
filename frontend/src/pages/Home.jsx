import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume, analyzeResume } from "../services/api";

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
                { minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", position: "relative", overflow: "hidden", padding: "20px" }
            } >

            { /* Glowing Orbs */ } <
            div style = {
                { position: "absolute", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)", top: "-50px", left: "-50px", borderRadius: "50%" }
            }
            /> <
            div style = {
                { position: "absolute", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)", bottom: "-30px", right: "-30px", borderRadius: "50%" }
            }
            />

            { /* Header */ } <
            div style = {
                { textAlign: "center", marginBottom: "30px", zIndex: 1 }
            } >
            <
            div style = {
                { fontSize: "3rem", marginBottom: "8px" }
            } > ⚡ < /div> <
            h1 style = {
                { color: "#ffffff", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: "800", margin: 0, background: "linear-gradient(90deg, #6c63ff, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
            } >
            SkillSync AI <
            /h1> <
            p style = {
                { color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)", marginTop: "8px" }
            } >
            Smart Resume Analyzer & Job Matcher <
            /p> < /
            div >

            { /* Card */ } <
            div style = {
                { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "clamp(20px, 5vw, 40px)", width: "100%", maxWidth: "420px", zIndex: 1, boxShadow: "0 25px 50px rgba(0,0,0,0.5)", boxSizing: "border-box" }
            } >

            <
            label style = {
                { color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }
            } >
            Upload Resume <
            /label> <
            div style = {
                { marginTop: "8px", marginBottom: "20px", border: "2px dashed rgba(108,99,255,0.5)", borderRadius: "12px", padding: "20px", textAlign: "center", background: "rgba(108,99,255,0.05)" }
            } >
            <
            input type = "file"
            accept = ".pdf"
            onChange = {
                (e) => setFile(e.target.files[0])
            }
            style = {
                { display: "none" }
            }
            id = "fileInput" / >
            <
            label htmlFor = "fileInput"
            style = {
                { cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }
            } > {
                file ? < span style = {
                    { color: "#6c63ff" }
                } > ✅{ file.name } < /span> : "📄 Click to upload PDF"} < /
                label > <
                /div>

                <
                label style = {
                    { color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }
                } >
                Job Role <
                /label> <
                input
                type = "text"
                placeholder = "e.g. Backend Developer"
                value = { jobRole }
                onChange = {
                    (e) => setJobRole(e.target.value)
                }
                style = {
                    { width: "100%", marginTop: "8px", marginBottom: "24px", padding: "14px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "1rem", outline: "none", boxSizing: "border-box" }
                }
                />

                <
                button
                onClick = { handleSubmit }
                disabled = { loading }
                style = {
                    { width: "100%", padding: "16px", borderRadius: "12px", border: "none", background: loading ? "rgba(108,99,255,0.4)" : "linear-gradient(135deg, #6c63ff, #00d4ff)", color: "#fff", fontSize: "1rem", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 8px 25px rgba(108,99,255,0.4)" }
                } > { loading ? "⏳ Analyzing..." : "🔍 Analyze Resume" } <
                /button> < /
                div >

                <
                p style = {
                    { color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginTop: "24px", zIndex: 1, textAlign: "center" }
                } >
                Powered by Groq AI & Llama 3.3⚡ <
                /p> < /
                div >
            );
        };

        export default Home;