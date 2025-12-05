import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { Button, Input, Card } from '../../components/common';
import { AuthStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'MagicLink'>;

export const MagicLinkScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [codeSent, setCodeSent] = useState(false);

  const validate = () => {
    const newErrors: { email?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendMagicLink = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      // TODO: Call API to send magic link
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Show success message
      Alert.alert(
        'Magic Link Sent!',
        `We've sent a magic link to ${email}. Please check your email and click the link to sign in.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Optionally navigate back or show code option
            },
          },
        ]
      );
      
      setCodeSent(true);
    } catch (error) {
      setErrors({ email: 'Failed to send magic link. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCodeInstead = () => {
    navigation.navigate('OneTimeCode', { email });
  };

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
            Magic Link Sign In
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Enter your email to receive a secure sign-in link
          </Text>
        </View>

        <Card style={styles.card}>
          {!codeSent ? (
            <>
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
                editable={!isLoading}
              />

              <Button
                title="Send Magic Link"
                onPress={handleSendMagicLink}
                loading={isLoading}
                fullWidth
                style={styles.button}
              />

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
                <Text style={[styles.dividerText, { color: theme.colors.text.tertiary }]}>OR</Text>
                <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
              </View>

              <Button
                title="Use One-Time Code Instead"
                variant="outline"
                onPress={handleUseCodeInstead}
                fullWidth
                style={styles.button}
              />
            </>
          ) : (
            <View style={styles.successContainer}>
              <Text style={styles.successIcon}>✉️</Text>
              <Text style={[styles.successTitle, { color: theme.colors.text.primary }]}>
                Check Your Email
              </Text>
              <Text style={[styles.successMessage, { color: theme.colors.text.secondary }]}>
                We've sent a magic link to{'\n'}
                <Text style={[styles.emailText, { color: theme.colors.primary[500] }]}>
                  {email}
                </Text>
              </Text>
              <Text style={[styles.instructionText, { color: theme.colors.text.secondary }]}>
                Click the link in the email to sign in. The link will expire in 15 minutes.
              </Text>

              <Button
                title="Resend Magic Link"
                variant="outline"
                onPress={handleSendMagicLink}
                loading={isLoading}
                fullWidth
                style={styles.button}
              />

              <Button
                title="Use One-Time Code Instead"
                variant="text"
                onPress={handleUseCodeInstead}
                fullWidth
                style={styles.button}
              />
            </View>
          )}

          <View style={styles.backContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.backText, { color: theme.colors.text.secondary }]}>
                ← Back to Sign In
              </Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  emailText: {
    fontWeight: '700',
  },
  instructionText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  backContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

