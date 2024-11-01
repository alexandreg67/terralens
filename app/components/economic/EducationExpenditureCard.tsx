import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { getEducationExpenditure } from '../../services/EconomicService';

interface EducationExpenditureCellProps {
	countryCode: string;
}

const EducationExpenditureCell: React.FC<EducationExpenditureCellProps> = ({
	countryCode,
}) => {
	const [state, setState] = useState({
		educationExpenditure: null as number | null,
		loading: true,
		error: null as string | null,
	});

	useEffect(() => {
		const fetchData = async () => {
			setState({ educationExpenditure: null, loading: true, error: null });

			try {
				const data = await getEducationExpenditure(countryCode);
				setState({ educationExpenditure: data, loading: false, error: null });
			} catch (err) {
				console.error('Error fetching education expenditure data:', err);
				setState({
					educationExpenditure: null,
					loading: false,
					error: 'Failed to load data',
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
				<span className="alert alert-error text-red-600">{state.error}</span>
			) : state.educationExpenditure !== null ? (
				<span>{state.educationExpenditure.toFixed(2)}%</span>
			) : (
				<span className="text-gray-500">No data available</span>
			)}
		</td>
	);
};

export default EducationExpenditureCell;
