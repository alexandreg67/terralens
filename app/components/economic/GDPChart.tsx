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
	lineColors = ['#2C7A7B', '#E53E3E', '#3182CE'], // Couleurs du thème terralens (primary, accent, info)
	width = '100%',
	height = 300,
	gridColor = '#E2E8F0', // base-300 du thème pour la grille
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
			className="p-4 bg-base-100 shadow rounded-lg"
			aria-label="GDP Chart over Time"
		>
			<p className="text-sm text-base-content/70 mb-4">
				<strong>Axe X :</strong> Années (ex: 2000, 2005, 2010)
				<br />
				<strong>Axe Y :</strong> PIB en trillions (T), milliards (B), ou millions
				(M) de USD.
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
