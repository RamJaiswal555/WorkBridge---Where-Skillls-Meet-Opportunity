import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, HardHat, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function RoleSelect() {
  useDocumentTitle('Welcome');
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Welcome to WorkBridge</h1>
      <p className="text-navy-500 dark:text-navy-400 mt-2">Tell us why you're here so we can tailor your experience.</p>

      <div className="grid gap-4 mt-8">
        <motion.div whileHover={{ y: -3 }}>
          <Link to="/login/customer" className="card card-hover flex items-center gap-4 p-5">
            <div className="h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-300 shrink-0">
              <Search className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-navy-900 dark:text-white">I'm looking for a professional</h3>
              <p className="text-sm text-navy-500 dark:text-navy-400 mt-0.5">Find trusted professionals near you.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-navy-300" />
          </Link>
        </motion.div>

        <motion.div whileHover={{ y: -3 }}>
          <Link to="/login/provider" className="card card-hover flex items-center gap-4 p-5">
            <div className="h-12 w-12 rounded-xl bg-secondary-50 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600 dark:text-secondary-300 shrink-0">
              <HardHat className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-navy-900 dark:text-white">I'm offering my skills</h3>
              <p className="text-sm text-navy-500 dark:text-navy-400 mt-0.5">Build your professional identity and find opportunities.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-navy-300" />
          </Link>
        </motion.div>
      </div>

      <p className="text-xs text-navy-400 text-center mt-8">
        By continuing, you agree to WorkBridge's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </div>
  );
}
