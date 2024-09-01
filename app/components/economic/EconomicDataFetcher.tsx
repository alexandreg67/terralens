import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import EconomicDataCard from './EconomicDataCard';
import Spinner from '../../components/Spinner';

const GDPChart = dynamic(() => import('./GDPChart'), {
	ssr: false,
	loading: () => <Spinner />, // Utilisation du Spinner pendant le chargement du graphique
});

interface EconomicDataFetcherProps {
	countryCode: string;
}

interface GDPData {
	country: string;
	data: YearValueData[];
}

interface YearValueData {
	year: string;
	value: number;
}

interface CountryGDPData {
	country: string;
	data: YearValueData[];
}

interface GDPChartProps {
	data: CountryGDPData[];
}

const useGDPData = (countryCode: string) => {
	const [gdp, setGdp] = useState<number | null>(null);
	const [gdpHistory, setGdpHistory] = useState<CountryGDPData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGDP = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`
				);
				const data = await response.json();
				if (data && data[1]) {
					setGdp(data[1][0]?.value ?? null);
					const history = data[1]
						.filter((item: any) => item.value !== null)
						.map((item: any) => ({
							year: item.date,
							value: item.value,
						}));

					// Transforme l'historique des données pour correspondre au type CountryGDPData[]
					const transformedHistory: CountryGDPData = {
						country: countryCode,
						data: history.reverse(), // Pour avoir les années dans l'ordre croissant
					};

					setGdpHistory([transformedHistory]); // Placez dans un tableau
				} else {
					setError('No data available');
				}
			} catch (err) {
				setError('Failed to fetch GDP data');
			} finally {
				setLoading(false);
			}
		};

		fetchGDP();
	}, [countryCode]);

	return { gdp, gdpHistory, loading, error };
};

const EconomicDataFetcher: React.FC<EconomicDataFetcherProps> = ({
	countryCode,
}) => {
	const { gdp, gdpHistory, loading, error } = useGDPData(countryCode);

	return (
		<div className="space-y-4">
			{loading ? (
				<Spinner />
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<>
					<EconomicDataCard
						title="Current GDP"
						value={gdp}
						description="The Gross Domestic Product (GDP) represents the total monetary value of all goods and services produced within a country over a specific period. It is a broad measure of a nation's overall economic activity."
					/>
					{gdpHistory.length > 0 ? (
						<GDPChart data={gdpHistory} />
					) : (
						<p>No historical data available</p>
					)}
				</>
			)}
		</div>
	);
};

export default EconomicDataFetcher;
