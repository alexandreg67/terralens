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
	lineColors = ['#2C7A7B', '#E53E3E', '#3182CE'], // Terralens theme colors (primary, accent, info)
	width = '100%',
	height = 300,
	gridColor = '#E2E8F0', // base-300 theme color for grid
}) => {
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
					<CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
					<XAxis 
						dataKey="year" 
						stroke="#1A202C"
						tick={{ fill: '#1A202C' }}
					/>
					<YAxis 
						tickFormatter={formatYAxis} 
						stroke="#1A202C"
						tick={{ fill: '#1A202C' }}
					/>
					<Tooltip 
						contentStyle={{
							backgroundColor: '#F7FAFC',
							border: '1px solid #E2E8F0',
							borderRadius: '8px',
							color: '#1A202C'
						}}
					/>
					<Legend 
						wrapperStyle={{ color: '#1A202C' }}
					/>
					{data.map((countryData, index) => (
						<Line
							key={countryData.country}
							type="monotone"
							dataKey={countryData.country}
							name={countryData.country}
							stroke={lineColors[index % lineColors.length]}
							activeDot={{ r: 8 }}
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GDPChart;
