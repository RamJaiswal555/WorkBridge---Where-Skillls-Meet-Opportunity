import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Loader2, MapPin, Clock, Star, ShieldCheck, Wrench } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { WORKERS } from '../../data/workers';
import { formatINR, formatDistance } from '../../utils/format';
import { VerificationBadge } from '../../components/common/Badges';

const EXAMPLE_PROMPTS = [
  'I need an electrician for my new apartment.',
  'Looking for a reliable cook for weekday dinners.',
  'Deep cleaning before we move out this weekend.',
];

function scoreReasons(worker) {
  const reasons = [];
  if (worker.availableToday) reasons.push('Available today');
  if (worker.experienceYears >= 7) reasons.push(`${worker.experienceYears} years experience`);
  if (worker.rating >= 4.7) reasons.push('Highly rated');
  if (worker.distanceKm <= 3) reasons.push('Near your location');
  reasons.push(`${worker.skills[0]} specialist`);
  return reasons.slice(0, 4);
}

export default function Recommendations() {
  useDocumentTitle('AI Recommendations');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const run = (text) => {
    const q = (text ?? prompt).toLowerCase();
    setPrompt(text ?? prompt);
    setLoading(true);
    setTimeout(() => {
      const matches = WORKERS.filter((w) => q.split(' ').some((word) => w.category.includes(word) || w.skills.some((s) => s.toLowerCase().includes(word)) || w.title.toLowerCase().includes(word)));
      const pool = matches.length > 0 ? matches : WORKERS;
      const withMatch = pool.slice(0, 4).map((w, i) => ({ ...w, match: 96 - i * 4 }));
      setResults(withMatch);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="section py-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">AI Recommendations</h1>
      </div>
      <p className="text-navy-500 dark:text-navy-400 mb-6">Describe what you need in plain language — we'll match you with the right professionals.</p>

      <div className="card p-2 flex flex-col sm:flex-row gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          placeholder="I need an electrician for my new apartment…"
          className="flex-1 bg-transparent outline-none text-sm px-3 py-2.5 placeholder:text-navy-400"
        />
        <button onClick={() => run()} disabled={!prompt.trim() || loading} className="btn-primary px-6 py-2.5 text-sm">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Get Recommendations'}
        </button>
      </div>

      {!results && (
        <div className="flex flex-wrap gap-2 mt-4">
          {EXAMPLE_PROMPTS.map((p) => (
            <button key={p} onClick={() => run(p)} className="badge bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 text-navy-500 dark:text-navy-400 text-xs px-3 py-1.5 hover:border-primary-300">
              {p}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="mt-8 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-28 w-full" />)}
        </div>
      )}

      {results && !loading && (
        <div className="mt-8 space-y-4">
          <p className="text-sm text-navy-500 dark:text-navy-400">Found {results.length} strong matches for "{prompt}"</p>
          {results.map((w) => (
            <div key={w.id} className="card p-5 flex flex-col sm:flex-row gap-5">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${w.coverColor} flex items-center justify-center text-white font-bold shrink-0`}>{w.avatar}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link to={`/workers/${w.id}`} className="font-semibold text-navy-900 dark:text-white hover:text-primary-600">{w.name}</Link>
                    <span className="badge bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300 text-[11px] font-bold">{w.match}% Match</span>
                    {w.verified.identity && <VerificationBadge label="Verified" />}
                  </div>
                  <p className="text-sm text-navy-500 dark:text-navy-400">{w.title}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-navy-500 dark:text-navy-400">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {formatDistance(w.distanceKm)}</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" /> {w.rating}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {w.experienceYears} yrs</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-[11px] font-semibold text-navy-400 uppercase tracking-wide mb-1.5">Why we recommend this worker</p>
                    <div className="flex flex-wrap gap-1.5">
                      {scoreReasons(w).map((r) => (
                        <span key={r} className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-[11px]"><Wrench className="h-3 w-3" /> {r}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                <div className="text-right">
                  <span className="text-[11px] text-navy-400">Est. cost</span>
                  <p className="font-bold text-navy-900 dark:text-white">{formatINR(w.startingPrice)}+</p>
                </div>
                <Link to={`/workers/${w.id}`} className="btn-primary px-4 py-2 text-sm">View Profile</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
