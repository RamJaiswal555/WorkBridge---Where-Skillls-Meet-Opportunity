import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, LayoutList, Map as MapIcon } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import * as workerService from '../../api/api';
import * as customerService from '../../api/api';
import SearchFilters from '../../components/search/SearchFilters';
import MapView from '../../components/search/MapView';
import WorkerCard from '../../components/workers/WorkerCard';
import { Tabs, Dropdown, Pagination } from '../../components/common/Controls';
import { EmptyState, CardSkeleton, ErrorState } from '../../components/common/States';
import { CATEGORIES } from '../../data/categories';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'rating', label: 'Rating' },
  { value: 'distance', label: 'Distance' },
  { value: 'experience', label: 'Experience' },
  { value: 'price', label: 'Price' },
];

const PAGE_SIZE = 6;

export default function SearchPage() {
  useDocumentTitle('Find Workers');
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [view, setView] = useState('list');
  const [sortBy, setSortBy] = useState('recommended');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [saved, setSaved] = useState([]);
  const [filters, setFilters] = useState({
    category: params.get('category') || '',
    maxDistance: 10,
    minRating: 0,
    gender: '',
    verifiedOnly: false,
    availableToday: false,
    emergency: false,
  });

  useEffect(() => {
    customerService.getSavedWorkerIds().then(setSaved);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    workerService
      .listWorkers({ ...filters, query, city: params.get('city') || undefined, sortBy })
      .then(setResults)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    setPage(1);
  }, [filters, query, sortBy]);

  const toggleSave = async (id) => setSaved(await customerService.toggleSavedWorker(id));

  const paged = useMemo(() => results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [results, page]);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));

  const categoryTabs = [{ value: '', label: 'All', count: undefined }, ...CATEGORIES.slice(0, 6).map((c) => ({ value: c.id, label: c.name }))];

  return (
    <div className="section py-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-2 flex-1 card px-4 py-2.5">
          <SearchIcon className="h-4.5 w-4.5 text-navy-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by skill, name or location…"
            className="w-full bg-transparent outline-none text-sm placeholder:text-navy-400"
          />
        </div>
        <Dropdown label="Sort by" options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
        <div className="flex items-center gap-1 rounded-xl bg-navy-100 dark:bg-navy-800 p-1">
          <button onClick={() => setView('list')} className={`h-9 w-9 rounded-lg flex items-center justify-center ${view === 'list' ? 'bg-white dark:bg-navy-950 shadow-soft' : ''}`} aria-label="List view">
            <LayoutList className="h-4 w-4" />
          </button>
          <button onClick={() => setView('map')} className={`h-9 w-9 rounded-lg flex items-center justify-center ${view === 'map' ? 'bg-white dark:bg-navy-950 shadow-soft' : ''}`} aria-label="Map view">
            <MapIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-6 overflow-x-auto">
        <Tabs tabs={categoryTabs} active={filters.category} onChange={(v) => setFilters((f) => ({ ...f, category: v }))} />
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <SearchFilters filters={filters} setFilters={setFilters} />

        <div>
          <p className="text-sm text-navy-500 dark:text-navy-400 mb-4">{loading ? 'Searching…' : `${results.length} professionals found`}</p>

          {error ? (
            <ErrorState onRetry={() => setFilters((f) => ({ ...f }))} />
          ) : loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : results.length === 0 ? (
            <EmptyState title="No workers found" message="Try changing your location or filters." />
          ) : view === 'map' ? (
            <MapView workers={results} />
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paged.map((w) => (
                  <WorkerCard key={w.id} worker={w} saved={saved.includes(w.id)} onToggleSave={toggleSave} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
