import { TestimonialCard } from '../../components/workers/ReviewCard';

const testimonials = [
  { name: 'Aarti Kulkarni', role: 'Customer · Mumbai', text: 'I found a verified electrician within minutes and he arrived the same evening. The trust score made the decision easy.', avatarColor: 'from-primary-400 to-primary-600' },
  { name: 'Ramesh Pawar', role: 'Electrician · WorkBridge Professional', text: 'My profile looks like a proper portfolio now. I get 3-4 booking requests a week just from search appearances.', avatarColor: 'from-amber-400 to-orange-500' },
  { name: 'Divya Raghavan', role: 'Customer · Bengaluru', text: 'Booked a deep clean before moving out — got our full deposit back. Messaging directly on the app made it so easy to coordinate.', avatarColor: 'from-secondary-400 to-secondary-600' },
];

export default function Testimonials() {
  return (
    <section className="section py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">Loved by customers and professionals</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
      </div>
    </section>
  );
}
