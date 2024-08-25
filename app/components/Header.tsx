import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
	return (
		<header className="bg-primary text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">TerraLens</h1>
				<nav>
					<ul className="flex space-x-4">
						<li>
							<Link href="/" className="hover:text-accent">
								Home
							</Link>
						</li>
						<li>
							<Link href="/weather" className="hover:text-accent">
								Weather
							</Link>
						</li>
						<li>
							<Link href="/economic" className="hover:text-accent">
								Economy
							</Link>
						</li>
						<li>
							<Link href="/geospatial" className="hover:text-accent">
								Geospatial
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
