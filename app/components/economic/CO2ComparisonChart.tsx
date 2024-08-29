import React, { useState, useEffect } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
	ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Enregistrement des composants nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Importez vos services ici
import {
	getGreenhouseGasEmissions,
	getMethaneEmissions,
	getCO2Emissions,
	getGreenhouseGasEmissionsTotal,
} from '../../services/EconomicService';

const CO2ComparisonChart = ({ countryCodes }: { countryCodes: string[] }) => {
	const [data, setData] = useState<Array<any>>([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await Promise.all(
				countryCodes.map(async (countryCode) => {
					const greenhouseGasEmissions = await getGreenhouseGasEmissions(
						countryCode
					);
					const methaneEmissions = await getMethaneEmissions(countryCode);
					const co2Emissions = await getCO2Emissions(countryCode);
					const greenhouseGasEmissionsTotal =
						await getGreenhouseGasEmissionsTotal(countryCode);

					return {
						country: countryCode,
						greenhouseGasEmissions,
						methaneEmissions,
						co2Emissions,
						greenhouseGasEmissionsTotal,
					};
				})
			);
			setData(result);
		};

		fetchData();
	}, [countryCodes]);

	const countries = data.map((item) => item.country);
	const greenhouseGasEmissions = data.map(
		(item) => item.greenhouseGasEmissions
	);
	const methaneEmissions = data.map((item) => item.methaneEmissions);

	const co2Emissions = data.map((item) => item.co2Emissions);

	const chartData = {
		labels: countries,
		datasets: [
			{
				label: 'Greenhouse Gas Emissions (kt of CO2 equivalent)',
				data: greenhouseGasEmissions,
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
			},
			{
				label: 'Methane Emissions (kt of CO2 equivalent)',
				data: methaneEmissions,
				backgroundColor: 'rgba(153, 102, 255, 0.6)',
			},
			{
				label: 'CO2 Emissions (kt)',
				data: co2Emissions,
				backgroundColor: 'rgba(255, 99, 132, 0.6)',
			},
		],
	};

	const chartOptions: ChartOptions<'bar'> = {
		scales: {
			x: {
				type: 'category',
				title: {
					display: true,
					text: 'Countries',
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Emissions (kt) / Percentage (%)',
				},
			},
		},
		plugins: {
			title: {
				display: true,
				text: 'Environmental Impact Comparison',
			},
			legend: {
				display: true,
				position: 'top',
			},
			tooltip: {
				enabled: true,
			},
		},
	};

	return (
		<div className="mt-6">
			<Bar data={chartData} options={chartOptions} />
		</div>
	);
};

export default CO2ComparisonChart;
