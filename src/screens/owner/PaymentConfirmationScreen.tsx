import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button } from '../../components/common';

export const PaymentConfirmationScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { investmentId } = route.params as { investmentId: string };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✓</Text>
        <Text style={[styles.successTitle, { color: theme.colors.text.primary }]}>
          Payment Successful!
        </Text>
        <Text style={[styles.successMessage, { color: theme.colors.text.secondary }]}>
          Your investment has been confirmed
        </Text>
      </View>

      <Card style={styles.summaryCard} elevated>
        <Text style={[styles.summaryTitle, { color: theme.colors.text.primary }]}>
          Investment Confirmed
        </Text>
        <Text style={[styles.summaryText, { color: theme.colors.text.secondary }]}>
          You will receive a confirmation email with all the details of your investment.
        </Text>
      </Card>

      <Button
        title="View My Investments"
        onPress={() => {
          navigation.navigate('Tabs' as never, { screen: 'Investments' } as never);
        }}
        fullWidth
        style={styles.actionButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  successIcon: {
    fontSize: 64,
    color: '#22C55E',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
  summaryCard: {
    padding: 20,
    marginBottom: 32,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionButton: {
    marginTop: 8,
  },
});

