// Centralisation du message de données manquantes
const NO_DATA_MSG = 'No data available';

// Fonction de formatage pour les pourcentages
export const formatPercentage = (
	value: number | null,
	decimals: number = 2
): string => {
	if (value === null || isNaN(value)) {
		return NO_DATA_MSG;
	}
	return `${value.toFixed(decimals)}%`;
};

// Fonction de formatage pour les nombres avec séparateurs
export const formatNumber = (value: number | null): string => {
	if (value === null || isNaN(value)) {
		return NO_DATA_MSG;
	}
	return value.toLocaleString();
};

// Fonction de formatage pour les années avec une précision optionnelle
export const formatYears = (
	value: number | null,
	decimals: number = 2
): string => {
	if (value === null || isNaN(value) || value < 0) {
		return NO_DATA_MSG;
	}
	return `${value.toFixed(decimals)} years`;
};
