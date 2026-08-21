import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { WORKERS } from '../../data/workers';

export default function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Mumbai');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}&city=${encodeURIComponent(location)}`);
  };

  const spotlight = WORKERS.slice(0, 3);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-faint bg-[length:36px_36px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-200/40 dark:bg-primary-900/20 blur-3xl" />
      <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-secondary-200/40 dark:bg-secondary-900/20 blur-3xl" />

      <div className="section relative pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 px-3 py-1.5 text-xs font-semibold mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" /> Trusted by 26,000+ households across India
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-navy-900 dark:text-white leading-[1.08]"
          >
            Where Skills <br className="hidden sm:block" />
            Meet <span className="text-primary-600">Opportunity.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-navy-500 dark:text-navy-400 mt-5 max-w-lg"
          >
            Discover trusted professionals nearby, or build your professional identity and connect with new opportunities.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSearch}
            className="mt-8 card p-2 flex flex-col sm:flex-row gap-2"
          >
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="h-4.5 w-4.5 text-navy-400 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Electrician, plumber, cook…"
                className="w-full bg-transparent outline-none text-sm py-2.5 placeholder:text-navy-400"
              />
            </div>
            <div className="hidden sm:block w-px bg-navy-100 dark:bg-navy-800" />
            <div className="flex items-center gap-2 sm:w-40 px-3">
              <MapPin className="h-4.5 w-4.5 text-navy-400 shrink-0" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City"
                className="w-full bg-transparent outline-none text-sm py-2.5 placeholder:text-navy-400"
              />
            </div>
            <button type="submit" className="btn-primary px-6 py-2.5 text-sm">
              Find Worker <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mt-5"
          >
            <span className="text-sm text-navy-400">Or</span>
            <button onClick={() => navigate('/signup/provider')} className="btn-outline px-4 py-2 text-sm bg-white dark:bg-navy-900">
              Join as a Professional
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="card p-5 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-navy-900 dark:text-white">Nearby & available now</span>
              <span className="badge bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300 text-[11px]">Live</span>
            </div>
            <div className="space-y-3">
              {spotlight.map((w) => (
                <div key={w.id} className="flex items-center gap-3 p-3 rounded-xl border border-navy-100 dark:border-navy-800">
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${w.coverColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {w.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy-900 dark:text-white truncate">{w.name}</p>
                    <p className="text-xs text-navy-400 truncate">{w.title} · {w.area}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-navy-700 dark:text-navy-200 shrink-0">
                    <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" /> {w.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 card p-4 flex items-center gap-3 z-20 shadow-card">
            <div className="h-10 w-10 rounded-xl bg-secondary-50 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600 dark:text-secondary-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-navy-900 dark:text-white leading-none">Identity Verified</p>
              <p className="text-[11px] text-navy-400 mt-1">Every professional checked</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
