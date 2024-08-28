import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import {
	getGDPGrowthRate,
	getLifeExpectancy,
	getUnemploymentRate,
	getPovertyRate,
	getCO2EmissionsPerCapita,
	getHDI,
	getEducationExpenditure,
} from '../../services/EconomicService';

const indicators = [
	{
		title: 'CO2 Emissions per Capita',
		description: 'CO2 emissions per capita in tons',
		fetchData: getCO2EmissionsPerCapita,
	},
	{
		title: 'GDP Growth Rate',
		description: 'Annual percentage growth rate of GDP',
		fetchData: getGDPGrowthRate,
	},
	{
		title: 'Unemployment Rate',
		description: 'Percentage of the labor force that is unemployed',
		fetchData: getUnemploymentRate,
	},
	{
		title: 'Poverty Rate',
		description: 'Percentage of the population living below the poverty line',
		fetchData: getPovertyRate,
	},
	{
		title: 'Life Expectancy',
		description: 'Average number of years a newborn is expected to live',
		fetchData: getLifeExpectancy,
	},
	{
		title: 'Human Development Index (HDI)',
		description:
			'Composite statistic of life expectancy, education, and income indices',
		fetchData: getHDI,
	},
	{
		title: 'Education Expenditure',
		description: 'Public expenditure on education as a percentage of GDP',
		fetchData: getEducationExpenditure,
	},
];

const EconomicIndicatorsTable: React.FC<{ selectedCountries: string[] }> = ({
	selectedCountries,
}) => {
	const [data, setData] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const result: { [key: string]: any } = {};
				for (let countryCode of selectedCountries) {
					result[countryCode] = {};
					for (let indicator of indicators) {
						try {
							const value = await indicator.fetchData(countryCode);
							result[countryCode][indicator.title] = value;
						} catch (err) {
							console.error(
								`Error fetching ${indicator.title} for ${countryCode}:`,
								err
							);
							result[countryCode][indicator.title] = 'Error';
						}
					}
				}
				setData(result);
			} catch (err) {
				console.error('Error fetching economic data:', err);
				setError('Failed to load data.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [selectedCountries]);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <div className="text-red-600">{error}</div>;
	}

	return (
		<div className="overflow-x-auto">
			<table className="table w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm">
				<thead className="bg-gray-100 dark:bg-gray-800">
					<tr>
						<th className="p-4 text-left text-gray-600 dark:text-gray-200">
							Indicator
						</th>
						{selectedCountries.map((countryCode) => (
							<th
								key={countryCode}
								className="p-4 text-left text-gray-600 dark:text-gray-200"
							>
								{countryCode}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{indicators.map((indicator) => (
						<tr
							key={indicator.title}
							className="hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							<td className="p-4 font-semibold text-gray-700 dark:text-gray-300">
								{indicator.title}
								<div className="text-sm text-gray-500 dark:text-gray-400">
									{indicator.description}
								</div>
							</td>
							{selectedCountries.map((countryCode) => (
								<td
									key={countryCode}
									className="p-4 text-gray-700 dark:text-gray-300"
								>
									{data[countryCode] &&
									data[countryCode][indicator.title] !== undefined ? (
										data[countryCode][indicator.title] !== 'Error' ? (
											`${data[countryCode][indicator.title]?.toFixed(2)}`
										) : (
											<span className="text-red-600">Error</span>
										)
									) : (
										'No data'
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EconomicIndicatorsTable;
