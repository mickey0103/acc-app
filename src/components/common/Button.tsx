import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
    };

    // Size styles
    if (size === 'small') {
      baseStyle.paddingHorizontal = theme.spacingSemantic.buttonPaddingX - 8;
      baseStyle.paddingVertical = theme.spacingSemantic.buttonPaddingY - 4;
    } else if (size === 'large') {
      baseStyle.paddingHorizontal = theme.spacingSemantic.buttonPaddingX + 8;
      baseStyle.paddingVertical = theme.spacingSemantic.buttonPaddingY + 4;
    } else {
      baseStyle.paddingHorizontal = theme.spacingSemantic.buttonPaddingX;
      baseStyle.paddingVertical = theme.spacingSemantic.buttonPaddingY;
    }

    // Variant styles
    if (variant === 'primary') {
      baseStyle.backgroundColor = theme.colors.primary[500];
    } else if (variant === 'secondary') {
      baseStyle.backgroundColor = theme.colors.secondary[500];
    } else if (variant === 'outline') {
      baseStyle.backgroundColor = 'transparent';
      baseStyle.borderWidth = 2;
      baseStyle.borderColor = theme.colors.primary[500];
    } else if (variant === 'ghost') {
      baseStyle.backgroundColor = 'transparent';
    } else if (variant === 'danger') {
      baseStyle.backgroundColor = theme.colors.error[500];
    }

    if (disabled || loading) {
      baseStyle.opacity = 0.5;
    }

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    return baseStyle;
  };

  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...theme.textStyles.button,
    };

    if (size === 'small') {
      baseStyle.fontSize = theme.typography.fontSize.sm;
    } else if (size === 'large') {
      baseStyle.fontSize = theme.typography.fontSize.lg;
    }

    if (variant === 'primary' || variant === 'secondary' || variant === 'danger') {
      baseStyle.color = theme.colors.text.inverse;
    } else {
      baseStyle.color = theme.colors.primary[500];
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' || variant === 'danger' 
            ? theme.colors.text.inverse 
            : theme.colors.primary[500]}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[getTextStyles(), textStyle]}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

