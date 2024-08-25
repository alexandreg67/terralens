'use client';

import React, { useState } from 'react';
import EconomicDataFetcher from '../components/EconomicDataFetcher';
import CountrySelector from '../components/CountrySelector';
import GDPGrowthRateCard from '../components/GDPGrowthRateCard';
import LifeExpectancyCard from '../components/LifeExpectancyCard';
import UnemploymentRateCard from '../components/UnemploymentRateCard';
import PovertyRateCard from '../components/PovertyRateCard';
import CO2EmissionsCard from '../components/CO2EmissionsCard';

const EconomicPage: React.FC = () => {
	const [selectedCountry, setSelectedCountry] = useState<string>('US'); // Définir un pays par défaut

	const handleCountryChange = (countryCode: string) => {
		setSelectedCountry(countryCode);
	};

	return (
		<div className="container mx-auto p-6">
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
			<div className="max-w-lg mx-auto mb-6">
				<CountrySelector
					selectedCountry={selectedCountry}
					onCountryChange={handleCountryChange}
				/>
			</div>
			<div className="bg-base-100 p-4 rounded-lg shadow-lg space-y-4">
				<EconomicDataFetcher countryCode={selectedCountry} />
				<LifeExpectancyCard countryCode={selectedCountry} />
				<GDPGrowthRateCard countryCode={selectedCountry} />
				<UnemploymentRateCard countryCode={selectedCountry} />
				<PovertyRateCard countryCode={selectedCountry} />
				<CO2EmissionsCard countryCode={selectedCountry} />
			</div>
		</div>
	);
};

export default EconomicPage;
