import React from 'react';
import Spinner from '../../components/Spinner'; // Assurez-vous que le chemin est correct

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
	return (
		<div>
			<div className="flex justify-center mb-8">
				<input
					type="text"
					value={cityInputValue}
					onChange={onCityChange}
					onKeyPress={onKeyPress}
					placeholder="Enter city"
					className="p-2 border rounded"
					aria-label="Entrez le nom d'une ville pour obtenir les données météorologiques"
				/>
				<button
					onClick={onSearchClick}
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
		</div>
	);
};

export default WeatherSearchBar;
