import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button } from '../../components/common';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    nights: 4,
    price: 199,
    features: ['4 nights/month', 'Standard availability', 'Basic support'],
  },
  {
    id: 'plus',
    name: 'Plus',
    nights: 8,
    price: 349,
    features: ['8 nights/month', 'Guaranteed availability', 'Priority support'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    nights: 12,
    price: 499,
    features: ['12 nights/month', 'Guaranteed availability', 'Premium support', 'Exclusive perks'],
  },
];

export const SubscriptionOverviewScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Banner */}
      <Card style={[styles.banner, { backgroundColor: theme.colors.primary[500] }]} elevated>
        <Text style={styles.bannerTitle}>Pay Monthly, Get Nights Every Month</Text>
        <Text style={styles.bannerSubtitle}>
          Guaranteed availability for your chosen tier
        </Text>
      </Card>

      {/* Plans */}
      <View style={styles.plansSection}>
        {plans.map((plan) => (
          <Card
            key={plan.id}
            style={[
              styles.planCard,
              plan.popular && { borderColor: theme.colors.primary[500], borderWidth: 2 },
            ]}
            elevated
          >
            {plan.popular && (
              <View
                style={[
                  styles.popularBadge,
                  { backgroundColor: theme.colors.primary[500] },
                ]}
              >
                <Text style={styles.popularText}>POPULAR</Text>
              </View>
            )}
            <Text style={[styles.planName, { color: theme.colors.text.primary }]}>
              {plan.name}
            </Text>
            <Text style={[styles.planNights, { color: theme.colors.text.primary }]}>
              {plan.nights} nights/month
            </Text>
            <Text style={[styles.planPrice, { color: theme.colors.text.primary }]}>
              ${plan.price}
              <Text style={styles.planPeriod}>/month</Text>
            </Text>
            <View style={styles.featuresList}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={[styles.featureText, { color: theme.colors.text.secondary }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
            <Button
              title="Select Plan"
              onPress={() => {
                // TODO: Navigate to plan details
              }}
              fullWidth
              style={styles.selectButton}
              variant={plan.popular ? 'primary' : 'outline'}
            />
          </Card>
        ))}
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
  banner: {
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  plansSection: {
    gap: 20,
  },
  planCard: {
    padding: 24,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  planName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  planNights: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  planPrice: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20,
  },
  planPeriod: {
    fontSize: 18,
    fontWeight: '400',
  },
  featuresList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 16,
    color: '#22C55E',
    marginRight: 8,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  selectButton: {
    marginTop: 8,
  },
});

