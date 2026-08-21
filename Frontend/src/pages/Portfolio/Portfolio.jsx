import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import * as workerService from '../../api/api';
import { Tabs } from '../../components/common/Controls';
import { ListSkeleton } from '../../components/common/States';
import { getCategory } from '../../data/categories';

const PROJECT_TYPES = ['Before & After', 'Installation', 'Repair Job', 'Full Project'];

function buildProjects(worker) {
  return Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    type: PROJECT_TYPES[i % PROJECT_TYPES.length],
    description: `${worker.skills[i % worker.skills.length]} — completed for a client in ${worker.area}.`,
    date: `2026-0${(i % 7) + 1}-1${i}`,
    location: `${worker.area}, ${worker.city}`,
  }));
}

export default function Portfolio() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [tab, setTab] = useState('all');
  useDocumentTitle(worker ? `${worker.name} — Portfolio` : 'Portfolio');

  useEffect(() => {
    workerService.getWorker(id).then(setWorker);
  }, [id]);

  if (!worker) return <div className="section py-10"><ListSkeleton count={4} /></div>;

  const category = getCategory(worker.category);
  const projects = buildProjects(worker);

  return (
    <div className="section py-8">
      <Link to={`/workers/${worker.id}`} className="inline-flex items-center gap-1.5 text-sm text-navy-500 dark:text-navy-400 hover:text-navy-700 mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to profile
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${worker.coverColor} flex items-center justify-center text-white font-bold`}>{worker.avatar}</div>
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 dark:text-white">{worker.name}'s Portfolio</h1>
          <p className="text-sm text-navy-500 dark:text-navy-400">{category?.name} · {projects.length} projects showcased</p>
        </div>
      </div>

      <Tabs
        tabs={[{ value: 'all', label: 'All' }, { value: 'images', label: 'Images' }, { value: 'before-after', label: 'Before & After' }, { value: 'videos', label: 'Videos' }]}
        active={tab}
        onChange={setTab}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {projects.map((p) => (
          <div key={p.id} className="card overflow-hidden group cursor-pointer">
            <div className={`aspect-[4/3] bg-gradient-to-br ${worker.coverColor} opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300 flex items-end p-3`}>
              <span className="badge bg-white/90 text-navy-800 text-[11px]">{p.type}</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-navy-700 dark:text-navy-200">{p.description}</p>
              <div className="flex items-center justify-between mt-3 text-xs text-navy-400">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {p.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
