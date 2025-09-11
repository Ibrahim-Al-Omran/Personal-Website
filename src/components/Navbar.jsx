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
			className="fixed top-4 right-4 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
			title={isHome ? 'Projects' : 'Home'}
		>
			{isHome ? <FolderOpen className="h-5 w-5" /> : <Home className="h-5 w-5" />}
		</Link>
	);
}
