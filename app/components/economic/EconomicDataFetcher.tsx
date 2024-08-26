import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import EconomicDataCard from './EconomicDataCard';

const GDPChart = dynamic(() => import('./GDPChart'), {
	ssr: false,
	loading: () => <p>Loading chart...</p>,
});

interface EconomicDataFetcherProps {
	countryCode: string;
}

interface GDPData {
	year: string;
	value: number;
}

const EconomicDataFetcher: React.FC<EconomicDataFetcherProps> = ({
	countryCode,
}) => {
	const [gdp, setGdp] = useState<number | null>(null);
	const [gdpHistory, setGdpHistory] = useState<GDPData[]>([]);

	useEffect(() => {
		const fetchGDP = async () => {
			const response = await fetch(
				`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`
			);
			const data = await response.json();
			if (data && data[1]) {
				setGdp(data[1][0].value);
				const history = data[1].map((item: any) => ({
					year: item.date,
					value: item.value,
				}));
				setGdpHistory(history.reverse()); // Pour avoir les années dans l'ordre croissant
			}
		};

		fetchGDP();
	}, [countryCode]);

	return (
		<div className="space-y-4">
			<EconomicDataCard
				title="Current GDP"
				value={gdp}
				description="The Gross Domestic Product (GDP) represents the total monetary value of all goods and services produced within a country over a specific period. It is a broad measure of a nation's overall economic activity."
			/>
			<GDPChart data={gdpHistory} />
		</div>
	);
};

export default EconomicDataFetcher;
