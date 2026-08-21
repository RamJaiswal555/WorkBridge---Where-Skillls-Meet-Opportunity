import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Tabs({ tabs, active, onChange }) {
  return (
    <div role="tablist" className="flex items-center gap-1 rounded-xl bg-navy-100/70 dark:bg-navy-800/70 p-1 w-fit overflow-x-auto">
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={active === t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            'px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
            active === t.value
              ? 'bg-white dark:bg-navy-950 text-primary-700 dark:text-primary-300 shadow-soft'
              : 'text-navy-500 dark:text-navy-400 hover:text-navy-700 dark:hover:text-navy-200'
          )}
        >
          {t.label}
          {t.count != null && <span className="ml-1.5 opacity-60">({t.count})</span>}
        </button>
      ))}
    </div>
  );
}

export function Dropdown({ label, options, value, onChange, icon: Icon }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  const selected = options.find((o) => o.value === value);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn-outline px-3.5 py-2 text-sm bg-white dark:bg-navy-900"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {selected ? selected.label : label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </button>
      {open && (
        <div role="listbox" className="absolute z-30 mt-2 w-52 card p-1.5 shadow-card max-h-64 overflow-y-auto">
          {options.map((o) => (
            <button
              key={o.value}
              role="option"
              aria-selected={value === o.value}
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                value === o.value ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'hover:bg-navy-50 dark:hover:bg-navy-800 text-navy-700 dark:text-navy-200'
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)} className="btn-ghost h-9 w-9 p-0 disabled:opacity-30" aria-label="Previous page">
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          aria-current={page === i + 1 ? 'page' : undefined}
          className={cn(
            'h-9 w-9 rounded-lg text-sm font-medium transition-colors',
            page === i + 1 ? 'bg-primary-600 text-white' : 'text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800'
          )}
        >
          {i + 1}
        </button>
      ))}
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)} className="btn-ghost h-9 w-9 p-0 disabled:opacity-30" aria-label="Next page">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
