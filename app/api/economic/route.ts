export const fetchEconomicData = async (
	countryCode: string,
	indicator: string
) => {
	const cacheKey = `${countryCode}_${indicator}`;
	const cachedData = sessionStorage.getItem(cacheKey);

	if (cachedData) {
		return JSON.parse(cachedData);
	}

	try {
		const response = await fetch(
			`https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`
		);
		const data = await response.json();

		if (!data || !data[1]) {
			throw new Error('Invalid API response');
		}

		// Caching data to avoid repeated API calls
		sessionStorage.setItem(cacheKey, JSON.stringify(data[1]));

		return data[1];
	} catch (error) {
		console.error(`Error fetching data for ${indicator}:`, error);
		return [];
	}
};
