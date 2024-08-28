import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getEducationExpenditure } from '../../services/EconomicService';

interface EducationExpenditureCellProps {
	countryCode: string;
}

const EducationExpenditureCell: React.FC<EducationExpenditureCellProps> = ({
	countryCode,
}) => {
	const [educationExpenditure, setEducationExpenditure] = useState<
		number | null
	>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await getEducationExpenditure(countryCode);
				setEducationExpenditure(data);
			} catch (err) {
				console.error('Error fetching education expenditure data:', err);
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
			{!loading && !error && educationExpenditure !== null && (
				<span>{educationExpenditure.toFixed(2)}%</span>
			)}
			{!loading && !error && educationExpenditure === null && (
				<span>No data available</span>
			)}
		</td>
	);
};

export default EducationExpenditureCell;
