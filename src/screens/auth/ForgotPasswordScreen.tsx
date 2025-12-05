import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Button, Input, Card } from '../../components/common';

export const ForgotPasswordScreen: React.FC = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { email?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsSubmitted(true);
      // TODO: Implement password reset API call
    }
  };

  if (isSubmitted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Card style={styles.card}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Check Your Email
          </Text>
          <Text style={[styles.message, { color: theme.colors.text.secondary }]}>
            We've sent a password reset link to {email}
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
            Forgot Password?
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Enter your email and we'll send you a reset link
          </Text>
        </View>

        <Card style={styles.card}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
            containerStyle={styles.input}
          />

          <Button
            title="Send Reset Link"
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
    textAlign: 'center',
  },
  card: {
    padding: 24,
  },
  input: {
    marginBottom: 24,
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

