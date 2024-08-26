import React from 'react';

interface EconomicDataCardProps {
	title: string;
	value: string | number | null;
	description: string;
}

const EconomicDataCard: React.FC<EconomicDataCardProps> = ({
	title,
	value,
	description,
}) => {
	return (
		<div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
				{title}
			</h3>
			<p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
				{value !== null ? value.toLocaleString() : 'Loading...'}
			</p>
			<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
				{description}
			</p>
		</div>
	);
};

export default EconomicDataCard;
