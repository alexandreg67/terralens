import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler, // Import du plugin Filler
} from 'chart.js';

// Enregistrez le plugin Filler avec Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler // Enregistrement du plugin Filler
);

const WeatherChart = ({ data }: { data: any[] }) => {
	const chartData = {
		labels: data.map((entry) => entry.time),
		datasets: [
			{
				label: 'Temperature (°C)',
				data: data.map((entry) => entry.temperature),
				borderColor: '#2C7A7B',
				backgroundColor: 'rgba(44, 122, 123, 0.2)',
				fill: true, // Activer le remplissage
				tension: 0.3,
			},
			{
				label: 'Wind Speed (m/s)',
				data: data.map((entry) => entry.windSpeed),
				borderColor: '#E53E3E',
				backgroundColor: 'rgba(229, 62, 62, 0.2)',
				fill: true, // Activer le remplissage
				tension: 0.3,
			},
			{
				label: 'Humidity (%)',
				data: data.map((entry) => entry.humidity),
				borderColor: '#1A202C',
				backgroundColor: 'rgba(26, 32, 44, 0.2)',
				fill: true, // Activer le remplissage
				tension: 0.3,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
				labels: {
					color: '#1A202C',
				},
			},
			tooltip: {
				backgroundColor: '#1A202C',
				titleColor: '#F7FAFC',
				bodyColor: '#F7FAFC',
				cornerRadius: 4,
			},
		},
		scales: {
			x: {
				ticks: {
					color: '#1A202C',
				},
				grid: {
					color: 'rgba(26, 32, 44, 0.1)',
				},
			},
			y: {
				ticks: {
					color: '#1A202C',
				},
				grid: {
					color: 'rgba(26, 32, 44, 0.1)',
				},
			},
		},
	};

	return (
		<div className="w-full h-64 md:h-96">
			<Line data={chartData} options={options} />
		</div>
	);
};

export default WeatherChart;
