/**
 * Premium Typography System
 * 
 * Design Principles:
 * - Large, elegant typography for premium feel
 * - Clear hierarchy with 8px baseline grid
 * - Optimized for readability on mobile
 * - Supports both iOS (SF Pro) and Android (Roboto) system fonts
 */

export const typography = {
  // Font Families
  fontFamily: {
    // iOS uses SF Pro, Android uses Roboto
    // React Native will automatically use system fonts
    regular: 'System', // SF Pro Text / Roboto
    medium: 'System', // SF Pro Text Medium / Roboto Medium
    semibold: 'System', // SF Pro Text Semibold / Roboto Medium
    bold: 'System', // SF Pro Display / Roboto Bold
  },

  // Font Sizes - Following 8px baseline grid
  fontSize: {
    xs: 12,      // 12px - Captions, labels
    sm: 14,      // 14px - Small text, helper text
    base: 16,    // 16px - Body text (default)
    lg: 18,      // 18px - Large body, emphasized text
    xl: 20,      // 20px - Subheadings
    '2xl': 24,   // 24px - Section headings
    '3xl': 30,   // 30px - Page titles
    '4xl': 36,   // 36px - Hero text
    '5xl': 48,   // 48px - Display text
    '6xl': 60,   // 60px - Large display
  },

  // Line Heights - Optimized for readability
  lineHeight: {
    tight: 1.2,      // Headings
    normal: 1.5,     // Body text
    relaxed: 1.75,   // Long-form content
  },

  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
};

// Typography Presets - Ready-to-use text styles
export const textStyles = {
  // Display Styles (Hero, Large Headings)
  display: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },

  // Headings
  h1: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },

  h2: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },

  h3: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.normal,
  },

  h4: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  // Body Text
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  bodyLarge: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.relaxed,
    letterSpacing: typography.letterSpacing.normal,
  },

  bodyBold: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  // Small Text
  small: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  smallBold: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  // Captions
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.wide,
  },

  // Labels
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase' as const,
  },

  // Button Text
  button: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.wide,
  },

  buttonLarge: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.wide,
  },
};

