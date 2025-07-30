// Interface pour un point de données économiques de l'API World Bank
export interface WorldBankDataPoint {
	date: string;
	value: number | null;
	indicator: {
		id: string;
		value: string;
	};
	country: {
		id: string;
		value: string;
	};
}

// Interface pour un point de données économiques traité
export interface EconomicDataPoint {
	date: string;
	value: number | 'no_data' | 'data_unavailable';
	unit?: string;
	source?: string;
}

// Interface pour représenter un pays avec des informations supplémentaires
export interface Country {
	code: string;
	name: string;
	continent?: string;
	population?: number;
	currency?: string;
}

// Interface pour les données économiques groupées par indicateur
export interface EconomicIndicatorData {
	indicator: string;
	data: EconomicDataPoint[];
	unit?: string;
	description?: string;
}
