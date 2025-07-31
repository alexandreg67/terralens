"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  getGDPHistoricalData,
  getCO2EmissionsPerCapita,
} from "../services/EconomicService";
import GDPChart from "../components/economic/GDPChart";
import EconomicIndicatorsTable from "../components/economic/EconomicIndicatorsTable";
import CO2ComparisonChart from "../components/economic/CO2ComparisonChart";

const CountrySelector = dynamic(
  () => import("../components/economic/CountrySelector"),
  { ssr: false }
);

const EconomicPage = () => {
  const [selectedCountries, setSelectedCountries] = useState(["US"]);
  const [gdpData, setGdpData] = useState<{ country: string; data: any }[]>([]);
  const [co2Data, setCo2Data] = useState<CO2Data[]>([]);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const [filteredGdpData, setFilteredGdpData] = useState<
    { country: string; data: any }[]
  >([]);
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);

  interface CO2Data {
    country: string;
    co2Emissions: number | null;
  }
  useEffect(() => {
    // Calculate min and max years once data is loaded
    if (gdpData.length > 0) {
      const allYears = gdpData.flatMap((countryData) =>
        countryData.data.map((d: { year: any }) => d.year)
      );
      setMinYear(Math.min(...allYears));
      setMaxYear(Math.max(...allYears));
    }
  }, [gdpData]);

  // Function to filter GDP data based on dates
  const filterGdpData = (data: any[]) => {
    if (!startYear || !endYear) return data; // No filter if dates are not defined

    return data.map((countryData) => ({
      ...countryData,
      data: countryData.data.filter(
        (d: { year: number }) => d.year >= startYear && d.year <= endYear
      ),
    }));
  };

  const handleCountryChange = (countryCodes: string[]) => {
    setSelectedCountries(countryCodes);
    fetchGdpData(countryCodes);
    fetchCo2Data(countryCodes);
  };

  const fetchGdpData = async (countryCodes: string[]) => {
    const data = await Promise.all(
      countryCodes.map(async (code) => {
        const countryData = await getGDPHistoricalData(code);
        return { country: code, data: countryData };
      })
    );
    setGdpData(data);
  };

  useEffect(() => {
    // Calculate min and max years once data is loaded
    if (gdpData.length > 0) {
      const allYears = gdpData.flatMap((countryData) =>
        countryData.data.map((d: { year: any }) => d.year)
      );
      setMinYear(Math.min(...allYears));
      setMaxYear(Math.max(...allYears));

      // Initialize filteredGdpData with all data on initial load
      setFilteredGdpData(gdpData);
    }
  }, [gdpData]);

  const fetchCo2Data = async (countryCodes: any[]) => {
    const data = await Promise.all(
      countryCodes.map(async (code) => {
        const co2PerCapita = await getCO2EmissionsPerCapita(code);
        return { country: code, co2Emissions: co2PerCapita }; // Structure the data properly
      })
    );
    setCo2Data(data); // Update state with CO2 data
  };

  useEffect(() => {
    fetchGdpData(selectedCountries);
    // fetchCo2Data(selectedCountries);
  }, [selectedCountries]);

  const [dateError, setDateError] = useState<string | null>(null);

  const handleApplyFilters = () => {
    // Validate date ranges
    if (startYear && endYear && startYear > endYear) {
      setDateError("Start year must be less than or equal to end year.");
      return; // Prevent chart update if dates are invalid
    }

    // Clear any previous errors
    setDateError(null);
    
    // Update state with filtered data
    setFilteredGdpData(filterGdpData(gdpData));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-base-100 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Economic Module
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Analyze and compare economic indicators of different countries around the world.
          This dashboard provides a comparative overview of key economic indicators
          across selected countries.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Country selector */}
        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-secondary mb-4">
              Country Selection for Analysis
            </h2>
            <p className="text-base-content/70 mb-4">
              You can compare up to 3 countries at a time to understand their economic
              and environmental performance.
            </p>
            <CountrySelector
              selectedCountries={selectedCountries}
              onCountryChange={handleCountryChange}
            />
          </div>
        </div>
        {/* GDP section */}
        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-secondary mb-4">
              GDP Evolution Over Time
            </h2>
            <p className="text-base-content/70 mb-6">
              The chart below illustrates the Gross Domestic Product (GDP) of
              selected countries over time, providing insights into their economic growth
              and development. The X-axis represents the years, while the
              Y-axis displays GDP values in trillions (T), billions (B), or
              millions (M) USD.
            </p>

            {/* Date filters */}
            {dateError && (
              <div className="alert alert-error mb-4">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{dateError}</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="form-control">
                <label className="label" htmlFor="startYear">
                  <span className="label-text">Start Year</span>
                </label>
                <input
                  type="number"
                  id="startYear"
                  value={startYear || ""}
                  onChange={(e) => setStartYear(parseInt(e.target.value) || null)}
                  min={minYear !== null ? minYear.toString() : undefined}
                  max={endYear?.toString()}
                  className="input input-bordered focus:input-primary"
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="endYear">
                  <span className="label-text">End Year</span>
                </label>
                <input
                  type="number"
                  id="endYear"
                  value={endYear || ""}
                  onChange={(e) => setEndYear(parseInt(e.target.value) || null)}
                  min={startYear?.toString() || minYear?.toString()}
                  max={maxYear?.toString()}
                  className="input input-bordered focus:input-primary"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Apply Filters</span>
                </label>
                <button
                  onClick={handleApplyFilters}
                  className="btn btn-primary"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* GDP Chart */}
            <GDPChart data={filteredGdpData} />
          </div>
        </div>
      {/* <div className="mb-6">
        <h2 className="text-3xl font-semibold text-primary mb-4 text-center">
          Environmental Impact Comparison
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          This chart compares the CO2 emissions per capita across selected
          countries, providing insights into each nation&apos;s environmental
          impact relative to its population size. Higher emissions per capita
          often indicate greater environmental pressures and less sustainable
          practices.{" "}
        </p>
        <CO2ComparisonChart countryCodes={selectedCountries} />
      </div> */}

        {/* Economic indicators section */}
        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-secondary mb-4">
              Key Economic Indicators Comparison
            </h2>
            <p className="text-base-content/70 mb-6">
              Compare the most important economic indicators across selected
              countries to gain insights into their economic performance and
              development. This table highlights key metrics such as GDP growth,
              CO2 emissions, and human development indices.
            </p>
            <EconomicIndicatorsTable selectedCountries={selectedCountries} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicPage;
