import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { WORKERS, getFeaturedWorkers } from '../../data/workers';
import { BOOKINGS } from '../../data/bookings';
import WorkerCard from '../../components/workers/WorkerCard';
import { EmptyState } from '../../components/common/States';
import * as customerService from '../../api/api';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function CustomerDashboard() {
  useDocumentTitle('Customer Dashboard');
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    customerService.getSavedWorkerIds().then(setSaved);
    customerService.getRecentSearches().then(setRecent);
  }, []);

  const toggleSave = async (id) => setSaved(await customerService.toggleSavedWorker(id));

  const upcoming = BOOKINGS.filter((b) => b.status === 'upcoming');
  const savedWorkers = WORKERS.filter((w) => saved.includes(w.id));
  const nearby = WORKERS.slice(4, 8);
  const recommended = getFeaturedWorkers().slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">{greeting()}, {user?.name?.split(' ')[0] || 'there'}!</h1>
        <p className="text-navy-500 dark:text-navy-400 mt-1">What service do you need today?</p>
        <Link to="/search" className="btn-primary mt-4 px-5 py-2.5 text-sm w-fit">
          <Search className="h-4 w-4" /> Find a Professional
        </Link>
      </div>

      {recent.length > 0 && (
        <div>
          <h2 className="font-semibold text-navy-900 dark:text-white mb-3">Recent searches</h2>
          <div className="flex flex-wrap gap-2">
            {recent.map((r) => (
              <Link key={r} to={`/search?q=${encodeURIComponent(r)}`} className="badge bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 text-navy-600 dark:text-navy-300 text-xs px-3 py-1.5 hover:border-primary-300">
                <Search className="h-3 w-3" /> {r}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-navy-900 dark:text-white">Upcoming bookings</h2>
          <Link to="/bookings" className="text-sm font-semibold text-primary-600">View all</Link>
        </div>
        {upcoming.length === 0 ? (
          <EmptyState title="No upcoming bookings" message="Book a professional to see them here." />
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {upcoming.map((b) => (
              <div key={b.id} className="card p-4 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-300 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy-900 dark:text-white truncate">{b.service}</p>
                  <p className="text-xs text-navy-400 truncate">{b.workerName} · {b.date}, {b.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-navy-900 dark:text-white">Saved professionals</h2>
        </div>
        {savedWorkers.length === 0 ? (
          <EmptyState title="No saved professionals yet" message="Tap the heart icon on any profile to save it here." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedWorkers.map((w) => <WorkerCard key={w.id} worker={w} saved onToggleSave={toggleSave} />)}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-navy-900 dark:text-white flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Nearby workers</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearby.map((w) => <WorkerCard key={w.id} worker={w} saved={saved.includes(w.id)} onToggleSave={toggleSave} />)}
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-navy-900 dark:text-white mb-3">Recommended for you</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommended.map((w) => <WorkerCard key={w.id} worker={w} saved={saved.includes(w.id)} onToggleSave={toggleSave} />)}
        </div>
      </div>
    </div>
  );
}
