import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';

const PovertyRateCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [povertyRate, setPovertyRate] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchPovertyRate = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://api.worldbank.org/v2/country/${countryCode}/indicator/SI.POV.DDAY?format=json`
				);
				const data = await response.json();
				console.log('Poverty Rate API Response:', data);

				// Vérifier si les données sont présentes et trouver la dernière valeur valide
				if (data && data[1] && Array.isArray(data[1])) {
					const latestValidValue = data[1].find(
						(entry: any) => entry.value !== null
					);
					if (latestValidValue) {
						setPovertyRate(latestValidValue.value);
					} else {
						console.error('No valid data found for Poverty Rate:', data);
						setPovertyRate(null);
					}
				} else {
					console.error('Unexpected API response structure:', data);
					setPovertyRate(null);
				}
			} catch (error) {
				console.error('Error fetching poverty rate data:', error);
				setPovertyRate(null);
			} finally {
				setLoading(false);
			}
		};

		fetchPovertyRate();
	}, [countryCode]);

	return (
		<EconomicDataCard
			title="Poverty Rate"
			value={
				loading
					? 'Loading...'
					: povertyRate !== null
					? `${povertyRate.toFixed(2)}%`
					: 'No data available'
			}
			description="The percentage of the population living on less than $1.90 a day at 2011 international prices."
		/>
	);
};

export default PovertyRateCard;
