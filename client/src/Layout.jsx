import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './Components/Footer.jsx';
import Bot from './Components/Bot.jsx';

export default function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
      <Bot />
      <Toaster position="top-center" />
    </>
  );
}
