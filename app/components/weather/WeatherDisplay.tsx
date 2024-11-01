import React from 'react';
import WeatherCard from './WeatherCard';
import Spinner from '../Spinner';
import { WeatherDataEntry } from '@/app/types/weatherTypes';

interface WeatherDisplayProps {
	weatherData: Record<string, WeatherDataEntry[]> | null;
	onOpenModal: (day: string) => void;
	loading: boolean;
	error: string | null;
	displayCity: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
	weatherData,
	onOpenModal,
	loading,
	error,
	displayCity,
}) => {
	if (loading) {
		return (
			<div className="flex justify-center items-center" aria-live="polite">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return (
			<p role="alert" className="text-center text-xl text-error">
				{error}
			</p>
		);
	}

	if (!weatherData) {
		return <p className="text-center text-xl text-error">No data available</p>;
	}

	return (
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
					onOpenModal={onOpenModal}
				/>
			))}
		</div>
	);
};

export default WeatherDisplay;
