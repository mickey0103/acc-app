/**
 * Spacing System - 8px Baseline Grid
 * 
 * Design Principles:
 * - Consistent 8px spacing scale (12-24px rule for premium spacing)
 * - Follows Material 3 and Apple HIG spacing guidelines
 * - Ensures visual rhythm and breathing room
 */

export const spacing = {
  // Base spacing units (8px grid)
  0: 0,
  1: 4,    // 4px - Tight spacing, icon padding
  2: 8,    // 8px - Minimal spacing
  3: 12,   // 12px - Small spacing (premium minimum)
  4: 16,   // 16px - Standard spacing
  5: 20,   // 20px - Medium spacing
  6: 24,   // 24px - Large spacing (premium standard)
  7: 28,   // 28px
  8: 32,   // 32px - Extra large spacing
  9: 36,   // 36px
  10: 40,  // 40px
  11: 44,  // 44px
  12: 48,  // 48px - Section spacing
  14: 56,  // 56px
  16: 64,  // 64px - Large section spacing
  20: 80,  // 80px - Hero spacing
  24: 96,  // 96px - Extra large sections
};

// Semantic spacing names for common use cases
export const spacingSemantic = {
  // Component Internal Spacing
  xs: spacing[1],      // 4px - Icon padding, tight elements
  sm: spacing[2],      // 8px - Small gaps
  md: spacing[3],      // 12px - Standard component padding
  lg: spacing[4],      // 16px - Card padding, button padding
  xl: spacing[6],      // 24px - Section padding, premium spacing
  '2xl': spacing[8],   // 32px - Large sections
  '3xl': spacing[12],  // 48px - Page sections
  '4xl': spacing[16],  // 64px - Major sections

  // Screen Margins
  screenHorizontal: spacing[4],  // 16px - Standard screen padding
  screenVertical: spacing[6],     // 24px - Standard screen padding
  screenHorizontalLarge: spacing[6], // 24px - Premium screens
  screenVerticalLarge: spacing[8],    // 32px - Premium screens

  // Card/Container Spacing
  cardPadding: spacing[4],        // 16px - Standard card padding
  cardPaddingLarge: spacing[6],   // 24px - Premium card padding
  cardGap: spacing[4],            // 16px - Gap between cards
  cardGapLarge: spacing[6],       // 24px - Premium gap

  // Button Spacing
  buttonPaddingX: spacing[6],     // 24px - Horizontal button padding
  buttonPaddingY: spacing[3],    // 12px - Vertical button padding
  buttonGap: spacing[3],          // 12px - Gap between buttons

  // Input Spacing
  inputPaddingX: spacing[4],      // 16px - Input horizontal padding
  inputPaddingY: spacing[3],      // 12px - Input vertical padding
  inputGap: spacing[2],            // 8px - Gap between inputs

  // List Item Spacing
  listItemPadding: spacing[4],    // 16px - List item padding
  listItemGap: spacing[3],        // 12px - Gap between list items

  // Icon Spacing
  iconSize: spacing[5],           // 20px - Standard icon size
  iconSizeLarge: spacing[6],       // 24px - Large icon size
  iconGap: spacing[2],            // 8px - Gap between icon and text
};

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,      // 4px - Small elements
  md: 8,      // 8px - Standard elements
  lg: 12,     // 12px - Cards, buttons
  xl: 16,     // 16px - Large cards
  '2xl': 20,  // 20px - Extra large cards
  '3xl': 24,  // 24px - Hero sections
  full: 9999, // Full circle/pill
};

// Shadow/Elevation (for depth)
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // Android
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

