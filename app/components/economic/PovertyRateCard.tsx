import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getPovertyRate } from '../../services/EconomicService';

const PovertyRateCell: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [state, setState] = useState({
		povertyRate: null as number | null,
		loading: true,
		error: null as string | null,
	});

	useEffect(() => {
		const fetchData = async () => {
			setState({ povertyRate: null, loading: true, error: null });
			try {
				const rate = await getPovertyRate(countryCode);
				setState({ povertyRate: rate, loading: false, error: null });
			} catch (err) {
				setState({
					povertyRate: null,
					loading: false,
					error: 'Failed to fetch poverty rate data.',
				});
			}
		};

		fetchData();
	}, [countryCode]);

	return (
		<td aria-live="polite">
			{state.loading ? (
				<Spinner />
			) : state.error ? (
				<span className="text-red-600">{state.error}</span>
			) : state.povertyRate !== null ? (
				<span>{state.povertyRate.toFixed(2)}%</span>
			) : (
				<span className="text-gray-500">No data available</span>
			)}
		</td>
	);
};

export default PovertyRateCell;
