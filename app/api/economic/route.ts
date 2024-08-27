export const fetchEconomicData = async (
	countryCode: string,
	indicator: string
) => {
	const response = await fetch(
		`https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`
	);
	const data = await response.json();
	if (!data || !data[1]) {
		throw new Error('Invalid API response');
	}
	return data[1];
};
