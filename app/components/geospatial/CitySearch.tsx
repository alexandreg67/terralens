import React, { useState } from 'react';
import Slider from 'react-slick';
import CityCard from './CityCard';
import CitySearchInput from './CitySearchInput';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface City {
	name: string;
	lat: number;
	lon: number;
	description: string;
}

interface CitySearchProps {
	onCitySelect: (lat: number, lon: number) => void;
}

// Composant pour les flèches personnalisées
const CustomArrow = ({
	onClick,
	direction,
}: {
	onClick?: () => void;
	direction: 'left' | 'right';
}) => (
	<button
		className={`btn btn-primary`}
		onClick={onClick}
		aria-label={`Slide ${direction}`}
		style={{
			width: '40px',
			height: '40px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: '20px',
			lineHeight: '1',
			margin: '0 10px',
		}}
	>
		{direction === 'left' ? '<' : '>'}
	</button>
);

const popularCities: City[] = [
	{
		name: 'Paris, France',
		lat: 48.8566,
		lon: 2.3522,
		description:
			'Paris, known as the "City of Light", is famed for its art, fashion, gastronomy, and culture.',
	},
	{
		name: 'New York, USA',
		lat: 40.7128,
		lon: -74.006,
		description:
			'New York, the "Big Apple", is known for its iconic landmarks like the Statue of Liberty and Times Square.',
	},
	{
		name: 'Tokyo, Japan',
		lat: 35.6895,
		lon: 139.6917,
		description:
			'Tokyo, the bustling capital of Japan, blends modern skyscrapers with historic temples.',
	},
	{
		name: 'London, United Kingdom',
		lat: 51.5074,
		lon: -0.1278,
		description:
			'London, the historic capital of England, is a global financial hub and a crossroads of cultures.',
	},
	{
		name: 'Berlin, Germany',
		lat: 52.52,
		lon: 13.405,
		description:
			'Berlin, the capital of Germany, is known for its vibrant art scene and rich history.',
	},
	{
		name: 'Rome, Italy',
		lat: 41.9028,
		lon: 12.4964,
		description:
			'Rome, the "Eternal City", is home to iconic landmarks like the Colosseum and St. Peter\'s Basilica.',
	},
	{
		name: 'Sydney, Australia',
		lat: -33.8688,
		lon: 151.2093,
		description:
			"Sydney, Australia's largest city, is famous for its iconic Opera House and stunning beaches.",
	},
	{
		name: 'Moscow, Russia',
		lat: 55.7558,
		lon: 37.6173,
		description:
			'Moscow, the capital of Russia, is the political, economic, and cultural heart of the country, with landmarks like the Kremlin.',
	},
	{
		name: 'São Paulo, Brazil',
		lat: -23.5505,
		lon: -46.6333,
		description:
			"São Paulo, Brazil's largest city, is a vibrant financial center known for its dynamic culture.",
	},
	{
		name: 'Beijing, China',
		lat: 39.9042,
		lon: 116.4074,
		description:
			'Beijing, the capital of China, is a modern metropolis with a rich imperial history.',
	},
	{
		name: 'Cairo, Egypt',
		lat: 30.0444,
		lon: 31.2357,
		description:
			'Cairo, the largest city in Africa, is the cultural and historical heart of Egypt, known for its pyramids.',
	},
	{
		name: 'Dubai, UAE',
		lat: 25.276987,
		lon: 55.296249,
		description:
			'Dubai, a city of luxury and innovation, is known for its ultramodern skyscrapers and shopping malls.',
	},
	{
		name: 'Los Angeles, USA',
		lat: 34.0522,
		lon: -118.2437,
		description:
			'Los Angeles, the "City of Angels", is famous for Hollywood, the epicenter of the film industry.',
	},
	{
		name: 'Mexico City, Mexico',
		lat: 19.4326,
		lon: -99.1332,
		description:
			"Mexico City, one of the world's largest cities, combines Aztec history with Spanish colonialism in a vibrant metropolis.",
	},
	{
		name: 'Mumbai, India',
		lat: 19.076,
		lon: 72.8777,
		description:
			"Mumbai, India's financial capital, is also the heart of the Bollywood film industry.",
	},
];

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
					description: '', // Placeholder for search results
				}))
			);
		} else {
			setResults([]);
		}
	};

	const handleCityClick = (lat: number, lon: number) => {
		onCitySelect(lat, lon);
		setQuery('');
		setResults([]);
	};

	const sliderRef = React.useRef<Slider>(null);

	const settings = {
		dots: false, // Désactive les points de navigation par défaut de react-slick
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false, // Désactive les flèches par défaut de react-slick
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="relative mb-4">
			<CitySearchInput query={query} onChange={handleSearch} />
			{results.length > 0 && (
				<ul className="absolute z-10 bg-white shadow-md mt-1 w-full max-w-xs">
					{results.map((city) => (
						<li
							key={city.name}
							onClick={() => handleCityClick(city.lat, city.lon)}
							className="cursor-pointer hover:bg-gray-200 p-2"
						>
							{city.name}
						</li>
					))}
				</ul>
			)}
			<div className="mt-4">
				<h3 className="text-lg font-semibold mb-2 text-primary">
					Popular Cities:
				</h3>
				<div className="relative">
					<Slider ref={sliderRef} {...settings}>
						{popularCities.map((city) => (
							<CityCard key={city.name} city={city} onClick={handleCityClick} />
						))}
					</Slider>
					{/* Flèches positionnées sous le slider */}
					<div className="flex justify-center mt-4">
						<CustomArrow
							direction="left"
							onClick={() => sliderRef.current?.slickPrev()}
						/>
						<CustomArrow
							direction="right"
							onClick={() => sliderRef.current?.slickNext()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CitySearch;
