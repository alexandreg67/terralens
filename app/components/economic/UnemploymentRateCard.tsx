import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';

const UnemploymentRateCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [unemploymentRate, setUnemploymentRate] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchUnemploymentRate = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://api.worldbank.org/v2/country/${countryCode}/indicator/SL.UEM.TOTL.ZS?format=json`
				);
				const data = await response.json();
				console.log('Unemployment Rate API Response:', data);

				const latestValidValue = data[1].find(
					(entry: any) => entry.value !== null
				);
				if (latestValidValue) {
					setUnemploymentRate(latestValidValue.value);
				} else {
					console.error('No valid data found for Unemployment Rate:', data);
					setUnemploymentRate(null);
				}
			} catch (error) {
				console.error('Error fetching unemployment rate data:', error);
				setUnemploymentRate(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUnemploymentRate();
	}, [countryCode]);

	return (
		<EconomicDataCard
			title="Unemployment Rate"
			value={
				loading
					? 'Loading...'
					: unemploymentRate !== null
					? `${unemploymentRate.toFixed(2)}%`
					: 'No data available'
			}
			description="The percentage of the labor force that is unemployed and actively seeking work."
		/>
	);
};

export default UnemploymentRateCard;
