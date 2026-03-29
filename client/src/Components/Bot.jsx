import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import api from '../configs/api.js';

window.speechUtterances = window.speechUtterances || [];

function Bot() {
  const token = useSelector((s) => s.auth.token);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [listening, setListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState('hi-IN');

  const chatEndRef = useRef(null);

  const languages = [
    { code: 'hi-IN', label: 'हिन्दी', promptName: 'Hindi' },
    { code: 'mr-IN', label: 'मराठी', promptName: 'Marathi' },
    { code: 'bho', label: 'भोजपुरी', promptName: 'Bhojpuri' },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  useEffect(() => {
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    if (!location.state?.openBot) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- open panel when navigating with location.state.openBot
    setIsOpen(true);
    window.history.replaceState({}, document.title, `${location.pathname}${location.search}`);
  }, [location.state?.openBot, location.pathname, location.search]);

  const startListening = () => {
    window.speechSynthesis.cancel();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('आपका ब्राउज़र वॉइस रिकग्निशन सपोर्ट नहीं करता 😢');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang === 'bho' ? 'hi-IN' : selectedLang;
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setMessage(text);
      sendMessage(text);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const targetLang = selectedLang === 'bho' ? 'hi-IN' : selectedLang;

    utterance.lang = targetLang;
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.includes(targetLang) || v.lang.includes('hi'));
    if (voice) utterance.voice = voice;

    window.speechUtterances.push(utterance);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => window.speechSynthesis.cancel();

  useEffect(() => {
    if (!isOpen) window.speechSynthesis.cancel();
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userMsg = text || message;
    if (!userMsg.trim()) return;

    stopSpeaking();
    setChat((prev) => [...prev, { role: 'user', text: userMsg }]);
    setMessage('');

    if (!token) {
      setChat((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'AI सलाह के लिए कृपया लॉग इन करें। नीचे लिंक से खाता बना सकते हैं।',
        },
      ]);
      return;
    }

    const langName = languages.find((l) => l.code === selectedLang)?.promptName || 'Hindi';

    try {
      const question =
        selectedLang === 'hi-IN'
          ? userMsg
          : `[Reply in ${langName}, keep concise] ${userMsg}`;

      const res = await api.post('v1/advisory/query', { question });
      const reply = res.data?.response || 'क्षमा करें, कोई उत्तर नहीं मिला।';

      setChat((prev) => [...prev, { role: 'bot', text: reply }]);
      speak(reply);
    } catch (error) {
      const status = error.response?.status;
      const errMsg = error.response?.data?.error;
      if (status === 401) {
        setChat((prev) => [
          ...prev,
          { role: 'bot', text: 'सत्र समाप्त — कृपया दोबारा लॉग इन करें।' },
        ]);
        return;
      }
      console.error('Advisory API:', error);
      setChat((prev) => [
        ...prev,
        {
          role: 'bot',
          text:
            typeof errMsg === 'string'
              ? errMsg
              : '❌ सलाह सेवा अभी उपलब्ध नहीं। सर्वर चालू है यह जाँचें।',
        },
      ]);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '25px',
            right: '25px',
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            backgroundColor: '#2e7d32',
            color: 'white',
            border: 'none',
            boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
            fontSize: '30px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          💬
        </button>
      )}

      <div
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          width: '360px',
          height: '550px',
          maxWidth: '90vw',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          zIndex: 1001,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: '#2e7d32',
            color: 'white',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>🌾 किसान सहायक (बैकएंड)</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            ✖
          </button>
        </div>

        {!token && (
          <div style={{ padding: '8px 12px', background: '#fff3e0', fontSize: '12px' }}>
            <Link to="/login" style={{ color: '#e65100', fontWeight: 600 }}>
              लॉग इन
            </Link>
            {' · '}
            <Link to="/register" style={{ color: '#e65100' }}>
              पंजीकरण
            </Link>
          </div>
        )}

        <div
          style={{
            padding: '8px',
            background: '#f1f8e9',
            display: 'flex',
            gap: '10px',
            fontSize: '12px',
          }}
        >
          {languages.map((l) => (
            <button
              type="button"
              key={l.code}
              onClick={() => setSelectedLang(l.code)}
              style={{
                border: 'none',
                background: selectedLang === l.code ? '#2e7d32' : '#ddd',
                color: selectedLang === l.code ? 'white' : 'black',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            background: '#f9f9f9',
          }}
        >
          {chat.map((c, i) => (
            <div
              key={i}
              style={{
                textAlign: c.role === 'user' ? 'right' : 'left',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '10px',
                  borderRadius: '10px',
                  background: c.role === 'user' ? '#dcf8c6' : '#fff',
                  border: '1px solid #eee',
                  maxWidth: '80%',
                  fontSize: '14px',
                }}
              >
                {c.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div
          style={{
            padding: '10px',
            display: 'flex',
            gap: '5px',
            borderTop: '1px solid #eee',
          }}
        >
          <input
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ccc',
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="सवाल पूछें..."
          />
          <button
            type="button"
            onClick={() => sendMessage()}
            style={{
              border: 'none',
              background: '#2e7d32',
              color: 'white',
              borderRadius: '50%',
              width: '40px',
            }}
          >
            ➤
          </button>
          <button
            type="button"
            onClick={startListening}
            style={{
              border: 'none',
              background: listening ? 'red' : '#2196F3',
              color: 'white',
              borderRadius: '50%',
              width: '40px',
            }}
          >
            🎤
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bot;
