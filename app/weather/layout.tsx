import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Météo en Temps Réel - TerraLens',
	description: 'Consultez les données météorologiques en temps réel pour n\'importe quelle ville. Température, humidité, vitesse du vent et prévisions détaillées.',
	keywords: 'météo, temps réel, prévisions, température, humidité, vent',
};

export default function WeatherLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}