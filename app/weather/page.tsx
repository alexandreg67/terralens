'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';
import WeatherCard from '../components/weather/WeatherCard';
import WeatherDetailsModal from '../components/weather/WeatherDetailsModal';
import Spinner from '../components/Spinner'; // Assurez-vous que le chemin est correct

interface WeatherDataEntry {
	date: string;
	hour: number;
	time: string;
	temperature: number;
	windSpeed: number;
	humidity: number;
	condition: string; // Add the 'condition' property
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
	const [error, setError] = useState<string | null>(null);
	const [location, setLocation] = useState({
		latitude: '48.8566', // Coordonnées pour Paris par défaut
		longitude: '2.3522',
		city: '',
		displayCity: 'Paris',
	});

	const fetchWeatherData = useCallback(
		async (latitude: string, longitude: string) => {
			setLoading(true);
			setError(null);

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

				const deriveCondition = (
					temperature: number,
					humidity: number,
					windSpeed: number
				) => {
					if (temperature > 30 && humidity < 40) {
						return 'Clear'; // Temps clair et chaud
					} else if (temperature > 30 && humidity > 60) {
						return 'Thunderstorm'; // Conditions propices aux orages
					} else if (humidity > 85 && temperature < 20 && windSpeed < 5) {
						return 'Fog'; // Brouillard ou conditions brumeuses
					} else if (humidity > 70 && windSpeed > 15) {
						return 'Rain'; // Pluie probable avec humidité élevée et vent
					} else if (windSpeed > 20) {
						return 'Windy'; // Très venteux
					} else if (humidity > 70 && temperature > 20 && windSpeed < 10) {
						return 'Partly Cloudy'; // Partiellement nuageux
					} else if (temperature < 0) {
						return 'Snow'; // Neige possible si la température est très basse
					} else {
						return 'Cloudy'; // Nuageux par défaut
					}
				};

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

				setWeatherData(groupedFilteredData);
				setAllWeatherData(groupedAllData);
			} catch (error) {
				console.error('Error fetching weather data:', error);
				setWeatherData(null);
				setError('Erreur lors de la récupération des données météorologiques.');
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	useEffect(() => {
		// Charger les données météo par défaut pour Paris au premier chargement
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

	const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		cityInput.onChange(e);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchClick();
		}
	};

	const handleSearchClick = async () => {
		setError(null); // Réinitialiser l'erreur avant la recherche
		if (cityInput.value.trim().length > 2) {
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
				} else {
					setWeatherData(null);
					setError('Ville non trouvée.');
					setLocation((prev) => ({
						...prev,
						displayCity: '',
					}));
				}
			} catch (error) {
				console.error('Error fetching city coordinates:', error);
				setWeatherData(null);
				setError('Erreur réseau lors de la recherche de la ville.');
				setLocation((prev) => ({
					...prev,
					displayCity: '',
				}));
			}
		} else {
			setError('Veuillez entrer un nom de ville valide.');
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
					onKeyPress={handleKeyPress}
					placeholder="Enter city"
					className="p-2 border rounded"
					aria-label="Entrez le nom d'une ville pour obtenir les données météorologiques"
				/>
				<button
					onClick={handleSearchClick}
					disabled={loading}
					className={`ml-2 p-2 rounded ${
						loading ? 'bg-gray-400' : 'bg-primary text-white'
					} hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
					aria-label="Rechercher les données météorologiques pour la ville spécifiée"
				>
					{loading ? <Spinner /> : 'Rechercher'}
				</button>
			</div>

			{error && (
				<div className="text-center mb-8">
					<p className="text-xl text-accent" role="alert">
						{error}
					</p>
				</div>
			)}

			{location.displayCity && (
				<div className="text-center mb-8">
					<h3 className="text-2xl font-semibold text-secondary">
						{location.displayCity}
					</h3>
				</div>
			)}

			{loading ? (
				<div className="flex justify-center items-center" aria-live="polite">
					<Spinner />
				</div>
			) : weatherData ? (
				<div
					className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${
						loading ? 'opacity-0' : 'opacity-100'
					}`}
				>
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
				!error && (
					<p className="text-center text-xl text-error">
						Aucune donnée disponible
					</p>
				)
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
				aria-modal="true"
			/>
		</div>
	);
};

export default WeatherPage;
