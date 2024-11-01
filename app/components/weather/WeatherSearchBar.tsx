import React from 'react';
import Spinner from '../../components/Spinner';

interface WeatherSearchBarProps {
	cityInputValue: string;
	onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSearchClick: () => void;
	onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	loading: boolean;
	error: string | null;
}

const WeatherSearchBar: React.FC<WeatherSearchBarProps> = ({
	cityInputValue,
	onCityChange,
	onSearchClick,
	onKeyPress,
	loading,
	error,
}) => {
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearchClick();
		}
	};

	const buttonClasses = loading
		? 'bg-gray-400'
		: 'bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50';

	return (
		<div>
			<div className="flex justify-center mb-8">
				<input
					type="text"
					value={cityInputValue}
					onChange={onCityChange}
					onKeyPress={handleKeyPress}
					placeholder="Enter city"
					className="p-2 border rounded"
					aria-label="Enter a city name to get weather data"
				/>
				<button
					onClick={onSearchClick}
					disabled={loading}
					className={`ml-2 p-2 rounded ${buttonClasses}`}
					aria-label="Search for weather data for the specified city"
					role="button"
				>
					{loading ? <Spinner /> : 'Search'}
				</button>
			</div>

			{error && (
				<div className="text-center mb-8">
					<p className="text-xl text-accent" role="alert">
						{error}
					</p>
				</div>
			)}
		</div>
	);
};

export default WeatherSearchBar;
