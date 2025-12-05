import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Button, Input, Card } from '../../components/common';

export const ResetPasswordScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsSubmitted(true);
      // TODO: Implement password reset API call
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Card style={styles.card}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Password Reset
          </Text>
          <Text style={[styles.message, { color: theme.colors.text.secondary }]}>
            Your password has been successfully reset
          </Text>
        </Card>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Reset Password
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Enter your new password
          </Text>
        </View>

        <Card style={styles.card}>
          <Input
            label="New Password"
            placeholder="Enter new password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            error={errors.password}
            containerStyle={styles.input}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            error={errors.confirmPassword}
            containerStyle={styles.input}
          />

          <Button
            title="Reset Password"
            onPress={handleSubmit}
            fullWidth
            style={styles.button}
          />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  card: {
    padding: 24,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

