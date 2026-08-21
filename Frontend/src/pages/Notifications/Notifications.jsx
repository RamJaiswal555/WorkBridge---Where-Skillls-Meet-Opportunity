import { useEffect, useState } from 'react';
import { Bell, Calendar, MessageSquare, Star, ShieldCheck, UserCircle, Users, Megaphone, CheckCheck } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import * as notificationService from '../../api/api';
import { Tabs } from '../../components/common/Controls';
import { EmptyState, ListSkeleton } from '../../components/common/States';
import { cn } from '../../utils/cn';

const ICONS = {
  Booking: Calendar,
  Messages: MessageSquare,
  Reviews: Star,
  Verification: ShieldCheck,
  Profile: UserCircle,
  Community: Users,
  System: Megaphone,
};

export default function Notifications() {
  useDocumentTitle('Notifications');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    notificationService.listNotifications().then((data) => { setItems(data); setLoading(false); });
  }, []);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const clearAll = () => setItems([]);

  const categories = ['all', 'Booking', 'Messages', 'Reviews', 'Profile', 'Verification', 'Community', 'System'];
  const filtered = tab === 'all' ? items : items.filter((n) => n.category === tab);
  const unreadCount = items.filter((n) => !n.read).length;

  if (loading) return <div className="section py-10"><ListSkeleton count={5} /></div>;

  return (
    <div className="section py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white flex items-center gap-2">
            <Bell className="h-6 w-6" /> Notifications {unreadCount > 0 && <span className="badge bg-primary-600 text-white text-xs">{unreadCount} new</span>}
          </h1>
        </div>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="btn-outline px-3 py-1.5 text-xs bg-white dark:bg-navy-900"><CheckCheck className="h-3.5 w-3.5" /> Mark all read</button>
          <button onClick={clearAll} className="btn-ghost px-3 py-1.5 text-xs">Clear all</button>
        </div>
      </div>

      <div className="mb-6 overflow-x-auto">
        <Tabs tabs={categories.map((c) => ({ value: c, label: c === 'all' ? 'All' : c }))} active={tab} onChange={setTab} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="You're all caught up" message="No notifications to show." />
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => {
            const Icon = ICONS[n.category] || Bell;
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn('w-full text-left card p-4 flex items-start gap-3 transition-colors', !n.read && 'bg-primary-50/50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900')}
              >
                <div className="h-10 w-10 rounded-xl bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-navy-500 dark:text-navy-300 shrink-0">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-navy-900 dark:text-white">{n.title}</p>
                    <span className="text-[11px] text-navy-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-sm text-navy-500 dark:text-navy-400 mt-0.5">{n.body}</p>
                </div>
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary-600 mt-1.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
