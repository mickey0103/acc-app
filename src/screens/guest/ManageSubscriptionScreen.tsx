import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Badge } from '../../components/common';

export const ManageSubscriptionScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [subscription] = useState({
    plan: 'Plus',
    nightsPerMonth: 8,
    nextBillingDate: '2024-02-15',
    remainingNights: 5,
    status: 'active',
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            // TODO: Cancel subscription
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.currentPlanCard} elevated>
        <View style={styles.planHeader}>
          <View>
            <Text style={[styles.planName, { color: theme.colors.text.primary }]}>
              {subscription.plan} Plan
            </Text>
            <Text style={[styles.planNights, { color: theme.colors.text.secondary }]}>
              {subscription.nightsPerMonth} nights/month
            </Text>
          </View>
          <Badge label={subscription.status.toUpperCase()} variant="success" />
        </View>
      </Card>

      <Card style={styles.infoCard} elevated>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>
            Next Billing Date
          </Text>
          <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
            {formatDate(subscription.nextBillingDate)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>
            Remaining Nights This Month
          </Text>
          <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
            {subscription.remainingNights} / {subscription.nightsPerMonth}
          </Text>
        </View>
      </Card>

      <View style={styles.actionsSection}>
        <Button
          title="Change Plan"
          variant="outline"
          onPress={() => {
            navigation.navigate('SubscriptionOverview' as never);
          }}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="Change Dates"
          variant="outline"
          onPress={() => {
            // TODO: Navigate to date selection
          }}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="Add Extra Nights"
          variant="outline"
          onPress={() => {
            // TODO: Navigate to add nights
          }}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="View Calendar"
          variant="outline"
          onPress={() => {
            navigation.navigate('SubscriptionCalendar' as never);
          }}
          fullWidth
          style={styles.actionButton}
        />
      </View>

      <Button
        title="Cancel Subscription"
        variant="danger"
        onPress={handleCancel}
        fullWidth
        style={styles.cancelButton}
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
  currentPlanCard: {
    padding: 20,
    marginBottom: 24,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  planNights: {
    fontSize: 16,
  },
  infoCard: {
    padding: 20,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionsSection: {
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
  cancelButton: {
    marginTop: 8,
  },
});

