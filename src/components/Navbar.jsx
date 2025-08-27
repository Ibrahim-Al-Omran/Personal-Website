'use client';

import Link from "next/link";
import { useState } from "react";
import { Home, FolderOpen, Menu, X } from "lucide-react";

export default function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Floating Toggle Button */}
			<button
				onClick={() => setOpen(!open)}
				className="fixed top-4 right-4 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
			>
				{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
			</button>

			{/* Popup Navigation */}
			<div className={`fixed top-20 right-4 z-40 transition-all duration-300 ease-out transform ${
				open 
					? 'opacity-100 translate-y-0 scale-100' 
					: 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
			}`}>
				<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg">
					<nav className="flex flex-col space-y-3">
						<Link
							href="/"
							onClick={() => setOpen(false)}
							className={`flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-md transition-all duration-200 transform ${
								open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
							}`}
							style={{ transitionDelay: open ? '100ms' : '0ms' }}
							title="Home"
						>
							<Home className="h-5 w-5" />
						</Link>
						<Link
							href="/projects"
							onClick={() => setOpen(false)}
							className={`flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-md transition-all duration-200 transform ${
								open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
							}`}
							style={{ transitionDelay: open ? '200ms' : '0ms' }}
							title="Projects"
						>
							<FolderOpen className="h-5 w-5" />
						</Link>
					</nav>
				</div>
			</div>

			{/* Backdrop with immediate blur */}
			<div className={`fixed inset-0 z-30 transition-all duration-300 ${
				open ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
			}`}
				onClick={() => setOpen(false)}
			/>
		</>
	);
}
