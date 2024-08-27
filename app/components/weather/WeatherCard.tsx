import React from 'react';
import {
	FaClock,
	FaThermometerHalf,
	FaWind,
	FaTint,
	FaSun,
	FaCloud,
	FaCloudRain,
	FaBolt,
	FaSnowflake,
	FaSmog,
	FaCloudSun,
} from 'react-icons/fa';

const getWeatherIcon = (condition: string) => {
	switch (condition) {
		case 'Clear':
			return <FaSun className="text-yellow-500" />;
		case 'Cloudy':
			return <FaCloud className="text-gray-500" />;
		case 'Rain':
			return <FaCloudRain className="text-blue-500" />;
		case 'Thunderstorm':
			return <FaBolt className="text-yellow-600" />;
		case 'Windy':
			return <FaWind className="text-gray-500" />;
		case 'Fog':
			return <FaSmog className="text-gray-400" />;
		case 'Partly Cloudy':
			return <FaCloudSun className="text-yellow-400" />;
		case 'Snow':
			return <FaSnowflake className="text-blue-400" />;
		default:
			return <FaCloud className="text-gray-500" />; // Icône par défaut
	}
};

interface WeatherCardProps {
	date: string;
	data: {
		time: string;
		temperature: number;
		windSpeed: number;
		humidity: number;
		condition: string; // La condition météo ajoutée
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
							{getWeatherIcon(temp.condition)} {/* Affiche l'icône météo */}
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
