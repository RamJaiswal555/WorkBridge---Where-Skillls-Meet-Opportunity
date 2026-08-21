import { Apple, PlayCircle, Star } from 'lucide-react';

export default function AppPromotion() {
  return (
    <section className="section py-20">
      <div className="card p-10 sm:p-14 bg-gradient-to-br from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint bg-[length:28px_28px] opacity-10" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="badge bg-white/15 text-white text-xs px-3 py-1.5 mb-4">Coming soon</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Take WorkBridge with you</h2>
            <p className="text-primary-50 mt-3 max-w-md">
              Book professionals, chat, and manage your requests on the go with the WorkBridge mobile app.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button className="flex items-center gap-2 bg-white text-navy-900 rounded-xl px-4 py-2.5 text-sm font-semibold">
                <Apple className="h-4.5 w-4.5" /> App Store
              </button>
              <button className="flex items-center gap-2 bg-white text-navy-900 rounded-xl px-4 py-2.5 text-sm font-semibold">
                <PlayCircle className="h-4.5 w-4.5" /> Google Play
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-52 h-96 rounded-[2rem] bg-white/10 border border-white/20 backdrop-blur-sm flex flex-col p-4">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />)}
                <span className="text-xs ml-1">4.9 rating</span>
              </div>
              <div className="space-y-2.5 flex-1">
                <div className="h-16 rounded-xl bg-white/15" />
                <div className="h-16 rounded-xl bg-white/15" />
                <div className="h-16 rounded-xl bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
