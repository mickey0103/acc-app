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

const plans = {
  basic: { name: 'Basic', nights: 4, price: 199 },
  plus: { name: 'Plus', nights: 8, price: 349 },
  premium: { name: 'Premium', nights: 12, price: 499 },
};

export const SubscriptionPaymentScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { planId, dates } = route.params as { planId: string; dates: string[] };
  const plan = plans[planId as keyof typeof plans] || plans.plus;

  const [useSavedCard, setUseSavedCard] = useState(true);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handleSubmit = () => {
    // TODO: Process payment
    navigation.navigate('SubscriptionConfirmation' as never, {
      subscriptionId: 'sub_' + Date.now(),
    } as never);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Plan Summary */}
      <Card style={styles.summaryCard} elevated>
        <Text style={[styles.summaryTitle, { color: theme.colors.text.primary }]}>
          Plan Summary
        </Text>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Plan
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            {plan.name} ({plan.nights} nights/month)
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Nights Selected
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            {dates.length}
          </Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={[styles.totalLabel, { color: theme.colors.text.primary }]}>
            Monthly Cost
          </Text>
          <Text style={[styles.totalValue, { color: theme.colors.text.primary }]}>
            ${plan.price}
          </Text>
        </View>
      </Card>

      {/* Payment Section */}
      <Card style={styles.paymentCard} elevated>
        <Text style={[styles.paymentTitle, { color: theme.colors.text.primary }]}>
          Payment Method
        </Text>

        {useSavedCard ? (
          <View style={styles.savedCard}>
            <View style={styles.savedCardInfo}>
              <Text style={styles.cardIcon}>💳</Text>
              <View>
                <Text style={[styles.cardBrand, { color: theme.colors.text.primary }]}>
                  Visa •••• 1234
                </Text>
                <Text style={[styles.cardExpiry, { color: theme.colors.text.secondary }]}>
                  Expires 12/25
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setUseSavedCard(false)}>
              <Text style={[styles.changeText, { color: theme.colors.primary[500] }]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.newCardForm}>
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChangeText={(text) => setCardData({ ...cardData, number: text })}
              keyboardType="number-pad"
              containerStyle={styles.input}
            />
            <View style={styles.cardRow}>
              <Input
                label="Expiry"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChangeText={(text) => setCardData({ ...cardData, expiry: text })}
                containerStyle={[styles.input, styles.halfInput]}
              />
              <Input
                label="CVV"
                placeholder="123"
                value={cardData.cvv}
                onChangeText={(text) => setCardData({ ...cardData, cvv: text })}
                keyboardType="number-pad"
                secureTextEntry
                containerStyle={[styles.input, styles.halfInput]}
              />
            </View>
            <Input
              label="Cardholder Name"
              placeholder="John Doe"
              value={cardData.name}
              onChangeText={(text) => setCardData({ ...cardData, name: text })}
              containerStyle={styles.input}
            />
            <Button
              title="Use Saved Card"
              variant="ghost"
              onPress={() => setUseSavedCard(true)}
              fullWidth
              style={styles.useSavedButton}
            />
          </View>
        )}
      </Card>

      <Button
        title="Start Subscription"
        onPress={handleSubmit}
        fullWidth
        style={styles.submitButton}
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
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  paymentCard: {
    padding: 20,
    marginBottom: 24,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  savedCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  savedCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 12,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  newCardForm: {
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  useSavedButton: {
    marginTop: 8,
  },
  submitButton: {
    marginTop: 8,
  },
});

