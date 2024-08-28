import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';
import { getHDI } from '../../services/EconomicService';

interface HDICardProps {
	countryCode: string;
}

const HDICard: React.FC<HDICardProps> = ({ countryCode }) => {
	const [hdi, setHdi] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await getHDI(countryCode);
				setHdi(data);
			} catch (err) {
				console.error('Error fetching HDI data:', err);
				setError('Failed to load data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [countryCode]);

	const description =
		'The Human Development Index (HDI) is a composite index measuring average achievement in three basic dimensions of human development: life expectancy, education, and income per capita.';

	return (
		<EconomicDataCard
			title="Human Development Index (HDI)"
			value={
				loading
					? 'Loading...'
					: error
					? 'Error loading data'
					: hdi !== null
					? `${hdi.toFixed(2)}`
					: 'No data available'
			}
			description={description}
		/>
	);
};

export default HDICard;
