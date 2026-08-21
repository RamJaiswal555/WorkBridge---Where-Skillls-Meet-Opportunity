import { motion } from 'framer-motion';

export function StatisticsCard({ icon: Icon, value, label, accent = 'primary' }) {
  const accents = {
    primary: 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-300',
    secondary: 'text-secondary-600 bg-secondary-50 dark:bg-secondary-900/30 dark:text-secondary-300',
    accent: 'text-accent-600 bg-accent-50 dark:bg-accent-900/30 dark:text-accent-300',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card p-6 flex items-center gap-4"
    >
      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${accents[accent]}`}>
        <Icon className="h-5.5 w-5.5" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-navy-900 dark:text-white leading-none">{value}</p>
        <p className="text-sm text-navy-500 dark:text-navy-400 mt-1">{label}</p>
      </div>
    </motion.div>
  );
}
