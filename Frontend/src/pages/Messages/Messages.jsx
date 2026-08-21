import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Send, Paperclip, Mic, Phone, Video, MoreVertical, Image as ImageIcon, ClipboardList } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import * as messageService from '../../api/api';
import { EmptyState, ListSkeleton } from '../../components/common/States';
import { cn } from '../../utils/cn';

export default function Messages() {
  useDocumentTitle('Messages');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    messageService.listConversations().then((data) => {
      setConversations(data);
      setActiveId(data[0]?.id);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [activeId, conversations]);

  const active = conversations.find((c) => c.id === activeId);
  const filtered = conversations.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const send = async () => {
    if (!draft.trim() || !active) return;
    const msg = await messageService.sendMessage(active.id, draft);
    setConversations((prev) =>
      prev.map((c) => (c.id === active.id ? { ...c, thread: [...c.thread, msg], lastMessage: msg.text, time: msg.time, unread: 0 } : c))
    );
    setDraft('');
  };

  if (loading) return <div className="section py-10"><ListSkeleton count={4} /></div>;

  return (
    <div className="section py-8">
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white mb-6">Messages</h1>
      <div className="card grid md:grid-cols-[300px_1fr] h-[70vh] overflow-hidden">
        <div className="border-r border-navy-100 dark:border-navy-800 flex flex-col">
          <div className="p-3 border-b border-navy-100 dark:border-navy-800">
            <div className="flex items-center gap-2 bg-navy-50 dark:bg-navy-800 rounded-xl px-3 py-2">
              <Search className="h-4 w-4 text-navy-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search conversations" className="bg-transparent outline-none text-sm w-full placeholder:text-navy-400" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <EmptyState title="No conversations found" />
            ) : (
              filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn('w-full flex items-center gap-3 px-4 py-3 text-left border-b border-navy-50 dark:border-navy-800/50 transition-colors', activeId === c.id ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-navy-50 dark:hover:bg-navy-800/50')}
                >
                  <div className="relative shrink-0">
                    <div className="h-11 w-11 rounded-full bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-sm font-bold text-navy-600 dark:text-navy-200">
                      {c.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}
                    </div>
                    {c.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-secondary-500 ring-2 ring-white dark:ring-navy-900" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-navy-900 dark:text-white truncate">{c.name}</p>
                      <span className="text-[11px] text-navy-400 shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs text-navy-400 truncate">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && <span className="h-5 w-5 rounded-full bg-primary-600 text-white text-[10px] flex items-center justify-center shrink-0">{c.unread}</span>}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col">
          {active ? (
            <>
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-navy-100 dark:border-navy-800">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-xs font-bold text-navy-600 dark:text-navy-200">
                    {active.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900 dark:text-white">{active.name}</p>
                    <p className="text-xs text-navy-400">{active.online ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="btn-ghost h-9 w-9 p-0" aria-label="Call"><Phone className="h-4 w-4" /></button>
                  <button className="btn-ghost h-9 w-9 p-0" aria-label="Video call"><Video className="h-4 w-4" /></button>
                  <button className="btn-ghost h-9 w-9 p-0" aria-label="More options"><MoreVertical className="h-4 w-4" /></button>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3 bg-navy-50/40 dark:bg-navy-950/40">
                <div className="flex justify-center">
                  <Link to={`/workers/${active.workerId}`} className="btn-outline px-3 py-1.5 text-xs bg-white dark:bg-navy-900">
                    <ClipboardList className="h-3.5 w-3.5" /> Request Service
                  </Link>
                </div>
                {active.thread.map((m, i) => (
                  <div key={i} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}>
                    <div className={cn('max-w-[70%] rounded-2xl px-4 py-2.5 text-sm', m.from === 'me' ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-white dark:bg-navy-800 text-navy-700 dark:text-navy-100 rounded-bl-sm shadow-soft')}>
                      {m.text}
                      <div className={cn('text-[10px] mt-1', m.from === 'me' ? 'text-primary-100' : 'text-navy-400')}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-navy-100 dark:border-navy-800 flex items-center gap-2">
                <button className="btn-ghost h-9 w-9 p-0" aria-label="Attach file"><Paperclip className="h-4 w-4" /></button>
                <button className="btn-ghost h-9 w-9 p-0" aria-label="Attach image"><ImageIcon className="h-4 w-4" /></button>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Type a message…"
                  className="input flex-1"
                />
                <button className="btn-ghost h-9 w-9 p-0" aria-label="Voice message"><Mic className="h-4 w-4" /></button>
                <button onClick={send} className="btn-primary h-9 w-9 p-0" aria-label="Send message"><Send className="h-4 w-4" /></button>
              </div>
            </>
          ) : (
            <EmptyState title="Select a conversation" />
          )}
        </div>
      </div>
    </div>
  );
}
