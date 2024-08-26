import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';

const CO2EmissionsCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [co2Emissions, setCo2Emissions] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchCo2Emissions = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://api.worldbank.org/v2/country/${countryCode}/indicator/EN.ATM.CO2E.KT?format=json`
				);
				const data = await response.json();
				console.log('CO2 Emissions API Response:', data);

				if (data && data[1] && Array.isArray(data[1])) {
					const latestValidValue = data[1].find(
						(entry: any) => entry.value !== null
					);
					if (latestValidValue) {
						setCo2Emissions(latestValidValue.value);
					} else {
						console.error('No valid data found for CO2 Emissions:', data);
						setCo2Emissions(null);
					}
				} else {
					console.error('Unexpected API response structure:', data);
					setCo2Emissions(null);
				}
			} catch (error) {
				console.error('Error fetching CO2 emissions data:', error);
				setCo2Emissions(null);
			} finally {
				setLoading(false);
			}
		};

		fetchCo2Emissions();
	}, [countryCode]);

	return (
		<EconomicDataCard
			title="CO2 Emissions"
			value={
				loading
					? 'Loading...'
					: co2Emissions !== null
					? `${co2Emissions.toLocaleString()} kt`
					: 'No data available'
			}
			description="The total emissions of CO2 from burning fossil fuels and manufacturing, measured in kilotonnes (kt)."
		/>
	);
};

export default CO2EmissionsCard;
