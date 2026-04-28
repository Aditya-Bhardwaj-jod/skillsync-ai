import React from "react";

const Loader = () => {
    return ( <
        div style = { styles.container } >
        <
        div style = { styles.spinner } > < /div> <
        p style = { styles.text } > Analyzing your resume... < /p> < /
        div >
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "4px solid #444",
        borderTop: "4px solid #6c63ff",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    text: {
        color: "#888",
        fontSize: "0.9rem",
    },
};

export default Loader;