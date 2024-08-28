// Interface pour un point de données économiques avec un type discriminant
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
	continent?: string; // Par exemple, "Europe", "Asia", etc.
	population?: number; // Population du pays
	currency?: string; // Par exemple, "USD", "EUR", etc.
}

export interface EconomicDataPoint {
	date: string;
	value: number | 'no_data' | 'data_unavailable';
	indicator: {
		id: string;
		value: string;
	};
	country: {
		id: string;
		value: string;
	};
}
