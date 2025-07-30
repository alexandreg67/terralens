import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Données Économiques - TerraLens',
	description: 'Analysez les indicateurs économiques mondiaux : PIB, taux de chômage, espérance de vie, émissions CO2 et plus.',
	keywords: 'économie, PIB, indicateurs, statistiques, pays, développement',
};

export default function EconomicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}