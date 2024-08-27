import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';
import Spinner from '../../components/Spinner';

const LifeExpectancyCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [lifeExpectancy, setLifeExpectancy] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLifeExpectancy = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.DYN.LE00.IN?format=json`
				);
				const data = await response.json();
				console.log('API Response:', data);

				if (data && data[1]) {
					// Parcourir les valeurs pour trouver la dernière valeur valide
					const latestValidValue = data[1].find(
						(entry: any) => entry.value !== null
					);
					if (latestValidValue) {
						setLifeExpectancy(latestValidValue.value);
					} else {
						setError('No valid data found for the selected country.');
						setLifeExpectancy(null);
					}
				} else {
					setError('Unexpected API response structure.');
					setLifeExpectancy(null);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
				setError('Failed to fetch life expectancy data.');
				setLifeExpectancy(null);
			} finally {
				setLoading(false);
			}
		};

		fetchLifeExpectancy();
	}, [countryCode]);

	return (
		<EconomicDataCard
			title="Life Expectancy at Birth"
			value={
				loading
					? null // Set value to null when loading
					: error
					? error.toString() // Convert the JSX element to a string
					: lifeExpectancy !== null
					? `${lifeExpectancy.toFixed(2)} years`
					: 'No data available'
			}
			description="The average number of years a newborn is expected to live if current mortality rates continue to apply."
		/>
	);
};

export default LifeExpectancyCard;
