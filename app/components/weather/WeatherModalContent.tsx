import React, { useEffect, useState } from 'react';
import WeatherChart from './WeatherChart';
import { WeatherDataEntry } from '@/app/types/weatherTypes';

interface WeatherModalContentProps {
	city: {
		latitude: number;
		longitude: number;
	};
	data: WeatherDataEntry[];
	date: string;
}

const useSunriseSunset = (latitude: number, longitude: number) => {
	const [times, setTimes] = useState({ sunrise: '', sunset: '' });

	useEffect(() => {
		const fetchSunriseSunset = async () => {
			try {
				const response = await fetch(
					`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
				);
				const result = await response.json();

				if (result.status === 'OK') {
					setTimes({
						sunrise: new Date(result.results.sunrise).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						}),
						sunset: new Date(result.results.sunset).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						}),
					});
				} else {
					throw new Error('API did not return valid data');
				}
			} catch (error) {
				console.error('Failed to fetch sunrise/sunset:', error);
				simulateSunriseSunset(); // Fallback in case of API failure
			}
		};

		const simulateSunriseSunset = () => {
			const today = new Date();
			const baseSunrise = new Date(today.setHours(6, 0, 0));
			const baseSunset = new Date(today.setHours(18, 0, 0));

			const daysFromEquinox = Math.floor(
				(Number(today) - Number(new Date(today.getFullYear(), 2, 21))) /
					(1000 * 60 * 60 * 24)
			);
			const minutesChange = Math.floor(daysFromEquinox * 2);

			const simulatedSunrise = new Date(
				baseSunrise.getTime() + minutesChange * 60 * 1000
			);
			const simulatedSunset = new Date(
				baseSunset.getTime() - minutesChange * 60 * 1000
			);

			setTimes({
				sunrise: simulatedSunrise.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				}),
				sunset: simulatedSunset.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				}),
			});
		};

		fetchSunriseSunset();
	}, [latitude, longitude]);

	return times;
};

const WeatherModalContent: React.FC<WeatherModalContentProps> = ({
	city,
	data,
	date,
}) => {
	const { sunrise, sunset } = useSunriseSunset(city.latitude, city.longitude);

	const maxTemp = Math.max(...data.map((d) => d.temperature));
	const minTemp = Math.min(...data.map((d) => d.temperature));

	return (
		<div>
			<div className="grid grid-cols-2 gap-4 mb-6">
				<div className="stat bg-base-200 rounded-lg text-center">
					<div className="stat-title">Sunrise</div>
					<div className="stat-value text-warning text-2xl">{sunrise}</div>
				</div>
				<div className="stat bg-base-200 rounded-lg text-center">
					<div className="stat-title">Sunset</div>
					<div className="stat-value text-warning text-2xl">{sunset}</div>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 mb-6">
				<div className="stat bg-base-200 rounded-lg">
					<div className="stat-title">Max Temperature</div>
					<div className="stat-value text-accent">{maxTemp}°C</div>
				</div>
				<div className="stat bg-base-200 rounded-lg">
					<div className="stat-title">Min Temperature</div>
					<div className="stat-value text-info">{minTemp}°C</div>
				</div>
			</div>
			<WeatherChart data={data} />
		</div>
	);
};

export default WeatherModalContent;
