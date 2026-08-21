import { useState } from 'react';
import { GraduationCap, Clock, Award, PlayCircle } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { COURSES } from '../../data/community';
import { Tabs } from '../../components/common/Controls';

const CATEGORIES = ['All', 'Electrical', 'Plumbing', 'Customer Service', 'Safety', 'Business', 'Digital Skills'];

export default function Learning() {
  useDocumentTitle('Learning Center');
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? COURSES : COURSES.filter((c) => c.category === cat);

  return (
    <div className="section py-8">
      <div className="flex items-center gap-2 mb-1">
        <GraduationCap className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Learning Center</h1>
      </div>
      <p className="text-navy-500 dark:text-navy-400 mb-6">Grow your skills and earn certificates that boost your profile trust score.</p>

      <div className="mb-6 overflow-x-auto">
        <Tabs tabs={CATEGORIES.map((c) => ({ value: c, label: c }))} active={cat} onChange={setCat} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <div key={c.id} className="card overflow-hidden group cursor-pointer">
            <div className="h-32 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center relative">
              <PlayCircle className="h-10 w-10 text-white/90 group-hover:scale-110 transition-transform" />
              <span className="absolute top-3 left-3 badge bg-white/90 text-navy-800 text-[11px]">{c.level}</span>
              {c.certificate && <span className="absolute top-3 right-3 badge bg-accent-50 text-accent-700 text-[11px]"><Award className="h-3 w-3" /> Certificate</span>}
            </div>
            <div className="p-4">
              <span className="text-[11px] font-semibold text-primary-600 uppercase tracking-wide">{c.category}</span>
              <h3 className="font-semibold text-navy-900 dark:text-white mt-1">{c.title}</h3>
              <p className="text-xs text-navy-400 mt-1">{c.instructor}</p>
              <div className="flex items-center gap-1 text-xs text-navy-400 mt-2"><Clock className="h-3.5 w-3.5" /> {c.duration}</div>
              {c.progress > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-navy-400">Progress</span>
                    <span className="font-semibold text-primary-600">{c.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-navy-100 dark:bg-navy-800 overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              )}
              <button className="btn-outline w-full mt-4 py-2 text-sm">{c.progress > 0 ? (c.progress === 100 ? 'Review' : 'Continue') : 'Start Course'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
