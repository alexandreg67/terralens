import React from 'react';
import Spinner from '../../components/Spinner';

interface WeatherSearchBarProps {
	cityInputValue: string;
	onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSearchClick: () => void;
	onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	loading: boolean;
	error: string | null;
	onClearError?: () => void;
}

const WeatherSearchBar: React.FC<WeatherSearchBarProps> = ({
	cityInputValue,
	onCityChange,
	onSearchClick,
	onKeyPress,
	loading,
	error,
	onClearError,
}) => {
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearchClick();
		}
	};

	return (
		<div>
			<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
				<div className="form-control w-full max-w-md">
					<input
						type="text"
						value={cityInputValue}
						onChange={onCityChange}
						onKeyPress={handleKeyPress}
						placeholder="Enter city name (e.g., Paris, London)"
						className="input input-bordered input-primary w-full focus:input-primary"
						aria-label="Enter a city name to get weather data"
					/>
				</div>
				<button
					onClick={onSearchClick}
					disabled={loading}
					className={`btn btn-primary ${loading ? 'loading' : ''}`}
					aria-label="Search for weather data for the specified city"
				>
					{loading ? 'Searching...' : 'Search'}
				</button>
			</div>

			{error && (
				<div className="alert alert-error mt-4">
					<div className="flex-1 text-center">
						<span role="alert">{error}</span>
					</div>
					{onClearError && (
						<div className="flex-none">
							<button
								className="btn btn-sm btn-circle btn-ghost"
								onClick={onClearError}
								aria-label="Close error message"
							>
								✕
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default WeatherSearchBar;
