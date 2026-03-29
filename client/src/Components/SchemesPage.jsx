import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../configs/api.js";

export default function SchemesPage() {
  const [districtInput, setDistrictInput] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSchemes = useCallback(async (districtStr) => {
    setLoading(true);
    try {
      const params = { type: "scheme", limit: 50 };
      const trimmed = (districtStr ?? "").trim();
      if (trimmed) params.district = trimmed;
      const { data } = await api.get("v1/content", { params });
      setItems(data.items || []);
    } catch {
      setItems([]);
      toast.error("सामग्री लोड नहीं हो सकी — सर्वर चालू है?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSchemes("");
  }, [loadSchemes]);

  const applyFilter = (e) => {
    e.preventDefault();
    loadSchemes(districtInput);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-green-900">
            योजनाएँ और सामग्री
          </h1>
          <Link to="/" className="text-green-700 text-sm hover:underline">
            ← होम
          </Link>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          अपने ज़िले के अनुसार योजनाएँ देखने के लिए नीचे ज़िला भरकर फ़िल्टर
          लगाएँ (वैकल्पिक)।
        </p>
        <form
          onSubmit={applyFilter}
          className="flex flex-wrap gap-2 mb-6 items-end"
        >
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="scheme-district" className="sr-only">
              ज़िला
            </label>
            <input
              id="scheme-district"
              className="border border-slate-300 rounded-lg px-3 py-2 w-full"
              placeholder="ज़िला (वैकल्पिक)"
              value={districtInput}
              onChange={(e) => setDistrictInput(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            फ़िल्टर लागू
          </button>
        </form>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-green-900 mb-4">
            विशिष्ट योजना पृष्ठ
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/schemes/kalyan-v"
              className="block rounded-xl border border-green-100 bg-green-50 px-4 py-4 text-sm font-medium text-green-900 hover:bg-green-100"
            >
              कृषि एवं किसान कल्याण विभाग
            </Link>
            <Link
              to="/schemes/pmfby"
              className="block rounded-xl border border-green-100 bg-green-50 px-4 py-4 text-sm font-medium text-green-900 hover:bg-green-100"
            >
              प्रधानमंत्री फसल बीमा योजना (PMFBY)
            </Link>
            <Link
              to="/schemes/pmksny"
              className="block rounded-xl border border-green-100 bg-green-50 px-4 py-4 text-sm font-medium text-green-900 hover:bg-green-100"
            >
              प्रधानमंत्री किसान सम्मान निधि योजना
            </Link>
            <Link
              to="/schemes/rinportal"
              className="block rounded-xl border border-green-100 bg-green-50 px-4 py-4 text-sm font-medium text-green-900 hover:bg-green-100"
            >
              किसान ऋण पोर्टल
            </Link>
            <Link
              to="/schemes/sichayi"
              className="block rounded-xl border border-green-100 bg-green-50 px-4 py-4 text-sm font-medium text-green-900 hover:bg-green-100"
            >
              प्रधानमंत्री कृषि सिंचाई योजना
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-slate-500">लोड हो रहा है…</p>
        ) : items.length === 0 ? (
          <p className="text-slate-600">
            इस फ़िल्टर के लिए कोई योजना नहीं मिली। दूसरा ज़िला आज़माएँ या खाली
            छोड़कर फिर से फ़िल्टर लागू करें।
          </p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item._id}
                className="border border-green-100 rounded-xl p-5 bg-green-50/50 shadow-sm"
              >
                <h2 className="font-semibold text-green-900">{item.title}</h2>
                <p className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">
                  {item.body}
                </p>
                {item.regionTags?.length > 0 && (
                  <p className="text-xs text-slate-500 mt-2">
                    क्षेत्र: {item.regionTags.join(", ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
