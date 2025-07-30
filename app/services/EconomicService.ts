import { fetchEconomicData } from "../services/EconomicDataFetcher";
import { WorldBankDataPoint } from "../types/economicTypes";

interface GDPHistoricalEntry {
  year: string;
  value: number;
}

export const getGDPHistoricalData = async (countryCode: string): Promise<GDPHistoricalEntry[]> => {
  const data = await fetchEconomicData(countryCode, "NY.GDP.MKTP.CD");
  return data
    .filter((entry: WorldBankDataPoint) => entry.value !== null)
    .map((entry: WorldBankDataPoint) => ({
      year: entry.date,
      value: entry.value as number,
    }))
    .sort((a: GDPHistoricalEntry, b: GDPHistoricalEntry) =>
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
    (entry: WorldBankDataPoint) => entry.value !== null
  );
  return latestValidValue ? latestValidValue.value : null;
};

// Fonctions spécifiques utilisant la fonction générique
export const getGDPGrowthRate = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "NY.GDP.MKTP.KD.ZG");
};

export const getLifeExpectancy = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "SP.DYN.LE00.IN");
};

export const getUnemploymentRate = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "SL.UEM.TOTL.ZS");
};

export const getPovertyRate = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "SI.POV.DDAY");
};

export const getCO2Emissions = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "EN.ATM.CO2E.LF.KT");
};

export const getCO2EmissionsPerCapita = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "EN.ATM.CO2E.PC");
};

export const getHDI = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "NY.GDP.PCAP.CD");
};

export const getEducationExpenditure = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "SE.XPD.TOTL.GD.ZS");
};

// Fonctions environnementales spécialisées
export const getGreenhouseGasEmissions = async (countryCode: string): Promise<number | null> => {
  try {
    const data = await getLatestValidEconomicData(
      countryCode,
      "EN.ATM.GHGO.KT.CE"
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

export const getMethaneEmissions = async (countryCode: string): Promise<number | null> => {
  const data = await getLatestValidEconomicData(
    countryCode,
    "EN.ATM.METH.AG.KT.CE"
  );
  return data;
};

export const getCO2EmissionsTotal = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "EN.ATM.CO2E.KT");
};

export const getAgriculturalLandUse = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "AG.LND.AGRI.ZS");
};

export const getRenewableEnergyUse = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "EG.FEC.RNEW.ZS");
};

export const getGreenhouseGasEmissionsTotal = (countryCode: string): Promise<number | null> => {
  return getLatestValidEconomicData(countryCode, "EN.ATM.GHGO.KT.CE");
};
