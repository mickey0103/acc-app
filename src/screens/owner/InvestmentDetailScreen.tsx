import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Badge } from '../../components/common';
import { useInvestmentStore } from '../../store';
import { mockInvestments, mockOwnerInvestments } from '../../data/mockData';

export const InvestmentDetailScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { investmentId } = route.params as { investmentId: string };
  const { ownerInvestments } = useInvestmentStore();

  const investment = mockInvestments.find((i) => i.id === investmentId);
  const ownerInvestment = mockOwnerInvestments.find((oi) => oi.investmentId === investmentId);

  if (!investment) {
    return null;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.headerCard} elevated>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          {investment.name}
        </Text>
        <Text style={[styles.location, { color: theme.colors.text.secondary }]}>
          {investment.location}
        </Text>
      </Card>

      {/* Performance Metrics */}
      <Card style={styles.metricsCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Performance Metrics
        </Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metric}>
            <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
              Revenue
            </Text>
            <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
              ${ownerInvestment?.revenue.toLocaleString() || '0'}
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
              Occupancy
            </Text>
            <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
              {ownerInvestment?.occupancy || 0}%
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
              Expenses
            </Text>
            <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
              ${ownerInvestment?.expenses.toLocaleString() || '0'}
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
              Status
            </Text>
            <Badge
              label={ownerInvestment?.status.toUpperCase() || 'INACTIVE'}
              variant={ownerInvestment?.status === 'active' ? 'success' : 'default'}
            />
          </View>
        </View>
      </Card>

      {/* Ownership Info */}
      <Card style={styles.ownershipCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Ownership
        </Text>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>
            Ownership Percentage
          </Text>
          <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
            {ownerInvestment?.ownershipPercentage || 0}%
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>
            Purchase Amount
          </Text>
          <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
            ${ownerInvestment?.purchaseAmount.toLocaleString() || '0'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>
            Purchase Date
          </Text>
          <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
            {ownerInvestment?.purchaseDate
              ? new Date(ownerInvestment.purchaseDate).toLocaleDateString()
              : 'N/A'}
          </Text>
        </View>
      </Card>

      {/* Quick Actions */}
      <View style={styles.actions}>
        <Button
          title="Buy ROI-Boosting Extras"
          variant="outline"
          onPress={() => {
            navigation.navigate('BuyROIExtras' as never, { investmentId } as never);
          }}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="Buy Marketing Boosts"
          variant="outline"
          onPress={() => {
            navigation.navigate('BuyMarketingBoosts' as never, { investmentId } as never);
          }}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="View Maintenance"
          variant="outline"
          onPress={() => {
            navigation.navigate('Tabs' as never, { screen: 'Approvals' } as never);
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
  headerCard: {
    padding: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
  },
  metricsCard: {
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metric: {
    width: '47%',
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  ownershipCard: {
    padding: 20,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
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

