import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryCard({ category }) {
  const Icon = Icons[category.icon] || Icons.Grid2x2;
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Link
        to={`/search?category=${category.id}`}
        className="card card-hover flex flex-col items-start gap-3 p-5 h-full group"
      >
        <div className="h-11 w-11 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-300 group-hover:bg-primary-600 group-hover:text-white transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-navy-900 dark:text-white text-sm">{category.name}</h3>
          <p className="text-xs text-navy-500 dark:text-navy-400 mt-0.5">{category.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
