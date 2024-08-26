import React from 'react';
import { FaClock, FaThermometerHalf, FaWind, FaTint } from 'react-icons/fa';

interface WeatherCardProps {
	date: string;
	data: {
		time: string;
		temperature: number;
		windSpeed: number;
		humidity: number;
	}[];
	onOpenModal: (date: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
	date,
	data,
	onOpenModal,
}) => {
	return (
		<div className="card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
			<h3 className="text-2xl font-semibold mb-4 text-center text-primary">
				{date}
			</h3>
			<div className="space-y-2">
				{data.map((temp, index) => (
					<div
						key={index}
						className="flex justify-between items-center text-lg"
					>
						<span className="flex items-center space-x-2">
							<FaClock className="text-blue-500" />
							<span>{temp.time}</span>
						</span>
						<span className="flex items-center space-x-2">
							<FaThermometerHalf className="text-red-500" />
							<span>{temp.temperature}°C</span>
						</span>
						<span className="flex items-center space-x-2">
							<FaWind className="text-green-500" />
							<span>{temp.windSpeed} m/s</span>
						</span>
						<span className="flex items-center space-x-2">
							<FaTint className="text-teal-500" />
							<span>{temp.humidity}%</span>
						</span>
					</div>
				))}
			</div>
			<button
				onClick={() => onOpenModal(date)}
				className="mt-4 text-accent hover:underline"
			>
				View More
			</button>
		</div>
	);
};

export default WeatherCard;
