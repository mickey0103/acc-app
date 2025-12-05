/**
 * Premium Hospitality Design System - Color Palette
 * 
 * Design Philosophy:
 * - Luxury hospitality aesthetic with warm, inviting tones
 * - High contrast for accessibility (WCAG AA+)
 * - Dark mode support with carefully balanced contrast
 * - Material 3 and Apple HIG consistency
 */

export const colors = {
  // Primary Brand Colors - Warm, Premium Hospitality
  primary: {
    50: '#FEF7ED',   // Lightest - backgrounds, subtle highlights
    100: '#FEEFD6',
    200: '#FDDCAD',
    300: '#FBCA84',
    400: '#F9B861',
    500: '#F7A63E',  // Main brand color - warm gold/amber
    600: '#E8942A',
    700: '#D6821F',
    800: '#C47015',
    900: '#B25E0B',  // Darkest - deep accent
  },

  // Secondary - Complementary Cool Tones
  secondary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',  // Sky blue - trust, reliability
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },

  // Accent - Rich, Sophisticated
  accent: {
    50: '#FDF4FF',
    100: '#FAE8FF',
    200: '#F5D0FE',
    300: '#F0ABFC',
    400: '#E879F9',
    500: '#D946EF',  // Vibrant purple - premium feel
    600: '#C026D3',
    700: '#A21CAF',
    800: '#86198F',
    900: '#701A75',
  },

  // Neutral Grays - Professional Base
  neutral: {
    50: '#FAFAFA',   // Light mode backgrounds
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',  // Dark mode backgrounds
  },

  // Semantic Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',  // Success green
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',  // Warning amber
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',  // Error red
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',  // Info blue
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Background Colors
  background: {
    light: '#FFFFFF',
    dark: '#0A0A0A',
    lightSecondary: '#FAFAFA',
    darkSecondary: '#141414',
  },

  // Surface Colors (Cards, Modals)
  surface: {
    light: '#FFFFFF',
    dark: '#1A1A1A',
    lightElevated: '#FFFFFF',
    darkElevated: '#242424',
  },

  // Text Colors
  text: {
    light: {
      primary: '#171717',      // High contrast on light
      secondary: '#525252',    // Medium contrast
      tertiary: '#737373',     // Low contrast
      inverse: '#FFFFFF',      // On dark backgrounds
    },
    dark: {
      primary: '#FAFAFA',      // High contrast on dark
      secondary: '#D4D4D4',   // Medium contrast
      tertiary: '#A3A3A3',    // Low contrast
      inverse: '#171717',      // On light backgrounds
    },
  },

  // Border Colors
  border: {
    light: '#E5E5E5',
    dark: '#404040',
    lightFocus: '#F7A63E',
    darkFocus: '#F9B861',
  },

  // Overlay (for modals, sheets)
  overlay: {
    light: 'rgba(0, 0, 0, 0.4)',
    dark: 'rgba(0, 0, 0, 0.7)',
  },
};

// Color utility functions
export const getColor = (colorPath: string, isDark: boolean = false): string => {
  const parts = colorPath.split('.');
  let value: any = colors;
  
  for (const part of parts) {
    value = value[part];
    if (!value) return colors.neutral[500];
  }
  
  return value;
};

// Theme-aware color getter
export const getThemeColor = (path: string, theme: 'light' | 'dark' = 'light'): string => {
  return getColor(path, theme === 'dark');
};

