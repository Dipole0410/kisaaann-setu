import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../configs/api.js';
import { login } from '../app/features/authslice.js';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    typeof location.state?.from === 'string'
      ? location.state.from
      : location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post('v1/auth/login', {
        email: email.trim(),
        password,
      });
      dispatch(login({ token: data.token, user: data.user }));
      toast.success('लॉग इन सफल');
      navigate(from, {
        replace: true,
        ...(location.state?.openBot ? { state: { openBot: true } } : {}),
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'ईमेल या पासवर्ड गलत';
      toast.error(typeof msg === 'string' ? msg : 'लॉग इन विफल');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-green-100">
        <h1 className="text-2xl font-bold text-green-800 text-center mb-2">लॉग इन</h1>
        <p className="text-sm text-gray-500 text-center mb-6">AI सलाह और प्रोफ़ाइल के लिए</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ईमेल</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">पासवर्ड</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
          >
            {submitting ? '…' : 'लॉग इन'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          नया उपयोगकर्ता?{' '}
          <Link to="/register" className="text-green-600 font-semibold">
            पंजीकरण
          </Link>
        </p>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-green-700">
            ← होम
          </Link>
        </div>
      </div>
    </div>
  );
}
