import { WorldBankDataPoint } from '../types/economicTypes';
import { logger } from '../utils/logger';

interface CacheEntry {
  data: WorldBankDataPoint[];
  timestamp: number;
}

const dataCache: Record<string, CacheEntry> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100;

// Fonction utilitaire pour nettoyer le cache
function cleanupCache() {
  const keys = Object.keys(dataCache);
  if (keys.length > MAX_CACHE_SIZE) {
    // Supprimer les entrées les plus anciennes
    const sortedKeys = keys.sort((a, b) => 
      dataCache[a].timestamp - dataCache[b].timestamp
    );
    const keysToDelete = sortedKeys.slice(0, keys.length - MAX_CACHE_SIZE);
    keysToDelete.forEach(key => delete dataCache[key]);
  }
}

export const fetchEconomicData = async (
  countryCode: string,
  indicator: string
): Promise<WorldBankDataPoint[]> => {
  const cacheKey = `${countryCode}_${indicator}`;
  const cachedEntry = dataCache[cacheKey];
  const now = Date.now();

  // Vérifier si on a des données en cache valides
  if (cachedEntry && (now - cachedEntry.timestamp) < CACHE_TTL) {
    return cachedEntry.data;
  }

  try {
    const response = await fetch(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();

    // Vérification de type pour la réponse de l'API World Bank
    if (!Array.isArray(data) || data.length < 2) {
      throw new Error("Invalid API response structure");
    }

    // Vérifier si l'API retourne un message d'erreur
    const [metadata] = data as [{ message?: Array<{ value: string }> }, unknown];
    if (metadata?.message) {
      const errorMessage = metadata.message[0]?.value || 'API Error';
      logger.error('World Bank API returned error', undefined, {
        action: 'fetchEconomicData',
        resource: 'worldbank-api',
        metadata: { countryCode, indicator, errorMessage }
      });
      throw new Error(errorMessage);
    }

    const worldBankData = data[1] as WorldBankDataPoint[];
    
    if (!worldBankData) {
      throw new Error("No data returned from API");
    }

    // Caching data with timestamp
    cleanupCache();
    dataCache[cacheKey] = {
      data: worldBankData,
      timestamp: now
    };
    
    logger.info('Economic data fetched successfully', {
      action: 'fetchEconomicData',
      resource: 'worldbank-api',
      metadata: { countryCode, indicator, dataLength: worldBankData.length }
    });

    return worldBankData;
  } catch (error) {
    logger.error('Failed to fetch economic data', error instanceof Error ? error : new Error(String(error)), {
      action: 'fetchEconomicData',
      resource: 'worldbank-api',
      metadata: { countryCode, indicator }
    });
    return [];
  }
};
