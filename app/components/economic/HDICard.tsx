import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getHDI } from '../../services/EconomicService';

interface HDICellProps {
	countryCode: string;
}

const HDICell: React.FC<HDICellProps> = ({ countryCode }) => {
	const [hdi, setHdi] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await getHDI(countryCode);
				setHdi(data);
			} catch (err) {
				console.error('Error fetching HDI data:', err);
				setError('Failed to load data');
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
			{!loading && !error && hdi !== null && <span>{hdi.toFixed(2)}</span>}
			{!loading && !error && hdi === null && <span>No data available</span>}
		</td>
	);
};

export default HDICell;
