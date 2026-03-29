import { useState } from "react";
import { Link } from "react-router-dom";

const Pest = () => {
  // Is state se hum widget ko dikhayenge ya chhupayenge
  const [showStreamlit, setShowStreamlit] = useState(false);

  // Sahi URL: Bina trailing slash ke, sirf ?embed=true
  const STREAMLIT_URL =
    "https://cnn-leaf-pest-detection.streamlit.app?embed=true";

  const handleClick = () => {
    // Agar pehle se dikh raha hai toh band ho jayega, nahi toh dikhega
    setShowStreamlit(!showStreamlit);
  };

  return (
    <div
      className="p-8 min-h-screen bg-slate-100 text-slate-800"
      style={styles.container}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto 16px", textAlign: "right" }}>
        <Link to="/" style={{ color: "#166534", fontSize: "14px" }}>
          ← होम
        </Link>
      </div>
      <div style={styles.card}>
        <h2 style={styles.title}>🌿 AI कीट पहचान (Pest Detection)</h2>
        <p style={styles.text}>
          CNN प्लांट डिजीज डिटेक्टर लोड करने के लिए नीचे दिए गए बटन पर क्लिक
          करें।
        </p>

        <button
          onClick={handleClick}
          style={{
            ...styles.button,
            backgroundColor: showStreamlit ? "#dc2626" : "#166534",
          }}
        >
          {showStreamlit ? "डिटेक्टर छुपाएं" : "डिटेक्टर विजेट खोलें"}
        </button>
      </div>

      {/* Jab showStreamlit true hoga tabhi niche wala div dikhega */}
      {showStreamlit && (
        <div style={styles.iframeContainer}>
          <iframe
            src={STREAMLIT_URL}
            title="कीट पहचान विजेट"
            width="100%"
            height="850px"
            style={styles.iframe}
            allow="camera" // Mobile users ke liye camera access zaroori hai
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#166534",
  },
  text: {
    color: "#64748b",
    marginBottom: "20px",
    fontSize: "15px",
  },
  button: {
    padding: "12px 24px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  iframeContainer: {
    marginTop: "30px",
    width: "100%",
    maxWidth: "1000px",
    margin: "30px auto",
  },
  iframe: {
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
};

export default Pest;
