/**
 * Chart utilities for adaptive Y-axis scaling and color management
 */

/**
 * Extended color palette for charts with high contrast and visibility
 * Supports up to 12 distinct datasets/countries
 */
export const CHART_COLOR_PALETTE = [
  '#2563eb', // Blue
  '#dc2626', // Red  
  '#16a34a', // Green
  '#ea580c', // Orange
  '#9333ea', // Purple
  '#0891b2', // Cyan
  '#be123c', // Pink
  '#65a30d', // Lime
  '#0369a1', // Sky blue
  '#dc2626', // Rose
  '#854d0e', // Amber
  '#374151', // Gray
];

/**
 * Gets a color from the palette by index, cycling through if necessary
 */
export function getChartColor(index: number): string {
  return CHART_COLOR_PALETTE[index % CHART_COLOR_PALETTE.length];
}

/**
 * Generates an array of distinct colors for multiple datasets
 */
export function generateColorArray(count: number): string[] {
  return Array.from({ length: count }, (_, index) => getChartColor(index));
}

export interface YAxisConfig {
  beginAtZero?: boolean;
  min?: number;
  max?: number;
}

export interface RechartsYAxisConfig {
  domain?: [number | 'auto' | 'dataMin' | 'dataMax', number | 'auto' | 'dataMin' | 'dataMax'];
}

export interface ChartDataset {
  label: string;
  data: (number | null)[];
  borderColor: string;
  backgroundColor: string;
  tension?: number;
}

/**
 * Calculates adaptive Y-axis configuration based on the actual data values
 * to ensure optimal visualization of curves and variations.
 * 
 * @param datasets Array of chart datasets containing the data values
 * @returns YAxisConfig object with appropriate min/max or beginAtZero settings
 */
export function calculateAdaptiveYAxis(datasets: ChartDataset[]): YAxisConfig {
  // Extract all non-null numeric values from all datasets
  const allValues: number[] = [];
  
  datasets.forEach(dataset => {
    dataset.data.forEach(value => {
      if (typeof value === 'number' && !isNaN(value)) {
        allValues.push(value);
      }
    });
  });

  // If no valid data, fallback to beginAtZero
  if (allValues.length === 0) {
    return { beginAtZero: true };
  }

  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue;

  // Special case: all values are the same
  if (valueRange === 0) {
    const padding = Math.abs(minValue) * 0.1 || 1;
    return {
      min: minValue - padding,
      max: maxValue + padding
    };
  }

  // Special case: percentage data (0-100 range)
  if (minValue >= 0 && maxValue <= 100 && valueRange < 100) {
    // For percentage data, use beginAtZero if min is close to 0
    if (minValue <= 5) {
      return { beginAtZero: true, max: Math.min(maxValue * 1.1, 100) };
    } else {
      // Otherwise use adaptive range with small padding
      const padding = valueRange * 0.05;
      return {
        min: Math.max(0, minValue - padding),
        max: Math.min(100, maxValue + padding)
      };
    }
  }

  // Special case: small positive values close to zero
  if (minValue >= 0 && maxValue < 50 && minValue < 5) {
    return { beginAtZero: true };
  }

  // Special case: values contain negatives
  if (minValue < 0) {
    const padding = valueRange * 0.1;
    return {
      min: minValue - padding,
      max: maxValue + padding
    };
  }

  // General case: adaptive range for better curve visibility
  // Don't use beginAtZero if the minimum value is significantly above zero
  const zeroDistanceRatio = minValue / valueRange;
  
  if (zeroDistanceRatio > 0.3) {
    // Min value is far from zero, use adaptive range
    const padding = valueRange * 0.05; // 5% padding
    return {
      min: minValue - padding,
      max: maxValue + padding
    };
  } else {
    // Min value is close to zero, but add some padding to max
    return {
      beginAtZero: true,
      max: maxValue * 1.05
    };
  }
}

/**
 * Formats Y-axis tick values for better readability
 * 
 * @param value The tick value to format
 * @param unit Optional unit string (%, USD, etc.)
 * @returns Formatted string for display
 */
export function formatYAxisTick(value: number, unit?: string): string {
  // Handle very large numbers (GDP, etc.)
  if (Math.abs(value) >= 1e12) {
    return `${(value / 1e12).toFixed(1)}T${unit ? ` ${unit}` : ''}`;
  } else if (Math.abs(value) >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B${unit ? ` ${unit}` : ''}`;
  } else if (Math.abs(value) >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M${unit ? ` ${unit}` : ''}`;
  } else if (Math.abs(value) >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K${unit ? ` ${unit}` : ''}`;
  } else {
    // For small numbers, show appropriate decimal places
    const decimals = Math.abs(value) < 10 ? 2 : Math.abs(value) < 100 ? 1 : 0;
    return `${value.toFixed(decimals)}${unit ? ` ${unit}` : ''}`;
  }
}

/**
 * Calculates adaptive Y-axis domain for Recharts based on data values
 * to ensure optimal visualization of curves and variations.
 * 
 * @param data Recharts data array with numeric values for each country
 * @param dataKeys Array of keys representing countries to analyze
 * @returns RechartsYAxisConfig with appropriate domain settings
 */
export function calculateRechartsYAxisDomain(
  data: Array<{ [key: string]: string | number }>,
  dataKeys: string[]
): RechartsYAxisConfig {
  // Extract all numeric values from the specified data keys
  const allValues: number[] = [];
  
  data.forEach(item => {
    dataKeys.forEach(key => {
      const value = item[key];
      if (typeof value === 'number' && !isNaN(value) && value !== 0) {
        allValues.push(value);
      }
    });
  });

  // If no valid data, use auto scaling
  if (allValues.length === 0) {
    return { domain: ['auto', 'auto'] };
  }

  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue;

  // Special case: all values are the same
  if (valueRange === 0) {
    const padding = Math.abs(minValue) * 0.1 || 1;
    return {
      domain: [minValue - padding, maxValue + padding]
    };
  }

  // Special case: percentage data (0-100 range)
  if (minValue >= 0 && maxValue <= 100 && valueRange < 100) {
    if (minValue <= 5) {
      return { domain: [0, Math.min(maxValue * 1.1, 100)] };
    } else {
      const padding = valueRange * 0.05;
      return {
        domain: [Math.max(0, minValue - padding), Math.min(100, maxValue + padding)]
      };
    }
  }

  // Special case: small positive values close to zero
  if (minValue >= 0 && maxValue < 50 && minValue < 5) {
    return { domain: [0, 'auto'] };
  }

  // Special case: values contain negatives
  if (minValue < 0) {
    const padding = valueRange * 0.1;
    return {
      domain: [minValue - padding, maxValue + padding]
    };
  }

  // General case: adaptive range for better curve visibility
  const zeroDistanceRatio = minValue / valueRange;
  
  if (zeroDistanceRatio > 0.3) {
    // Min value is far from zero, use adaptive range
    const padding = valueRange * 0.05; // 5% padding
    return {
      domain: [minValue - padding, maxValue + padding]
    };
  } else {
    // Min value is close to zero, start from zero but add padding to max
    return {
      domain: [0, maxValue * 1.05]
    };
  }
}