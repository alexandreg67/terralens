import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

interface ChartProps {
	data: ChartData<'line'>;
	options?: ChartOptions<'line'>;
}

const Chart: React.FC<ChartProps> = ({ data, options }) => {
	return <Line data={data} options={options} />;
};

export default Chart;
