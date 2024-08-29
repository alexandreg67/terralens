import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import {
	getCO2EmissionsPerCapita,
	getEducationExpenditure,
	getGDPGrowthRate,
	getHDI,
	getLifeExpectancy,
	getPovertyRate,
	getUnemploymentRate,
} from '@/app/services/EconomicService';

const EconomicIndicatorsTable: React.FC<{ selectedCountries: string[] }> = ({
	selectedCountries,
}) => {
	const [data, setData] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Définition du tableau `indicators` dans le même fichier
	const indicators = [
		{
			title: 'CO2 Emissions per Capita',
			description:
				'The average amount of carbon dioxide emissions produced per person annually, measured in tons. This indicator reflects the environmental impact of a country’s population.',
			unit: 'tons per person',
			fetchData: getCO2EmissionsPerCapita,
		},
		{
			title: 'GDP Growth Rate',
			description:
				'The annual percentage increase in a country’s Gross Domestic Product, reflecting the overall economic health and expansion rate of the economy.',
			unit: '%',
			fetchData: getGDPGrowthRate,
		},
		{
			title: 'Unemployment Rate',
			description:
				'The percentage of the labor force that is without work but actively seeking employment. It’s an important indicator of the labor market’s health.',
			unit: '%',
			fetchData: getUnemploymentRate,
		},
		{
			title: 'Poverty Rate',
			description:
				'The percentage of the population living below the national poverty line, highlighting the prevalence of poverty within a country.',
			unit: '%',
			fetchData: getPovertyRate,
		},
		{
			title: 'Life Expectancy',
			description:
				'The average number of years a newborn is expected to live under current mortality rates, reflecting the overall health and living conditions of a country.',
			unit: 'years',
			fetchData: getLifeExpectancy,
		},
		{
			title: 'Human Development Index (HDI)',
			description:
				'A composite index measuring average achievement in three basic dimensions of human development: health (life expectancy), education, and standard of living (income per capita).',
			unit: '',
			fetchData: getHDI,
		},
		{
			title: 'Education Expenditure',
			description:
				'Public expenditure on education as a percentage of Gross Domestic Product (GDP), indicating the importance placed on education by the government.',
			unit: '% of GDP',
			fetchData: getEducationExpenditure,
		},
	];

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const result = await Promise.all(
					selectedCountries.map(async (countryCode) => {
						const countryData: { [key: string]: any } = {};
						await Promise.all(
							indicators.map(async (indicator) => {
								try {
									const value = await indicator.fetchData(countryCode);
									countryData[indicator.title] = value;
								} catch (err) {
									console.error(
										`Error fetching ${indicator.title} for ${countryCode}:`,
										err
									);
									countryData[indicator.title] = 'Error';
								}
							})
						);
						return { [countryCode]: countryData };
					})
				);

				// Merge results into one object
				const mergedResult = result.reduce(
					(acc, curr) => ({ ...acc, ...curr }),
					{}
				);
				setData(mergedResult);
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
											<span>
												{data[countryCode][indicator.title]?.toFixed(2)}{' '}
												{indicator.unit}
											</span>
										) : (
											<span className="text-red-600">Error</span>
										)
									) : (
										<span className="text-gray-500">No data</span>
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
