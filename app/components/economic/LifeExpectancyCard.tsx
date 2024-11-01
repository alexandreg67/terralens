import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getLifeExpectancy } from '../../services/EconomicService';

const LifeExpectancyCell: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [state, setState] = useState({
		lifeExpectancy: null as number | null,
		loading: true,
		error: null as string | null,
	});

	useEffect(() => {
		const fetchData = async () => {
			setState({ lifeExpectancy: null, loading: true, error: null });
			try {
				const lifeExpectancy = await getLifeExpectancy(countryCode);
				setState({ lifeExpectancy, loading: false, error: null });
			} catch (err) {
				setState({
					lifeExpectancy: null,
					loading: false,
					error: 'Failed to fetch life expectancy data.',
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
			) : state.lifeExpectancy !== null ? (
				<span>{state.lifeExpectancy.toFixed(2)} years</span>
			) : (
				<span className="text-gray-500">No data available</span>
			)}
		</td>
	);
};

export default LifeExpectancyCell;
