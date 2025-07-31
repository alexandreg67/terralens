import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Enregistrement des composants nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Importez vos services ici
import { getGreenhouseGasEmissionsTotal, getCO2EmissionsTotal, getMethaneEmissions } from "../../services/EconomicService";
import { calculateAdaptiveYAxis, CHART_COLOR_PALETTE } from "../../utils/chartUtils";

const CO2ComparisonChart = ({ countryCodes }: { countryCodes: string[] }) => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Promise.all(
        countryCodes.map(async (countryCode) => {
          const [greenhouseGasEmissionsTotal, co2EmissionsTotal, methaneEmissions] = await Promise.all([
            getGreenhouseGasEmissionsTotal(countryCode),
            getCO2EmissionsTotal(countryCode),
            getMethaneEmissions(countryCode)
          ]);

          return {
            country: countryCode,
            greenhouseGasEmissionsTotal: greenhouseGasEmissionsTotal || 0,
            co2EmissionsTotal: co2EmissionsTotal || 0,
            methaneEmissions: methaneEmissions || 0,
          };
        })
      );
      setData(result);
    };

    fetchData();
  }, [countryCodes]);

  const countries = data.map((item) => item.country);
  const greenhouseGasEmissions = data.map((item) => item.greenhouseGasEmissionsTotal);
  const co2Emissions = data.map((item) => item.co2EmissionsTotal);
  const methaneEmissions = data.map((item) => item.methaneEmissions);

  // Create datasets for the chart with distinct colors
  const datasets = [
    {
      label: 'Greenhouse Gas Emissions (kt CO2 equivalent)',
      data: greenhouseGasEmissions,
      backgroundColor: CHART_COLOR_PALETTE[0] + '99', // Add alpha for transparency
      borderColor: CHART_COLOR_PALETTE[0],
      borderWidth: 2,
    },
    {
      label: 'CO2 Emissions Total (kt)',
      data: co2Emissions,
      backgroundColor: CHART_COLOR_PALETTE[1] + '99',
      borderColor: CHART_COLOR_PALETTE[1],
      borderWidth: 2,
    },
    {
      label: 'Methane Emissions (kt CO2 equivalent)',
      data: methaneEmissions,
      backgroundColor: CHART_COLOR_PALETTE[2] + '99',
      borderColor: CHART_COLOR_PALETTE[2],
      borderWidth: 2,
    },
  ];

  // Calculate adaptive Y-axis scaling
  const yAxisConfig = calculateAdaptiveYAxis(datasets);

  const chartData = {
    labels: countries,
    datasets: datasets,
  };

  const chartOptions: ChartOptions<"bar"> = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Countries",
        },
      },
      y: {
        ...yAxisConfig,
        title: {
          display: true,
          text: "Emissions (kt CO2 equivalent)",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Environmental Impact Comparison",
      },
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="mt-6">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CO2ComparisonChart;
