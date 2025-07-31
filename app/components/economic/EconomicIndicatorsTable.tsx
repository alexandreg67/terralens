import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import {
  getCO2EmissionsPerCapita,
  getEducationExpenditure,
  getGDPGrowthRate,
  getHDI,
  getLifeExpectancy,
  getPovertyRate,
  getUnemploymentRate,
} from "@/app/services/EconomicService";

const EconomicIndicatorsTable: React.FC<{ selectedCountries: string[] }> = ({
  selectedCountries,
}) => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Definition of the `indicators` array in the same file
  const indicators = React.useMemo(
    () => [
      {
        title: "GDP Growth Rate",
        description:
          "The annual percentage increase in a country’s Gross Domestic Product, reflecting the overall economic health and expansion rate of the economy.",
        unit: "%",
        fetchData: getGDPGrowthRate,
      },
      {
        title: "Unemployment Rate",
        description:
          "The percentage of the labor force that is without work but actively seeking employment. It’s an important indicator of the labor market’s health.",
        unit: "%",
        fetchData: getUnemploymentRate,
      },
      {
        title: "Poverty Rate",
        description:
          "The percentage of the population living below the national poverty line, highlighting the prevalence of poverty within a country.",
        unit: "%",
        fetchData: getPovertyRate,
      },
      {
        title: "Life Expectancy",
        description:
          "The average number of years a newborn is expected to live under current mortality rates, reflecting the overall health and living conditions of a country.",
        unit: "years",
        fetchData: getLifeExpectancy,
      },
      {
        title: "Human Development Index (HDI)",
        description:
          "A composite index measuring average achievement in three basic dimensions of human development: health (life expectancy), education, and standard of living (income per capita).",
        unit: "",
        fetchData: getHDI,
      },
      {
        title: "Education Expenditure",
        description:
          "Public expenditure on education as a percentage of Gross Domestic Product (GDP), indicating the importance placed on education by the government.",
        unit: "% of GDP",
        fetchData: getEducationExpenditure,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await Promise.all(
          selectedCountries.map(async (countryCode) => {
            const countryData: { [key: string]: any } = {};
            await Promise.all(
              indicators.map(async (indicator) => {
                try {
                  const value = await indicator.fetchData(countryCode);
                  countryData[indicator.title] = value;
                } catch (err) {
                  console.error(
                    `Error fetching ${indicator.title} for ${countryCode}:`,
                    err
                  );
                  countryData[indicator.title] = "Error";
                }
              })
            );
            return { [countryCode]: countryData };
          })
        );

        // Merge results into one object
        const mergedResult = result.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {}
        );
        setData(mergedResult);
      } catch (err) {
        console.error("Error fetching economic data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountries, indicators]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th className="text-left text-secondary">
              Indicator
            </th>
            {selectedCountries.map((countryCode) => (
              <th
                key={countryCode}
                className="text-left text-secondary"
              >
                {countryCode}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {indicators.map((indicator) => (
            <tr key={indicator.title} className="hover">
              <td className="font-semibold text-base-content">
                <div className="flex flex-col">
                  <span>{indicator.title}</span>
                  <div className="text-sm text-base-content/70 max-w-md">
                    {indicator.description}
                  </div>
                </div>
              </td>
              {selectedCountries.map((countryCode) => (
                <td key={countryCode} className="text-base-content">
                  {data[countryCode] &&
                  data[countryCode][indicator.title] !== undefined ? (
                    data[countryCode][indicator.title] !== "Error" ? (
                      <span className="font-medium">
                        {data[countryCode][indicator.title]?.toFixed(2)}{" "}
                        {indicator.unit && (
                          <span className="text-base-content/70">
                            {indicator.unit}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-error font-medium">Error</span>
                    )
                  ) : (
                    <span className="text-base-content/50">No data</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EconomicIndicatorsTable;
