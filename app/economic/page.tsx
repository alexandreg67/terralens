'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic'; // Importer dynamic pour charger des composants dynamiquement

import EconomicDataFetcher from '../components/economic/EconomicDataFetcher';
import GDPGrowthRateCard from '../components/economic/GDPGrowthRateCard';
import LifeExpectancyCard from '../components/economic/LifeExpectancyCard';
import UnemploymentRateCard from '../components/economic/UnemploymentRateCard';
import PovertyRateCard from '../components/economic/PovertyRateCard';
import CO2EmissionsCard from '../components/economic/CO2EmissionsCard';

// Charger CountrySelector dynamiquement avec SSR désactivé
const CountrySelector = dynamic(
	() => import('../components/economic/CountrySelector'),
	{
		ssr: false,
	}
);

const EconomicPage: React.FC = () => {
	const [selectedCountry, setSelectedCountry] = useState<string>('US');

	const handleCountryChange = (countryCode: string) => {
		setSelectedCountry(countryCode);
	};

	return (
		<div className="container mx-auto p-6">
			{/* Titre et description */}
			<div className="text-center mb-6">
				<h1 className="text-4xl font-bold mb-2 text-primary">
					Economic Data Dashboard
				</h1>
				<p className="text-lg text-gray-700 dark:text-gray-300">
					Explore key economic indicators for different countries. This page
					provides insights into the economic performance, highlighting
					important metrics like the Gross Domestic Product (GDP), and how they
					have evolved over time.
				</p>
			</div>

			{/* Sélecteur de pays */}
			<div className="max-w-lg mx-auto mb-6">
				<CountrySelector
					selectedCountry={selectedCountry}
					onCountryChange={handleCountryChange}
				/>
			</div>

			{/* Current GDP */}
			<div className="mb-6">
				<EconomicDataFetcher countryCode={selectedCountry} />
			</div>

			{/* Cartes des données économiques */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<GDPGrowthRateCard countryCode={selectedCountry} />
				<LifeExpectancyCard countryCode={selectedCountry} />
				<UnemploymentRateCard countryCode={selectedCountry} />
				<PovertyRateCard countryCode={selectedCountry} />
				<CO2EmissionsCard countryCode={selectedCountry} />
			</div>
		</div>
	);
};

export default EconomicPage;
