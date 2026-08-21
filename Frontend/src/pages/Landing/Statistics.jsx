import { Users, UserCheck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { StatisticsCard } from '../../components/common/StatisticsCard';

const stats = [
  { icon: Users, value: '21,870+', label: 'Skilled workers', accent: 'primary' },
  { icon: UserCheck, value: '26,343+', label: 'Happy customers', accent: 'secondary' },
  { icon: CheckCircle2, value: '96,540+', label: 'Services completed', accent: 'accent' },
  { icon: ShieldCheck, value: '15,992+', label: 'Verified professionals', accent: 'primary' },
];

export default function Statistics() {
  return (
    <section className="section py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatisticsCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
