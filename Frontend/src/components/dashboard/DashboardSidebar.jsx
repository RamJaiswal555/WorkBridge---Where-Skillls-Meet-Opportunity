import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, UserCircle, Search, ClipboardList, MessageSquare, Star, Images,
  Award, CalendarClock, Wallet, Users, GraduationCap, Settings, Heart, Bell,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const providerLinks = [
  { to: '/dashboard/provider', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/workers/w-1001', label: 'My Profile', icon: UserCircle },
  { to: '/dashboard/provider', label: 'Search Appearance', icon: Search },
  { to: '/bookings', label: 'Booking Requests', icon: ClipboardList },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/workers/w-1001', label: 'Reviews', icon: Star },
  { to: '/portfolio/w-1001', label: 'Portfolio', icon: Images },
  { to: '/dashboard/provider', label: 'Certificates', icon: Award },
  { to: '/dashboard/provider', label: 'Availability', icon: CalendarClock },
  { to: '/dashboard/provider', label: 'Earnings', icon: Wallet },
  { to: '/community', label: 'Community', icon: Users },
  { to: '/learning', label: 'Learning', icon: GraduationCap },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const customerLinks = [
  { to: '/dashboard/customer', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/search', label: 'Find Workers', icon: Search },
  { to: '/dashboard/customer', label: 'Saved Workers', icon: Heart },
  { to: '/bookings', label: 'Bookings', icon: ClipboardList },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/recommendations', label: 'AI Recommendations', icon: Star },
  { to: '/community', label: 'Community', icon: Users },
  { to: '/learning', label: 'Learning', icon: GraduationCap },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar({ role }) {
  const links = role === 'provider' ? providerLinks : customerLinks;
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav className="sticky top-24 space-y-1">
        {links.map((l, i) => (
          <NavLink
            key={l.label + i}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800'
              )
            }
          >
            <l.icon className="h-4 w-4" />
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
