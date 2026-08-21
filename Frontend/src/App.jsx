import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

import { ProtectedRoute, CustomerRoute, ProviderRoute, AdminRoute } from './routes/guards';

import Landing from './pages/Landing';
import RoleSelect from './pages/Auth/RoleSelect';
import Login from './pages/Auth/Login';
import CustomerSignup from './pages/Auth/CustomerSignup';
import ProviderSignup from './pages/Auth/ProviderSignup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyOtp from './pages/Auth/VerifyOtp';
import AdminLogin from './pages/Auth/AdminLogin';

import CustomerDashboard from './pages/Customer/CustomerDashboard';
import ProviderDashboard from './pages/Worker/ProviderDashboard';
import SearchPage from './pages/Search/SearchPage';
import WorkerProfile from './pages/Worker/WorkerProfile';
import Portfolio from './pages/Portfolio/Portfolio';
import Messages from './pages/Messages/Messages';
import Notifications from './pages/Notifications/Notifications';
import Bookings from './pages/Booking/Bookings';
import Recommendations from './pages/Recommendations/Recommendations';
import Community from './pages/Community/Community';
import Learning from './pages/Learning/Learning';
import Settings from './pages/Settings/Settings';
import AdminDashboard from './pages/Admin/AdminDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* Auth flows */}
      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<RoleSelect />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />
        <Route path="/signup/provider" element={<ProviderSignup />} />
        <Route path="/forgot-password/:role" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected main app shell */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/workers/:id" element={<WorkerProfile />} />
          <Route path="/portfolio/:id" element={<Portfolio />} />
          <Route path="/community" element={<Community />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Role-based dashboards */}
      <Route element={<DashboardLayout />}>
        <Route element={<CustomerRoute />}>
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        </Route>
        <Route element={<ProviderRoute />}>
          <Route path="/dashboard/provider" element={<ProviderDashboard />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
