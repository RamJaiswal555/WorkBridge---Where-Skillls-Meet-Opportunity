import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2, CheckCircle2, ArrowRight, ArrowLeft, UploadCloud, X, PartyPopper,
  ShieldCheck, Star, MapPin, Clock, Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { CATEGORIES } from '../../data/categories';
import { VerificationBadge, SkillBadge, TrustScore } from '../../components/common/Badges';
import { formatINR } from '../../utils/format';

const STEPS = ['Account', 'Professional Info', 'Skills', 'Verification', 'Portfolio', 'Preview', 'Complete'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ProviderSignup() {
  useDocumentTitle('Become a WorkBridge Professional');
  const { signup } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
    title: '', category: 'electrician', experience: '', about: '', city: 'Mumbai', serviceArea: '', languages: 'Hindi, English',
    skills: [], startingPrice: '', hourlyRate: '', emergencyCharge: '',
    availableToday: true, emergencyAvailable: false, workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], workingHours: '9:00 AM – 6:00 PM',
    govId: false, addressProof: false, policeVerification: false, certificates: false,
    portfolioCount: 0,
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggleDay = (d) => setForm((f) => ({ ...f, workingDays: f.workingDays.includes(d) ? f.workingDays.filter((x) => x !== d) : [...f.workingDays, d] }));
  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm((f) => ({ ...f, skills: [...f.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };
  const removeSkill = (s) => setForm((f) => ({ ...f, skills: f.skills.filter((x) => x !== s) }));

  const completion = Math.round(
    (['name', 'email', 'phone', 'password'].filter((k) => form[k]).length / 4) * 15 +
    (['title', 'experience', 'about', 'serviceArea'].filter((k) => form[k]).length / 4) * 20 +
    (form.skills.length > 0 ? 15 : 0) +
    (form.startingPrice ? 10 : 0) +
    ([form.govId, form.addressProof, form.policeVerification, form.certificates].filter(Boolean).length / 4) * 25 +
    (form.portfolioCount > 0 ? 15 : 0)
  );

  const next = () => {
    setError('');
    if (step === 0) {
      if (!form.name || !form.email || !form.phone || !form.password) return setError('Please complete all required fields.');
      if (form.password !== form.confirm) return setError('Passwords do not match.');
    }
    if (step === 1 && (!form.title || !form.experience || !form.serviceArea)) return setError('Please complete your professional info.');
    if (step === 2 && (form.skills.length === 0 || !form.startingPrice)) return setError('Add at least one skill and your starting price.');
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = async () => {
    setLoading(true);
    setError('');
    try {
      await signup({ role: 'provider', name: form.name, email: form.email, phone: form.phone, password: form.password });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setStep(6);
    }
  };

  const category = CATEGORIES.find((c) => c.id === form.category);

  return (
    <div className="max-w-2xl w-full mx-auto">
      {step < 6 && (
        <>
          <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Build your professional profile</h1>
          <p className="text-navy-500 dark:text-navy-400 mt-2">Step {step + 1} of {STEPS.length - 1}: {STEPS[step]}</p>

          <div className="flex items-center gap-1.5 mt-6 mb-8">
            {STEPS.slice(0, 6).map((s, i) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-primary-600' : 'bg-navy-100 dark:bg-navy-800'}`} />
            ))}
          </div>
        </>
      )}

      {error && <div className="rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-2.5 mb-4">{error}</div>}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4 card p-6">
            <div><label className="label">Full Name</label><input className="input" value={form.name} onChange={update('name')} placeholder="Ramesh Pawar" /></div>
            <div><label className="label">Email</label><input className="input" value={form.email} onChange={update('email')} placeholder="ramesh@example.com" /></div>
            <div><label className="label">Phone</label><input className="input" value={form.phone} onChange={update('phone')} placeholder="98765 43210" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">Password</label><input type="password" className="input" value={form.password} onChange={update('password')} placeholder="••••••••" /></div>
              <div><label className="label">Confirm</label><input type="password" className="input" value={form.confirm} onChange={update('confirm')} placeholder="••••••••" /></div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4 card p-6">
            <div><label className="label">Professional Title</label><input className="input" value={form.title} onChange={update('title')} placeholder="Senior Residential Electrician" /></div>
            <div><label className="label">Primary Category</label>
              <select className="input" value={form.category} onChange={update('category')}>
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">Experience (years)</label><input type="number" className="input" value={form.experience} onChange={update('experience')} placeholder="9" /></div>
              <div><label className="label">City</label>
                <select className="input" value={form.city} onChange={update('city')}>
                  {['Mumbai', 'Pune', 'Delhi', 'Bengaluru', 'Hyderabad', 'Nagpur', 'Nashik', 'Ahmedabad'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div><label className="label">Service Area</label><input className="input" value={form.serviceArea} onChange={update('serviceArea')} placeholder="Andheri, Jogeshwari, Vile Parle" /></div>
            <div><label className="label">Languages</label><input className="input" value={form.languages} onChange={update('languages')} placeholder="Hindi, Marathi, English" /></div>
            <div><label className="label">About Me</label><textarea rows={4} className="input" value={form.about} onChange={update('about')} placeholder="Tell customers about your experience and approach…" /></div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-5 card p-6">
            <div>
              <label className="label">Skills</label>
              <div className="flex gap-2">
                <input className="input" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="e.g. House Wiring" />
                <button type="button" onClick={addSkill} className="btn-outline px-4">Add</button>
              </div>
              {form.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.skills.map((s) => (
                    <span key={s} className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-xs px-2.5 py-1">
                      {s} <button onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="label">Starting Price (₹)</label><input type="number" className="input" value={form.startingPrice} onChange={update('startingPrice')} placeholder="249" /></div>
              <div><label className="label">Hourly Rate (₹)</label><input type="number" className="input" value={form.hourlyRate} onChange={update('hourlyRate')} placeholder="349" /></div>
              <div><label className="label">Emergency Charge (₹)</label><input type="number" className="input" value={form.emergencyCharge} onChange={update('emergencyCharge')} placeholder="599" /></div>
            </div>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm text-navy-700 dark:text-navy-200">
                <input type="checkbox" checked={form.availableToday} onChange={(e) => setForm((f) => ({ ...f, availableToday: e.target.checked }))} className="h-4 w-4 rounded accent-primary-600" /> Available Today
              </label>
              <label className="flex items-center gap-2 text-sm text-navy-700 dark:text-navy-200">
                <input type="checkbox" checked={form.emergencyAvailable} onChange={(e) => setForm((f) => ({ ...f, emergencyAvailable: e.target.checked }))} className="h-4 w-4 rounded accent-primary-600" /> Emergency Available
              </label>
            </div>
            <div>
              <label className="label">Working Days</label>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((d) => (
                  <button type="button" key={d} onClick={() => toggleDay(d)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${form.workingDays.includes(d) ? 'bg-primary-600 text-white border-primary-600' : 'border-navy-200 dark:border-navy-700 text-navy-500 dark:text-navy-400'}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div><label className="label">Working Hours</label><input className="input" value={form.workingHours} onChange={update('workingHours')} /></div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-3 card p-6">
            <p className="text-sm text-navy-500 dark:text-navy-400 mb-2">
              Verification documents are never shown publicly — only your verification status is visible to customers.
            </p>
            {[
              ['govId', 'Government ID'],
              ['addressProof', 'Address Proof'],
              ['policeVerification', 'Police Verification'],
              ['certificates', 'Professional Certificates'],
            ].map(([key, label]) => (
              <div key={key} className="flex items-center justify-between border border-dashed border-navy-200 dark:border-navy-700 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-navy-100 dark:bg-navy-800 flex items-center justify-center">
                    <UploadCloud className="h-4.5 w-4.5 text-navy-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{label}</p>
                    <p className="text-xs text-navy-400">{form[key] ? 'Uploaded — Pending review' : 'Not uploaded'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, [key]: !f[key] }))}
                  className={form[key] ? 'btn-outline px-3 py-1.5 text-xs' : 'btn-primary px-3 py-1.5 text-xs'}
                >
                  {form[key] ? 'Uploaded' : 'Upload'}
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="4" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4 card p-6">
            <p className="text-sm text-navy-500 dark:text-navy-400">Add photos or videos of past work — profiles with a portfolio get more booking requests.</p>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: Math.max(form.portfolioCount, 0) }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/40 dark:to-secondary-900/40" />
              ))}
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, portfolioCount: f.portfolioCount + 1 }))}
                className="aspect-square rounded-xl border-2 border-dashed border-navy-200 dark:border-navy-700 flex flex-col items-center justify-center gap-1.5 text-navy-400 hover:border-primary-400 hover:text-primary-500 transition-colors"
              >
                <UploadCloud className="h-5 w-5" />
                <span className="text-xs font-medium">Add Photo</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="5" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
            <div className="card overflow-hidden">
              <div className={`h-24 bg-gradient-to-br from-primary-500 to-secondary-500 relative`}>
                <div className="absolute -bottom-8 left-5 h-16 w-16 rounded-2xl bg-white dark:bg-navy-900 shadow-card flex items-center justify-center font-bold text-lg text-navy-700 dark:text-white ring-4 ring-white dark:ring-navy-900">
                  {(form.name || 'W B').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()}
                </div>
              </div>
              <div className="pt-11 px-5 pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-navy-900 dark:text-white">{form.name || 'Your Name'}</h3>
                    <p className="text-sm text-navy-500 dark:text-navy-400">{form.title || 'Professional title'} · {category?.name}</p>
                    <p className="text-xs text-navy-400 flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {form.serviceArea || 'Service area'}, {form.city}</p>
                  </div>
                  <TrustScore score={Math.max(completion - 5, 10)} size={64} />
                </div>
                {form.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {form.skills.map((s) => <SkillBadge key={s}>{s}</SkillBadge>)}
                  </div>
                )}
                <p className="text-sm text-navy-600 dark:text-navy-300 mt-4">{form.about || 'Your professional bio will appear here.'}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-navy-500 dark:text-navy-400">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {form.experience || '0'} yrs experience</span>
                  {form.availableToday && <span className="flex items-center gap-1 text-secondary-600"><Zap className="h-3.5 w-3.5" /> Available today</span>}
                </div>
                <div className="flex items-center justify-between mt-5 pt-5 border-t border-navy-100 dark:border-navy-800">
                  <div>
                    <span className="text-[11px] text-navy-400">Starting at</span>
                    <p className="font-bold text-navy-900 dark:text-white">{formatINR(Number(form.startingPrice) || 0)}</p>
                  </div>
                  {form.govId && <VerificationBadge label="Identity Pending Review" />}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <span className="text-sm font-medium text-navy-700 dark:text-navy-200">Profile Completion: {completion}%</span>
              <div className="h-2.5 w-full rounded-full bg-navy-100 dark:bg-navy-800 overflow-hidden mt-2">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: `${completion}%` }} />
              </div>
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div key="6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="h-16 w-16 rounded-2xl bg-secondary-50 dark:bg-secondary-900/30 flex items-center justify-center mx-auto mb-5">
              <PartyPopper className="h-8 w-8 text-secondary-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Your WorkBridge Professional Profile is Ready! 🎉</h1>
            <p className="text-navy-500 dark:text-navy-400 mt-2">Customers in {form.city} can now discover you on WorkBridge.</p>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div>
                <p className="text-xl font-extrabold text-primary-600">{completion}%</p>
                <p className="text-xs text-navy-400">Profile completion</p>
              </div>
              <div className="h-8 w-px bg-navy-100 dark:bg-navy-800" />
              <div>
                <p className="text-xl font-extrabold text-accent-600">Pending</p>
                <p className="text-xs text-navy-400">Verification status</p>
              </div>
            </div>
            <div className="flex gap-3 justify-center mt-8">
              <button onClick={() => navigate('/dashboard/provider')} className="btn-primary px-6 py-2.5">Go to Dashboard</button>
              <button onClick={() => navigate('/workers/w-1001')} className="btn-outline px-6 py-2.5">View My Profile</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step < 6 && (
        <div className="flex gap-3 mt-6">
          {step > 0 && <button onClick={back} className="btn-outline px-4 py-2.5"><ArrowLeft className="h-4 w-4" /> Back</button>}
          {step < 5 ? (
            <button onClick={next} className="btn-primary flex-1 py-2.5">Continue <ArrowRight className="h-4 w-4" /></button>
          ) : (
            <button onClick={finish} disabled={loading} className="btn-primary flex-1 py-2.5">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Profile'}
            </button>
          )}
        </div>
      )}

      {step === 0 && (
        <p className="text-sm text-navy-500 dark:text-navy-400 text-center mt-6">
          Already registered? <Link to="/login/provider" className="font-semibold text-primary-600">Log in</Link>
        </p>
      )}
    </div>
  );
}
