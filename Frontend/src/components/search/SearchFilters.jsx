import { Sliders } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export default function SearchFilters({ filters, setFilters }) {
  const update = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <div className="card p-5 space-y-6 sticky top-24">
      <div className="flex items-center gap-2">
        <Sliders className="h-4 w-4 text-navy-400" />
        <h3 className="font-semibold text-navy-900 dark:text-white text-sm">Filters</h3>
      </div>

      <div>
        <label className="label">Category</label>
        <select className="input" value={filters.category} onChange={(e) => update('category', e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div>
        <label className="label">Max Distance: {filters.maxDistance} km</label>
        <input type="range" min="1" max="10" value={filters.maxDistance} onChange={(e) => update('maxDistance', Number(e.target.value))} className="w-full accent-primary-600" />
      </div>

      <div>
        <label className="label">Minimum Rating</label>
        <div className="flex gap-1.5">
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => update('minRating', r)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${filters.minRating === r ? 'bg-primary-600 text-white border-primary-600' : 'border-navy-200 dark:border-navy-700 text-navy-500'}`}
            >
              {r === 0 ? 'Any' : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Gender</label>
        <select className="input" value={filters.gender} onChange={(e) => update('gender', e.target.value)}>
          <option value="">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="flex items-center justify-between text-sm text-navy-700 dark:text-navy-200">
          Verified only
          <input type="checkbox" checked={filters.verifiedOnly} onChange={(e) => update('verifiedOnly', e.target.checked)} className="h-4 w-4 rounded accent-primary-600" />
        </label>
        <label className="flex items-center justify-between text-sm text-navy-700 dark:text-navy-200">
          Available today
          <input type="checkbox" checked={filters.availableToday} onChange={(e) => update('availableToday', e.target.checked)} className="h-4 w-4 rounded accent-primary-600" />
        </label>
        <label className="flex items-center justify-between text-sm text-navy-700 dark:text-navy-200">
          Emergency availability
          <input type="checkbox" checked={filters.emergency} onChange={(e) => update('emergency', e.target.checked)} className="h-4 w-4 rounded accent-primary-600" />
        </label>
      </div>

      <button
        onClick={() => setFilters({ category: '', maxDistance: 10, minRating: 0, gender: '', verifiedOnly: false, availableToday: false, emergency: false })}
        className="btn-ghost w-full py-2 text-sm"
      >
        Clear all filters
      </button>
    </div>
  );
}
