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

export const useThemeColors = (): ThemeColors => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);

      // Convert DaisyUI HSL values to hex for easier usage
      const hslToHex = (hsl: string): string => {
        if (!hsl || hsl === 'none') return '';
        const values = hsl.split(' ').map(v => parseFloat(v));
        if (values.length !== 3) return '';
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

      setColors({
        primary: hslToHex(computedStyle.getPropertyValue('--p').trim()) || defaultColors.primary,
        secondary: hslToHex(computedStyle.getPropertyValue('--s').trim()) || defaultColors.secondary,
        accent: hslToHex(computedStyle.getPropertyValue('--a').trim()) || defaultColors.accent,
        neutral: hslToHex(computedStyle.getPropertyValue('--n').trim()) || defaultColors.neutral,
        base100: hslToHex(computedStyle.getPropertyValue('--b1').trim()) || defaultColors.base100,
        base200: hslToHex(computedStyle.getPropertyValue('--b2').trim()) || defaultColors.base200,
        base300: hslToHex(computedStyle.getPropertyValue('--b3').trim()) || defaultColors.base300,
        info: hslToHex(computedStyle.getPropertyValue('--in').trim()) || defaultColors.info,
        success: hslToHex(computedStyle.getPropertyValue('--su').trim()) || defaultColors.success,
        warning: hslToHex(computedStyle.getPropertyValue('--wa').trim()) || defaultColors.warning,
        error: hslToHex(computedStyle.getPropertyValue('--er').trim()) || defaultColors.error,
      });
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