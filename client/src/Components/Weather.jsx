import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../configs/api.js';

export default function Weather() {
  const [district, setDistrict] = useState('Siddharthnagar');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchWeather = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setData(null);
    try {
      const params = {};
      if (lat.trim() && lng.trim()) {
        params.lat = lat.trim();
        params.lng = lng.trim();
      } else if (district.trim()) {
        params.district = district.trim();
      } else {
        toast.error('ज़िला दर्ज करें या अक्षांश / देशांतर भरें');
        setLoading(false);
        return;
      }
      const { data: res } = await api.get('v1/weather/current', { params });
      setData(res);
      toast.success('मौसम अपडेट मिल गया');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'मौसम लोड नहीं हो सका';
      toast.error(typeof msg === 'string' ? msg : 'त्रुटि');
    } finally {
      setLoading(false);
    }
  };

  const cur = data?.current;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-green-900">मौसम (लाइव)</h1>
          <Link to="/" className="text-green-700 text-sm hover:underline">
            ← होम
          </Link>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          उत्तर प्रदेश के ज्ञात ज़िलों के नाम से या अक्षांश / देशांतर से लाइव मौसम देखें।
        </p>
        <form onSubmit={fetchWeather} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ज़िला</label>
            <input
              className="w-full border rounded-lg p-2"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Siddharthnagar, Balrampur, …"
            />
          </div>
          <p className="text-xs text-slate-500">या सीधे निर्देशांक (दोनों भरें)</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">अक्षांश (lat)</label>
              <input
                className="w-full border rounded-lg p-2"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="27.25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">देशांतर (lng)</label>
              <input
                className="w-full border rounded-lg p-2"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="82.95"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'लोड हो रहा है…' : 'मौसम दिखाएँ'}
          </button>
        </form>

        {data && cur && (
          <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-2">वर्तमान</h2>
            {data.district != null && (
              <p className="text-sm text-slate-600 mb-2">ज़िला: {data.district}</p>
            )}
            <ul className="text-sm space-y-1">
              <li>तापमान: {cur.temperature_2m} °C</li>
              <li>आर्द्रता: {cur.relative_humidity_2m}%</li>
              <li>वर्षा: {cur.precipitation} mm</li>
              <li>हवा: {cur.wind_speed_10m} km/h</li>
              <li>कोड मौसम: {cur.weather_code}</li>
            </ul>
            {data.daily?.time?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">अगले दिन (संक्षेप)</h3>
                <ul className="text-xs space-y-1 text-slate-700">
                  {data.daily.time.slice(0, 5).map((t, i) => (
                    <li key={t}>
                      {t}: अधिकतम {data.daily.temperature_2m_max?.[i]}° / न्यूनतम{' '}
                      {data.daily.temperature_2m_min?.[i]}° — वर्षा{' '}
                      {data.daily.precipitation_sum?.[i]} mm
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
