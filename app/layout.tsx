import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'TerraLens - Environmental Data Visualization',
	description: 'Analyse et visualisation de données environnementales, économiques et géospatiales en temps réel',
	keywords: 'environnement, données, visualisation, météo, économie, géospatial',
	authors: [{ name: 'TerraLens Team' }],
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={inter.className}>
				<Header />
				<main>
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
