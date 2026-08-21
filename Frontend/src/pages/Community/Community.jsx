import { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, Plus } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { POSTS } from '../../data/community';
import { Tabs } from '../../components/common/Controls';
import { useApp } from '../../context/AppContext';

const TAGS = ['All', 'Safety Tip', 'Business Advice', 'Tool Recommendation', 'Career Advice', 'Work Opportunity'];

export default function Community() {
  useDocumentTitle('Community');
  const { showToast } = useApp();
  const [tag, setTag] = useState('All');
  const [posts, setPosts] = useState(POSTS.map((p) => ({ ...p, liked: false })));
  const [draft, setDraft] = useState('');

  const toggleLike = (id) => setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p)));

  const post = () => {
    if (!draft.trim()) return;
    setPosts((prev) => [{ id: `p-${Date.now()}`, author: 'You', role: 'Member', avatar: 'ME', time: 'Just now', tag: 'Tips', text: draft, likes: 0, comments: 0, shares: 0, liked: false }, ...prev]);
    setDraft('');
    showToast('Post shared with the community');
  };

  const filtered = tag === 'All' ? posts : posts.filter((p) => p.tag === tag);

  return (
    <div className="section py-8 max-w-2xl">
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white mb-1">Community</h1>
      <p className="text-navy-500 dark:text-navy-400 mb-6">Tips, career advice and opportunities from fellow professionals.</p>

      <div className="card p-4 mb-6">
        <div className="flex gap-3">
          <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold shrink-0">Me</div>
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={2} placeholder="Share a tip, question, or opportunity…" className="input resize-none flex-1" />
        </div>
        <div className="flex justify-end mt-2">
          <button onClick={post} className="btn-primary px-4 py-2 text-sm"><Send className="h-3.5 w-3.5" /> Post</button>
        </div>
      </div>

      <div className="mb-6 overflow-x-auto">
        <Tabs tabs={TAGS.map((t) => ({ value: t, label: t }))} active={tag} onChange={setTag} />
      </div>

      <div className="space-y-4">
        {filtered.map((p) => (
          <div key={p.id} className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-xs font-bold text-navy-600 dark:text-navy-200">{p.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy-900 dark:text-white">{p.author}</p>
                <p className="text-xs text-navy-400">{p.role} · {p.time}</p>
              </div>
              <span className="badge bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-[11px]">{p.tag}</span>
            </div>
            <p className="text-sm text-navy-700 dark:text-navy-200 leading-relaxed">{p.text}</p>
            <div className="flex items-center gap-5 mt-4 pt-3 border-t border-navy-100 dark:border-navy-800">
              <button onClick={() => toggleLike(p.id)} className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-navy-400 hover:text-red-500">
                <Heart className={p.liked ? 'h-4 w-4 fill-red-500 text-red-500' : 'h-4 w-4'} /> {p.likes}
              </button>
              <span className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-navy-400"><MessageCircle className="h-4 w-4" /> {p.comments}</span>
              <button onClick={() => showToast('Post shared')} className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-navy-400 hover:text-primary-600"><Share2 className="h-4 w-4" /> {p.shares}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
