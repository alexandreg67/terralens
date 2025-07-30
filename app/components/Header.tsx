import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
	return (
		<header className="bg-primary text-white p-4" role="banner">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-2xl font-bold hover:text-accent focus:text-accent focus:outline-none focus:ring-2 focus:ring-accent" aria-label="TerraLens - Retour à l'accueil">
					TerraLens
				</Link>
				<nav role="navigation" aria-label="Navigation principale">
					<ul className="flex space-x-4">
						<li>
							<Link href="/" className="hover:text-accent focus:text-accent focus:outline-none focus:ring-2 focus:ring-accent px-2 py-1 rounded" aria-label="Accueil">
								Accueil
							</Link>
						</li>
						<li>
							<Link href="/weather" className="hover:text-accent focus:text-accent focus:outline-none focus:ring-2 focus:ring-accent px-2 py-1 rounded" aria-label="Données météorologiques">
								Météo
							</Link>
						</li>
						<li>
							<Link href="/economic" className="hover:text-accent focus:text-accent focus:outline-none focus:ring-2 focus:ring-accent px-2 py-1 rounded" aria-label="Données économiques">
								Économie
							</Link>
						</li>
						<li>
							<Link href="/geospatial" className="hover:text-accent focus:text-accent focus:outline-none focus:ring-2 focus:ring-accent px-2 py-1 rounded" aria-label="Données géospatiales">
								Géospatial
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
