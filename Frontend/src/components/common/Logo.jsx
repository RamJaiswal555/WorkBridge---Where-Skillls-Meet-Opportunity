import { Link } from 'react-router-dom';

export default function Logo({ compact = false, to = '/' }) {
  return (
    <Link to={to} className="flex items-center shrink-0" aria-label="WorkBridge home">
      <img
        src={encodeURI('/Logo WorkBridge.png')}
        alt="WorkBridge"
        className={compact ? 'h-11 w-11 object-contain' : 'h-14 w-auto object-contain'}
      />
    </Link>
  );
}
