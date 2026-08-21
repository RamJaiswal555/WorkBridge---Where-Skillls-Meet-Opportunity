import { ShieldCheck, IdCard, Star, MessageCircleMore, FileCheck2 } from 'lucide-react';

const points = [
  { icon: IdCard, title: 'Identity verification', text: 'Government ID and police verification checked before approval.' },
  { icon: FileCheck2, title: 'Professional profiles', text: 'Real experience, certificates and portfolio, not just a listing.' },
  { icon: Star, title: 'Reviews', text: 'Ratings from real completed jobs, visible on every profile.' },
  { icon: MessageCircleMore, title: 'Secure communication', text: 'Message and call within the app — no number sharing required.' },
  { icon: ShieldCheck, title: 'Transparent information', text: 'Charges, availability and verification status shown upfront.' },
];

export default function TrustSection() {
  return (
    <section className="bg-navy-900 dark:bg-navy-900/60 py-16 mt-4">
      <div className="section">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Built on trust, verified end to end</h2>
          <p className="text-navy-300 mt-1.5 max-w-xl mx-auto">Every element of WorkBridge is designed to make hiring a stranger feel safe.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {points.map((p) => (
            <div key={p.title} className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="text-white font-semibold text-sm">{p.title}</h3>
              <p className="text-navy-300 text-xs mt-1.5 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
