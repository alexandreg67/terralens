import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import { getGDPGrowthRate } from '../../services/EconomicService';
import { formatPercentage } from '../../utils/formatting';

const GDPGrowthRateCell: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [state, setState] = useState({
		growthRate: null as number | null,
		loading: true,
		error: null as string | null,
	});

	useEffect(() => {
		const fetchData = async () => {
			setState({ growthRate: null, loading: true, error: null });
			try {
				const rate = await getGDPGrowthRate(countryCode);
				setState({ growthRate: rate, loading: false, error: null });
			} catch (err) {
				setState({
					growthRate: null,
					loading: false,
					error: 'Failed to fetch GDP growth rate.',
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
				<span className="text-red-500">{state.error}</span>
			) : state.growthRate !== null ? (
				<span>{formatPercentage(state.growthRate)}</span>
			) : (
				<span className="text-gray-500">No data available</span>
			)}
		</td>
	);
};

export default GDPGrowthRateCell;
