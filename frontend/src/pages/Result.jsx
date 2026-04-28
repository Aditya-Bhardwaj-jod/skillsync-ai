import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state;

    if (!result) {
        navigate("/");
        return null;
    }

    const score = parseInt(result.match_score) || 0;
    const scoreColor = score >= 70 ? "#00d4ff" : score >= 40 ? "#6c63ff" : "#ff6384";

    return ( <
        div style = {
            { minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "'Segoe UI', sans-serif", padding: "40px 20px", position: "relative", overflow: "hidden" } } >

        <
        div style = {
            { position: "fixed", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)", top: "-100px", left: "-100px", borderRadius: "50%" } }
        /> <
        div style = {
            { position: "fixed", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)", bottom: "-50px", right: "-50px", borderRadius: "50%" } }
        />

        <
        div style = {
            { maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 1 } } >

        <
        div style = {
            { textAlign: "center", marginBottom: "40px" } } >
        <
        h1 style = {
            { color: "#fff", fontSize: "2.5rem", fontWeight: "800", background: "linear-gradient(90deg, #6c63ff, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 } } >
        Analysis Result <
        /h1> <
        p style = {
            { color: "rgba(255,255,255,0.5)", marginTop: "8px" } } > Here 's how your resume matches the job role</p> <
        /div>

        <
        div style = {
            { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "40px", textAlign: "center", marginBottom: "20px", boxShadow: "0 25px 50px rgba(0,0,0,0.3)" } } >
        <
        p style = {
            { color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", margin: 0 } } > Match Score < /p> <
        div style = {
            { fontSize: "5rem", fontWeight: "900", color: scoreColor, margin: "10px 0", textShadow: "0 0 30px " + scoreColor } } > { result.match_score } <
        /div> <
        div style = {
            { background: "rgba(255,255,255,0.1)", borderRadius: "50px", height: "8px", marginTop: "10px" } } >
        <
        div style = {
            { background: "linear-gradient(90deg, " + scoreColor + ", #6c63ff)", height: "100%", borderRadius: "50px", width: Math.min(score, 100) + "%", transition: "width 1s ease" } }
        /> <
        /div> <
        /div>

        <
        div style = {
            { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "24px", padding: "30px", marginBottom: "20px" } } >
        <
        h2 style = {
            { color: "#00d4ff", fontSize: "1.1rem", fontWeight: "700", marginTop: 0, letterSpacing: "1px" } } > ✅Skills Found < /h2> <
        div style = {
            { display: "flex", flexWrap: "wrap", gap: "10px" } } > {
            result.skills_found.map((skill, index) => ( <
                span key = { index }
                style = {
                    { background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff", padding: "6px 14px", borderRadius: "50px", fontSize: "0.85rem", fontWeight: "600" } } > { skill } <
                /span>
            ))
        } <
        /div> <
        /div>

        <
        div style = {
            { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,99,132,0.2)", borderRadius: "24px", padding: "30px", marginBottom: "20px" } } >
        <
        h2 style = {
            { color: "#ff6384", fontSize: "1.1rem", fontWeight: "700", marginTop: 0, letterSpacing: "1px" } } > ❌Missing Skills < /h2> <
        div style = {
            { display: "flex", flexWrap: "wrap", gap: "10px" } } > {
            result.missing_skills.map((skill, index) => ( <
                span key = { index }
                style = {
                    { background: "rgba(255,99,132,0.1)", border: "1px solid rgba(255,99,132,0.3)", color: "#ff6384", padding: "6px 14px", borderRadius: "50px", fontSize: "0.85rem", fontWeight: "600" } } > { skill } <
                /span>
            ))
        } <
        /div> <
        /div>

        <
        div style = {
            { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(108,99,255,0.2)", borderRadius: "24px", padding: "30px", marginBottom: "30px" } } >
        <
        h2 style = {
            { color: "#6c63ff", fontSize: "1.1rem", fontWeight: "700", marginTop: 0, letterSpacing: "1px" } } > 💡Suggestions < /h2> {
            result.suggestions.map((suggestion, index) => ( <
                div key = { index }
                style = {
                    { display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" } } >
                <
                span style = {
                    { color: "#6c63ff", fontSize: "1.2rem" } } > → < /span> <
                p style = {
                    { color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "0.95rem", lineHeight: "1.6" } } > { suggestion } < /p> <
                /div>
            ))
        } <
        /div>

        <
        button onClick = {
            () => navigate("/") }
        style = {
            { width: "100%", padding: "16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #6c63ff, #00d4ff)", color: "#fff", fontSize: "1rem", fontWeight: "700", cursor: "pointer", boxShadow: "0 8px 25px rgba(108,99,255,0.4)" } } > 🔄Analyze Another Resume <
        /button>

        <
        p style = {
            { color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textAlign: "center", marginTop: "20px" } } >
        Powered by Groq AI & Llama 3.3⚡ <
        /p> <
        /div> <
        /div>
    );
};

export default Result;