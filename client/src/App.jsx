import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Register from './Components/Register.jsx';
import SignIn from './Components/SignIn.jsx';
import Pest from './Components/Pest.jsx';
import CropRecommendation from './Components/CropRecommendation.jsx';
import Weather from './Components/Weather.jsx';
import SchemesPage from './Components/SchemesPage.jsx';

export default function App() {
  return (
 main
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<SignIn />} />
        <Route path="pest" element={<Pest />} />
        <Route path="crop" element={<CropRecommendation />} />
        <Route path="weather" element={<Weather />} />
        <Route path="schemes" element={<SchemesPage />} />
      </Route>
    </Routes>

    <>
      <div className="w-full flex items-center justify-between px-4 md:px-14 py-1 font-medium text-sm text-white text-center bg-linear-to-r from-green-500 via-[#38ca4b] to-[#acf4ae]">
        <p>किसान सहायता: पहले परामर्श पर 20% की छूट !</p>
        <div className="flex items-center space-x-6">
          <button
            type="button"
            className="font-normal text-gray-800 bg-white px-7 py-2 rounded-full"
          >
            टोल-फ्री नंबर: 1800 180 1551
          </button>
        </div>
      </div>

      <section className="flex flex-col items-center pb-48 text-center text-sm text-white max-md:px-2 bg-[url('https://png.pngtree.com/thumb_back/fw800/background/20260316/pngtree-rural-farming-land-landscape-image_21593657.webp')] bg-cover bg-center">
        <nav className="flex justify-between items-center px-4 md:px-16 lg:px-24 xl:px-32 py-3.5 border-b border-slate-200/20  w-full">
          <a href="#">
            <img
              src="logo.png"
              alt=""
              width="100"
              height="30"
              viewBox="0 0 157 40"
              fill="none"
            />
          </a>
          <button
            onClick={<Login />}
            className="bg-white text-slate-800 hover:bg-gray-300 px-6 md:px-8 py-2.5 rounded-full font-medium transition"
          >
            खाता बनाएं
          </button>
        </nav>
        <div className="flex flex-wrap items-center justify-center p-1.5 mt-24 md:mt-28 rounded-full border border-slate-400 text-xs">
          <div className="flex items-center">
            <img
              className="size-7 rounded-full border-3 border-white"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
              alt="userImage1"
            />
            <img
              className="size-7 rounded-full border-3 border-white -translate-x-2"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
              alt="userImage2"
            />
            <img
              className="size-7 rounded-full border-3 border-white -translate-x-4"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
              alt="userImage3"
            />
          </div>
          <p className="-translate-x-2">
            “1 मिलियन+ किसानों के साथ जुड़कर स्मार्ट खेती की ओर बढ़ें”{" "}
          </p>
        </div>
        <h1 className="font-berkshire text-[45px]/[52px] md:text-6xl/[65px] mt-6 max-w-4xl">
          किसानों के लिए स्मार्ट खेती का नया साथी
        </h1>
        <p className="text-base mt-2 max-w-xl">
          “स्मार्ट तकनीक के साथ खेती को बनाएं आसान — कीटों की सही पहचान, तुरंत
          AI सलाह और हर मौसम में बेहतर फैसलों की ताकत, अब सब कुछ आपके हाथ में।”
        </p>
        <p className="text-base mt-3 md:mt-7 max-w-xl">
          "अब खेती चलेगी आपकी शर्तों पर"
        </p>

        <form className="flex items-center mt-8 max-w-lg h-16 w-full rounded-full border border-slate-50">
          <input
            type="email"
            placeholder="आधार नंबर दर्ज करें"
            className="w-full h-full outline-none bg-transparent pl-6 pr-2 text-white placeholder:text-slate-300 rounded-full"
          />
          <button className="bg-white text-slate-800 hover:bg-gray-300 text-nowrap px-8 md:px-10 h-12 mr-2 rounded-full font-medium transition">
            शुरू करें
          </button>
        </form>
      </section>

      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            
                .font-berkshire {
                    font-family: 'Berkshire Swash', cursive;
                }
                `}</style>
    </>
 main
  );
}
