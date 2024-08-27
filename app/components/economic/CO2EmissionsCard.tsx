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

const CO2EmissionsCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const {
		data: co2Emissions,
		loading,
		error,
	} = useEconomicData(countryCode, 'EN.ATM.CO2E.KT');

	return (
		<EconomicDataCard
			title="CO2 Emissions"
			value={
				loading
					? 'Loading...'
					: error
					? 'Error loading data'
					: co2Emissions !== null
					? `${co2Emissions.toLocaleString()} kt`
					: 'No data available'
			}
			description="The total emissions of CO2 from burning fossil fuels and manufacturing, measured in kilotonnes (kt)."
		/>
	);
};

export default CO2EmissionsCard;
