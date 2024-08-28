import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getUnemploymentRate } from '../../services/EconomicService';

const UnemploymentRateCell: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [state, setState] = useState({
		unemploymentRate: null as number | null,
		loading: true,
		error: null as string | null,
	});

	useEffect(() => {
		const fetchData = async () => {
			setState({ unemploymentRate: null, loading: true, error: null });
			try {
				const rate = await getUnemploymentRate(countryCode);
				setState({ unemploymentRate: rate, loading: false, error: null });
			} catch (err) {
				setState({
					unemploymentRate: null,
					loading: false,
					error: 'Failed to fetch unemployment rate data.',
				});
			}
		};

		fetchData();
	}, [countryCode]);

	return (
		<td aria-live="polite">
			{state.loading && <Spinner />}
			{state.error && (
				<span className="alert alert-error text-red-600">{state.error}</span>
			)}
			{!state.loading && !state.error && state.unemploymentRate !== null && (
				<span>{state.unemploymentRate.toFixed(2)}%</span>
			)}
			{!state.loading && !state.error && state.unemploymentRate === null && (
				<span className="text-gray-500">No data available</span>
			)}
		</td>
	);
};

export default UnemploymentRateCell;
