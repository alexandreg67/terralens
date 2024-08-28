'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GDPGrowthRateCard from '../components/economic/GDPGrowthRateCard';
import LifeExpectancyCard from '../components/economic/LifeExpectancyCard';
import UnemploymentRateCard from '../components/economic/UnemploymentRateCard';
import PovertyRateCard from '../components/economic/PovertyRateCard';
import CO2EmissionsCard from '../components/economic/CO2EmissionsCard';
import EducationExpenditureCard from '../components/economic/EducationExpenditureCard';
import { getGDPHistoricalData } from '../services/EconomicService';
import GDPChart from '../components/economic/GDPChart';
import EconomicIndicatorsTable from '../components/economic/EconomicIndicatorsTable';

const CountrySelector = dynamic(
	() => import('../components/economic/CountrySelector'),
	{ ssr: false }
);

const EconomicPage: React.FC = () => {
	const [selectedCountries, setSelectedCountries] = useState<string[]>(['US']);
	const [gdpData, setGdpData] = useState<
		Array<{ country: string; data: { year: string; value: number }[] }>
	>([]);

	const handleCountryChange = (countryCodes: string[]) => {
		setSelectedCountries(countryCodes);
		fetchGdpData(countryCodes);
	};

	const fetchGdpData = async (countryCodes: string[]) => {
		const data = await Promise.all(
			countryCodes.map(async (code) => {
				const countryData = await getGDPHistoricalData(code);
				return { country: code, data: countryData };
			})
		);
		setGdpData(data);
	};

	const gridClasses = () => {
		if (selectedCountries.length === 1) return 'grid-cols-1 place-items-center';
		if (selectedCountries.length === 2) return 'grid-cols-2';
		if (selectedCountries.length === 3)
			return 'grid-cols-1 md:grid-cols-3 place-items-center';
		return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
	};
	useEffect(() => {
		fetchGdpData(selectedCountries);
	}, [selectedCountries]);

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
					selectedCountries={selectedCountries}
					onCountryChange={handleCountryChange}
				/>
			</div>

			<div className="mb-6">
				<GDPChart data={gdpData} />
			</div>

			<EconomicIndicatorsTable selectedCountries={selectedCountries} />
		</div>
	);
};

export default EconomicPage;
