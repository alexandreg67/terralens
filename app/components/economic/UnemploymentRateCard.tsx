import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getUnemploymentRate } from '../../services/EconomicService';

const UnemploymentRateCell: React.FC<{ countryCode: string }> = ({
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

	return (
		<td aria-live="polite">
			{loading && <Spinner />}
			{error && <span className="text-red-600">{error}</span>}
			{!loading && !error && unemploymentRate !== null && (
				<span>{unemploymentRate.toFixed(2)}%</span>
			)}
			{!loading && !error && unemploymentRate === null && (
				<span>No data available</span>
			)}
		</td>
	);
};

export default UnemploymentRateCell;
