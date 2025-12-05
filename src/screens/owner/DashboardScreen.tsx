import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button } from '../../components/common';
import { OwnerStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<OwnerStackParamList, 'Tabs'>;

export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const kpis = [
    { label: 'Total Revenue', value: '$125,000', change: '+12%' },
    { label: 'Occupancy', value: '85%', change: '+5%' },
    { label: 'Expenses', value: '$15,000', change: '-3%' },
    { label: 'ROI', value: '12.5%', change: '+2%' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Dashboard
        </Text>
      </View>

      <View style={styles.kpiGrid}>
        {kpis.map((kpi, index) => (
          <Card key={index} style={styles.kpiCard} elevated>
            <Text style={[styles.kpiLabel, { color: theme.colors.text.secondary }]}>
              {kpi.label}
            </Text>
            <Text style={[styles.kpiValue, { color: theme.colors.text.primary }]}>
              {kpi.value}
            </Text>
            <Text style={[styles.kpiChange, { color: theme.colors.success[500] }]}>
              {kpi.change}
            </Text>
          </Card>
        ))}
      </View>

      <View style={styles.quickActions}>
        <Button
          title="View Balance"
          variant="outline"
          onPress={() => {
            navigation.navigate('BalancePayout');
          }}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="Invest More"
          variant="primary"
          onPress={() => {
            navigation.navigate('Tabs' as never, { screen: 'Marketplace' } as never);
          }}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="View Investments"
          variant="outline"
          onPress={() => {
            navigation.navigate('Tabs' as never, { screen: 'Investments' } as never);
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  kpiCard: {
    width: '47%',
    padding: 20,
  },
  kpiLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickActions: {
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 0,
  },
});

