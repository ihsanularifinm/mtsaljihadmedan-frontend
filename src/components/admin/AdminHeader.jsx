'use client';

export default function AdminHeader({ setSidebarOpen }) {
	return (
		<header className="sticky top-0 z-30 bg-white shadow-sm lg:hidden">
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 -mb-px">
					<button
						className="text-gray-500 hover:text-gray-600 lg:hidden"
						onClick={(e) => {
							e.stopPropagation();
							setSidebarOpen(true);
						}}
					>
						<span className="sr-only">Open sidebar</span>
						<svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
							<rect x="4" y="5" width="16" height="2" />
							<rect x="4" y="11" width="16" height="2" />
							<rect x="4" y="17" width="16" height="2" />
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
}
