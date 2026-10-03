'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderOpen } from "lucide-react";

export default function Navbar() {
	const pathname = usePathname();
	const isHome = pathname === '/';

	return (
		<Link
			href={isHome ? '/projects' : '/'}
			className={`fixed top-4 right-4 z-50 w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all ${isHome ? 'md:hidden' : ''}`}
			style={{
				background: 'rgba(32,18,1,0.18)',
				border: '1px solid rgba(32,18,1,0.35)',
				color: '#201201',
			}}
			onMouseEnter={e => e.currentTarget.style.background = 'rgba(32,18,1,0.30)'}
			onMouseLeave={e => e.currentTarget.style.background = 'rgba(32,18,1,0.18)'}
			title={isHome ? 'Projects' : 'Home'}
		>
			{isHome ? <FolderOpen className="h-5 w-5" /> : <Home className="h-5 w-5" />}
		</Link>
	);
}
