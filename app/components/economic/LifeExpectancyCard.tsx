import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getLifeExpectancy } from '../../services/EconomicService';

const LifeExpectancyCell: React.FC<{ countryCode: string }> = ({
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

	return (
		<td aria-live="polite">
			{loading && <Spinner />}
			{error && <span className="text-red-600">{error}</span>}
			{!loading && !error && lifeExpectancy !== null && (
				<span>{lifeExpectancy.toFixed(2)} years</span>
			)}
			{!loading && !error && lifeExpectancy === null && (
				<span>No data available</span>
			)}
		</td>
	);
};

export default LifeExpectancyCell;
