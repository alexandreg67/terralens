import { fetchEconomicData } from '../services/EconomicDataFetcher';

export const getGDPHistoricalData = async (countryCode: string) => {
	const data = await fetchEconomicData(countryCode, 'NY.GDP.MKTP.CD');
	return data
		.filter((entry: { value: null }) => entry.value !== null)
		.map((entry: { date: any; value: any }) => ({
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
) => {
	const data = await fetchEconomicData(countryCode, indicator);
	const latestValidValue = data.find(
		(entry: { value: null }) => entry.value !== null
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

// services/EconomicService.js

export const getGreenhouseGasEmissions = async (countryCode: string) => {
	try {
		const data = await getLatestValidEconomicData(
			countryCode,
			'EN.ATM.GHGT.KT.CE'
		);
		return data;
	} catch (error) {
		console.error(
			`Error fetching greenhouse gas emissions for ${countryCode}:`,
			error
		);
		return null;
	}
};

export const getMethaneEmissions = async (countryCode: string) => {
	const data = await getLatestValidEconomicData(
		countryCode,
		'EN.ATM.METH.KT.CE'
	);
	console.log('Methane Emissions Data:', data);
	return data;
};

export const getCO2EmissionsTotal = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'EN.ATM.CO2E.KT');
};

export const getAgriculturalLandUse = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'AG.LND.AGRI.ZS');
};

export const getRenewableEnergyUse = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'EG.FEC.RNEW.ZS');
};

export const getGreenhouseGasEmissionsTotal = (countryCode: string) => {
	return getLatestValidEconomicData(countryCode, 'EN.ATM.GHGT.KT.CE');
};
