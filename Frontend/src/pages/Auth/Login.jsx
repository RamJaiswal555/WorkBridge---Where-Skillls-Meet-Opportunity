import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function Login() {
  const { role } = useParams(); // 'customer' | 'provider'
  const isProvider = role === 'provider';
  useDocumentTitle(isProvider ? 'Provider Login' : 'Customer Login');
  const { login, loginWithGoogle } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ identifier, password, role });
      showToast(`Welcome back!`);
      navigate(isProvider ? '/dashboard/provider' : '/dashboard/customer');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle({ role });
      showToast('Signed in with Google');
      navigate(isProvider ? '/dashboard/provider' : '/dashboard/customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">
        {isProvider ? 'Welcome Back, Professional' : 'Welcome Back'}
      </h1>
      <p className="text-navy-500 dark:text-navy-400 mt-2">Log in to continue to WorkBridge.</p>

      {error && <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-2.5">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="label">Email or Phone</label>
          <input className="input" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="you@example.com" required />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="label">Password</label>
            <Link to={`/forgot-password/${role}`} className="text-xs font-medium text-primary-600 hover:text-primary-700 mb-1.5">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input type={showPass ? 'text' : 'password'} className="input pr-10" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400" aria-label="Toggle password visibility">
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-navy-100 dark:bg-navy-800" />
        <span className="text-xs text-navy-400">OR</span>
        <div className="h-px flex-1 bg-navy-100 dark:bg-navy-800" />
      </div>

      <div className="space-y-3">
        <button onClick={handleGoogle} disabled={loading} className="btn-outline w-full py-2.5 bg-white dark:bg-navy-900">
          <GoogleIcon /> Continue with Google
        </button>
        <Link to="/verify-otp" state={{ role }} className="btn-outline w-full py-2.5 bg-white dark:bg-navy-900 flex">
          Continue with OTP
        </Link>
      </div>

      <p className="text-sm text-navy-500 dark:text-navy-400 text-center mt-6">
        Don't have an account?{' '}
        <Link to={`/signup/${role}`} className="font-semibold text-primary-600 hover:text-primary-700">
          Create {isProvider ? 'Professional' : 'Customer'} Account
        </Link>
      </p>

      <Link to={`/login/${isProvider ? 'customer' : 'provider'}`} className="block text-center text-sm font-medium text-navy-500 dark:text-navy-400 hover:text-navy-700 mt-3">
        {isProvider ? 'Login as Customer' : 'Login as Service Provider'}
      </Link>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
