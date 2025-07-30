import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Données Géospatiales - TerraLens',
	description: 'Explorez les stations de surveillance environnementale sur une carte interactive. Données de qualité de l\'air et météorologiques.',
	keywords: 'géospatial, cartes, surveillance, environnement, stations, qualité air',
};

export default function GeospatialLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}