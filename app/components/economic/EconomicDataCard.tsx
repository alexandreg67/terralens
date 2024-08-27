import React from 'react';

interface EconomicDataCardProps {
	title: string;
	value: string | number | null | React.ReactNode; // Accepte maintenant aussi ReactNode
	description: string;
	loading?: boolean; // Prop optionnelle pour gérer l'état de chargement
	decimalPlaces?: number; // Prop optionnelle pour personnaliser l'affichage des nombres
}

const EconomicDataCard: React.FC<EconomicDataCardProps> = ({
	title,
	value,
	description,
	loading = false,
	decimalPlaces = 2, // Par défaut, on affiche deux décimales pour les nombres
}) => {
	const formattedValue =
		typeof value === 'number'
			? value.toLocaleString(undefined, {
					minimumFractionDigits: decimalPlaces,
					maximumFractionDigits: decimalPlaces,
			  })
			: value;

	return (
		<div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
				{title}
			</h3>
			<div // Utilisez un div au lieu d'un p pour éviter l'imbrication incorrecte
				className={`text-2xl font-bold ${
					value !== null
						? 'text-gray-800 dark:text-gray-200'
						: 'text-gray-400 dark:text-gray-500'
				}`}
			>
				{loading ? 'Loading...' : formattedValue ?? 'No data available'}
			</div>
			<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
				{description}
			</p>
		</div>
	);
};

export default EconomicDataCard;
