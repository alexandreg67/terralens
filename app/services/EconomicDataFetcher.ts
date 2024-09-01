const dataCache: Record<string, any> = {};

export const fetchEconomicData = async (
	countryCode: string,
	indicator: string
) => {
	const cacheKey = `${countryCode}_${indicator}`;
	const cachedData = dataCache[cacheKey];

	if (cachedData) {
		return cachedData;
	}

	try {
		const response = await fetch(
			`https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`
		);
		const data = await response.json();

		if (!data || !data[1]) {
			throw new Error('Invalid API response');
		}

		// Caching data in memory
		dataCache[cacheKey] = data[1];

		return data[1];
	} catch (error) {
		console.error(`Error fetching data for ${indicator}:`, error);
		return [];
	}
};
