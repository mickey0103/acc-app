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

const boosts = [
  {
    id: '1',
    name: 'App/Website Featured Listing',
    price: 99,
    description: 'Boost your cabin/room in app/website recommended listings',
    monthly: true,
  },
  {
    id: '2',
    name: 'Social Media Promotional Package',
    price: 149,
    description: 'Monthly social media promotion across all platforms',
    monthly: true,
  },
  {
    id: '3',
    name: 'Premium Placement',
    price: 199,
    description: 'Top placement in search results and featured sections',
    monthly: true,
  },
];

export const BuyMarketingBoostsScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const { investmentId } = route.params as { investmentId: string };
  const [selectedBoosts, setSelectedBoosts] = useState<string[]>([]);

  const toggleBoost = (id: string) => {
    setSelectedBoosts((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const monthlyTotal = selectedBoosts.reduce((sum, id) => {
    const boost = boosts.find((b) => b.id === id);
    return sum + (boost?.price || 0);
  }, 0);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        Marketing Boosts
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
        Increase visibility and bookings for your investment
      </Text>

      {boosts.map((boost) => (
        <Card
          key={boost.id}
          style={[
            styles.boostCard,
            selectedBoosts.includes(boost.id) && {
              borderColor: theme.colors.primary[500],
              borderWidth: 2,
            },
          ]}
          elevated
        >
          <TouchableOpacity onPress={() => toggleBoost(boost.id)}>
            <View style={styles.boostContent}>
              <View style={styles.boostInfo}>
                <Text style={[styles.boostName, { color: theme.colors.text.primary }]}>
                  {boost.name}
                </Text>
                <Text style={[styles.boostDescription, { color: theme.colors.text.secondary }]}>
                  {boost.description}
                </Text>
                <View style={styles.boostPriceRow}>
                  <Text style={[styles.boostPrice, { color: theme.colors.text.primary }]}>
                    ${boost.price}
                  </Text>
                  <Text style={[styles.boostPeriod, { color: theme.colors.text.secondary }]}>
                    /month
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.checkbox,
                  selectedBoosts.includes(boost.id) && {
                    backgroundColor: theme.colors.primary[500],
                  },
                  { borderColor: theme.colors.primary[500] },
                ]}
              >
                {selectedBoosts.includes(boost.id) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      ))}

      {monthlyTotal > 0 && (
        <Card style={styles.summaryCard} elevated>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
              Monthly Total
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
              ${monthlyTotal}
            </Text>
          </View>
          <Text style={[styles.summaryNote, { color: theme.colors.text.tertiary }]}>
            Paid monthly in advance by credit card
          </Text>
        </Card>
      )}

      <Button
        title="Subscribe to Boosts"
        onPress={() => {
          // TODO: Process subscription
        }}
        fullWidth
        style={styles.subscribeButton}
        disabled={selectedBoosts.length === 0}
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
  boostCard: {
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
  },
  boostContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boostInfo: {
    flex: 1,
  },
  boostName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  boostDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  boostPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  boostPrice: {
    fontSize: 24,
    fontWeight: '700',
  },
  boostPeriod: {
    fontSize: 14,
    marginLeft: 4,
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
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 18,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  summaryNote: {
    fontSize: 12,
  },
  subscribeButton: {
    marginTop: 8,
  },
});

