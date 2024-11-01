import React, { useState } from 'react';

interface City {
	name: string;
	lat: number;
	lon: number;
}

interface CitySelectorProps {
	onSelectCity: (lat: number, lon: number) => void;
}

const cities: City[] = [
	{ name: 'Paris', lat: 48.8566, lon: 2.3522 },
	{ name: 'London', lat: 51.5074, lon: -0.1278 },
	{ name: 'New York', lat: 40.7128, lon: -74.006 },
	{ name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
	{ name: 'Sydney', lat: -33.8688, lon: 151.2093 },
	// Ajoutez d'autres villes ici
];

const CitySelector: React.FC<CitySelectorProps> = ({ onSelectCity }) => {
	const [selectedCity, setSelectedCity] = useState<string>('');

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const cityName = event.target.value;
		setSelectedCity(cityName);
		const selectedCity = cities.find((city) => city.name === cityName);
		if (selectedCity) {
			onSelectCity(selectedCity.lat, selectedCity.lon);
		}
	};

	return (
		<div className="mb-4 flex justify-center">
			<select
				value={selectedCity}
				onChange={handleSelectChange}
				className="form-select block w-full max-w-xs"
			>
				<option value="" disabled>
					Select a city
				</option>
				{cities.map((city) => (
					<option key={city.name} value={city.name}>
						{city.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default CitySelector;
