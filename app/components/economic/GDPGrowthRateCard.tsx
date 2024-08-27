import React, { useEffect, useState } from 'react';
import { getGDPGrowthRate } from '../../services/EconomicService';
import EconomicDataCard from './EconomicDataCard';
import Spinner from '../Spinner';
import { formatPercentage } from '../../utils/formatting';

const GDPGrowthRateCard: React.FC<{ countryCode: string }> = ({
	countryCode,
}) => {
	const [growthRate, setGrowthRate] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const rate = await getGDPGrowthRate(countryCode);
				setGrowthRate(rate);
			} catch (err) {
				setError('Failed to fetch GDP growth rate.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [countryCode]);

	let content: string | number | null | React.ReactElement;

	if (loading) {
		content = <Spinner />;
	} else if (error) {
		content = <span className="text-red-500">{error}</span>;
	} else {
		content = formatPercentage(growthRate) as string;
	}

	return (
		<EconomicDataCard
			title="GDP Growth Rate"
			value={content as string | number | null}
			description="The annual percentage growth rate of GDP at market prices based on constant local currency."
		/>
	);
};

export default GDPGrowthRateCard;
