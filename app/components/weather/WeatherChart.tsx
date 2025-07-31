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
import { useThemeColors, hexToRgba } from '../../hooks/useThemeColors';

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
	const themeColors = useThemeColors();
	
	const chartData = useMemo(
		() => ({
			labels: data.map((entry) => entry.time),
			datasets: [
				{
					label: 'Temperature (°C)',
					data: data.map((entry) => entry.temperature),
					borderColor: themeColors.primary,
					backgroundColor: hexToRgba(themeColors.primary, 0.2),
					fill: true,
					tension: 0.3,
				},
				{
					label: 'Wind Speed (m/s)',
					data: data.map((entry) => entry.windSpeed),
					borderColor: themeColors.accent,
					backgroundColor: hexToRgba(themeColors.accent, 0.2),
					fill: true,
					tension: 0.3,
				},
				{
					label: 'Humidity (%)',
					data: data.map((entry) => entry.humidity),
					borderColor: themeColors.info,
					backgroundColor: hexToRgba(themeColors.info, 0.2),
					fill: true,
					tension: 0.3,
				},
			],
		}),
		[data, themeColors]
	);

	const options = useMemo(() => ({
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
				labels: {
					color: themeColors.secondary,
				},
			},
			tooltip: {
				backgroundColor: themeColors.base100,
				titleColor: themeColors.secondary,
				bodyColor: themeColors.secondary,
				borderColor: themeColors.base300,
				borderWidth: 1,
				cornerRadius: 8,
			},
		},
		scales: {
			x: {
				ticks: {
					color: themeColors.secondary,
				},
				grid: {
					color: themeColors.base300,
				},
			},
			y: {
				ticks: {
					color: themeColors.secondary,
				},
				grid: {
					color: themeColors.base300,
				},
			},
		},
	}), [themeColors]);

	return (
		<div
			className="p-4 bg-base-100 shadow rounded-lg"
			aria-label="Weather data chart showing temperature, wind speed, and humidity over time"
		>
			<div className="w-full h-64 md:h-96">
				<Line data={chartData} options={options} />
			</div>
		</div>
	);
};

export default WeatherChart;
