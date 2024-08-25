import React, { useEffect, useState } from 'react';
import EconomicDataCard from './EconomicDataCard';

const GDPGrowthRateCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [growthRate, setGrowthRate] = useState<number | null>(null);

	useEffect(() => {
		const fetchGrowthRate = async () => {
			const response = await fetch(
				`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG?format=json`
			);
			const data = await response.json();
			if (data && data[1]) {
				setGrowthRate(data[1][0].value);
			}
		};

		fetchGrowthRate();
	}, [countryCode]);

	return (
		<EconomicDataCard
			title="Annual GDP Growth Rate"
			value={growthRate ? `${growthRate.toFixed(2)}%` : null}
			description="The percentage change in the Gross Domestic Product (GDP) from one year to the next. This indicator measures the economic growth rate of a country."
		/>
	);
};

export default GDPGrowthRateCard;
