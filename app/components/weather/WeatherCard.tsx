import React, { useMemo } from 'react';
import {
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
			return <FaSun className="text-yellow-500" aria-label="Clear" />;
		case 'Cloudy':
			return <FaCloud className="text-gray-500" aria-label="Cloudy" />;
		case 'Rain':
			return <FaCloudRain className="text-blue-500" aria-label="Rain" />;
		case 'Thunderstorm':
			return <FaBolt className="text-yellow-600" aria-label="Thunderstorm" />;
		case 'Windy':
			return <FaWind className="text-gray-500" aria-label="Windy" />;
		case 'Fog':
			return <FaSmog className="text-gray-400" aria-label="Fog" />;
		case 'Partly Cloudy':
			return (
				<FaCloudSun className="text-yellow-400" aria-label="Partly Cloudy" />
			);
		case 'Snow':
			return <FaSnowflake className="text-blue-400" aria-label="Snow" />;
		default:
			return (
				<FaCloud
					className="text-gray-500"
					aria-label="Unknown Weather Condition"
				/>
			);
	}
};

interface WeatherCardProps {
	date: string;
	data: {
		time: string;
		temperature: number;
		windSpeed: number;
		humidity: number;
		condition: string;
	}[];
	onOpenModal: (date: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
	date,
	data,
	onOpenModal,
}) => {
	const weatherDataWithIcons = useMemo(() => {
		return data.map((temp) => ({
			...temp,
			icon: getWeatherIcon(temp.condition),
		}));
	}, [data]);

	return (
		<div className="card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
			<h3 className="text-2xl font-semibold mb-4 text-center text-primary">
				{date}
			</h3>
			<div className="space-y-2">
				{weatherDataWithIcons.map((temp, index) => (
					<div
						key={index}
						className="flex justify-between items-center text-lg"
					>
						<span className="flex items-center space-x-2">
							{temp.icon} {/* Affiche l'icône météo */}
							<span>{temp.time}</span>
						</span>
						<span className="flex items-center space-x-2">
							<FaThermometerHalf
								className="text-red-500"
								aria-label="Temperature"
							/>
							<span>{temp.temperature}°C</span>
						</span>
						<span className="flex items-center space-x-2">
							<FaWind className="text-green-500" aria-label="Wind speed" />
							<span>{temp.windSpeed} m/s</span>
						</span>
						<span className="flex items-center space-x-2">
							<FaTint className="text-teal-500" aria-label="Humidity" />
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
