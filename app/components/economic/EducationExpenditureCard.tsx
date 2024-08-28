import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';
import { getEducationExpenditure } from '../../services/EconomicService';

interface EducationExpenditureCardProps {
	countryCode: string;
}

const EducationExpenditureCard: React.FC<EducationExpenditureCardProps> = ({
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

	const description =
		'Percentage of GDP spent on education. This indicator shows the priority given by a country to the education sector in relation to its overall economy.';

	return (
		<EconomicDataCard
			title="Education Expenditure (% of GDP)"
			value={
				loading
					? 'Loading...'
					: error
					? 'Error loading data'
					: educationExpenditure !== null
					? `${educationExpenditure.toFixed(2)}%`
					: 'No data available'
			}
			description={description}
		/>
	);
};

export default EducationExpenditureCard;
