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
		<div className="card bg-base-200 shadow-xl mb-8">
			<div className="card-body text-center">
				<h3 className="card-title text-secondary justify-center text-3xl">{city}</h3>
				<p className="text-base-content/70">Current weather data and forecasts</p>
				{hasWeatherData && (
					<div className="card-actions justify-center mt-4">
						<button
							onClick={onScrollToChart}
							aria-label={`See weather trends for ${city}`}
							className="btn btn-primary btn-sm"
						>
							View Weather Trends
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CityHeader;
