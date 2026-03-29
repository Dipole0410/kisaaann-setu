import { useState } from "react";

const CropRecommendation = () => {
  // Widget ko dikhane ya chhupane ke liye state
  const [showWidget, setShowWidget] = useState(false);

  // Aapka naya Streamlit link
  const STREAMLIT_URL =
    "https://ml-crop-recommendation-system-rf.streamlit.app?embed=true";

  const handleToggle = () => {
    setShowWidget(!showWidget);
  };

  return (
    <div className="p-8 min-h-screen bg-slate-100" style={styles.container}>
      {/* Upar ka Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>🌾 फसल की जानकारी (Crop Recommendation)</h2>
        <p style={styles.text}>
          अपने जिले और मिट्टी की स्थिति के अनुसार जानें कि आपके लिए कौन सी फसल
          सबसे अच्छी है।
        </p>

        <button
          onClick={handleToggle}
          style={{
            ...styles.button,
            backgroundColor: showWidget ? "#dc2626" : "#166534",
          }}
        >
          {showWidget ? "जानकारी छुपाएं" : "फसल की जानकारी देखें"}
        </button>
      </div>

      {/* Jab button dabega tab ye box khulega */}
      {showWidget && (
        <div style={styles.iframeContainer}>
          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "#64748b",
              marginBottom: "10px",
            }}
          >
            लोड हो रहा है... कृपया प्रतीक्षा करें।
          </p>
          <iframe
            src={STREAMLIT_URL}
            title="Crop Tool"
            width="100%"
            height="850px"
            style={styles.iframe}
            allow="geolocation"
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
    color: "#475569",
    marginBottom: "20px",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  button: {
    padding: "12px 28px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "0.3s ease",
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

export default CropRecommendation;
