import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';
import Spinner from '../../components/Spinner';
import { getLifeExpectancy } from '../../services/EconomicService';

const LifeExpectancyCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [lifeExpectancy, setLifeExpectancy] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const lifeExpectancy = await getLifeExpectancy(countryCode);
				setLifeExpectancy(lifeExpectancy);
			} catch (err) {
				setError('Failed to fetch life expectancy data.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [countryCode]);

	let content: string | null = null;

	if (loading) {
		content = null;
	} else if (error) {
		content = error;
	} else if (lifeExpectancy !== null) {
		content = `${lifeExpectancy.toFixed(2)} years`;
	} else {
		content = 'No data available';
	}

	return (
		<EconomicDataCard
			title="Life Expectancy at Birth"
			value={content}
			description="The average number of years a newborn is expected to live if current mortality rates continue to apply."
		/>
	);
};

export default LifeExpectancyCard;
