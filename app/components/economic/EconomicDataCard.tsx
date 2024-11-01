import React from 'react';
import Spinner from '../Spinner';

interface EconomicDataCardProps {
	title: string;
	value: string | number | null | React.ReactNode;
	description: string;
	loading?: boolean;
	decimalPlaces?: number;
	noDataText?: string; // Prop optionnelle pour personnaliser le texte d'absence de données
}

const EconomicDataCard: React.FC<EconomicDataCardProps> = ({
	title,
	value,
	description,
	loading = false,
	decimalPlaces = 2,
	noDataText = 'No data available', // Texte par défaut
}) => {
	const formattedValue =
		typeof value === 'number'
			? value.toLocaleString(undefined, {
					minimumFractionDigits: decimalPlaces,
					maximumFractionDigits: decimalPlaces,
			  })
			: value;

	return (
		<div className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg">
			<div className="card-body">
				<h3 className="card-title text-lg font-semibold text-gray-900 dark:text-gray-100">
					{title}
				</h3>
				<div
					className={`text-2xl font-bold ${
						value !== null
							? 'text-gray-800 dark:text-gray-200'
							: 'text-gray-400 dark:text-gray-500'
					}`}
					aria-live="polite" // Pour informer les lecteurs d'écran des mises à jour
				>
					{loading ? (
						<div className="flex justify-center items-center">
							<Spinner />
						</div>
					) : (
						formattedValue ?? noDataText
					)}
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
					{description}
				</p>
			</div>
		</div>
	);
};

export default EconomicDataCard;
