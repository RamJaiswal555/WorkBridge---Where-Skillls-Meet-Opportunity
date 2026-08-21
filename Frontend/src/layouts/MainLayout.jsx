import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import ToastContainer from '../components/common/Toast';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-navy-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
