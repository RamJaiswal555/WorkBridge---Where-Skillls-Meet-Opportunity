import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import Logo from '../../components/common/Logo';

export default function AdminLogin() {
  useDocumentTitle('Admin Login');
  const { loginAdmin } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('admin@workbridge.in');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await loginAdmin({ identifier, password });
      showToast('Welcome back, Admin');
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6"><Logo /></div>
        <div className="card bg-navy-900 border-navy-800 p-7">
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="h-4.5 w-4.5 text-accent-400" />
            <span className="text-xs font-bold uppercase tracking-wide text-accent-400">Restricted Access</span>
          </div>
          <h1 className="text-xl font-extrabold text-white mt-1">Admin Login</h1>
          <p className="text-sm text-navy-400 mt-1">Authorized WorkBridge staff only.</p>

          {error && <div className="rounded-xl bg-red-900/30 text-red-300 text-sm px-4 py-2.5 mt-4">{error}</div>}

          <form onSubmit={submit} className="space-y-4 mt-5">
            <div>
              <label className="label text-navy-300">Admin Email</label>
              <input className="input bg-navy-950 border-navy-700 text-white" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
            </div>
            <div>
              <label className="label text-navy-300">Password</label>
              <input type="password" className="input bg-navy-950 border-navy-700 text-white" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="admin123 (demo)" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Access Admin Panel'}
            </button>
          </form>
          <p className="text-xs text-navy-500 mt-4 text-center">Demo credentials: admin@workbridge.in / admin123</p>
        </div>
      </div>
    </div>
  );
}
