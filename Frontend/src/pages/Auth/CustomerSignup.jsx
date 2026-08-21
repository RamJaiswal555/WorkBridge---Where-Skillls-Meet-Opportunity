import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const STEPS = ['Account', 'Verify', 'Profile'];

export default function CustomerSignup() {
  useDocumentTitle('Create Customer Account');
  const { signup } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
    city: 'Mumbai', area: '', language: 'Hindi', contactPref: 'Chat',
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const next = () => {
    setError('');
    if (step === 0) {
      if (!form.name || !form.email || !form.phone || !form.password) return setError('Please fill in all required fields.');
      if (form.password !== form.confirm) return setError('Passwords do not match.');
    }
    if (step === 1 && otp !== '123456') return setError('Enter the demo OTP: 123456');
    setStep((s) => s + 1);
  };

  const finish = async () => {
    setLoading(true);
    setError('');
    try {
      await signup({ role: 'customer', name: form.name, email: form.email, phone: form.phone, password: form.password });
      showToast('Welcome to WorkBridge!');
      navigate('/dashboard/customer');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Create your customer account</h1>
      <p className="text-navy-500 dark:text-navy-400 mt-2">Find trusted professionals in a few steps.</p>

      <div className="flex items-center gap-2 mt-6 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i <= step ? 'bg-primary-600 text-white' : 'bg-navy-100 dark:bg-navy-800 text-navy-400'}`}>
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 ${i < step ? 'bg-primary-600' : 'bg-navy-100 dark:bg-navy-800'}`} />}
          </div>
        ))}
      </div>

      {error && <div className="rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-2.5 mb-4">{error}</div>}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4">
            <div><label className="label">Full Name</label><input className="input" value={form.name} onChange={update('name')} placeholder="Ananya Kapoor" /></div>
            <div><label className="label">Email</label><input className="input" value={form.email} onChange={update('email')} placeholder="ananya@example.com" /></div>
            <div><label className="label">Phone</label><input className="input" value={form.phone} onChange={update('phone')} placeholder="98765 43210" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">Password</label><input type="password" className="input" value={form.password} onChange={update('password')} placeholder="••••••••" /></div>
              <div><label className="label">Confirm</label><input type="password" className="input" value={form.confirm} onChange={update('confirm')} placeholder="••••••••" /></div>
            </div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4">
            <p className="text-sm text-navy-500 dark:text-navy-400">We sent a 6-digit code to {form.phone || 'your phone'}. For this demo, use <strong>123456</strong>.</p>
            <div><label className="label">Enter OTP</label><input className="input tracking-[0.5em] text-center text-lg" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="••••••" /></div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4">
            <div><label className="label">City</label>
              <select className="input" value={form.city} onChange={update('city')}>
                {['Mumbai', 'Pune', 'Delhi', 'Bengaluru', 'Hyderabad', 'Nagpur', 'Nashik', 'Ahmedabad'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="label">Area</label><input className="input" value={form.area} onChange={update('area')} placeholder="Andheri West" /></div>
            <div><label className="label">Preferred Language</label>
              <select className="input" value={form.language} onChange={update('language')}>
                {['Hindi', 'English', 'Marathi', 'Kannada', 'Telugu', 'Gujarati'].map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div><label className="label">Contact Preference</label>
              <select className="input" value={form.contactPref} onChange={update('contactPref')}>
                {['Chat', 'Call', 'Either'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="btn-outline px-4 py-2.5">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
        {step < 2 ? (
          <button onClick={next} className="btn-primary flex-1 py-2.5">Continue <ArrowRight className="h-4 w-4" /></button>
        ) : (
          <button onClick={finish} disabled={loading} className="btn-primary flex-1 py-2.5">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
          </button>
        )}
      </div>

      <p className="text-sm text-navy-500 dark:text-navy-400 text-center mt-6">
        Already have an account? <Link to="/login/customer" className="font-semibold text-primary-600">Log in</Link>
      </p>
    </div>
  );
}
