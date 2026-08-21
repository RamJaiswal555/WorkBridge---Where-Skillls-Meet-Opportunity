import { AlertTriangle, Inbox, RotateCw } from 'lucide-react';

export function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-14 w-14 rounded-2xl bg-navy-100 dark:bg-navy-800 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-navy-400" />
      </div>
      <h3 className="font-semibold text-navy-900 dark:text-white">{title}</h3>
      {message && <p className="text-sm text-navy-500 dark:text-navy-400 mt-1 max-w-xs">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-14 w-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
        <AlertTriangle className="h-6 w-6 text-red-500" />
      </div>
      <h3 className="font-semibold text-navy-900 dark:text-white">{message}</h3>
      {onRetry && (
        <button onClick={onRetry} className="btn-outline mt-4 px-4 py-2 text-sm">
          <RotateCw className="h-4 w-4" /> Try again
        </button>
      )}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-4">
      <div className="skeleton h-32 w-full mb-4" />
      <div className="skeleton h-4 w-3/4 mb-2" />
      <div className="skeleton h-3 w-1/2 mb-4" />
      <div className="flex gap-2">
        <div className="skeleton h-6 w-16" />
        <div className="skeleton h-6 w-16" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-4 flex items-center gap-4">
          <div className="skeleton h-12 w-12 rounded-full shrink-0" />
          <div className="flex-1">
            <div className="skeleton h-4 w-1/3 mb-2" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
