import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'small' | 'medium';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'medium',
  style,
}) => {
  const { theme } = useTheme();

  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return theme.colors.success[500];
      case 'warning':
        return theme.colors.warning[500];
      case 'error':
        return theme.colors.error[500];
      case 'info':
        return theme.colors.info[500];
      default:
        return theme.colors.primary[500];
    }
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: getVariantColor() + '20', // 20% opacity
          borderRadius: theme.borderRadius.full,
          paddingHorizontal: size === 'small' ? theme.spacing[2] : theme.spacing[3],
          paddingVertical: size === 'small' ? theme.spacing[1] : theme.spacing[1],
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: getVariantColor(),
            fontSize: size === 'small' ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

