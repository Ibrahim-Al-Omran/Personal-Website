'use client';

import Link from "next/link";
import { useState } from "react";
import { Home, FolderOpen, Menu, X } from "lucide-react";

export default function CactusNavbar() {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Floating Cactus Toggle Button */}
			<button
				onClick={() => setOpen(!open)}
				className="cactus-button cactus-navbar-toggle w-14 h-14 flex items-center justify-center transition-all duration-300 cactus-cursor-pointer"
				style={{
					background: open 
						? 'linear-gradient(45deg, var(--desert-terracotta), var(--spine-orange))' 
						: 'linear-gradient(45deg, var(--cactus-green-medium), var(--cactus-green-light))',
					borderRadius: open ? '50%' : '20px',
					transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
				}}
			>
				{open ? (
					<X className="h-6 w-6 text-desert-cream" style={{ transform: 'rotate(-45deg)' }} />
				) : (
					<Menu className="h-5 w-5 text-desert-cream" />
				)}
			</button>

			{/* Cactus Popup Navigation */}
			<div className={`cactus-navbar-popup transition-all duration-500 ease-out transform ${
				open 
					? 'opacity-100 translate-y-0 scale-100' 
					: 'opacity-0 -translate-y-8 scale-90 pointer-events-none'
			}`}>
				<div className="cactus-nav p-6 shadow-2xl relative overflow-hidden">
					{/* Desert background pattern */}
					<div className="absolute inset-0 desert-pattern opacity-30"></div>
					
					{/* Navigation content */}
					<nav className="relative z-10 flex flex-col space-y-4">
						<div className="text-center mb-2">
							<h3 className="cactus-heading text-lg font-bold">
								Navigation
							</h3>
						</div>

						<Link
							href="/"
							onClick={() => setOpen(false)}
							className={`cactus-button flex items-center space-x-3 px-4 py-3 transition-all duration-300 transform cactus-cursor-pointer ${
								open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
							}`}
							style={{ 
								transitionDelay: open ? '100ms' : '0ms',
								background: 'linear-gradient(45deg, var(--cactus-green-light), var(--cactus-green-medium))',
							}}
						>
							<Home className="h-5 w-5" />
							<span className="text-sm font-medium">Home Oasis</span>
						</Link>

						<Link
							href="/projects"
							onClick={() => setOpen(false)}
							className={`cactus-button flex items-center space-x-3 px-4 py-3 transition-all duration-300 transform cactus-cursor-pointer ${
								open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
							}`}
							style={{ 
								transitionDelay: open ? '200ms' : '0ms',
								background: 'linear-gradient(45deg, var(--earth-brown), var(--earth-bark))',
							}}
						>
							<FolderOpen className="h-5 w-5" />
							<span className="text-sm font-medium">Projects</span>
						</Link>

					</nav>
				</div>
			</div>

			{/* Background overlay when menu is open */}
			{open && (
				<div 
					className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
					onClick={() => setOpen(false)}
				/>
			)}
		</>
	);
}
