import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { fetchEconomicData } from '../../services/EconomicDataFetcher';
import { WorldBankDataPoint } from '../../types/economicTypes';

interface CO2EmissionsPerCapitaCellProps {
	countryCode: string;
}

const CO2EmissionsPerCapitaCell: React.FC<CO2EmissionsPerCapitaCellProps> = ({
	countryCode,
}) => {
	const [state, setState] = useState({
		co2EmissionsPerCapita: null as number | null,
		loading: true,
		error: null as string | null,
	});

	useEffect(() => {
		const fetchData = async () => {
			setState({ co2EmissionsPerCapita: null, loading: true, error: null });

			try {
				const result = await fetchEconomicData(countryCode, 'EN.ATM.CO2E.PC');
				const latestValidValue = result.find(
					(entry: WorldBankDataPoint) => entry.value !== null
				);

				if (latestValidValue) {
					setState({
						co2EmissionsPerCapita: latestValidValue.value,
						loading: false,
						error: null,
					});
				} else {
					console.error('No valid data found:', result);
					setState({
						co2EmissionsPerCapita: null,
						loading: false,
						error: null,
					});
				}
			} catch (err) {
				console.error('Error fetching CO2 emissions data:', err);
				setState({
					co2EmissionsPerCapita: null,
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
			) : state.co2EmissionsPerCapita !== null ? (
				<span>{state.co2EmissionsPerCapita.toFixed(2)} tons per person</span>
			) : (
				<span className="text-gray-500">No data available</span>
			)}
		</td>
	);
};

export default CO2EmissionsPerCapitaCell;
