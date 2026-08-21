import { ShieldCheck, BadgeCheck, Award, Zap, Users, Star, Crown } from 'lucide-react';
import { cn } from '../../utils/cn';

export function VerificationBadge({ label = 'Verified', size = 'sm' }) {
  return (
    <span
      className={cn(
        'badge bg-secondary-50 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300 ring-1 ring-inset ring-secondary-200 dark:ring-secondary-800',
        size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      )}
    >
      <BadgeCheck className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      {label}
    </span>
  );
}

export function SkillBadge({ children }) {
  return (
    <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-xs px-2.5 py-1">
      {children}
    </span>
  );
}

const ACHIEVEMENT_ICONS = {
  'Top Rated': Star,
  'Reliable Worker': ShieldCheck,
  'Fast Responder': Zap,
  '100+ Jobs': Award,
  'Community Helper': Users,
  'Premium Worker': Crown,
};

export function AchievementBadge({ label }) {
  const Icon = ACHIEVEMENT_ICONS[label] || Award;
  return (
    <span className="badge bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 text-xs px-2.5 py-1">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export function TrustScore({ score = 0, size = 88 }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? '#10B981' : score >= 75 ? '#2563EB' : '#F59E0B';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="7" fill="none" className="text-navy-100 dark:text-navy-800" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ '--ring-full': circumference, '--ring-offset': offset }}
          className="animate-ring-fill"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-extrabold text-navy-900 dark:text-white leading-none">{score}</span>
        <span className="text-[9px] font-medium text-navy-400 mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

export function ProfileCompletion({ percent = 0 }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-navy-700 dark:text-navy-200">Profile completion</span>
        <span className="text-sm font-bold text-primary-600">{percent}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-navy-100 dark:bg-navy-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
