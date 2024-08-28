import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';
import { fetchEconomicData } from '../../api/economic/route';

const useEconomicData = (countryCode: string, indicator: string) => {
	const [data, setData] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const result = await fetchEconomicData(countryCode, indicator);
				const latestValidValue = result.find(
					(entry: { value: null }) => entry.value !== null
				);

				if (latestValidValue) {
					setData(latestValidValue.value);
				} else {
					console.error('No valid data found:', result);
					setData(null);
				}
			} catch (err) {
				console.error('Error fetching economic data:', err);
				setError('Failed to load data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [countryCode, indicator]);

	return { data, loading, error };
};

const CO2EmissionsPerCapitaCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const {
		data: co2EmissionsPerCapita,
		loading,
		error,
	} = useEconomicData(countryCode, 'EN.ATM.CO2E.PC');

	return (
		<EconomicDataCard
			title="CO2 Emissions per Capita"
			value={
				loading
					? 'Loading...'
					: error
					? 'Error loading data'
					: co2EmissionsPerCapita !== null
					? `${co2EmissionsPerCapita.toFixed(2)} tons per person`
					: 'No data available'
			}
			description="The amount of CO2 emissions per person, measured in metric tons."
		/>
	);
};

export default CO2EmissionsPerCapitaCard;
