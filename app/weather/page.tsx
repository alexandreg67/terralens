'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import WeatherDetailsModal from '../components/weather/WeatherDetailsModal';
import WeatherSearchBar from '../components/weather/WeatherSearchBar';
import WeatherDisplay from '../components/weather/WeatherDisplay';
import WeatherOverviewChart from '../components/weather/WeatherOverviewChart';
import CityHeader from '../components/weather/CityHeader';
import { WeatherDataEntry } from '@/app/types/weatherTypes';
import { getWeatherData } from '@/app/services/WeatherService';

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
	const [selectedDay, setSelectedDay] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [location, setLocation] = useState({
		latitude: '48.8566',
		longitude: '2.3522',
		city: '',
		displayCity: 'Paris',
	});

	const fetchWeatherData = useCallback(
		async (latitude: string, longitude: string) => {
			setLoading(true);
			setError(null);

			try {
				const { groupedFilteredData, groupedAllData } = await getWeatherData(
					latitude,
					longitude
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

	const scrollToChart = useCallback(() => {
		const chartElement = document.getElementById('weather-chart');
		if (chartElement) {
			chartElement.scrollIntoView({ behavior: 'smooth' });
		}
	}, [weatherData]);

	useEffect(() => {
		if (weatherData) {
			scrollToChart();
		}
	}, [weatherData, scrollToChart]);

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

			{location.displayCity && (
				<CityHeader
					city={location.displayCity}
					hasWeatherData={!!weatherData}
					onScrollToChart={scrollToChart}
				/>
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
