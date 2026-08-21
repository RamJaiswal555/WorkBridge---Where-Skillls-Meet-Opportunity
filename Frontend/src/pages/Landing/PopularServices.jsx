import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/categories';
import CategoryCard from '../../components/services/ServiceCard';

const popular = ['electrician', 'plumber', 'cleaner', 'cook', 'carpenter', 'ac-technician', 'painter', 'gardener'];

export default function PopularServices() {
  const categories = popular.map((id) => CATEGORIES.find((c) => c.id === id));
  return (
    <section className="section py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">Popular services</h2>
          <p className="text-navy-500 dark:text-navy-400 mt-1.5">Browse the household categories customers book most.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
            <CategoryCard category={c} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
