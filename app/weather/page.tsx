// WeatherPage.tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import WeatherDetailsModal from '../components/weather/WeatherDetailsModal';
import WeatherSearchBar from '../components/weather/WeatherSearchBar';
import WeatherDisplay from '../components/weather/WeatherDisplay';
import WeatherOverviewChart from '../components/weather/WeatherOverviewChart';
import { WeatherDataEntry } from '@/app/types/weatherTypes';

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
	> | null>(null);
	const [selectedDay, setSelectedDay] = useState<string>(''); // Provide a default value of an empty string
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [location, setLocation] = useState({
		latitude: '48.8566', // Default coordinates for Paris
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
					throw new Error('Missing or incorrect hourly data');
				}

				const currentTime = new Date();
				const currentHour = currentTime.getHours();

				const deriveCondition = (
					temperature: number,
					humidity: number,
					windSpeed: number
				): string => {
					if (temperature > 30 && humidity < 40) {
						return 'Clear';
					} else if (temperature > 30 && humidity > 60) {
						return 'Thunderstorm';
					} else if (humidity > 85 && temperature < 20 && windSpeed < 5) {
						return 'Fog';
					} else if (humidity > 70 && windSpeed > 15) {
						return 'Rain';
					} else if (windSpeed > 20) {
						return 'Windy';
					} else if (humidity > 70 && temperature > 20 && windSpeed < 10) {
						return 'Partly Cloudy';
					} else if (temperature < 0) {
						return 'Snow';
					} else {
						return 'Cloudy';
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
				setError('Error retrieving weather data.');
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
		setSelectedDay('');
	};

	const handleSearchClick = async () => {
		setError(null);
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
					setError('City not found.');
					setLocation((prev) => ({
						...prev,
						displayCity: '',
					}));
				}
			} catch (error) {
				console.error('Error fetching city coordinates:', error);
				setWeatherData(null);
				setError('Network error while searching for the city.');
				setLocation((prev) => ({
					...prev,
					displayCity: '',
				}));
			}
		} else {
			setError('Please enter a valid city name.');
		}
	};

	// Scroll to the chart
	const scrollToChart = () => {
		const chartElement = document.getElementById('weather-chart');
		if (chartElement) {
			chartElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="p-8 bg-background min-h-screen">
			<h2 className="text-4xl font-bold text-center mb-8 text-primary">
				Weather Data
			</h2>

			<WeatherSearchBar
				cityInputValue={cityInput.value}
				onCityChange={cityInput.onChange}
				onSearchClick={handleSearchClick}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						handleSearchClick();
					}
				}}
				loading={loading}
				error={error}
			/>

			{/* City name display */}
			{location.displayCity && (
				<div className="text-center mb-8">
					<h3 className="text-2xl font-semibold text-secondary">
						{location.displayCity}
					</h3>

					{/* Button to scroll to the chart */}
					{weatherData && (
						<div className="mt-4">
							<button
								onClick={scrollToChart}
								className="text-primary font-semibold underline hover:no-underline"
							>
								See Weather Trends for {location.displayCity}
							</button>
						</div>
					)}
				</div>
			)}

			<WeatherDisplay
				weatherData={weatherData}
				onOpenModal={openModal}
				loading={loading}
				error={error}
				displayCity={location.displayCity}
			/>

			<WeatherDetailsModal
				date={selectedDay}
				data={
					selectedDay && allWeatherData?.[selectedDay]
						? allWeatherData[selectedDay]
						: []
				}
				isOpen={isModalOpen}
				onClose={closeModal}
				city={{
					latitude: parseFloat(location.latitude),
					longitude: parseFloat(location.longitude),
				}}
			/>

			{/* Chart with city name */}
			{weatherData && (
				<div id="weather-chart" className="mt-12">
					<h3 className="text-2xl font-bold text-center mb-4 text-secondary">
						Weather Trends in {location.displayCity}
					</h3>
					<WeatherOverviewChart weatherData={weatherData} />
				</div>
			)}
		</div>
	);
};

export default WeatherPage;
