import { fetchEconomicData } from '../api/economic/route';
import { EconomicDataPoint } from '../types/economicTypes';

// Fonction pour récupérer toutes les données de PIB sur une période pour un pays
export const getGDPHistoricalData = async (
	countryCode: string
): Promise<{ year: string; value: number }[]> => {
	const data = await fetchEconomicData(countryCode, 'NY.GDP.MKTP.CD');
	return data
		.filter((entry: EconomicDataPoint) => entry.value !== null)
		.map((entry: EconomicDataPoint) => ({
			year: entry.date,
			value: entry.value,
		}))
		.sort(
			(a: { year: string }, b: { year: string }) =>
				parseInt(a.year) - parseInt(b.year)
		);
};

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

export const getCO2EmissionsPerCapita = (countryCode: string) => {
	// L'indicateur EN.ATM.CO2E.PC représente les émissions de CO2 par habitant
	return getLatestValidEconomicData(countryCode, 'EN.ATM.CO2E.PC');
};

export const getHDI = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'NY.GDP.PCAP.CD'); // L'indicateur pour l'IDH peut varier, NY.GDP.PCAP.CD représente souvent le RNB par habitant utilisé dans le calcul de l'IDH
};

export const getEducationExpenditure = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'SE.XPD.TOTL.GD.ZS');
};
