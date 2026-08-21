import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import ToastContainer from '../components/common/Toast';
import { ShieldCheck, Star, Users } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface dark:bg-navy-950">
      <div className="flex flex-col px-6 sm:px-12 py-8">
        <Logo />
        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex relative bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint bg-[length:32px_32px] opacity-30" />
        <div className="relative z-10 flex flex-col justify-center px-14 text-white">
          <h2 className="text-3xl font-extrabold leading-tight max-w-md">
            Where Skills Meet Opportunity.
          </h2>
          <p className="text-primary-100 mt-4 max-w-sm">
            Join thousands of professionals and customers building trusted working relationships across India.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { icon: ShieldCheck, text: 'Identity, police & certificate verification' },
              { icon: Star, text: 'Transparent ratings and reviews' },
              { icon: Users, text: '21,000+ verified professionals nationwide' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <f.icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm text-primary-50">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
