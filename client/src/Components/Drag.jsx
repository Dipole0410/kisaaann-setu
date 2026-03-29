import React, { useState } from 'react'
import { UploadCloud } from 'lucide-react';

const Drag = () => {

  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = () => {
    setIsScanning(true);
    setResult(null);
    // Simulate API call to ML Backend
    setTimeout(() => {
      setIsScanning(false);
      setResult({ disease: "Leaf Blight Detected", confidence: "94.5%", recommendation: "Apply copper-based fungicides. Alerts sent to farmers within 10km radius." });
    }, 2500);
  };




   return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto h-full flex flex-col justify-center">
      <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer group relative overflow-hidden">
        
        {isScanning && (
          <motion.div initial={{ top: 0 }} animate={{ top: '100%' }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.7)] z-10" />
        )}

        <div className="bg-emerald-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <UploadCloud size={32} className="text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Upload Leaf Image</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Drag and drop a high-resolution image of the affected crop leaf to run the CNN diagnostic model.</p>
        
        <button onClick={handleScan} disabled={isScanning} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-lg disabled:bg-slate-400">
          {isScanning ? 'Analyzing via AI...' : 'Select File'}
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-red-50 border border-red-100 p-6 rounded-2xl">
          <h4 className="text-xl font-bold text-red-700 mb-2">⚠️ {result.disease}</h4>
          <p className="text-sm text-red-600 mb-4">Confidence Score: {result.confidence}</p>
          <p className="text-slate-800 font-medium">AI Recommendation:</p>
          <p className="text-slate-600">{result.recommendation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}


export default Drag
