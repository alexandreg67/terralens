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

      setColors({
        primary: computedStyle.getPropertyValue('--color-primary').trim() || defaultColors.primary,
        secondary: computedStyle.getPropertyValue('--color-secondary').trim() || defaultColors.secondary,
        accent: computedStyle.getPropertyValue('--color-accent').trim() || defaultColors.accent,
        neutral: computedStyle.getPropertyValue('--color-neutral').trim() || defaultColors.neutral,
        base100: computedStyle.getPropertyValue('--color-base-100').trim() || defaultColors.base100,
        base200: computedStyle.getPropertyValue('--color-base-200').trim() || defaultColors.base200,
        base300: computedStyle.getPropertyValue('--color-base-300').trim() || defaultColors.base300,
        info: computedStyle.getPropertyValue('--color-info').trim() || defaultColors.info,
        success: computedStyle.getPropertyValue('--color-success').trim() || defaultColors.success,
        warning: computedStyle.getPropertyValue('--color-warning').trim() || defaultColors.warning,
        error: computedStyle.getPropertyValue('--color-error').trim() || defaultColors.error,
      });
    }
  }, []);

  return colors;
};