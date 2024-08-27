import { fetchEconomicData } from '../api/economic/route';
import { EconomicDataPoint } from '../types/economicTypes';

// Fonction générique pour récupérer le dernier point de données valide d'un indicateur spécifique
const getLatestValidEconomicData = async (
	countryCode: string,
	indicator: string
): Promise<number | null> => {
	const data = await fetchEconomicData(countryCode, indicator);
	const latestValidValue = data.find(
		(entry: EconomicDataPoint) => entry.value !== null
	);
	return latestValidValue ? latestValidValue.value : null;
};

// Fonctions spécifiques utilisant la fonction générique
export const getGDPGrowthRate = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'NY.GDP.MKTP.KD.ZG');
};

export const getLifeExpectancy = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'SP.DYN.LE00.IN');
};

export const getUnemploymentRate = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'SL.UEM.TOTL.ZS');
};

export const getPovertyRate = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'SI.POV.DDAY');
};

export const getCO2Emissions = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'EN.ATM.CO2E.KT');
};
