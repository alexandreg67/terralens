import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';
import Spinner from '../../components/Spinner';
import { getPovertyRate } from '../../services/EconomicService';

const PovertyRateCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [povertyRate, setPovertyRate] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const rate = await getPovertyRate(countryCode);
				setPovertyRate(rate);
			} catch (err) {
				setError('Failed to fetch poverty rate data.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [countryCode]);

	let content: string | null = null;

	if (loading) {
		content = '';
	} else if (error) {
		content = error;
	} else if (povertyRate !== null) {
		content = `${povertyRate.toFixed(2)}%`;
	} else {
		content = 'No data available';
	}

	return (
		<EconomicDataCard
			title="Poverty Rate"
			value={content}
			description="The percentage of the population living on less than $1.90 a day at 2011 international prices."
		/>
	);
};

export default PovertyRateCard;
