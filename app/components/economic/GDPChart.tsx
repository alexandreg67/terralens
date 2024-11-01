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
	lineColors?: string[]; // Option pour personnaliser les couleurs des lignes
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
	lineColors = ['#8884d8', '#82ca9d', '#ff7300'], // Couleurs par défaut pour plusieurs lignes
	width = '100%',
	height = 300,
	gridColor = '#ccc',
}) => {
	if (!data || data.length === 0) {
		return <p>No data available for the selected period.</p>;
	}

	// Rassembler les années uniques
	const allYears = Array.from(
		new Set(data.flatMap((countryData) => countryData.data.map((d) => d.year)))
	).sort();

	// Fusionner les données en un seul tableau
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
			className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg"
			aria-label="GDP Chart over Time"
		>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
				<strong>X-Axis:</strong> Years (e.g., 2000, 2005, 2010)
				<br />
				<strong>Y-Axis:</strong> GDP in trillions (T), billions (B), or millions
				(M) of USD.
			</p>
			<ResponsiveContainer width={width} height={height}>
				<LineChart
					data={combinedData} // Utiliser les données combinées
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
