import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-surface dark:bg-navy-950">
      <span className="text-7xl font-extrabold text-primary-100 dark:text-primary-900/40">404</span>
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white mt-2">Page not found</h1>
      <p className="text-navy-500 dark:text-navy-400 mt-2 max-w-sm">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/" className="btn-primary px-5 py-2.5 mt-6"><Home className="h-4 w-4" /> Back to Home</Link>
    </div>
  );
}
