'use client';

import { Suspense } from 'react';
import HomeShell from '@/components/HomeShell';

function LandingFallback() {
  return <div className="exp-stage" style={{ background: '#faf9f2' }} aria-hidden />;
}

export default function Home() {
  return (
    <Suspense fallback={<LandingFallback />}>
      <HomeShell />
    </Suspense>
  );
}
