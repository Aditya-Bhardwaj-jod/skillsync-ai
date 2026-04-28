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

        return ( <
                div style = { styles.container } >
                <
                h1 style = { styles.title } > Analysis Result🎯 < /h1>

                { /* Match Score */ } <
                div style = { styles.scoreCard } >
                <
                p style = { styles.scoreLabel } > Match Score < /p> <
                p style = { styles.scoreValue } > { result.match_score } < /p> < /
                div >

                { /* Skills Found */ } <
                div style = { styles.card } >
                <
                h2 style = { styles.cardTitle } > ✅Skills Found < /h2> {
                result.skills_found.map((skill, index) => ( <
                    p key = { index }
                    style = { styles.skillFound } > { skill } <
                    /p>
                ))
            } <
            /div>

        { /* Missing Skills */ } <
        div style = { styles.card } >
            <
            h2 style = { styles.cardTitle } > ❌Missing Skills < /h2> {
        result.missing_skills.map((skill, index) => ( <
            p key = { index }
            style = { styles.skillMissing } > { skill } <
            /p>
        ))
    } <
    /div>

{ /* Suggestions */ } <
div style = { styles.card } >
    <
    h2 style = { styles.cardTitle } > 💡Suggestions < /h2> {
result.suggestions.map((suggestion, index) => ( <
    p key = { index }
    style = { styles.suggestion } > •{ suggestion } <
    /p>
))
} <
/div>

<
button onClick = {
    () => navigate("/")
}
style = { styles.button } >
    Analyze Another Resume🔄 <
    /button> < /
    div >
);
};

const styles = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#0f0f1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        color: "#ffffff",
        fontSize: "2rem",
        marginBottom: "30px",
    },
    scoreCard: {
        backgroundColor: "#6c63ff",
        padding: "30px 60px",
        borderRadius: "16px",
        textAlign: "center",
        marginBottom: "30px",
    },
    scoreLabel: {
        color: "#fff",
        fontSize: "1rem",
        marginBottom: "8px",
    },
    scoreValue: {
        color: "#fff",
        fontSize: "3rem",
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "#1a1a2e",
        padding: "24px",
        borderRadius: "16px",
        width: "500px",
        marginBottom: "20px",
    },
    cardTitle: {
        color: "#ffffff",
        fontSize: "1.2rem",
        marginBottom: "16px",
    },
    skillFound: {
        color: "#4caf50",
        fontSize: "0.95rem",
        marginBottom: "8px",
    },
    skillMissing: {
        color: "#f44336",
        fontSize: "0.95rem",
        marginBottom: "8px",
    },
    suggestion: {
        color: "#bbbbbb",
        fontSize: "0.95rem",
        marginBottom: "8px",
    },
    button: {
        padding: "12px 24px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#6c63ff",
        color: "#fff",
        fontSize: "1rem",
        cursor: "pointer",
        marginTop: "20px",
    },
};

export default Result;