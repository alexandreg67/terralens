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
			<CO2ComparisonChart countryCodes={selectedCountries} />{' '}
			<EconomicIndicatorsTable selectedCountries={selectedCountries} />
		</div>
	);
};

export default EconomicPage;
