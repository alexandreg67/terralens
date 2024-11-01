import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import EconomicDataCard from "./EconomicDataCard";
import Spinner from "../../components/Spinner";
import { fetchEconomicData } from "../../services/EconomicDataFetcher";

const GDPChart = dynamic(() => import("./GDPChart"), {
  ssr: false,
  loading: () => <Spinner />,
});

interface EconomicDataFetcherProps {
  countryCode: string;
}

interface YearValueData {
  year: string;
  value: number;
}

interface CountryGDPData {
  country: string;
  data: YearValueData[];
}

const useGDPData = (countryCode: string) => {
  const [gdp, setGdp] = useState<number | null>(null);
  const [gdpHistory, setGdpHistory] = useState<CountryGDPData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGDP = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEconomicData(countryCode, "NY.GDP.MKTP.CD");
        if (data.length > 0) {
          setGdp(data[0]?.value ?? null);
          const history = data
            .filter((item: any) => item.value !== null)
            .map((item: any) => ({
              year: item.date,
              value: item.value,
            }));

          // Créer un objet `CountryGDPData` avec le pays et les données
          const transformedHistory: CountryGDPData = {
            country: countryCode,
            data: history.reverse(),
          };

          setGdpHistory([transformedHistory]); // Mettre dans un tableau
        } else {
          setError("No data available");
        }
      } catch (err) {
        setError("Failed to fetch GDP data");
      } finally {
        setLoading(false);
      }
    };

    fetchGDP();
  }, [countryCode]);

  return { gdp, gdpHistory, loading, error };
};

const EconomicDataFetcher: React.FC<EconomicDataFetcherProps> = ({
  countryCode,
}) => {
  const { gdp, gdpHistory, loading, error } = useGDPData(countryCode);

  return (
    <div className="space-y-4">
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <EconomicDataCard
            title="Current GDP"
            value={gdp}
            description="The Gross Domestic Product (GDP) represents the total monetary value of all goods and services produced within a country over a specific period. It is a broad measure of a nation's overall economic activity."
          />
          {gdpHistory.length > 0 ? (
            <GDPChart data={gdpHistory} />
          ) : (
            <p>No historical data available</p>
          )}
        </>
      )}
    </div>
  );
};

export default EconomicDataFetcher;
