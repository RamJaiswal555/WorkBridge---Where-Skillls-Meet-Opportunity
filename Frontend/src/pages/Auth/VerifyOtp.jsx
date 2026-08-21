import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft, RotateCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import * as authService from '../../api/api';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function VerifyOtp() {
  useDocumentTitle('OTP Login');
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithOTP } = useAuth();
  const { showToast } = useApp();
  const role = location.state?.role || 'customer';

  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(0); // 0 = phone, 1 = otp
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (step !== 1 || countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [step, countdown]);

  const sendOtp = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await authService.sendOTP({ phone });
      setStep(1);
      setCountdown(30);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const resend = async () => {
    if (countdown > 0) return;
    await authService.sendOTP({ phone });
    setCountdown(30);
    showToast('OTP resent');
  };

  const verify = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await authService.verifyOTP({ phone, otp });
      const u = await loginWithOTP({ phone, role });
      showToast('Logged in successfully');
      navigate(u.role === 'provider' ? '/dashboard/provider' : '/dashboard/customer');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to={`/login/${role}`} className="inline-flex items-center gap-1.5 text-sm text-navy-500 dark:text-navy-400 hover:text-navy-700 mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to login
      </Link>
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Login with OTP</h1>
      <p className="text-navy-500 dark:text-navy-400 mt-2">We'll text you a one-time code — no password needed.</p>

      {error && <div className="rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-2.5 mt-4">{error}</div>}

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.form key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={sendOtp} className="space-y-4 mt-6">
            <div><label className="label">Phone Number</label><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" /></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send OTP'}</button>
          </motion.form>
        ) : (
          <motion.form key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={verify} className="space-y-4 mt-6">
            <p className="text-sm text-navy-500 dark:text-navy-400">
              Code sent to {phone}. <button type="button" onClick={() => setStep(0)} className="underline">Change number</button>. Demo OTP: <strong>123456</strong>
            </p>
            <input className="input tracking-[0.5em] text-center text-lg" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="••••••" />
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify & Continue'}</button>
            <button type="button" onClick={resend} disabled={countdown > 0} className="btn-ghost w-full py-2 text-sm disabled:opacity-50">
              <RotateCw className="h-3.5 w-3.5" /> {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
