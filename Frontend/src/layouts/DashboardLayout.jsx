import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import ToastContainer from '../components/common/Toast';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const { role } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-navy-950">
      <Navbar />
      <main className="flex-1">
        <div className="section py-8 flex gap-8">
          <DashboardSidebar role={role} />
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
