import { useState } from 'react';
import { User, Palette, Globe, Lock, Bell, ShieldCheck, Sun, Moon, Monitor, Loader2 } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Tabs } from '../../components/common/Controls';
import { ConfirmationDialog } from '../../components/common/Modal';

const SECTIONS = [
  { value: 'account', label: 'Account', icon: User },
  { value: 'appearance', label: 'Appearance', icon: Palette },
  { value: 'language', label: 'Language', icon: Globe },
  { value: 'privacy', label: 'Privacy', icon: Lock },
  { value: 'notifications', label: 'Notifications', icon: Bell },
  { value: 'security', label: 'Security', icon: ShieldCheck },
];

export default function Settings() {
  useDocumentTitle('Settings');
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { showToast } = useApp();
  const [section, setSection] = useState('account');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [prefs, setPrefs] = useState({ bookings: true, messages: true, reviews: true, marketing: false });
  const [twoFA, setTwoFA] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); showToast('Settings saved'); }, 600);
  };

  return (
    <div className="section py-8 max-w-4xl">
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white mb-6">Settings</h1>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto">
          {SECTIONS.map((s) => (
            <button
              key={s.value}
              onClick={() => setSection(s.value)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${section === s.value ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800'}`}
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </nav>

        <div className="card p-6">
          {section === 'account' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-navy-900 dark:text-white">Personal Information</h2>
              <div><label className="label">Full Name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><label className="label">Email</label><input className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div><label className="label">Phone</label><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              <button onClick={save} disabled={saving} className="btn-primary px-5 py-2.5 text-sm">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}</button>
            </div>
          )}

          {section === 'appearance' && (
            <div>
              <h2 className="font-semibold text-navy-900 dark:text-white mb-4">Appearance</h2>
              <div className="grid grid-cols-3 gap-3">
                {[{ v: 'light', icon: Sun, l: 'Light' }, { v: 'dark', icon: Moon, l: 'Dark' }, { v: 'system', icon: Monitor, l: 'System' }].map((o) => (
                  <button key={o.v} onClick={() => setTheme(o.v)} className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 ${theme === o.v ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-navy-100 dark:border-navy-800'}`}>
                    <o.icon className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                    <span className="text-sm font-medium text-navy-700 dark:text-navy-200">{o.l}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {section === 'language' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-navy-900 dark:text-white">Language</h2>
              <select className="input max-w-xs">
                {['English', 'Hindi', 'Marathi', 'Kannada', 'Telugu', 'Gujarati', 'Tamil', 'Bengali'].map((l) => <option key={l}>{l}</option>)}
              </select>
              <button onClick={save} className="btn-primary px-5 py-2.5 text-sm block">Save Changes</button>
            </div>
          )}

          {section === 'privacy' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-navy-900 dark:text-white">Privacy</h2>
              {['Show my profile in search results', 'Show my last active status', 'Allow customers to see my exact location'].map((p) => (
                <label key={p} className="flex items-center justify-between text-sm text-navy-700 dark:text-navy-200 py-1">
                  {p}
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-primary-600" />
                </label>
              ))}
            </div>
          )}

          {section === 'notifications' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-navy-900 dark:text-white">Notification Preferences</h2>
              {Object.entries(prefs).map(([k, v]) => (
                <label key={k} className="flex items-center justify-between text-sm text-navy-700 dark:text-navy-200 py-1 capitalize">
                  {k}
                  <input type="checkbox" checked={v} onChange={(e) => setPrefs((p) => ({ ...p, [k]: e.target.checked }))} className="h-4 w-4 rounded accent-primary-600" />
                </label>
              ))}
            </div>
          )}

          {section === 'security' && (
            <div className="space-y-5">
              <h2 className="font-semibold text-navy-900 dark:text-white">Security</h2>
              <div>
                <label className="label">Change Password</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="password" className="input" placeholder="Current password" />
                  <input type="password" className="input" placeholder="New password" />
                </div>
                <button onClick={save} className="btn-outline px-4 py-2 text-sm mt-3">Update Password</button>
              </div>
              <label className="flex items-center justify-between text-sm text-navy-700 dark:text-navy-200 py-2 border-t border-navy-100 dark:border-navy-800 pt-4">
                Two-Factor Authentication
                <input type="checkbox" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} className="h-4 w-4 rounded accent-primary-600" />
              </label>
              <div className="border-t border-navy-100 dark:border-navy-800 pt-4">
                <p className="text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">Login Sessions</p>
                <div className="flex items-center justify-between text-sm text-navy-500 dark:text-navy-400 py-2">
                  <span>Chrome on Windows · Mumbai</span>
                  <span className="text-secondary-600 text-xs font-semibold">This device</span>
                </div>
              </div>
              <button onClick={() => setConfirmDelete(true)} className="text-sm text-red-600 font-medium hover:underline">Delete my account</button>
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => showToast('Account deletion requested')}
        title="Delete your account?"
        description="This will permanently remove your profile, bookings and messages. This cannot be undone."
        confirmLabel="Delete Account"
        danger
      />
    </div>
  );
}
