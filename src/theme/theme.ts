/**
 * Theme Configuration
 * 
 * Centralized theme system supporting light and dark modes
 * Follows Material 3 and Apple HIG design principles
 */

import { colors } from './colors';
import { typography, textStyles } from './typography';
import { spacing, spacingSemantic, borderRadius, shadows } from './spacing';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    primary: typeof colors.primary;
    secondary: typeof colors.secondary;
    accent: typeof colors.accent;
    neutral: typeof colors.neutral;
    success: typeof colors.success;
    warning: typeof colors.warning;
    error: typeof colors.error;
    info: typeof colors.info;
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceElevated: string;
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    border: string;
    borderFocus: string;
    overlay: string;
  };
  typography: typeof typography;
  textStyles: typeof textStyles;
  spacing: typeof spacing;
  spacingSemantic: typeof spacingSemantic;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
}

export const createTheme = (mode: ThemeMode = 'light'): Theme => {
  const isDark = mode === 'dark';

  return {
    mode,
    colors: {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      neutral: colors.neutral,
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
      background: isDark ? colors.background.dark : colors.background.light,
      backgroundSecondary: isDark 
        ? colors.background.darkSecondary 
        : colors.background.lightSecondary,
      surface: isDark ? colors.surface.dark : colors.surface.light,
      surfaceElevated: isDark 
        ? colors.surface.darkElevated 
        : colors.surface.lightElevated,
      text: isDark ? colors.text.dark : colors.text.light,
      border: isDark ? colors.border.dark : colors.border.light,
      borderFocus: isDark ? colors.border.darkFocus : colors.border.lightFocus,
      overlay: isDark ? colors.overlay.dark : colors.overlay.light,
    },
    typography,
    textStyles,
    spacing,
    spacingSemantic,
    borderRadius,
    shadows,
  };
};

// Default themes
export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');

// Theme context type
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
};

