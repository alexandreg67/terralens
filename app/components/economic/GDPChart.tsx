import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { useThemeColors } from '../../hooks/useThemeColors';
import { calculateRechartsYAxisDomain } from '../../utils/chartUtils';

interface GDPChartProps {
	data: Array<{
		country: string;
		data: Array<{ year: string; value: number }>;
	}>;
	lineColors?: string[]; // Option to customize line colors
	width?: number | string; // Option to customize container width
	height?: number; // Option to customize container height
	gridColor?: string; // Option to customize grid color
}

const formatYAxis = (tickItem: number) => {
	if (tickItem >= 1e12) {
		return `${(tickItem / 1e12).toFixed(1)}T`; // Trillions
	} else if (tickItem >= 1e9) {
		return `${(tickItem / 1e9).toFixed(1)}B`; // Billions
	} else if (tickItem >= 1e6) {
		return `${(tickItem / 1e6).toFixed(1)}M`; // Millions
	} else {
		return tickItem.toString(); // Smaller values
	}
};

const GDPChart: React.FC<GDPChartProps> = ({
	data,
	lineColors, // Will be set from theme colors
	width = '100%',
	height = 300,
	gridColor, // Will be set from theme colors
}) => {
	const themeColors = useThemeColors();
	
	// Use theme colors as defaults if not provided
	const chartLineColors = lineColors || [themeColors.primary, themeColors.accent, themeColors.info];
	const chartGridColor = gridColor || themeColors.base300;

	if (!data || data.length === 0) {
		return <p>No data available for the selected period.</p>;
	}

	// Gather unique years
	const allYears = Array.from(
		new Set(data.flatMap((countryData) => countryData.data.map((d) => d.year)))
	).sort();

	// Merge data into a single array
	const combinedData = allYears.map((year) => {
		const yearData: { [key: string]: string | number } = { year };
		data.forEach((countryData) => {
			const countryYearData = countryData.data.find((d) => d.year === year);
			yearData[countryData.country] = countryYearData
				? countryYearData.value
				: '';
		});
		return yearData;
	});

	// Calculate adaptive Y-axis domain for better curve visibility
	const countryKeys = data.map(countryData => countryData.country);
	const yAxisConfig = calculateRechartsYAxisDomain(combinedData, countryKeys);

	return (
		<div
			className="p-4 bg-base-100 shadow rounded-lg"
			aria-label="GDP Chart over Time"
		>
			<p className="text-sm text-base-content/70 mb-4">
				<strong>X-Axis:</strong> Years (e.g., 2000, 2005, 2010)
				<br />
				<strong>Y-Axis:</strong> GDP in trillions (T), billions (B), or millions
				(M) USD.
			</p>
			<ResponsiveContainer width={width} height={height}>
				<LineChart
					data={combinedData} // Use combined data
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
					<XAxis 
						dataKey="year" 
						stroke={themeColors.secondary}
						tick={{ fill: themeColors.secondary }}
					/>
					<YAxis 
						tickFormatter={formatYAxis} 
						stroke={themeColors.secondary}
						tick={{ fill: themeColors.secondary }}
						domain={yAxisConfig.domain}
					/>
					<Tooltip 
						contentStyle={{
							backgroundColor: themeColors.base100,
							border: `1px solid ${themeColors.base300}`,
							borderRadius: '8px',
							color: themeColors.secondary
						}}
					/>
					<Legend 
						wrapperStyle={{ color: themeColors.secondary }}
					/>
					{data.map((countryData, index) => (
						<Line
							key={countryData.country}
							type="monotone"
							dataKey={countryData.country}
							name={countryData.country}
							stroke={chartLineColors[index % chartLineColors.length]}
							activeDot={{ r: 8 }}
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GDPChart;
