import { Link } from 'react-router-dom';
import { Globe, Image, MessageCircle, Briefcase, Video } from 'lucide-react';
import Logo from '../common/Logo';

const columns = [
  { title: 'Company', links: [{ label: 'About', to: '/' }, { label: 'Careers', to: '/' }, { label: 'Press', to: '/' }] },
  { title: 'For Customers', links: [{ label: 'Find Workers', to: '/search' }, { label: 'How it Works', to: '/' }, { label: 'Safety', to: '/' }] },
  { title: 'For Workers', links: [{ label: 'Join WorkBridge', to: '/signup/provider' }, { label: 'Success Stories', to: '/community' }, { label: 'Learning Center', to: '/learning' }] },
  { title: 'Resources', links: [{ label: 'Community', to: '/community' }, { label: 'Help Center', to: '/' }, { label: 'Privacy Policy', to: '/' }, { label: 'Terms of Service', to: '/' }] },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950 mt-20">
      <div className="section py-14 grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2">
          <Logo />
          <p className="text-sm text-navy-500 dark:text-navy-400 mt-4 max-w-xs">
            Where Skills Meet Opportunity. Connecting trusted household professionals with the customers who need them.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Globe, Image, MessageCircle, Briefcase, Video].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="h-9 w-9 rounded-full bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:bg-primary-600 hover:text-white transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-navy-900 dark:text-white mb-3.5">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-navy-500 dark:text-navy-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-navy-100 dark:border-navy-800">
        <div className="section py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-navy-400">
          <p>© 2026 WorkBridge Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Made for professionals across India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
