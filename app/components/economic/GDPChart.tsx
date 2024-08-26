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
}

const GDPChart: React.FC<GDPChartProps> = ({ data }) => {
	// Fonction de formatage pour l'axe Y
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

	return (
		<div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
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
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="year" />
					<YAxis tickFormatter={formatYAxis} />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="value"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GDPChart;
