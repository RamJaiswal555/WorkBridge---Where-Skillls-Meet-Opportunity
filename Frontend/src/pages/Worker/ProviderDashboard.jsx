import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search, ClipboardList, CheckCircle2, Star, Wallet, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ProfileCompletion, TrustScore, AchievementBadge } from '../../components/common/Badges';
import { StatisticsCard } from '../../components/common/StatisticsCard';
import { MiniBarChart, MiniLineChart } from '../../components/charts/Charts';
import { formatINR } from '../../utils/format';
import { WORKERS } from '../../data/workers';

const profileViews = [
  { label: 'Mon', value: 18 }, { label: 'Tue', value: 24 }, { label: 'Wed', value: 15 },
  { label: 'Thu', value: 32 }, { label: 'Fri', value: 28 }, { label: 'Sat', value: 41 }, { label: 'Sun', value: 22 },
];
const earnings = [
  { label: 'Feb', value: 12400 }, { label: 'Mar', value: 15200 }, { label: 'Apr', value: 13800 },
  { label: 'May', value: 18900 }, { label: 'Jun', value: 21100 }, { label: 'Jul', value: 24500 },
];

export default function ProviderDashboard() {
  useDocumentTitle('Provider Dashboard');
  const { user } = useAuth();
  const { showToast } = useApp();
  const [available, setAvailable] = useState(true);
  const worker = WORKERS[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Welcome back, {user?.name?.split(' ')[0] || 'Professional'}</h1>
          <p className="text-navy-500 dark:text-navy-400 mt-1">Here's how your profile performed this week.</p>
        </div>
        <button
          onClick={() => { setAvailable((a) => !a); showToast(available ? 'You are now unavailable for new work' : 'You are now available for work'); }}
          className={`btn px-4 py-2.5 text-sm ${available ? 'btn-secondary' : 'btn-outline'}`}
        >
          <span className={`h-2 w-2 rounded-full ${available ? 'bg-white' : 'bg-navy-400'}`} />
          {available ? 'Available for Work' : 'Unavailable'}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatisticsCard icon={Eye} value="1,284" label="Profile views (30d)" accent="primary" />
        <StatisticsCard icon={Search} value="612" label="Search appearances" accent="secondary" />
        <StatisticsCard icon={ClipboardList} value="34" label="Booking requests" accent="accent" />
        <StatisticsCard icon={CheckCircle2} value="118" label="Completed jobs" accent="primary" />
        <StatisticsCard icon={Star} value="4.9" label="Average rating" accent="secondary" />
        <StatisticsCard icon={Wallet} value={formatINR(24500)} label="Earnings this month" accent="accent" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900 dark:text-white">Profile views this week</h3>
            <span className="text-xs text-secondary-600 font-semibold">+18% vs last week</span>
          </div>
          <MiniBarChart data={profileViews} color="#2563EB" />
        </div>
        <div className="card p-6 flex flex-col items-center justify-center text-center">
          <TrustScore score={worker.trustScore} size={110} />
          <p className="text-sm font-semibold text-navy-900 dark:text-white mt-3">Trust Score</p>
          <p className="text-xs text-navy-400 mt-1">Identity, reviews & reliability combined</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900 dark:text-white">Earnings trend</h3>
            <span className="text-xs text-navy-400">Last 6 months</span>
          </div>
          <MiniLineChart data={earnings} color="#10B981" />
        </div>
        <div className="card p-6">
          <ProfileCompletion percent={82} />
          <div className="rounded-xl bg-primary-50 dark:bg-primary-900/20 p-4 mt-5 flex gap-3">
            <Sparkles className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-navy-900 dark:text-white">AI Suggestion</p>
              <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">Add your electrical certificates to increase profile trust.</p>
            </div>
          </div>
          <Link to="/workers/w-1001" className="btn-outline w-full mt-4 py-2 text-sm">Complete Profile</Link>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-900 dark:text-white mb-4">Your achievements</h3>
        <div className="flex flex-wrap gap-2">
          {worker.badges.map((b) => <AchievementBadge key={b} label={b} />)}
        </div>
      </div>
    </div>
  );
}
