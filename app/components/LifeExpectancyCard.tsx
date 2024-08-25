import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';

const LifeExpectancyCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [lifeExpectancy, setLifeExpectancy] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true); // Ajouter un état de chargement

	useEffect(() => {
		const fetchLifeExpectancy = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.DYN.LE00.IN?format=json`
				);
				const data = await response.json();
				console.log('API Response:', data); // Vérifie ce qui est retourné

				// Parcourir les valeurs pour trouver la dernière valeur valide
				const latestValidValue = data[1].find(
					(entry: any) => entry.value !== null
				);
				if (latestValidValue) {
					setLifeExpectancy(latestValidValue.value);
				} else {
					console.error('No valid data found:', data);
					setLifeExpectancy(null);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
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
					? 'Loading...'
					: lifeExpectancy !== null
					? `${lifeExpectancy.toFixed(2)} years`
					: 'No data available'
			}
			description="The average number of years a newborn is expected to live if current mortality rates continue to apply."
		/>
	);
};

export default LifeExpectancyCard;
