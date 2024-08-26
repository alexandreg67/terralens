import React, { useState } from 'react';

interface City {
	name: string;
	lat: number;
	lon: number;
}

interface CitySearchProps {
	onCitySelect: (lat: number, lon: number) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
	const [query, setQuery] = useState<string>('');
	const [results, setResults] = useState<City[]>([]);

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		if (e.target.value.length > 2) {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?q=${e.target.value}&format=json&limit=5`
			);
			const data = await response.json();
			setResults(
				data.map((item: any) => ({
					name: item.display_name,
					lat: parseFloat(item.lat),
					lon: parseFloat(item.lon),
				}))
			);
		} else {
			setResults([]);
		}
	};

	const handleCityClick = (city: City) => {
		onCitySelect(city.lat, city.lon);
		setQuery(city.name);
		setResults([]);
	};

	return (
		<div className="relative mb-4">
			<input
				type="text"
				value={query}
				onChange={handleSearch}
				className="form-input block w-full max-w-xs"
				placeholder="Search for a city..."
			/>
			{results.length > 0 && (
				<ul className="absolute z-10 bg-white shadow-md mt-1 w-full max-w-xs">
					{results.map((city) => (
						<li
							key={city.name}
							onClick={() => handleCityClick(city)}
							className="cursor-pointer hover:bg-gray-200 p-2"
						>
							{city.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CitySearch;
