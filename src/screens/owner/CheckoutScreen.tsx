import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Input } from '../../components/common';
import { useInvestmentStore } from '../../store';
import { mockInvestments } from '../../data/mockData';

const availableExtras = [
  {
    id: '1',
    name: 'Solar & Battery Upgrade',
    description: 'Lower running costs and increase ROI',
    price: 2000,
  },
  {
    id: '2',
    name: 'Furniture Upgrade',
    description: 'Premium furniture package',
    price: 5000,
  },
  {
    id: '3',
    name: 'Extended Insurance',
    description: 'Comprehensive property insurance',
    price: 2000,
  },
  {
    id: '4',
    name: 'Maintenance Bundle',
    description: 'Prepaid maintenance package',
    price: 3000,
  },
];

export const CheckoutScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { investmentId, amount } = route.params as { investmentId: string; amount: number };
  const { selectedInvestment } = useInvestmentStore();

  const investment = selectedInvestment || mockInvestments.find((i) => i.id === investmentId);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState(amount);

  if (!investment) {
    return null;
  }

  const ownershipPercentage = (investmentAmount / investment.totalPrice) * 100;
  const expectedAnnualReturn = investmentAmount * (investment.roi / 100);
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const extra = availableExtras.find((e) => e.id === id);
    return sum + (extra?.price || 0);
  }, 0);
  const processingFee = (investmentAmount + extrasTotal) * 0.02;
  const totalPayable = investmentAmount + extrasTotal + processingFee;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const adjustAmount = (delta: number) => {
    const newAmount = Math.max(
      investment.minimumBuyIn,
      Math.min(investment.totalPrice, investmentAmount + delta)
    );
    setInvestmentAmount(newAmount);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Investment Amount Section */}
      <Card style={styles.sectionCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Your Investment Amount
        </Text>
        <View style={styles.amountControls}>
          <TouchableOpacity
            style={[styles.amountButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => adjustAmount(-1000)}
          >
            <Text style={[styles.amountButtonText, { color: theme.colors.text.primary }]}>-</Text>
          </TouchableOpacity>
          <View style={styles.amountDisplay}>
            <Text style={[styles.amountValue, { color: theme.colors.text.primary }]}>
              ${investmentAmount.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.amountButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => adjustAmount(1000)}
          >
            <Text style={[styles.amountButtonText, { color: theme.colors.text.primary }]}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ownershipInfo}>
          <Text style={[styles.ownershipText, { color: theme.colors.text.secondary }]}>
            You are purchasing: {ownershipPercentage.toFixed(2)}% Ownership
          </Text>
          <Text style={[styles.returnText, { color: theme.colors.primary[500] }]}>
            Expected Annual Return: ${expectedAnnualReturn.toLocaleString()}
          </Text>
        </View>
      </Card>

      {/* Extras Section */}
      <Card style={styles.sectionCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Optional Extras
        </Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.text.secondary }]}>
          Enhance your investment performance
        </Text>
        {availableExtras.map((extra) => (
          <TouchableOpacity
            key={extra.id}
            style={[
              styles.extraCard,
              selectedExtras.includes(extra.id) && {
                borderColor: theme.colors.primary[500],
                backgroundColor: theme.colors.primary[50],
              },
              { borderColor: theme.colors.border },
            ]}
            onPress={() => toggleExtra(extra.id)}
          >
            <View style={styles.extraContent}>
              <View style={styles.extraInfo}>
                <Text style={[styles.extraName, { color: theme.colors.text.primary }]}>
                  {extra.name}
                </Text>
                <Text style={[styles.extraDescription, { color: theme.colors.text.secondary }]}>
                  {extra.description}
                </Text>
                <Text style={[styles.extraPrice, { color: theme.colors.text.primary }]}>
                  ${extra.price.toLocaleString()}
                </Text>
              </View>
              <View
                style={[
                  styles.checkbox,
                  selectedExtras.includes(extra.id) && {
                    backgroundColor: theme.colors.primary[500],
                  },
                  { borderColor: theme.colors.primary[500] },
                ]}
              >
                {selectedExtras.includes(extra.id) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Card>

      {/* Payment Summary */}
      <Card style={styles.summaryCard} elevated>
        <Text style={[styles.summaryTitle, { color: theme.colors.text.primary }]}>
          Payment Summary
        </Text>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Investment Amount
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            ${investmentAmount.toLocaleString()}
          </Text>
        </View>
        {extrasTotal > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
              Extras Total
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
              ${extrasTotal.toLocaleString()}
            </Text>
          </View>
        )}
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Processing Fee
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            ${processingFee.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.totalRow, { borderTopColor: theme.colors.border }]}>
          <Text style={[styles.totalLabel, { color: theme.colors.text.primary }]}>
            Total Payable
          </Text>
          <Text style={[styles.totalValue, { color: theme.colors.text.primary }]}>
            ${totalPayable.toLocaleString()}
          </Text>
        </View>
      </Card>

      <Button
        title="Proceed to Payment"
        onPress={() => {
          navigation.navigate('PaymentConfirmation' as never, { investmentId } as never);
        }}
        fullWidth
        style={styles.paymentButton}
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
  sectionCard: {
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  amountControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  amountButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountButtonText: {
    fontSize: 24,
    fontWeight: '700',
  },
  amountDisplay: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
  },
  amountValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  ownershipInfo: {
    gap: 8,
  },
  ownershipText: {
    fontSize: 14,
  },
  returnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  extraCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  extraContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extraInfo: {
    flex: 1,
  },
  extraName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  extraDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  extraPrice: {
    fontSize: 18,
    fontWeight: '700',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  summaryCard: {
    padding: 20,
    marginBottom: 24,
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
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 2,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  paymentButton: {
    marginTop: 8,
  },
});

