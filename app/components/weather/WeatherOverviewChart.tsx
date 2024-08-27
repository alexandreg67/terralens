import React, { useMemo } from 'react';
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
	// Utilisation de useMemo pour optimiser les calculs des moyennes
	const { labels, averageTemperature, averageWindSpeed, averageHumidity } =
		useMemo(() => {
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
			return { labels, averageTemperature, averageWindSpeed, averageHumidity };
		}, [weatherData]);

	const chartData = {
		labels,
		datasets: [
			{
				label: 'Average Temperature (°C)',
				data: averageTemperature,
				borderColor: '#2C7A7B',
				backgroundColor: 'rgba(44, 122, 123, 0.2)',
				fill: true,
				tension: 0.3,
			},
			{
				label: 'Average Wind Speed (m/s)',
				data: averageWindSpeed,
				borderColor: '#E53E3E',
				backgroundColor: 'rgba(229, 62, 62, 0.2)',
				fill: true,
				tension: 0.3,
			},
			{
				label: 'Average Humidity (%)',
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
		<div
			className="w-full h-64 md:h-96 mb-8"
			role="img"
			aria-label="Weather overview chart showing average temperature, wind speed, and humidity over time"
		>
			<Line data={chartData} options={options} />
		</div>
	);
};

export default WeatherOverviewChart;
