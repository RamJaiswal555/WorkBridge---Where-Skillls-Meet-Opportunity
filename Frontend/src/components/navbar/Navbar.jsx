import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, MessageSquare, Sun, Moon, Monitor, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import Logo from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

const loggedOutLinks = [
  { to: '/search', label: 'Find Workers' },
  { to: '/search', label: 'Services' },
  { to: '/community', label: 'Community' },
  { to: '/learning', label: 'Learning' },
];

const customerLinks = [
  { to: '/search', label: 'Find Workers' },
  { to: '/bookings', label: 'Bookings' },
  { to: '/messages', label: 'Messages' },
];

const providerLinks = [
  { to: '/recommendations', label: 'Find Opportunities' },
  { to: '/dashboard/provider', label: 'Dashboard' },
  { to: '/messages', label: 'Messages' },
  { to: '/bookings', label: 'Bookings' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, role } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = !isAuthenticated ? loggedOutLinks : role === 'provider' ? providerLinks : customerLinks;

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate('/');
  };

  const themeIcon = { light: Sun, dark: Moon, system: Monitor }[theme];
  const ThemeIcon = themeIcon;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-soft' : 'bg-surface/80 dark:bg-navy-950/80 backdrop-blur-sm'
      )}
    >
      <nav className="section flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30' : 'text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100/60 dark:hover:bg-navy-800/60'
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
            className="btn-ghost h-9 w-9 p-0"
            aria-label="Toggle theme"
            title={`Theme: ${theme}`}
          >
            <ThemeIcon className="h-4 w-4" />
          </button>

          {isAuthenticated ? (
            <>
              <Link to="/notifications" className="btn-ghost h-9 w-9 p-0 relative" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-500" />
              </Link>
              <Link to="/messages" className="btn-ghost h-9 w-9 p-0" aria-label="Messages">
                <MessageSquare className="h-4 w-4" />
              </Link>
              <div className="relative">
                <button onClick={() => setMenuOpen((o) => !o)} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold">
                    {user?.avatar || 'U'}
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-navy-400" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-52 card p-1.5 shadow-card">
                    <div className="px-3 py-2 border-b border-navy-100 dark:border-navy-800 mb-1">
                      <p className="text-sm font-semibold text-navy-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-xs text-navy-400 capitalize">{role}</p>
                    </div>
                    <Link onClick={() => setMenuOpen(false)} to={role === 'provider' ? '/dashboard/provider' : '/dashboard/customer'} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800">
                      <User className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link onClick={() => setMenuOpen(false)} to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800">
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn-ghost px-4 py-2 text-sm">Log in</Link>
              <Link to="/auth" className="btn-primary px-4 py-2 text-sm">Join WorkBridge</Link>
            </>
          )}
        </div>

        <button className="lg:hidden btn-ghost h-9 w-9 p-0" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden glass border-t border-navy-100 dark:border-navy-800 px-5 py-4 space-y-1">
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-800">
              {l.label}
            </Link>
          ))}
          <div className="h-px bg-navy-100 dark:bg-navy-800 my-2" />
          {isAuthenticated ? (
            <>
              <Link to={role === 'provider' ? '/dashboard/provider' : '/dashboard/customer'} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-800">Dashboard</Link>
              <Link to="/notifications" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-800">Notifications</Link>
              <Link to="/settings" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-800">Settings</Link>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Log out</button>
            </>
          ) : (
            <div className="flex gap-2 pt-1">
              <Link to="/auth" onClick={() => setOpen(false)} className="btn-outline flex-1 py-2 text-sm">Log in</Link>
              <Link to="/auth" onClick={() => setOpen(false)} className="btn-primary flex-1 py-2 text-sm">Join</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
