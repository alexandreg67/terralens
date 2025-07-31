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
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span role="alert">{error}</span>
					</div>
					{onClearError && (
						<div className="flex-none">
							<button
								className="btn btn-sm btn-ghost"
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
