import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/auth" state={{ from: location }} replace />;
  return <Outlet />;
}

export function CustomerRoute() {
  const { role, isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login/customer" replace />;
  if (role !== 'customer') return <Navigate to="/dashboard/provider" replace />;
  return <Outlet />;
}

export function ProviderRoute() {
  const { role, isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login/provider" replace />;
  if (role !== 'provider') return <Navigate to="/dashboard/customer" replace />;
  return <Outlet />;
}

export function AdminRoute() {
  const { role, isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated || role !== 'admin') return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
