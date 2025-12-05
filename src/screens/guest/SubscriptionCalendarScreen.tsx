import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge } from '../../components/common';

export const SubscriptionCalendarScreen: React.FC = () => {
  const { theme } = useTheme();

  // Mock data - in real app, this would come from the subscription
  const markedDates = {
    '2024-01-15': {
      selected: true,
      selectedColor: theme.colors.primary[500],
      marked: true,
    },
    '2024-01-16': {
      selected: true,
      selectedColor: theme.colors.primary[500],
      marked: true,
    },
    '2024-01-17': {
      selected: true,
      selectedColor: theme.colors.primary[500],
      marked: true,
    },
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Subscription Calendar
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Month-by-month breakdown of your subscription nights
        </Text>
      </View>

      {/* Current Month Summary */}
      <Card style={styles.summaryCard} elevated>
        <Text style={[styles.monthTitle, { color: theme.colors.text.primary }]}>
          January 2024
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Used</Text>
            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>3</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Remaining
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>5</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Total</Text>
            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>8</Text>
          </View>
        </View>
      </Card>

      {/* Calendar */}
      <Card style={styles.calendarCard} elevated>
        <Calendar
          markedDates={markedDates}
          theme={{
            todayTextColor: theme.colors.primary[500],
            selectedDayBackgroundColor: theme.colors.primary[500],
            selectedDayTextColor: '#FFFFFF',
            arrowColor: theme.colors.primary[500],
            monthTextColor: theme.colors.text.primary,
            textDayFontWeight: '600',
            textMonthFontWeight: '700',
            textDayHeaderFontWeight: '600',
          }}
        />
      </Card>

      {/* Legend */}
      <Card style={styles.legendCard} elevated>
        <Text style={[styles.legendTitle, { color: theme.colors.text.primary }]}>Legend</Text>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: theme.colors.primary[500] },
              ]}
            />
            <Text style={[styles.legendText, { color: theme.colors.text.secondary }]}>
              Used nights
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: theme.colors.success[500] },
              ]}
            />
            <Text style={[styles.legendText, { color: theme.colors.text.secondary }]}>
              Available nights
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: theme.colors.warning[500] },
              ]}
            />
            <Text style={[styles.legendText, { color: theme.colors.text.secondary }]}>
              Upcoming nights
            </Text>
          </View>
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  summaryCard: {
    padding: 20,
    marginBottom: 24,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  calendarCard: {
    padding: 20,
    marginBottom: 24,
  },
  legendCard: {
    padding: 20,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  legendRow: {
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
  },
});

