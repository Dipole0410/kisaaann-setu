import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../configs/api.js';
import { login } from '../app/features/authslice.js';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hint = location.state?.aadharHint;

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    password: '',
    aadhar: hint || '',
    location: '',
    district: '',
    state: '',
    pinCode: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post('v1/auth/register', {
        email: formData.email.trim(),
        password: formData.password,
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
      });
      dispatch(login({ token: data.token, user: data.user }));

      const profilePayload = {
        state: formData.state,
        village: formData.location.trim(),
        district: formData.district.trim(),
      };
      if (profilePayload.district || profilePayload.village || profilePayload.state) {
        await api.put('v1/farmers/me', profilePayload);
      }

      toast.success('खाता बन गया। स्वागत है!');
      navigate('/', { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (Array.isArray(err.response?.data?.details)
          ? err.response.data.details.map((d) => d.message).join(', ')
          : null) ||
        err.message ||
        'पंजीकरण विफल';
      toast.error(typeof msg === 'string' ? msg : 'पंजीकरण विफल');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4 font-sans">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-8 border border-green-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">किसान पंजीकरण</h2>
          <p className="text-gray-500">अपना खाता बनाएं — AI सलाह और प्रोफ़ाइल सिंक होगी</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">ईमेल (लॉग इन के लिए)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">पूरा नाम</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">मोबाइल</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 अंक"
                maxLength="10"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">आधार (संदर्भ, वैकल्पिक)</label>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX"
                maxLength="12"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">गाँव / स्थान</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your village"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">ज़िला (मौसम / सामग्री के लिए)</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="जैसे Siddharthnagar"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">राज्य</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="" disabled>
                  Select your state
                </option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">PIN Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                placeholder="e.g. 411001"
                maxLength="6"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">पासवर्ड (कम से कम 8 अक्षर)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition-colors duration-200"
          >
            {submitting ? 'बना रहे हैं…' : 'खाता बनाएं'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          पहले से खाता है?{' '}
          <Link to="/login" className="text-green-600 hover:text-green-800 font-semibold transition-colors">
            लॉग इन
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-green-700">
            ← होम
          </Link>
        </div>
      </div>
    </div>
  );
}
