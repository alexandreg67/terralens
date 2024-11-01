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

    // Vérifier si l'API retourne un message d'erreur au lieu des données
    if (data[0]?.message) {
      console.error(
        `Error from API for ${indicator}:`,
        data[0].message[0].value
      );
      throw new Error(data[0].message[0].value);
    }

    if (!data || !data[1]) {
      throw new Error("Invalid API response structure");
    }

    // Caching data in memory
    dataCache[cacheKey] = data[1];
    return data[1];
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data for ${indicator}:`, error.message);
    } else {
      console.error(`Error fetching data for ${indicator}:`, error);
    }
    return [];
  }
};
