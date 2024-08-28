import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import { getGDPGrowthRate } from '../../services/EconomicService';
import { formatPercentage } from '../../utils/formatting';

const GDPGrowthRateCell: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [growthRate, setGrowthRate] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const rate = await getGDPGrowthRate(countryCode);
				setGrowthRate(rate);
			} catch (err) {
				setError('Failed to fetch GDP growth rate.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [countryCode]);

	return (
		<td aria-live="polite">
			{loading && <Spinner />}
			{error && <span className="text-red-500">{error}</span>}
			{!loading && !error && growthRate !== null && (
				<span>{formatPercentage(growthRate)}</span>
			)}
			{!loading && !error && growthRate === null && (
				<span>No data available</span>
			)}
		</td>
	);
};

export default GDPGrowthRateCell;
