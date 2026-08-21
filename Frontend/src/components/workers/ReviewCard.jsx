import { Star, Quote } from 'lucide-react';
import { initials } from '../../utils/format';

export function ReviewCard({ review }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-sm font-bold text-navy-600 dark:text-navy-200">
            {initials(review.customer)}
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-900 dark:text-white">{review.customer}</p>
            <p className="text-xs text-navy-400">{new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-accent-500 text-accent-500' : 'text-navy-200 dark:text-navy-700'}`} />
          ))}
        </div>
      </div>
      <p className="text-sm text-navy-600 dark:text-navy-300 mt-3 leading-relaxed">{review.text}</p>
    </div>
  );
}

export function TestimonialCard({ name, role, text, avatarColor = 'from-primary-400 to-primary-600' }) {
  return (
    <div className="card p-6 relative">
      <Quote className="h-7 w-7 text-primary-100 dark:text-primary-900 absolute top-4 right-4" />
      <p className="text-sm text-navy-600 dark:text-navy-300 leading-relaxed relative z-10">"{text}"</p>
      <div className="flex items-center gap-3 mt-5">
        <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
          {initials(name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-900 dark:text-white">{name}</p>
          <p className="text-xs text-navy-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
