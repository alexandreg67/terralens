import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';
import Spinner from '../../components/Spinner';
import { getUnemploymentRate } from '../../services/EconomicService';

const UnemploymentRateCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [unemploymentRate, setUnemploymentRate] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const rate = await getUnemploymentRate(countryCode);
				setUnemploymentRate(rate);
			} catch (err) {
				setError('Failed to fetch unemployment rate data.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [countryCode]);

	let content: string | null = null;

	if (loading) {
		content = 'Loading...';
	} else if (error) {
		content = `Error: ${error}`;
	} else if (unemploymentRate !== null) {
		content = `${unemploymentRate.toFixed(2)}%`;
	} else {
		content = 'No data available';
	}

	return (
		<EconomicDataCard
			title="Unemployment Rate"
			value={content}
			description="The percentage of the labor force that is unemployed and actively seeking work."
		/>
	);
};

export default UnemploymentRateCard;
