import { Search, ListChecks, MessagesSquare, CheckCircle2 } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Search', text: 'Tell us the skill and location — we surface verified professionals nearby.' },
  { icon: ListChecks, title: 'Compare', text: 'Check ratings, experience, trust score and portfolio side by side.' },
  { icon: MessagesSquare, title: 'Connect', text: 'Message or call directly to discuss the job and agree on a time.' },
  { icon: CheckCircle2, title: 'Get the Job Done', text: 'Get quality work done, then leave a review to help the community.' },
];

export default function HowItWorks() {
  return (
    <section className="section py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">How WorkBridge works</h2>
        <p className="text-navy-500 dark:text-navy-400 mt-1.5">From search to a job well done, in four simple steps.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((s, i) => (
          <div key={s.title} className="relative">
            <div className="card p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-11 w-11 rounded-xl bg-primary-600 text-white flex items-center justify-center">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-navy-300 dark:text-navy-600">STEP {i + 1}</span>
              </div>
              <h3 className="font-semibold text-navy-900 dark:text-white">{s.title}</h3>
              <p className="text-sm text-navy-500 dark:text-navy-400 mt-1.5">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
