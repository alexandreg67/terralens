// WeatherOverviewChart.tsx
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
	Filler,
} from 'chart.js';
import { WeatherDataEntry } from '@/app/types/weatherTypes';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

interface WeatherOverviewChartProps {
	weatherData: Record<string, WeatherDataEntry[]>;
}

const WeatherOverviewChart: React.FC<WeatherOverviewChartProps> = ({
	weatherData,
}) => {
	const labels = Object.keys(weatherData);
	const averageTemperature = labels.map(
		(date) =>
			weatherData[date].reduce((sum, entry) => sum + entry.temperature, 0) /
			weatherData[date].length
	);
	const averageWindSpeed = labels.map(
		(date) =>
			weatherData[date].reduce((sum, entry) => sum + entry.windSpeed, 0) /
			weatherData[date].length
	);
	const averageHumidity = labels.map(
		(date) =>
			weatherData[date].reduce((sum, entry) => sum + entry.humidity, 0) /
			weatherData[date].length
	);

	const chartData = {
		labels,
		datasets: [
			{
				label: 'Température moyenne (°C)',
				data: averageTemperature,
				borderColor: '#2C7A7B',
				backgroundColor: 'rgba(44, 122, 123, 0.2)',
				fill: true,
				tension: 0.3,
			},
			{
				label: 'Vitesse moyenne du vent (m/s)',
				data: averageWindSpeed,
				borderColor: '#E53E3E',
				backgroundColor: 'rgba(229, 62, 62, 0.2)',
				fill: true,
				tension: 0.3,
			},
			{
				label: 'Humidité moyenne (%)',
				data: averageHumidity,
				borderColor: '#1A202C',
				backgroundColor: 'rgba(26, 32, 44, 0.2)',
				fill: true,
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
		<div className="w-full h-64 md:h-96 mb-8">
			<Line data={chartData} options={options} />
		</div>
	);
};

export default WeatherOverviewChart;
