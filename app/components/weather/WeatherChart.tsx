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

interface WeatherDataEntry {
	time: string;
	temperature: number;
	windSpeed: number;
	humidity: number;
}

const WeatherChart = ({ data }: { data: WeatherDataEntry[] }) => {
	const chartData = useMemo(
		() => ({
			labels: data.map((entry) => entry.time),
			datasets: [
				{
					label: 'Temperature (°C)',
					data: data.map((entry) => entry.temperature),
					borderColor: '#2C7A7B',
					backgroundColor: 'rgba(44, 122, 123, 0.2)',
					fill: true,
					tension: 0.3,
				},
				{
					label: 'Wind Speed (m/s)',
					data: data.map((entry) => entry.windSpeed),
					borderColor: '#E53E3E',
					backgroundColor: 'rgba(229, 62, 62, 0.2)',
					fill: true,
					tension: 0.3,
				},
				{
					label: 'Humidity (%)',
					data: data.map((entry) => entry.humidity),
					borderColor: '#1A202C',
					backgroundColor: 'rgba(26, 32, 44, 0.2)',
					fill: true,
					tension: 0.3,
				},
			],
		}),
		[data]
	);

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
			className="w-full h-64 md:h-96"
			role="img"
			aria-label="Weather data chart showing temperature, wind speed, and humidity over time"
		>
			<Line data={chartData} options={options} />
		</div>
	);
};

export default WeatherChart;
