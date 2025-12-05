import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Button, Card } from '../../components/common';
import { useAuthStore } from '../../store';
import { AuthStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OneTimeCode'>;
type RouteProp = RouteProp<AuthStackParamList, 'OneTimeCode'>;

export const OneTimeCodeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const { email } = route.params || {};
  const { login, isLoading } = useAuthStore();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleCodeChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste
      const pastedCode = value.slice(0, 6).split('');
      const newCode = [...code];
      pastedCode.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char;
        }
      });
      setCode(newCode);
      
      // Focus last filled input
      const nextIndex = Math.min(index + pastedCode.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every((digit) => digit !== '') && newCode.join('').length === 6) {
      handleVerifyCode(newCode.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async (codeToVerify?: string) => {
    const codeString = codeToVerify || code.join('');
    
    if (codeString.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the complete 6-digit code.');
      return;
    }

    try {
      // TODO: Call API to verify code
      // For now, simulate verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // If code is valid, login user
      // In real app, the API would return auth token
      await login(email || 'user@example.com', 'password');
    } catch (error) {
      Alert.alert(
        'Invalid Code',
        'The code you entered is incorrect or has expired. Please try again or request a new code.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Resend Code', onPress: handleResendCode },
        ]
      );
      // Clear code on error
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      // TODO: Call API to resend code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setCountdown(60); // 60 second countdown
      Alert.alert('Code Sent', 'A new code has been sent to your email.');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            Enter Verification Code
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            {email ? `We've sent a 6-digit code to ${email}` : 'Enter the 6-digit code sent to your email'}
          </Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.codeInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: digit
                      ? theme.colors.primary[500]
                      : theme.colors.border,
                    color: theme.colors.text.primary,
                  },
                ]}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>

          <Button
            title="Verify Code"
            onPress={() => handleVerifyCode()}
            loading={isLoading}
            fullWidth
            style={styles.button}
            disabled={code.join('').length !== 6}
          />

          <View style={styles.resendContainer}>
            {countdown > 0 ? (
              <Text style={[styles.resendText, { color: theme.colors.text.tertiary }]}>
                Resend code in {formatTime(countdown)}
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendCode} disabled={isResending}>
                <Text style={[styles.resendLink, { color: theme.colors.primary[500] }]}>
                  {isResending ? 'Sending...' : "Didn't receive code? Resend"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

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
    lineHeight: 24,
  },
  card: {
    padding: 24,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  codeInput: {
    flex: 1,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    marginBottom: 24,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resendText: {
    fontSize: 14,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  backContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

