import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getPovertyRate } from '../../services/EconomicService';

const PovertyRateCell: React.FC<{ countryCode: string }> = ({
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

	return (
		<td aria-live="polite">
			{loading && <Spinner />}
			{error && <span className="text-red-600">{error}</span>}
			{!loading && !error && povertyRate !== null && (
				<span>{povertyRate.toFixed(2)}%</span>
			)}
			{!loading && !error && povertyRate === null && (
				<span>No data available</span>
			)}
		</td>
	);
};

export default PovertyRateCell;
