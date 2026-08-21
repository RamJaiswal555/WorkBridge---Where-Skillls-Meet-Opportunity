import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, MessageCircle, XCircle, Star, RotateCw, Eye } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import * as bookingService from '../../api/api';
import { Tabs } from '../../components/common/Controls';
import { EmptyState, ListSkeleton } from '../../components/common/States';
import { ConfirmationDialog } from '../../components/common/Modal';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/format';

const STATUS_STYLES = {
  upcoming: 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
  completed: 'bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300',
  cancelled: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
};

export default function Bookings() {
  useDocumentTitle('My Bookings');
  const { showToast } = useApp();
  const [tab, setTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState(null);

  useEffect(() => {
    setLoading(true);
    bookingService.listBookings(tab).then((data) => { setBookings(data); setLoading(false); });
  }, [tab]);

  const cancel = () => {
    setBookings((b) => b.filter((x) => x.id !== cancelTarget));
    showToast('Booking cancelled');
    setCancelTarget(null);
  };

  return (
    <div className="section py-8">
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white mb-6">My Bookings</h1>
      <Tabs
        tabs={[{ value: 'upcoming', label: 'Upcoming' }, { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' }]}
        active={tab}
        onChange={setTab}
      />

      <div className="mt-6">
        {loading ? (
          <ListSkeleton count={3} />
        ) : bookings.length === 0 ? (
          <EmptyState title={`No ${tab} bookings`} message="Bookings will appear here once scheduled." action={<Link to="/search" className="btn-primary px-4 py-2 text-sm">Find a Professional</Link>} />
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-sm font-bold text-navy-600 dark:text-navy-200 shrink-0">
                  {b.workerName.split(' ').map((s) => s[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-navy-900 dark:text-white">{b.service}</p>
                    <span className={`badge text-[11px] ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                  </div>
                  <p className="text-xs text-navy-400 mt-1">{b.workerName}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-navy-500 dark:text-navy-400">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {b.date}, {b.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {b.location}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-navy-900 dark:text-white">{formatINR(b.price)}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link to={`/workers/${b.workerId}`} className="btn-ghost h-9 w-9 p-0" aria-label="View"><Eye className="h-4 w-4" /></Link>
                  <Link to="/messages" className="btn-ghost h-9 w-9 p-0" aria-label="Message"><MessageCircle className="h-4 w-4" /></Link>
                  {b.status === 'upcoming' && (
                    <button onClick={() => setCancelTarget(b.id)} className="btn-ghost h-9 w-9 p-0 text-red-500" aria-label="Cancel"><XCircle className="h-4 w-4" /></button>
                  )}
                  {b.status === 'completed' && (
                    <button onClick={() => showToast('Review submitted')} className="btn-ghost h-9 w-9 p-0" aria-label="Review"><Star className="h-4 w-4" /></button>
                  )}
                  {(b.status === 'completed' || b.status === 'cancelled') && (
                    <Link to={`/workers/${b.workerId}`} className="btn-ghost h-9 w-9 p-0" aria-label="Book again"><RotateCw className="h-4 w-4" /></Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmationDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={cancel}
        title="Cancel this booking?"
        description="This action cannot be undone. The professional will be notified."
        confirmLabel="Cancel Booking"
        danger
      />
    </div>
  );
}
