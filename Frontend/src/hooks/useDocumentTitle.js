import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} · WorkBridge` : 'WorkBridge — Where Skills Meet Opportunity';
    return () => {
      document.title = prev;
    };
  }, [title]);
}
