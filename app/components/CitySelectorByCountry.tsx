import React, { useState, useEffect } from 'react';

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

	const handleSearch = async () => {
		if (query.length > 2) {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`
			);
			const data = await response.json();
			setResults(
				data.map((item: any) => ({
					name: item.display_name,
					lat: parseFloat(item.lat),
					lon: parseFloat(item.lon),
				}))
			);
		}
	};

	const handleCityClick = (city: City) => {
		onCitySelect(city.lat, city.lon);
		setQuery(city.name);
		setResults([]);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleClear = () => {
		setQuery('');
		setResults([]);
	};

	return (
		<div className="relative mb-4">
			<div className="flex items-center">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
					className="form-input block w-full max-w-xs p-2 border border-gray-300 rounded-l-md"
					placeholder="Search for a city..."
				/>
				<button
					onClick={handleSearch}
					className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
				>
					Search
				</button>
			</div>
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
			{query && (
				<button onClick={handleClear} className="text-sm text-gray-500 mt-2">
					Clear
				</button>
			)}
		</div>
	);
};

export default CitySearch;
