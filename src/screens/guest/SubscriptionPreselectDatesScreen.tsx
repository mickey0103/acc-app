import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Badge } from '../../components/common';

const plans = {
  basic: { nights: 4 },
  plus: { nights: 8 },
  premium: { nights: 12 },
};

export const SubscriptionPreselectDatesScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { planId } = route.params as { planId: string };
  const plan = plans[planId as keyof typeof plans] || plans.plus;

  const [selectedDates, setSelectedDates] = useState<Record<string, any>>({});
  const selectedCount = Object.keys(selectedDates).length;
  const maxNights = plan.nights;
  const remainingNights = maxNights - selectedCount;

  const handleDateSelect = (day: any) => {
    const dateString = day.dateString;
    if (selectedDates[dateString]) {
      const newDates = { ...selectedDates };
      delete newDates[dateString];
      setSelectedDates(newDates);
    } else {
      if (selectedCount < maxNights) {
        setSelectedDates({
          ...selectedDates,
          [dateString]: {
            selected: true,
            selectedColor: theme.colors.primary[500],
            marked: true,
          },
        });
      }
    }
  };

  const getMarkedDates = () => {
    const marked: Record<string, any> = { ...selectedDates };
    // TODO: Mark unavailable dates from backend
    return marked;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Choose Your Dates
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Select up to {maxNights} nights for your subscription
        </Text>
      </View>

      {/* Night Counter */}
      <Card style={styles.counterCard} elevated>
        <View style={styles.counterRow}>
          <Text style={[styles.counterLabel, { color: theme.colors.text.secondary }]}>
            Nights Selected
          </Text>
          <View style={styles.counterValue}>
            <Text style={[styles.counterNumber, { color: theme.colors.text.primary }]}>
              {selectedCount}
            </Text>
            <Text style={[styles.counterMax, { color: theme.colors.text.secondary }]}>
              / {maxNights}
            </Text>
          </View>
        </View>
        {remainingNights > 0 && (
          <Text style={[styles.remainingText, { color: theme.colors.text.secondary }]}>
            {remainingNights} nights remaining
          </Text>
        )}
        {selectedCount === maxNights && (
          <Badge label="All Nights Selected" variant="success" style={styles.badge} />
        )}
      </Card>

      {/* Calendar */}
      <Card style={styles.calendarCard} elevated>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={getMarkedDates()}
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
          minDate={new Date().toISOString().split('T')[0]}
        />
      </Card>

      {/* Room Preference (Optional) */}
      <Card style={styles.preferenceCard} elevated>
        <Text style={[styles.preferenceTitle, { color: theme.colors.text.primary }]}>
          Room Preference (Optional)
        </Text>
        <View style={styles.preferenceOptions}>
          {['Any', 'Standard', 'Suite', 'Cabin'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.preferenceOption,
                { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
              ]}
            >
              <Text style={[styles.preferenceText, { color: theme.colors.text.primary }]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <Button
        title="Confirm Dates"
        onPress={() => {
          const dates = Object.keys(selectedDates);
          navigation.navigate('SubscriptionPayment' as never, { planId, dates } as never);
        }}
        fullWidth
        style={styles.confirmButton}
        disabled={selectedCount === 0}
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
  counterCard: {
    padding: 20,
    marginBottom: 24,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  counterLabel: {
    fontSize: 16,
  },
  counterValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  counterNumber: {
    fontSize: 32,
    fontWeight: '700',
  },
  counterMax: {
    fontSize: 18,
  },
  remainingText: {
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    marginTop: 12,
  },
  calendarCard: {
    padding: 20,
    marginBottom: 24,
  },
  preferenceCard: {
    padding: 20,
    marginBottom: 24,
  },
  preferenceTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  preferenceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  preferenceOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  preferenceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  confirmButton: {
    marginTop: 8,
  },
});

