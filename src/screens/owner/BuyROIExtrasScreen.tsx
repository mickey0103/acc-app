import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button } from '../../components/common';

const extras = [
  { id: '1', name: 'Premium Furniture Package', price: 5000, description: 'Upgrade to premium furniture' },
  { id: '2', name: 'Solar Panel + Battery', price: 8000, description: 'Lower running costs and increase ROI' },
  { id: '3', name: 'Extended Insurance', price: 2000, description: 'Comprehensive property insurance' },
  { id: '4', name: 'Maintenance Bundle', price: 3000, description: 'Prepaid maintenance package' },
];

export const BuyROIExtrasScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const { investmentId } = route.params as { investmentId: string };
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'invoice'>('card');

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const totalCost = selectedExtras.reduce((sum, id) => {
    const extra = extras.find((e) => e.id === id);
    return sum + (extra?.price || 0);
  }, 0);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        ROI-Boosting Extras
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
        Enhance your investment performance
      </Text>

      {extras.map((extra) => (
        <Card
          key={extra.id}
          style={[
            styles.extraCard,
            selectedExtras.includes(extra.id) && {
              borderColor: theme.colors.primary[500],
              borderWidth: 2,
            },
          ]}
          elevated
        >
          <TouchableOpacity onPress={() => toggleExtra(extra.id)}>
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
        </Card>
      ))}

      {totalCost > 0 && (
        <Card style={styles.summaryCard} elevated>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
              Total
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
              ${totalCost.toLocaleString()}
            </Text>
          </View>
        </Card>
      )}

      <View style={styles.paymentSection}>
        <Text style={[styles.paymentTitle, { color: theme.colors.text.primary }]}>
          Payment Method
        </Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'card' && {
                borderColor: theme.colors.primary[500],
                backgroundColor: theme.colors.primary[50],
              },
              { borderColor: theme.colors.border },
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <Text style={[styles.paymentOptionText, { color: theme.colors.text.primary }]}>
              Credit Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'invoice' && {
                borderColor: theme.colors.primary[500],
                backgroundColor: theme.colors.primary[50],
              },
              { borderColor: theme.colors.border },
            ]}
            onPress={() => setPaymentMethod('invoice')}
          >
            <Text style={[styles.paymentOptionText, { color: theme.colors.text.primary }]}>
              Invoice
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title="Purchase Extras"
        onPress={() => {
          // TODO: Process purchase
        }}
        fullWidth
        style={styles.purchaseButton}
        disabled={selectedExtras.length === 0}
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  extraCard: {
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
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
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  extraDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  extraPrice: {
    fontSize: 20,
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 18,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  paymentSection: {
    marginBottom: 24,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  paymentOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentOption: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  purchaseButton: {
    marginTop: 8,
  },
});

