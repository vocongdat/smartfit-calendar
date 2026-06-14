import Button from '@/atoms/button';
import { DumbbellIcon } from '@/atoms/icon';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex app-min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="flex size-16 animate-pop items-center justify-center rounded-2xl bg-accent text-accentfg shadow-glow">
        <DumbbellIcon className="size-8" />
      </span>
      <div>
        <p className="font-display text-7xl font-bold leading-none text-content">
          404
        </p>
        <p className="mt-2 text-muted">
          This page skipped leg day — we couldn&apos;t find it.
        </p>
      </div>
      <Link to="/">
        <Button variant="primary">Back to calendar</Button>
      </Link>
    </div>
  );
}

export default NotFound;
