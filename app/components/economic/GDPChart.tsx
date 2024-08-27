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
	data: Array<{ year: string; value: number }>;
	lineColor?: string; // Option pour personnaliser la couleur de la ligne
	width?: number | string; // Option pour personnaliser la largeur du conteneur
	height?: number; // Option pour personnaliser la hauteur du conteneur
	gridColor?: string; // Option pour personnaliser la couleur de la grille
}

const formatYAxis = (tickItem: number) => {
	if (tickItem >= 1e12) {
		return `${(tickItem / 1e12).toFixed(1)}T`; // Trillions
	} else if (tickItem >= 1e9) {
		return `${(tickItem / 1e9).toFixed(1)}B`; // Billions
	} else if (tickItem >= 1e6) {
		return `${(tickItem / 1e6).toFixed(1)}M`; // Millions
	} else {
		return tickItem.toString(); // Valeurs plus petites
	}
};

const GDPChart: React.FC<GDPChartProps> = ({
	data,
	lineColor = '#8884d8',
	width = '100%',
	height = 300,
	gridColor = '#ccc',
}) => {
	if (!data || data.length === 0) {
		return <p>No data available for the selected period.</p>;
	}

	return (
		<div
			className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg"
			aria-label="GDP Chart over Time"
		>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
				GDP Over Time
			</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
				The chart below shows the Gross Domestic Product (GDP) of a country over
				time.
				<br />
				<strong>X-Axis:</strong> Years (e.g., 2000, 2005, 2010)
				<br />
				<strong>Y-Axis:</strong> GDP in trillions (T), billions (B), or millions
				(M) of USD.
			</p>
			<ResponsiveContainer width={width} height={height}>
				<LineChart
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
					<XAxis dataKey="year" />
					<YAxis tickFormatter={formatYAxis} />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="value"
						stroke={lineColor}
						activeDot={{ r: 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GDPChart;
