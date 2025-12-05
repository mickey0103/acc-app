import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Badge } from '../../components/common';

export const BalancePayoutScreen: React.FC = () => {
  const { theme } = useTheme();
  const [balance] = useState(12500);
  const [payoutFrequency, setPayoutFrequency] = useState<'monthly' | 'quarterly'>('monthly');
  const [autoReinvest, setAutoReinvest] = useState(false);

  const processingFee = payoutFrequency === 'monthly' ? 0.05 : 0.02;
  const feeAmount = balance * processingFee;

  const handleRequestPayout = () => {
    Alert.alert(
      'Request Payout',
      `Request payout of $${balance.toLocaleString()}? Processing fee: $${feeAmount.toFixed(2)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Request',
          onPress: () => {
            // TODO: Process payout request
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
      {/* Current Balance */}
      <Card style={styles.balanceCard} elevated>
        <Text style={[styles.balanceLabel, { color: theme.colors.text.secondary }]}>
          Current Balance
        </Text>
        <Text style={[styles.balanceAmount, { color: theme.colors.text.primary }]}>
          ${balance.toLocaleString()}
        </Text>
        <Button
          title="Request Payout"
          onPress={handleRequestPayout}
          fullWidth
          style={styles.payoutButton}
        />
      </Card>

      {/* Payout Frequency */}
      <Card style={styles.settingsCard} elevated>
        <Text style={[styles.settingsTitle, { color: theme.colors.text.primary }]}>
          Payout Frequency
        </Text>
        <Text style={[styles.settingsDescription, { color: theme.colors.text.secondary }]}>
          Choose how often you want to receive payouts
        </Text>

        <TouchableOpacity
          style={[
            styles.frequencyOption,
            payoutFrequency === 'quarterly' && {
              borderColor: theme.colors.primary[500],
              backgroundColor: theme.colors.primary[50],
            },
            { borderColor: theme.colors.border },
          ]}
          onPress={() => setPayoutFrequency('quarterly')}
        >
          <View style={styles.frequencyInfo}>
            <Text style={[styles.frequencyName, { color: theme.colors.text.primary }]}>
              Quarterly
            </Text>
            <Text style={[styles.frequencyFee, { color: theme.colors.text.secondary }]}>
              +2% processing fee
            </Text>
          </View>
          {payoutFrequency === 'quarterly' && (
            <View style={[styles.checkmark, { backgroundColor: theme.colors.primary[500] }]}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.frequencyOption,
            payoutFrequency === 'monthly' && {
              borderColor: theme.colors.primary[500],
              backgroundColor: theme.colors.primary[50],
            },
            { borderColor: theme.colors.border },
          ]}
          onPress={() => setPayoutFrequency('monthly')}
        >
          <View style={styles.frequencyInfo}>
            <Text style={[styles.frequencyName, { color: theme.colors.text.primary }]}>
              Monthly
            </Text>
            <Text style={[styles.frequencyFee, { color: theme.colors.text.secondary }]}>
              +5% processing fee
            </Text>
          </View>
          {payoutFrequency === 'monthly' && (
            <View style={[styles.checkmark, { backgroundColor: theme.colors.primary[500] }]}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
      </Card>

      {/* Auto-Reinvest */}
      <Card style={styles.settingsCard} elevated>
        <View style={styles.autoReinvestRow}>
          <View style={styles.autoReinvestInfo}>
            <Text style={[styles.autoReinvestTitle, { color: theme.colors.text.primary }]}>
              Auto-Reinvest
            </Text>
            <Text style={[styles.autoReinvestDescription, { color: theme.colors.text.secondary }]}>
              Automatically reinvest earnings into new investments
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.toggle,
              autoReinvest && { backgroundColor: theme.colors.primary[500] },
              !autoReinvest && { backgroundColor: theme.colors.neutral[300] },
            ]}
            onPress={() => setAutoReinvest(!autoReinvest)}
          >
            <View
              style={[
                styles.toggleThumb,
                autoReinvest && styles.toggleThumbActive,
                !autoReinvest && styles.toggleThumbInactive,
              ]}
            />
          </TouchableOpacity>
        </View>
      </Card>
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
  balanceCard: {
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 24,
  },
  payoutButton: {
    marginTop: 8,
  },
  settingsCard: {
    padding: 20,
    marginBottom: 24,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  settingsDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  frequencyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  frequencyInfo: {
    flex: 1,
  },
  frequencyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  frequencyFee: {
    fontSize: 12,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  autoReinvestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autoReinvestInfo: {
    flex: 1,
    marginRight: 16,
  },
  autoReinvestTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  autoReinvestDescription: {
    fontSize: 12,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  toggleThumbInactive: {
    alignSelf: 'flex-start',
  },
});

