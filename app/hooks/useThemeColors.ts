import { useEffect, useState } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  base100: string;
  base200: string;
  base300: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

const defaultColors: ThemeColors = {
  primary: '#2C7A7B',
  secondary: '#1A202C',
  accent: '#E53E3E',
  neutral: '#374151',
  base100: '#F7FAFC',
  base200: '#EDF2F7',
  base300: '#E2E8F0',
  info: '#3182CE',
  success: '#38A169',
  warning: '#D69E2E',
  error: '#E53E3E',
};

// HSL to hex conversion utility - moved outside component to avoid recreations
const hslToHex = (hsl: string): string => {
  if (!hsl || hsl === 'none') return '#000000'; // Fallback to black instead of empty string
  const values = hsl.split(' ').map(v => parseFloat(v));
  if (values.length !== 3) return '#000000'; // Fallback to black for malformed values
  const [h, s, l] = values;
  const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l / 100 - c / 2;
  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const useThemeColors = (): ThemeColors => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);

      // Optimize by reducing multiple getPropertyValue calls
      const cssVariables = [
        { key: 'primary', variable: '--p' },
        { key: 'secondary', variable: '--s' },
        { key: 'accent', variable: '--a' },
        { key: 'neutral', variable: '--n' },
        { key: 'base100', variable: '--b1' },
        { key: 'base200', variable: '--b2' },
        { key: 'base300', variable: '--b3' },
        { key: 'info', variable: '--in' },
        { key: 'success', variable: '--su' },
        { key: 'warning', variable: '--wa' },
        { key: 'error', variable: '--er' },
      ] as const;

      const newColors = cssVariables.reduce((acc, { key, variable }) => {
        const hslValue = computedStyle.getPropertyValue(variable).trim();
        acc[key as keyof ThemeColors] = hslToHex(hslValue) || defaultColors[key as keyof ThemeColors];
        return acc;
      }, {} as ThemeColors);

      setColors(newColors);
    }
  }, []);

  return colors;
};

// Utility function to convert hex color to rgba with opacity
export const hexToRgba = (hex: string, opacity: number): string => {
  if (!hex || hex === '' || !hex.startsWith('#')) return hex;
  
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};