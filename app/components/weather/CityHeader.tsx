// components/CityHeader.tsx
import React from 'react';

interface CityHeaderProps {
	city: string;
	hasWeatherData: boolean;
	onScrollToChart: () => void;
}

const CityHeader: React.FC<CityHeaderProps> = ({
	city,
	hasWeatherData,
	onScrollToChart,
}) => {
	return (
		<div className="text-center mb-8">
			<h3 className="text-2xl font-semibold text-secondary">{city}</h3>
			{hasWeatherData && (
				<div className="mt-4">
					<button
						onClick={onScrollToChart}
						aria-label={`See weather trends for ${city}`}
						className="text-primary font-semibold underline hover:no-underline"
					>
						See Weather Trends for {city}
					</button>
				</div>
			)}
		</div>
	);
};

export default CityHeader;
