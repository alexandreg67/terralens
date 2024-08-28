import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getHDI } from '../../services/EconomicService';

interface HDICellProps {
	countryCode: string;
}

const HDICell: React.FC<HDICellProps> = ({ countryCode }) => {
	const [state, setState] = useState({
		hdi: null as number | null,
		loading: true,
		error: null as string | null,
	});

	useEffect(() => {
		const fetchData = async () => {
			setState({ hdi: null, loading: true, error: null });

			try {
				const data = await getHDI(countryCode);
				setState({ hdi: data, loading: false, error: null });
			} catch (err) {
				console.error('Error fetching HDI data:', err);
				setState({ hdi: null, loading: false, error: 'Failed to load data' });
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
			) : state.hdi !== null ? (
				<span>{state.hdi.toFixed(2)}</span>
			) : (
				<span className="text-gray-500">No data available</span>
			)}
		</td>
	);
};

export default HDICell;
