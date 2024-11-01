// services/weatherService.ts
import { WeatherDataEntry } from '@/app/types/weatherTypes';
import { deriveCondition } from '@/app/utils/deriveCondition';

export const getWeatherData = async (latitude: string, longitude: string) => {
	try {
		// Appel à votre API interne Next.js
		const response = await fetch(
			`/api/weather?lat=${latitude}&lon=${longitude}`
		);
		const data = await response.json();

		// Vérification des données reçues
		if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
			throw new Error('Missing or incorrect hourly data');
		}

		const currentTime = new Date();
		const currentHour = currentTime.getHours();

		// Traitement des données comme avant, mais à partir de l'API interne
		const allData = data.hourly.time.map(
			(time: string, index: number): WeatherDataEntry => {
				const dateTime = new Date(time);
				const hour = dateTime.getHours();

				const condition = deriveCondition(
					data.hourly.temperature_2m[index],
					data.hourly.relative_humidity_2m[index],
					data.hourly.wind_speed_10m[index]
				);

				return {
					date: dateTime.toLocaleDateString(),
					hour,
					time: dateTime.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					}),
					temperature: data.hourly.temperature_2m[index],
					windSpeed: data.hourly.wind_speed_10m[index],
					humidity: data.hourly.relative_humidity_2m[index],
					condition: condition,
				};
			}
		);

		const filteredData = allData.filter(
			(entry: WeatherDataEntry) => entry.hour >= currentHour
		);

		const groupedFilteredData = filteredData.reduce(
			(acc: Record<string, WeatherDataEntry[]>, entry: WeatherDataEntry) => {
				if (!acc[entry.date]) acc[entry.date] = [];
				acc[entry.date].push(entry);
				return acc;
			},
			{}
		);

		const groupedAllData = allData.reduce(
			(acc: Record<string, WeatherDataEntry[]>, entry: WeatherDataEntry) => {
				if (!acc[entry.date]) acc[entry.date] = [];
				acc[entry.date].push(entry);
				return acc;
			},
			{}
		);

		return { groupedFilteredData, groupedAllData };
	} catch (error) {
		console.error('Error fetching weather data:', error);
		throw error;
	}
};
