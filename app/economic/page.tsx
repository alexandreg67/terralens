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
    // Calcule les années min et max une fois que les données sont chargées
    if (gdpData.length > 0) {
      const allYears = gdpData.flatMap((countryData) =>
        countryData.data.map((d: { year: any }) => d.year)
      );
      setMinYear(Math.min(...allYears));
      setMaxYear(Math.max(...allYears));
    }
  }, [gdpData]);

  // Fonction pour filtrer les données du PIB en fonction des dates
  const filterGdpData = (data: any[]) => {
    if (!startYear || !endYear) return data; // Pas de filtre si les dates ne sont pas définies

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
    // Calcule les années min et max une fois que les données sont chargées
    if (gdpData.length > 0) {
      const allYears = gdpData.flatMap((countryData) =>
        countryData.data.map((d: { year: any }) => d.year)
      );
      setMinYear(Math.min(...allYears));
      setMaxYear(Math.max(...allYears));

      // Initialise filteredGdpData avec toutes les données au chargement initial
      setFilteredGdpData(gdpData);
    }
  }, [gdpData]);

  const fetchCo2Data = async (countryCodes: any[]) => {
    const data = await Promise.all(
      countryCodes.map(async (code) => {
        const co2PerCapita = await getCO2EmissionsPerCapita(code);
        return { country: code, co2Emissions: co2PerCapita }; // Structurez bien les données
      })
    );
    setCo2Data(data); // Mettre à jour l'état avec les données CO2
  };

  useEffect(() => {
    fetchGdpData(selectedCountries);
    // fetchCo2Data(selectedCountries);
  }, [selectedCountries]);

  const handleApplyFilters = () => {
    // Vérification de la validité des dates
    if (startYear && endYear && startYear > endYear) {
      alert("L'année de début doit être inférieure ou égale à l'année de fin.");
      return; // Empêche la mise à jour du graphique si les dates sont invalides
    }

    // Met à jour l'état avec les données filtrées
    setFilteredGdpData(filterGdpData(gdpData));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-base-100 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Module Économique
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Analysez et comparez les indicateurs économiques des différents pays du monde.
          Ce tableau de bord fournit une vue comparative des principaux indicateurs
          économiques entre les pays sélectionnés.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Sélecteur de pays */}
        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-secondary mb-4">
              Sélection des pays à analyser
            </h2>
            <p className="text-base-content/70 mb-4">
              Vous pouvez comparer jusqu&apos;à 3 pays à la fois pour comprendre leurs performances
              économiques et environnementales.
            </p>
            <CountrySelector
              selectedCountries={selectedCountries}
              onCountryChange={handleCountryChange}
            />
          </div>
        </div>
        {/* Section PIB */}
        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-secondary mb-4">
              Évolution du PIB dans le temps
            </h2>
            <p className="text-base-content/70 mb-6">
              Le graphique ci-dessous illustre le Produit Intérieur Brut (PIB) des
              pays sélectionnés au fil du temps, fournissant des informations sur leur croissance
              et développement économique. L&apos;axe X représente les années, tandis que
              l&apos;axe Y affiche les valeurs du PIB en trillions (T), milliards (B), ou
              millions (M) de USD.
            </p>

            {/* Filtres de date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="form-control">
                <label className="label" htmlFor="startYear">
                  <span className="label-text">Année de début</span>
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
                  <span className="label-text">Année de fin</span>
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
                  <span className="label-text">Appliquer les filtres</span>
                </label>
                <button
                  onClick={handleApplyFilters}
                  className="btn btn-primary"
                >
                  Appliquer
                </button>
              </div>
            </div>

            {/* Graphique PIB */}
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

        {/* Section indicateurs économiques */}
        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-secondary mb-4">
              Comparaison des indicateurs économiques clés
            </h2>
            <p className="text-base-content/70 mb-6">
              Comparez les indicateurs économiques les plus importants entre les pays
              sélectionnés pour obtenir des informations sur leurs performances économiques
              et leur développement. Ce tableau met en évidence les métriques clés telles que
              la croissance du PIB, les émissions de CO2 et les indices de développement humain.
            </p>
            <EconomicIndicatorsTable selectedCountries={selectedCountries} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicPage;
