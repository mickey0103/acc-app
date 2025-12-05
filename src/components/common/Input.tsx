import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  fullWidth = true,
  style,
  ...textInputProps
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[fullWidth && styles.fullWidth, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing[2],
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error
              ? theme.colors.error[500]
              : isFocused
              ? theme.colors.borderFocus
              : theme.colors.border,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
          },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIconContainer}>{leftIcon}</View>
        )}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.base,
              paddingLeft: leftIcon ? theme.spacing[2] : theme.spacingSemantic.inputPaddingX,
              paddingRight: rightIcon ? theme.spacing[2] : theme.spacingSemantic.inputPaddingX,
              paddingVertical: theme.spacingSemantic.inputPaddingY,
            },
            style,
          ]}
          placeholderTextColor={theme.colors.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
      {(error || helperText) && (
        <Text
          style={[
            styles.helperText,
            {
              color: error ? theme.colors.error[500] : theme.colors.text.tertiary,
              marginTop: theme.spacing[1],
            },
          ]}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  leftIconContainer: {
    paddingLeft: 16,
  },
  rightIconContainer: {
    paddingRight: 16,
  },
  helperText: {
    fontSize: 12,
  },
});

