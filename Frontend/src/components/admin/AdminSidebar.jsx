import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, HardHat, UserSquare2, ShieldCheck, Flag, Grid2x2,
  ClipboardList, Star, MessagesSquare, BarChart3, Settings,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin', label: 'Users', icon: Users },
  { to: '/admin', label: 'Workers', icon: HardHat },
  { to: '/admin', label: 'Customers', icon: UserSquare2 },
  { to: '/admin', label: 'Verification', icon: ShieldCheck },
  { to: '/admin', label: 'Reports', icon: Flag },
  { to: '/admin', label: 'Categories', icon: Grid2x2 },
  { to: '/admin', label: 'Bookings', icon: ClipboardList },
  { to: '/admin', label: 'Reviews', icon: Star },
  { to: '/admin', label: 'Community', icon: MessagesSquare },
  { to: '/admin', label: 'Analytics', icon: BarChart3 },
  { to: '/admin', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
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
                  ? 'bg-navy-900 text-white dark:bg-white dark:text-navy-900'
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
