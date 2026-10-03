'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';

/** Hidden on the home landing; only shows a Home control on other routes. */
export default function Navbar() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <Link
      href="/"
      className="fixed top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all"
      style={{
        background: 'rgba(38,39,39,0.12)',
        border: '1px solid rgba(38,39,39,0.28)',
        color: '#262727',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(38,39,39,0.22)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(38,39,39,0.12)';
      }}
      title="Home"
    >
      <Home className="h-5 w-5" />
    </Link>
  );
}
