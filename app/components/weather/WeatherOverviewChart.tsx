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
import { useThemeColors } from '../../hooks/useThemeColors';

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
	const themeColors = useThemeColors();
	
	// Use useMemo to optimize average calculations
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

	const chartData = useMemo(() => ({
		labels,
		datasets: [
			{
				label: 'Average Temperature (°C)',
				data: averageTemperature,
				borderColor: themeColors.primary,
				backgroundColor: themeColors.primary + '33', // 20% opacity
				fill: true,
				tension: 0.3,
			},
			{
				label: 'Average Wind Speed (m/s)',
				data: averageWindSpeed,
				borderColor: themeColors.accent,
				backgroundColor: themeColors.accent + '33', // 20% opacity
				fill: true,
				tension: 0.3,
			},
			{
				label: 'Average Humidity (%)',
				data: averageHumidity,
				borderColor: themeColors.info,
				backgroundColor: themeColors.info + '33', // 20% opacity
				fill: true,
				tension: 0.3,
			},
		],
	}), [labels, averageTemperature, averageWindSpeed, averageHumidity, themeColors]);

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
		<div aria-label="Weather overview chart showing average temperature, wind speed, and humidity over time">
			<p className="text-sm text-base-content/70 mb-4">
				<strong>Temperature:</strong> Daily average in Celsius
				<br />
				<strong>Wind Speed:</strong> Average wind speed in m/s
				<br />
				<strong>Humidity:</strong> Average relative humidity percentage
			</p>
			<div className="w-full h-64 md:h-96">
				<Line data={chartData} options={options} />
			</div>
		</div>
	);
};

export default WeatherOverviewChart;
