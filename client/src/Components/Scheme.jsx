import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../configs/api.js';

const fallbackImages = [
  'https://images.news18.com/ibnlive/uploads/2026/01/farmer-scheme-pm-kisan-yojana-2026-01-64eb5e3361a175c4777a1a4184aeb8ed-16x9.png?impolicy=website&width=640&height=360',
  'https://www.shutterstock.com/image-photo/portrait-indian-rural-farmer-standing-260nw-2592541429.jpg',
  'https://media.gettyimages.com/id/1155209417/photo/woman-farming-in-agricultural-field.jpg?s=612x612&w=gi&k=20&c=deQ688lpy9DU2X67cdCELmVnaDQVpTPbELkJnnqatgo=',
  'https://img.khetivyapar.com/images/news/1713762716-these-government-schemes-for-farmers-in-madhya-pradesh-madhya-pradesh-scheme-2024.jpg',
  'https://c8.alamy.com/comp/PR78TB/map-of-india-shows-indian-farmer-portrait-holding-plow-on-white-gradient-background-indian-agriculture-kisan-diwas-concept-PR78TB.jpg',
];

function buildStaticCards() {
  return [
    'प्रधानमंत्री किसान सम्मान निधि योजना',
    'किसान ऋण पोर्टल',
    'कृषि एवं किसान कल्याण विभाग',
    'प्रधानमंत्री किसान सिंचाई योजना',
    'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
  ].map((title, i) => ({
    title,
    image: fallbackImages[i % fallbackImages.length],
    id: `static-${i}`,
  }));
}

/** API अक्सर 1 योजना देता है; मार्की में कई तस्वीरें दिखाने के लिए कम से कम 5 कार्ड (पुराना UI) */
function mergeWithStaticForMarquee(apiCards) {
  const staticCards = buildStaticCards();
  if (apiCards.length === 0) return staticCards;
  if (apiCards.length >= 5) return apiCards;

  const seen = new Set(apiCards.map((c) => c.title));
  const merged = [...apiCards];
  for (const s of staticCards) {
    if (merged.length >= 5) break;
    if (!seen.has(s.title)) {
      merged.push(s);
      seen.add(s.title);
    }
  }
  return merged;
}

const Scheme = () => {
  const [stopScroll, setStopScroll] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get('v1/content', {
          params: { type: 'scheme', limit: 12 },
        });
        const items = data.items || [];
        const mapped = items.map((item, i) => ({
          title: item.title,
          image: fallbackImages[i % fallbackImages.length],
          id: String(item._id),
        }));
        if (!cancelled) {
          setCardData(mergeWithStaticForMarquee(mapped));
        }
      } catch {
        if (!cancelled) setCardData(buildStaticCards());
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const loop = cardData.length > 0 ? [...cardData, ...cardData] : [];

  return (
    <>
      <style>{`
        .marquee-inner { animation: marqueeScroll linear infinite; }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section id="schemes-preview" className="w-full" aria-labelledby="schemes-heading">
        <h2 id="schemes-heading" className="sr-only">
          सरकारी योजनाएँ
        </h2>

        <div className="text-center pt-8 pb-2">
          <Link
            to="/schemes"
            className="inline-flex items-center gap-1 text-green-800 font-medium text-sm hover:text-green-900 hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded px-1"
            aria-label="सभी योजनाएँ पूरी सूची में देखें"
          >
            सभी योजनाएँ देखें
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {loading && cardData.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-6">योजनाएँ लोड हो रही हैं…</p>
        )}

        {!loading && cardData.length > 0 && (
          <div
            className="overflow-hidden pt-8 pb-15 w-full relative max-w-6xl mx-auto"
            onMouseEnter={() => setStopScroll(true)}
            onMouseLeave={() => setStopScroll(false)}
          >
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
            <div
              className="marquee-inner flex w-fit"
              style={{
                animationPlayState: stopScroll ? 'paused' : 'running',
                animationDuration: `${cardData.length * 2500}ms`,
              }}
            >
              <div className="flex">
                {loop.map((card, index) => (
                  <div
                    key={`${card.id}-${index}`}
                    className="w-56 mx-4 h-80 relative group hover:scale-90 transition-all duration-300 shrink-0"
                  >
                    <Link
                      to="/schemes"
                      className="absolute inset-0 z-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                      aria-label={`${card.title} — पूरी सूची देखें`}
                    />
                    <img
                      src={card.image}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20 pointer-events-none">
                      <p className="text-white text-lg font-semibold text-center">{card.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
          </div>
        )}
      </section>
    </>
  );
};

export default Scheme;
