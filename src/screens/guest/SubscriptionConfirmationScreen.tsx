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

export const SubscriptionConfirmationScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { subscriptionId } = route.params as { subscriptionId: string };

  const formatDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✓</Text>
        <Text style={[styles.successTitle, { color: theme.colors.text.primary }]}>
          Subscription Activated!
        </Text>
        <Text style={[styles.successMessage, { color: theme.colors.text.secondary }]}>
          Your subscription has been successfully activated
        </Text>
      </View>

      <Card style={styles.summaryCard} elevated>
        <Text style={[styles.summaryTitle, { color: theme.colors.text.primary }]}>
          Subscription Summary
        </Text>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Plan
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            Plus Plan
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Nights Selected
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            8 nights
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            First Billing Date
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            {formatDate(30)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Renewal Date
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            {formatDate(30)}
          </Text>
        </View>
      </Card>

      <View style={styles.actions}>
        <Button
          title="View Your Stays"
          onPress={() => {
            navigation.navigate('Tabs' as never, { screen: 'Bookings' } as never);
          }}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="Manage Subscription"
          variant="outline"
          onPress={() => {
            navigation.navigate('ManageSubscription' as never);
          }}
          fullWidth
          style={styles.actionButton}
        />
      </View>
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
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
});

