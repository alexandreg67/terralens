import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { fetchEconomicData } from '../../api/economic/route';

interface CO2EmissionsPerCapitaCellProps {
	countryCode: string;
}

const CO2EmissionsPerCapitaCell: React.FC<CO2EmissionsPerCapitaCellProps> = ({
	countryCode,
}) => {
	const [co2EmissionsPerCapita, setCo2EmissionsPerCapita] = useState<
		number | null
	>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const result = await fetchEconomicData(countryCode, 'EN.ATM.CO2E.PC');
				const latestValidValue = result.find(
					(entry: { value: null }) => entry.value !== null
				);

				if (latestValidValue) {
					setCo2EmissionsPerCapita(latestValidValue.value);
				} else {
					console.error('No valid data found:', result);
					setCo2EmissionsPerCapita(null);
				}
			} catch (err) {
				console.error('Error fetching CO2 emissions data:', err);
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
			{!loading && !error && co2EmissionsPerCapita !== null && (
				<span>{co2EmissionsPerCapita.toFixed(2)} tons per person</span>
			)}
			{!loading && !error && co2EmissionsPerCapita === null && (
				<span>No data available</span>
			)}
		</td>
	);
};

export default CO2EmissionsPerCapitaCell;
