import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../configs/api.js';

const STREAMLIT_URL = 'https://crop-recommendation-bits.streamlit.app/?embed=true';

const CropRecommendation = () => {
 main
  const [showStreamlit, setShowStreamlit] = useState(false);
  const [soilType, setSoilType] = useState('loam');
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState(null);

  const fetchFromApi = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setApiResult(null);
    try {
      const { data } = await api.get('v1/recommendations/soil-crop', {
        params: { soilType: soilType.trim(), district: district.trim() },
      });
      setApiResult(data);
      toast.success('सुझाव मिल गया');
    } catch (err) {
      const msg = err.response?.data?.error || 'सुझाव लोड नहीं हो सका';
      toast.error(typeof msg === 'string' ? msg : 'लोड विफल');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '1100px', margin: '0 auto 20px', textAlign: 'right' }}>
        <Link to="/" style={{ color: '#166534', fontSize: '14px' }}>
          ← होम
        </Link>
      </div>

      <div style={styles.card}>
        <div style={styles.iconContainer}>🌾</div>
        <h2 style={styles.title}>फसल सुझाव</h2>
        <p style={styles.text}>
          मिट्टी का प्रकार और वैकल्पिक ज़िला भरकर सुझाव प्राप्त करें।

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
 main
        </p>
        <form
          onSubmit={fetchFromApi}
          style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto 20px' }}
        >
          <label style={styles.label}>मिट्टी (उदा. loam, clay, sandy, black, alluvial)</label>
          <input
            style={styles.input}
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            placeholder="loam"
          />
          <label style={{ ...styles.label, marginTop: '12px' }}>ज़िला (वैकल्पिक)</label>
          <input
            style={styles.input}
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Balrampur"
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              width: '100%',
              marginTop: '16px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'लोड…' : 'सर्वर से सुझाव लें'}
          </button>
        </form>

        {apiResult && (
          <div
            style={{
              textAlign: 'left',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '16px',
              marginTop: '8px',
              fontSize: '14px',
            }}
          >
            <p>
              <strong>मिट्टी:</strong> {apiResult.soilType}
            </p>
            {apiResult.district && (
              <p>
                <strong>ज़िला:</strong> {apiResult.district}
              </p>
            )}
            <p style={{ marginTop: '8px' }}>
              <strong>फसलें:</strong> {apiResult.suggestedCrops?.join(', ')}
            </p>
            <ul style={{ marginTop: '8px', paddingLeft: '18px' }}>
              {apiResult.practices?.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            {apiResult.note && (
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>{apiResult.note}</p>
            )}
          </div>
        )}
      </div>

      <div style={{ ...styles.card, marginTop: '32px' }}>
        <h2 style={{ ...styles.title, fontSize: '22px' }}>Streamlit मॉडल (बाहरी)</h2>
        <p style={styles.text}>
          N-P-K आधारित विस्तृत टूल — नीचे एम्बेड खोलें।
        </p>
        <button
main
          type="button"
          onClick={() => setShowStreamlit(!showStreamlit)}
          style={{
            ...styles.button,
            backgroundColor: showStreamlit ? '#dc2626' : '#166534',
          }}
        >
          {showStreamlit ? 'बंद करें (Close Widget)' : 'टूल खोलें (Get Recommendation)'}
        </button>
      </div>

      {showStreamlit && (
        <div style={styles.iframeWrapper}>
          <div style={styles.loaderInfo}>
            <span>⚙️ AI Model Loading...</span>
          </div>

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
 main
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
 main
    padding: '60px 20px',
    backgroundColor: '#f0fdf4',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    maxWidth: '650px',
    margin: '0 auto',
    padding: '40px 30px',
    backgroundColor: '#fff',
    borderRadius: '24px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    border: '1px solid #dcfce7',
  },
  iconContainer: {
    fontSize: '50px',
    marginBottom: '15px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#14532d',
  },
  text: {
    color: '#4b5563',
    marginBottom: '25px',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '4px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '14px 32px',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(22, 101, 52, 0.2)',
  },
  iframeWrapper: {
    marginTop: '40px',
    width: '100%',
    maxWidth: '1100px',
    margin: '40px auto',
    position: 'relative',
  },
  loaderInfo: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#166534',
    marginBottom: '10px',
    fontWeight: '500',
  },
  iframe: {
    border: '4px solid #fff',
    borderRadius: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',

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
 main
  },
};

export default CropRecommendation;
