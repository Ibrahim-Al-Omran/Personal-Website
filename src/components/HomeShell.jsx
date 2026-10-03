'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ExperienceLanding from '@/components/ExperienceLanding';
import DeskScene from '@/components/desk/DeskScene';

export default function HomeShell() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [desk, setDesk] = useState(false);

  useEffect(() => {
    setDesk(searchParams.get('view') === 'desk');
  }, [searchParams]);

  const openDesk = useCallback(() => {
    setDesk(true);
    // Push so browser Back returns to the main experience page.
    router.push(`${pathname}?view=desk`, { scroll: false });
  }, [pathname, router]);

  const closeDesk = useCallback(() => {
    setDesk(false);
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  if (desk) {
    return (
      <>
        <DeskScene />
        <button
          type="button"
          onClick={closeDesk}
          className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 rounded-full border border-white/40 bg-black/45 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-black/60"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to experience
        </button>
      </>
    );
  }

  return <ExperienceLanding onOpenDesk={openDesk} />;
}
