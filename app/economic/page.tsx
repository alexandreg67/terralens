'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
	getGDPHistoricalData,
	getCO2EmissionsPerCapita,
} from '../services/EconomicService';
import GDPChart from '../components/economic/GDPChart';
import EconomicIndicatorsTable from '../components/economic/EconomicIndicatorsTable';
import CO2ComparisonChart from '../components/economic/CO2ComparisonChart';

const CountrySelector = dynamic(
	() => import('../components/economic/CountrySelector'),
	{ ssr: false }
);

const EconomicPage = () => {
	// Initialisation de l'état pour les données du PIB et du CO2
	const [selectedCountries, setSelectedCountries] = useState(['US']);
	const [gdpData, setGdpData] = useState<{ country: string; data: any }[]>([]);
	const [co2Data, setCo2Data] = useState<CO2Data[]>([]);

	interface CO2Data {
		country: string;
		co2Emissions: number | null;
	}

	const handleCountryChange = (countryCodes: string[]) => {
		setSelectedCountries(countryCodes);
		fetchGdpData(countryCodes);
		fetchCo2Data(countryCodes); // Fetch CO2 data
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

	const fetchCo2Data = async (countryCodes: any[]) => {
		const data = await Promise.all(
			countryCodes.map(async (code) => {
				const co2PerCapita = await getCO2EmissionsPerCapita(code);
				return { country: code, co2Emissions: co2PerCapita }; // Structurez bien les données
			})
		);
		setCo2Data(data); // Mettez à jour l'état avec les données CO2
	};

	useEffect(() => {
		fetchGdpData(selectedCountries);
		fetchCo2Data(selectedCountries); // Fetch CO2 data au chargement initial
	}, [selectedCountries]);

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h2 className="text-3xl font-semibold text-primary text-center">
					Overview of Economic Performance
				</h2>
				<p className="text-gray-700 dark:text-gray-300 text-center">
					This dashboard provides a comparative overview of key economic
					indicators across selected countries. Understand how different nations
					perform in terms of economic growth, environmental impact, and social
					development.
				</p>
				<p className="text-gray-700 dark:text-gray-300 text-center">
					You can compare up to 3 countries at a time to understand their
					environmental performance. Higher emissions per capita often indicate
					greater environmental pressures and less sustainable practices.
				</p>
			</div>
			<div className="max-w-lg mx-auto mb-6">
				<CountrySelector
					selectedCountries={selectedCountries}
					onCountryChange={handleCountryChange}
				/>
			</div>
			<div className="mb-6">
				<h2 className="text-3xl font-semibold text-primary mb-4 text-center">
					GDP Over Time
				</h2>
				<p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
					The chart below illustrates the Gross Domestic Product (GDP) of
					selected countries over time, providing insights into their economic
					growth and development. The X-axis represents the years, while the
					Y-axis displays the GDP values in trillions (T), billions (B), or
					millions (M) of USD. Analyze the trends to understand how the
					economies of these countries have evolved over the years.
				</p>
				<GDPChart data={gdpData} />
			</div>
			<div className="mb-6">
				<h2 className="text-3xl font-semibold text-primary mb-4 text-center">
					Environmental Impact Comparison
				</h2>
				<p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
					This chart compares the CO2 emissions per capita across selected
					countries, providing insights into each nation's environmental impact
					relative to its population size. Higher emissions per capita often
					indicate greater environmental pressures and less sustainable
					practices.
				</p>
				<CO2ComparisonChart countryCodes={selectedCountries} />
			</div>

			<div className="mb-6">
				<h2 className="text-3xl font-semibold text-primary mb-4 text-center">
					Key Economic Indicators Comparison
				</h2>
				<p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
					Compare the most important economic indicators across selected
					countries to gain insights into their economic performance and
					development. This table highlights key metrics such as GDP growth, CO2
					emissions, and human development indices.
				</p>
				<EconomicIndicatorsTable selectedCountries={selectedCountries} />
			</div>
		</div>
	);
};

export default EconomicPage;
