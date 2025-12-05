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

const plans = {
  basic: {
    name: 'Basic',
    nights: 4,
    price: 199,
    benefits: [
      'Guaranteed availability for the chosen tier',
      'Discounted add-on nights',
      'Priority support',
    ],
  },
  plus: {
    name: 'Plus',
    nights: 8,
    price: 349,
    benefits: [
      'Guaranteed availability for the chosen tier',
      'Discounted add-on nights',
      'Priority support',
      'Early access to new properties',
    ],
  },
  premium: {
    name: 'Premium',
    nights: 12,
    price: 499,
    benefits: [
      'Guaranteed availability for the chosen tier',
      'Discounted add-on nights',
      'Premium support',
      'Early access to new properties',
      'Exclusive member events',
      'Complimentary upgrades',
    ],
  },
};

export const SubscriptionPlanDetailScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { planId } = route.params as { planId: string };
  const plan = plans[planId as keyof typeof plans] || plans.plus;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.planCard} elevated>
        <Text style={[styles.planName, { color: theme.colors.text.primary }]}>
          {plan.name} Plan
        </Text>
        <Text style={[styles.planNights, { color: theme.colors.text.secondary }]}>
          {plan.nights} nights per month
        </Text>
        <Text style={[styles.planPrice, { color: theme.colors.text.primary }]}>
          ${plan.price}
          <Text style={styles.planPeriod}>/month</Text>
        </Text>
      </Card>

      <Card style={styles.benefitsCard} elevated>
        <Text style={[styles.benefitsTitle, { color: theme.colors.text.primary }]}>
          Plan Benefits
        </Text>
        {plan.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={[styles.benefitText, { color: theme.colors.text.secondary }]}>
              {benefit}
            </Text>
          </View>
        ))}
      </Card>

      <Button
        title="Continue"
        onPress={() => {
          navigation.navigate('SubscriptionPreselectDates' as never, { planId } as never);
        }}
        fullWidth
        style={styles.continueButton}
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
  planCard: {
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  planName: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  planNights: {
    fontSize: 18,
    marginBottom: 12,
  },
  planPrice: {
    fontSize: 48,
    fontWeight: '700',
  },
  planPeriod: {
    fontSize: 24,
    fontWeight: '400',
  },
  benefitsCard: {
    padding: 20,
    marginBottom: 24,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 16,
    color: '#22C55E',
    marginRight: 12,
    marginTop: 2,
    fontWeight: '700',
  },
  benefitText: {
    fontSize: 16,
    flex: 1,
  },
  continueButton: {
    marginTop: 8,
  },
});

