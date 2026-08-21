import { useEffect, useState } from 'react';
import {
  Users, HardHat, UserSquare2, ShieldCheck, ClipboardList, CheckCircle2, Flag,
  Search, CheckCheck, XCircle, RotateCcw,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import * as adminService from '../../api/api';
import { StatisticsCard } from '../../components/common/StatisticsCard';
import { MiniBarChart, DonutChart } from '../../components/charts/Charts';
import { Tabs } from '../../components/common/Controls';
import { ListSkeleton } from '../../components/common/States';
import { WORKERS } from '../../data/workers';
import { getCategory } from '../../data/categories';
import { useApp } from '../../context/AppContext';

const growth = [
  { label: 'Mar', value: 3200 }, { label: 'Apr', value: 4100 }, { label: 'May', value: 5300 },
  { label: 'Jun', value: 6100 }, { label: 'Jul', value: 7400 }, { label: 'Aug', value: 8600 },
];

export default function AdminDashboard() {
  useDocumentTitle('Admin Dashboard');
  const { showToast } = useApp();
  const [stats, setStats] = useState(null);
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');
  const [query, setQuery] = useState('');

  useEffect(() => {
    Promise.all([adminService.getAdminStats(), adminService.listVerificationRequests()]).then(([s, v]) => {
      setStats(s);
      setVerifications(v);
      setLoading(false);
    });
  }, []);

  const approve = (id) => {
    setVerifications((v) => v.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r)));
    showToast('Verification approved');
  };
  const reject = (id) => {
    setVerifications((v) => v.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r)));
    showToast('Verification rejected', 'error');
  };

  const filteredWorkers = WORKERS.filter((w) => w.name.toLowerCase().includes(query.toLowerCase()));

  const categoryDonut = ['electrician', 'plumber', 'cleaner', 'cook', 'carpenter'].map((id, i) => ({
    label: getCategory(id).name,
    value: WORKERS.filter((w) => w.category === id).length,
    color: ['#2563EB', '#10B981', '#F59E0B', '#8b5cf6', '#f43f5e'][i],
  }));

  if (loading) return <ListSkeleton count={4} />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard icon={Users} value={stats.totalUsers.toLocaleString('en-IN')} label="Total users" accent="primary" />
        <StatisticsCard icon={HardHat} value={stats.workers.toLocaleString('en-IN')} label="Workers" accent="secondary" />
        <StatisticsCard icon={UserSquare2} value={stats.customers.toLocaleString('en-IN')} label="Customers" accent="accent" />
        <StatisticsCard icon={ShieldCheck} value={stats.verifiedWorkers.toLocaleString('en-IN')} label="Verified workers" accent="primary" />
        <StatisticsCard icon={ClipboardList} value={stats.activeBookings.toLocaleString('en-IN')} label="Active bookings" accent="secondary" />
        <StatisticsCard icon={CheckCircle2} value={stats.completedServices.toLocaleString('en-IN')} label="Completed services" accent="accent" />
        <StatisticsCard icon={Flag} value={stats.reports} label="Open reports" accent="primary" />
      </div>

      <Tabs tabs={[{ value: 'overview', label: 'Overview' }, { value: 'users', label: 'Users' }, { value: 'verification', label: `Verification (${verifications.filter((v) => v.status === 'Pending').length})` }]} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="card p-6 lg:col-span-2">
            <h3 className="font-semibold text-navy-900 dark:text-white mb-4">User growth</h3>
            <MiniBarChart data={growth} color="#2563EB" height={160} />
          </div>
          <div className="card p-6 flex flex-col items-center">
            <h3 className="font-semibold text-navy-900 dark:text-white mb-4 self-start">Workers by category</h3>
            <DonutChart segments={categoryDonut} />
            <div className="grid grid-cols-1 gap-1.5 mt-4 w-full">
              {categoryDonut.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-navy-500 dark:text-navy-400"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />{s.label}</span>
                  <span className="font-semibold text-navy-700 dark:text-navy-200">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="card p-5">
          <div className="flex items-center gap-2 bg-navy-50 dark:bg-navy-800 rounded-xl px-3 py-2 mb-4 max-w-sm">
            <Search className="h-4 w-4 text-navy-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users…" className="bg-transparent outline-none text-sm w-full" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-navy-400 border-b border-navy-100 dark:border-navy-800">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium">City</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Rating</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.map((w) => (
                  <tr key={w.id} className="border-b border-navy-50 dark:border-navy-800/50">
                    <td className="py-3 font-medium text-navy-800 dark:text-navy-100">{w.name}</td>
                    <td className="py-3 text-navy-500 dark:text-navy-400">{getCategory(w.category)?.name}</td>
                    <td className="py-3 text-navy-500 dark:text-navy-400">{w.city}</td>
                    <td className="py-3">
                      <span className={`badge text-[11px] ${w.verified.identity ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300' : 'bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300'}`}>
                        {w.verified.identity ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 text-navy-500 dark:text-navy-400">{w.rating}</td>
                    <td className="py-3 text-right">
                      <button className="btn-ghost px-3 py-1.5 text-xs">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'verification' && (
        <div className="space-y-3">
          {verifications.map((v) => (
            <div key={v.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-navy-900 dark:text-white">{v.name}</p>
                  <span className={`badge text-[11px] ${v.status === 'Approved' ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300' : v.status === 'Rejected' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300'}`}>{v.status}</span>
                </div>
                <p className="text-xs text-navy-400 mt-1">{getCategory(v.category)?.name} · {v.city} · submitted {v.submittedAt}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {v.documents.map((d) => <span key={d} className="badge bg-navy-100 dark:bg-navy-800 text-navy-500 dark:text-navy-400 text-[11px]">{d}</span>)}
                </div>
              </div>
              {v.status === 'Pending' ? (
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => approve(v.id)} className="btn-secondary px-3 py-2 text-xs"><CheckCheck className="h-3.5 w-3.5" /> Approve</button>
                  <button onClick={() => reject(v.id)} className="btn-outline px-3 py-2 text-xs text-red-600"><XCircle className="h-3.5 w-3.5" /> Reject</button>
                  <button className="btn-ghost px-3 py-2 text-xs"><RotateCcw className="h-3.5 w-3.5" /> Resubmit</button>
                </div>
              ) : (
                <button onClick={() => setVerifications((list) => list.map((r) => (r.id === v.id ? { ...r, status: 'Pending' } : r)))} className="btn-ghost px-3 py-2 text-xs shrink-0">Reset</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
