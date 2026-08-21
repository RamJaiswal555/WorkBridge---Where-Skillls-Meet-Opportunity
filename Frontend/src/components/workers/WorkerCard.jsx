import { Link } from 'react-router-dom';
import { Star, MapPin, Briefcase, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { VerificationBadge } from '../common/Badges';
import { formatINR, formatDistance } from '../../utils/format';
import { getCategory } from '../../data/categories';
import { cn } from '../../utils/cn';

export default function WorkerCard({ worker, saved, onToggleSave, matchPercent }) {
  const category = getCategory(worker.category);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card card-hover overflow-hidden group"
    >
      <div className={cn('h-20 bg-gradient-to-br relative', worker.coverColor)}>
        {matchPercent && (
          <span className="absolute top-3 left-3 badge bg-white/90 text-secondary-700 text-xs font-bold px-2.5 py-1 shadow-soft">
            {matchPercent}% Match
          </span>
        )}
        {onToggleSave && (
          <button
            onClick={(e) => { e.preventDefault(); onToggleSave(worker.id); }}
            aria-label={saved ? 'Remove from saved' : 'Save professional'}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center shadow-soft hover:scale-105 transition-transform"
          >
            <Heart className={cn('h-4 w-4', saved ? 'fill-red-500 text-red-500' : 'text-navy-500')} />
          </button>
        )}
        <div className="absolute -bottom-7 left-4 h-14 w-14 rounded-2xl bg-white dark:bg-navy-900 shadow-card flex items-center justify-center font-bold text-navy-700 dark:text-white ring-4 ring-white dark:ring-navy-900">
          {worker.avatar}
        </div>
      </div>
      <div className="pt-9 px-4 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to={`/workers/${worker.id}`} className="font-semibold text-navy-900 dark:text-white hover:text-primary-600 truncate block">
              {worker.name}
            </Link>
            <p className="text-xs text-navy-500 dark:text-navy-400 truncate">{worker.title}</p>
          </div>
          {worker.verified.identity && <VerificationBadge label="Verified" />}
        </div>

        <div className="flex items-center gap-3 mt-2.5 text-xs text-navy-500 dark:text-navy-400">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
            <span className="font-semibold text-navy-800 dark:text-navy-100">{worker.rating}</span>
            <span>({worker.reviewsCount})</span>
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" /> {worker.experienceYears} yrs
          </span>
          <span className="flex items-center gap-1 truncate">
            <MapPin className="h-3.5 w-3.5" /> {formatDistance(worker.distanceKm)}
          </span>
        </div>

        <p className="text-xs text-navy-500 dark:text-navy-400 mt-2 line-clamp-2">{worker.about}</p>

        <div className="flex items-center justify-between mt-3.5">
          <div>
            <span className="text-[11px] text-navy-400">Starting at</span>
            <p className="text-sm font-bold text-navy-900 dark:text-white">{formatINR(worker.startingPrice)}</p>
          </div>
          {worker.availableToday && (
            <span className="badge bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300 text-[11px]">
              <Zap className="h-3 w-3" /> Available today
            </span>
          )}
        </div>

        <Link to={`/workers/${worker.id}`} className="btn-primary w-full mt-4 py-2 text-sm">
          View Profile
        </Link>
      </div>
    </motion.div>
  );
}
