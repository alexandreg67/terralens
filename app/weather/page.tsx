'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';
import WeatherCard from '../components/weather/WeatherCard';
import WeatherDetailsModal from '../components/weather/WeatherDetailsModal';

interface WeatherDataEntry {
	date: string;
	hour: number;
	time: string;
	temperature: number;
	windSpeed: number;
	humidity: number;
}

const useInput = (initialValue: string) => {
	const [value, setValue] = useState(initialValue);
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	return { value, onChange };
};

const WeatherPage: React.FC = () => {
	const cityInput = useInput('');
	const [weatherData, setWeatherData] = useState<Record<
		string,
		WeatherDataEntry[]
	> | null>(null);
	const [allWeatherData, setAllWeatherData] = useState<Record<
		string,
		WeatherDataEntry[]
	> | null>(null); // Stockage complet
	const [selectedDay, setSelectedDay] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [location, setLocation] = useState({
		latitude: '48.8566', // Coordonnées pour Paris par défaut
		longitude: '2.3522',
		city: '',
		displayCity: 'Paris',
	});

	const fetchWeatherData = useCallback(
		async (latitude: string, longitude: string) => {
			setLoading(true);
			const params = {
				latitude,
				longitude,
				hourly: 'temperature_2m,wind_speed_10m,relative_humidity_2m',
			};
			const url = 'https://api.open-meteo.com/v1/forecast';

			try {
				const response = await fetch(`${url}?${new URLSearchParams(params)}`);
				const data = await response.json();

				if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
					throw new Error('Données horaires manquantes ou incorrectes');
				}

				const currentTime = new Date();
				const currentHour = currentTime.getHours();

				const allData = data.hourly.time.map(
					(time: string, index: number): WeatherDataEntry => {
						const dateTime = new Date(time);
						const hour = dateTime.getHours();
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
						};
					}
				);

				// Filtrer uniquement les heures futures pour les cartes
				const filteredData = allData.filter(
					(entry: WeatherDataEntry) => entry.hour >= currentHour
				);

				const groupedFilteredData = filteredData.reduce(
					(
						acc: Record<string, WeatherDataEntry[]>,
						entry: WeatherDataEntry
					) => {
						if (!acc[entry.date]) acc[entry.date] = [];
						acc[entry.date].push(entry);
						return acc;
					},
					{}
				);

				const groupedAllData = allData.reduce(
					(
						acc: Record<string, WeatherDataEntry[]>,
						entry: WeatherDataEntry
					) => {
						if (!acc[entry.date]) acc[entry.date] = [];
						acc[entry.date].push(entry);
						return acc;
					},
					{}
				);

				setWeatherData(groupedFilteredData); // Pour les cartes
				setAllWeatherData(groupedAllData); // Stockage complet pour la modale
			} catch (error) {
				console.error('Error fetching weather data:', error);
				setWeatherData(null);
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	useEffect(() => {
		if (location.latitude && location.longitude) {
			fetchWeatherData(location.latitude, location.longitude);
		}
	}, [location.latitude, location.longitude, fetchWeatherData]);

	const openModal = (day: string) => {
		setSelectedDay(day);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedDay(null);
	};

	const handleCityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		cityInput.onChange(e);

		if (cityInput.value.length > 2) {
			try {
				const geoResponse = await axios.get(
					`https://nominatim.openstreetmap.org/search`,
					{
						params: {
							q: cityInput.value,
							format: 'json',
							addressdetails: 1,
							limit: 1,
						},
					}
				);

				if (geoResponse.data.length > 0) {
					const { lat, lon, display_name } = geoResponse.data[0];
					setLocation((prev) => ({
						...prev,
						latitude: lat,
						longitude: lon,
						displayCity: display_name,
					}));
				}
			} catch (error) {
				console.error('Error fetching city coordinates:', error);
			}
		}
	};

	return (
		<div className="p-8 bg-background min-h-screen">
			<h2 className="text-4xl font-bold text-center mb-8 text-primary">
				Weather Data
			</h2>

			<div className="flex justify-center mb-8">
				<input
					type="text"
					value={cityInput.value}
					onChange={handleCityChange}
					placeholder="Enter city"
					className="p-2 border rounded"
				/>
			</div>

			{location.displayCity && (
				<div className="text-center mb-8">
					<h3 className="text-2xl font-semibold text-secondary">
						{location.displayCity}
					</h3>
				</div>
			)}

			{loading ? (
				<p className="text-center text-xl">Loading...</p>
			) : weatherData ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Object.entries(weatherData).map(([date, temps]) => (
						<WeatherCard
							key={date}
							date={date}
							data={temps.slice(0, 3)} // Montre seulement les 3 premières heures futures dans la carte
							onOpenModal={openModal}
						/>
					))}
				</div>
			) : (
				<p className="text-center text-xl text-error">Error fetching data</p>
			)}

			<WeatherDetailsModal
				date={selectedDay}
				data={
					selectedDay && allWeatherData?.[selectedDay] // Utiliser toutes les données pour la modale
						? allWeatherData[selectedDay]
						: null
				}
				isOpen={isModalOpen}
				onClose={closeModal}
			/>
		</div>
	);
};

export default WeatherPage;
