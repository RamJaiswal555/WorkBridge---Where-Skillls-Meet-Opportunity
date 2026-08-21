import { MapPin } from 'lucide-react';

export default function MapView({ workers }) {
  // Deterministic pseudo-positions so pins don't jump between renders
  const positions = workers.map((w, i) => ({
    ...w,
    top: 15 + ((i * 37) % 70),
    left: 10 + ((i * 53) % 80),
  }));

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-navy-100 dark:border-navy-800 bg-gradient-to-br from-navy-50 to-primary-50/40 dark:from-navy-900 dark:to-navy-900">
      <div className="absolute inset-0 bg-grid-faint bg-[length:24px_24px] opacity-40" />
      {positions.map((w) => (
        <div
          key={w.id}
          className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer"
          style={{ top: `${w.top}%`, left: `${w.left}%` }}
        >
          <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-bold shadow-card ring-4 ring-white dark:ring-navy-950 group-hover:scale-110 transition-transform">
            {w.avatar}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-9 hidden group-hover:block w-44 card p-2.5 text-left z-10">
            <p className="text-xs font-semibold text-navy-900 dark:text-white truncate">{w.name}</p>
            <p className="text-[11px] text-navy-400 truncate">{w.title}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-4 card px-3 py-2 text-xs text-navy-500 dark:text-navy-400 flex items-center gap-1.5">
        <MapPin className="h-3.5 w-3.5" /> Map view — live Google Maps integration coming soon
      </div>
    </div>
  );
}
