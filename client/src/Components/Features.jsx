import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      title: 'AI कृषि सलाहकार चैटबॉट',
      description:
        'फसलों की सेहत, कीटों की पहचान और खेती के तरीकों पर तुरंत विशेषज्ञ सलाह पाएं। लॉग इन के बाद फ़्लोटिंग चैट से बैकएंड सलाह।',
      image:
        'https://www.shutterstock.com/image-vector/happy-robot-3d-ai-character-600nw-2464455965.jpg',
      alt: 'AI चैटबॉट',
      hasTrending: true,
      imageClass: 'max-w-[200px]',
      to: '/login',
      linkState: { from: { pathname: '/' }, openBot: true },
      linkLabel: 'लॉग इन व चैट',
    },
    {
      title: 'सटीक मौसम और उपज अनुमान',
      description:
        'स्थानीय मौसम (Open-Meteo) — ज़िला या निर्देशांक से तुरंत देखें।',
      image:
        'https://www.shutterstock.com/image-photo/sidebyside-agricultural-scene-showing-weather-260nw-2589992207.jpg',
      alt: 'मौसम और उपज का ग्राफ',
      hasTrending: false,
      imageClass: 'max-w-[220px]',
      to: '/weather',
      linkLabel: 'मौसम देखें',
    },
    {
      title: 'स्मार्ट मंडी और सरकारी योजनाएं',
      description:
        'डेटाबेस से योजनाएँ और बुलेटिन — API से लाइव सूची।',
      image: 'https://ommcomnews.com/wp-content/uploads/2025/08/dhana-mandi.jpg',
      alt: 'स्मार्ट मंडी डैशबोर्ड',
      hasTrending: false,
      imageClass: 'max-w-[240px]',
      to: '/schemes',
      linkLabel: 'योजनाएँ',
    },
    {
      title: 'CNN कीट एवं रोग पहचान',
      description:
        'फसल की फोटो अपलोड करें — बाहरी Streamlit मॉडल या नीचे पेज पर टूल।',
      image: 'https://cdn-icons-png.flaticon.com/512/1904/1904533.png',
      alt: 'कीट पहचान प्रणाली',
      hasTrending: true,
      imageClass: 'max-w-[150px]',
      isNew: true,
      to: '/pest',
      linkLabel: 'कीट पहचान खोलें',
    },
  ];

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
          .font-poppins { font-family: "Poppins", sans-serif; }
        `}
      </style>

      <section id="features" className="bg-white/90 py-16 px-4 font-poppins scroll-mt-4">
        <div className="flex items-center flex-col justify-center text-center">
          <Link
            to="/crop"
            className="bg-green-100 text-sm text-green-800 px-6 py-2.5 rounded-full font-medium hover:bg-green-200 transition-colors inline-block"
          >
            हमारी मुख्य विशेषताएं — फसल सिफारिश
          </Link>

          <h2 className="text-black font-semibold text-4xl md:text-[40px] mt-6 leading-tight">
            स्मार्ट खेती की शुरुआत यहाँ से होती है।
          </h2>

          <p className="text-base text-black/60 max-w-lg mt-3">
            भारतीय किसानों के लिए बनाए गए उन्नत AI टूल्स, जो पैदावार बढ़ाएं और
            मेहनत घटाएं।
          </p>

          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-green-50 border border-green-200 rounded-3xl hover:border-green-500 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-8 flex flex-col relative group overflow-hidden"
              >
                <div className="flex justify-between items-center mb-6 h-8">
                  {feature.isNew ? (
                    <span className="bg-green-600 text-white text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                      नया
                    </span>
                  ) : (
                    <div />
                  )}

                  {feature.hasTrending && (
                    <div className="bg-green-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#166534"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 7h6v6" />
                        <path d="m22 7-8.5 8.5-5-5L2 17" />
                      </svg>
                      <p className="text-[10px] font-bold text-green-800 uppercase tracking-wide">
                        लाइव
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex items-center justify-center min-h-45">
                  <img
                    className={`w-full object-contain transition-transform duration-500 group-hover:scale-110 ${feature.imageClass}`}
                    src={feature.image}
                    alt={feature.alt}
                  />
                </div>

                <div className="mt-8 text-left flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-green-900 group-hover:text-green-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-black/70 mt-2 leading-relaxed flex-1">
                    {feature.description}
                  </p>
                  <Link
                    to={feature.to}
                    state={feature.linkState}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-green-700 text-white text-sm font-medium px-4 py-2 hover:bg-green-800 transition-colors"
                  >
                    {feature.linkLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
