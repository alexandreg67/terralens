import React, { useEffect, useState } from 'react';
import WeatherChart from './WeatherChart'; // Assurez-vous que le chemin est correct
import { WeatherDataEntry } from '@/app/types/weatherTypes';

interface WeatherModalContentProps {
	city: {
		latitude: number;
		longitude: number;
	};
	data: WeatherDataEntry[];
	date: string;
}

const WeatherModalContent: React.FC<WeatherModalContentProps> = ({
	city,
	data,
	date,
}) => {
	const [sunrise, setSunrise] = useState('');
	const [sunset, setSunset] = useState('');

	useEffect(() => {
		if (!city) return;

		const fetchSunriseSunset = async (latitude: number, longitude: number) => {
			try {
				const response = await fetch(
					`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
				);
				const result = await response.json();

				if (result.status === 'OK') {
					setSunrise(
						new Date(result.results.sunrise).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})
					);
					setSunset(
						new Date(result.results.sunset).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})
					);
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

			setSunrise(
				simulatedSunrise.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				})
			);
			setSunset(
				simulatedSunset.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				})
			);
		};

		fetchSunriseSunset(city.latitude, city.longitude);
	}, [city]);

	const maxTemp = Math.max(...data.map((d) => d.temperature));
	const minTemp = Math.min(...data.map((d) => d.temperature));

	return (
		<div>
			<h3 className="text-2xl font-semibold mb-4 text-center text-primary">
				{date}
			</h3>
			<div className="flex justify-between mb-6">
				<div className="text-center">
					<h4 className="text-lg font-semibold text-primary">
						Lever du soleil
					</h4>
					<p className="text-secondary">{sunrise}</p>
				</div>
				<div className="text-center">
					<h4 className="text-lg font-semibold text-primary">
						Coucher du soleil
					</h4>
					<p className="text-secondary">{sunset}</p>
				</div>
			</div>
			<div className="text-center mb-6">
				<p className="text-lg">
					<span className="font-semibold">Température Max:</span> {maxTemp}°C
				</p>
				<p className="text-lg">
					<span className="font-semibold">Température Min:</span> {minTemp}°C
				</p>
			</div>
			<WeatherChart data={data} />
		</div>
	);
};

export default WeatherModalContent;
