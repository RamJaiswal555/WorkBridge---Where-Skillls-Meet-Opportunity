import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import * as authService from '../../api/api';
import { useApp } from '../../context/AppContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

function strength(pw) {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0-4
}

export default function ForgotPassword() {
  const { role } = useParams();
  useDocumentTitle('Reset Password');
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const s = strength(password);
  const strengthLabel = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][s];
  const strengthColor = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-secondary-400', 'bg-secondary-600'][s];

  const submitIdentifier = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await authService.forgotPassword({ identifier });
      setStep(1);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const submitOtp = (e) => {
    e.preventDefault();
    if (otp !== '123456') return setError('Invalid OTP. Use 123456 for this demo.');
    setError(''); setStep(2);
  };

  const submitReset = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match.');
    setLoading(true);
    try {
      await authService.resetPassword({ password });
      setStep(3);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <Link to={`/login/${role}`} className="inline-flex items-center gap-1.5 text-sm text-navy-500 dark:text-navy-400 hover:text-navy-700 mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to login
      </Link>
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Reset your password</h1>
      <p className="text-navy-500 dark:text-navy-400 mt-2">We'll send you a verification code to confirm it's you.</p>

      {error && <div className="rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-2.5 mt-4">{error}</div>}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.form key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submitIdentifier} className="space-y-4 mt-6">
            <div><label className="label">Email or Phone</label><input className="input" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="you@example.com" /></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Code'}</button>
          </motion.form>
        )}
        {step === 1 && (
          <motion.form key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submitOtp} className="space-y-4 mt-6">
            <p className="text-sm text-navy-500 dark:text-navy-400">Demo OTP: <strong>123456</strong></p>
            <input className="input tracking-[0.5em] text-center text-lg" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="••••••" />
            <button type="submit" className="btn-primary w-full py-2.5">Verify</button>
          </motion.form>
        )}
        {step === 2 && (
          <motion.form key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submitReset} className="space-y-4 mt-6">
            <div>
              <label className="label">New Password</label>
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${i < s ? strengthColor : 'bg-navy-100 dark:bg-navy-800'}`} />)}
                  </div>
                  <p className="text-xs text-navy-400 mt-1">{strengthLabel}</p>
                </div>
              )}
            </div>
            <div><label className="label">Confirm Password</label><input type="password" className="input" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" /></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Reset Password'}</button>
          </motion.form>
        )}
        {step === 3 && (
          <motion.div key="3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="h-14 w-14 rounded-2xl bg-secondary-50 dark:bg-secondary-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-7 w-7 text-secondary-600" />
            </div>
            <h2 className="text-xl font-bold text-navy-900 dark:text-white">Password reset successful</h2>
            <p className="text-sm text-navy-500 dark:text-navy-400 mt-1.5">You can now log in with your new password.</p>
            <button onClick={() => navigate(`/login/${role}`)} className="btn-primary px-6 py-2.5 mt-6">Back to Login</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
