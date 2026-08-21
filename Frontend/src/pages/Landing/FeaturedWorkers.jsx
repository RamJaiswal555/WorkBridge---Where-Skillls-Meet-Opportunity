import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedWorkers } from '../../data/workers';
import WorkerCard from '../../components/workers/WorkerCard';

export default function FeaturedWorkers() {
  const workers = getFeaturedWorkers();
  return (
    <section className="section py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">Featured professionals</h2>
          <p className="text-navy-500 dark:text-navy-400 mt-1.5">Top-rated, verified workers ready to help this week.</p>
        </div>
        <Link to="/search" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {workers.slice(0, 6).map((w) => (
          <WorkerCard key={w.id} worker={w} />
        ))}
      </div>
    </section>
  );
}
