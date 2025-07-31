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
			return <FaSun className="text-warning" aria-label="Clear" />;
		case 'Cloudy':
			return <FaCloud className="text-base-content/60" aria-label="Cloudy" />;
		case 'Rain':
			return <FaCloudRain className="text-info" aria-label="Rain" />;
		case 'Thunderstorm':
			return <FaBolt className="text-accent" aria-label="Thunderstorm" />;
		case 'Windy':
			return <FaWind className="text-base-content/60" aria-label="Windy" />;
		case 'Fog':
			return <FaSmog className="text-base-content/50" aria-label="Fog" />;
		case 'Partly Cloudy':
			return (
				<FaCloudSun className="text-warning" aria-label="Partly Cloudy" />
			);
		case 'Snow':
			return <FaSnowflake className="text-info" aria-label="Snow" />;
		default:
			return (
				<FaCloud
					className="text-base-content/60"
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
		<div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-200">
			<div className="card-body">
				<h3 className="card-title text-secondary text-center justify-center mb-4">
					{date}
				</h3>
				<div className="space-y-3">
					{weatherDataWithIcons.map((temp, index) => (
						<div
							key={index}
							className="grid grid-cols-2 lg:grid-cols-4 gap-2 items-center text-sm lg:text-base bg-base-100 p-3 rounded-lg"
						>
							<span className="flex items-center space-x-2">
								{temp.icon}
								<span className="text-base-content font-medium">{temp.time}</span>
							</span>
							<span className="flex items-center space-x-2">
								<FaThermometerHalf
									className="text-accent"
									aria-label="Temperature"
								/>
								<span className="text-base-content">{temp.temperature}°C</span>
							</span>
							<span className="flex items-center space-x-2">
								<FaWind className="text-success" aria-label="Wind speed" />
								<span className="text-base-content">{temp.windSpeed} m/s</span>
							</span>
							<span className="flex items-center space-x-2">
								<FaTint className="text-primary" aria-label="Humidity" />
								<span className="text-base-content">{temp.humidity}%</span>
							</span>
						</div>
					))}
				</div>
				<div className="card-actions justify-center">
					<button
						onClick={() => onOpenModal(date)}
						className="btn btn-primary btn-sm"
					>
						View Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
