import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import AdminSidebar from '../components/admin/AdminSidebar';
import ToastContainer from '../components/common/Toast';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { logout, user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-navy-50 dark:bg-navy-950">
      <header className="sticky top-0 z-50 bg-navy-900 text-white">
        <div className="section flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Logo compact />
            <span className="text-sm font-semibold px-2.5 py-1 rounded-md bg-white/10">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-navy-300">{user?.name}</span>
            <button onClick={logout} className="btn-ghost h-9 w-9 p-0 text-white hover:bg-white/10" aria-label="Log out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="section py-8 flex gap-8">
          <AdminSidebar />
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
