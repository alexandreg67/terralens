// components/CityCard.tsx
import React from 'react';

interface City {
	name: string;
	lat: number;
	lon: number;
	description: string;
}

interface CityCardProps {
	city: City;
	onClick: (lat: number, lon: number) => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick }) => {
	return (
		<div className="p-2">
			<div className="card w-full bg-base-100 shadow-xl">
				<div className="card-body min-h-[150px] flex flex-col justify-between">
					<p className="text-xl font-semibold text-primary text-center">
						{city.name}
					</p>
					<p className="text-sm text-gray-700 flex-grow">{city.description}</p>
					<button
						onClick={() => onClick(city.lat, city.lon)}
						className="btn btn-primary mt-4 self-center"
					>
						Explore
					</button>
				</div>
			</div>
		</div>
	);
};

export default CityCard;
