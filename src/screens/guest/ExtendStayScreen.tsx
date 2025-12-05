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
import { Card, Button, Input } from '../../components/common';
import { useBookingStore } from '../../store';
import { mockBookings } from '../../data/mockData';

export const ExtendStayScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const { bookingId } = route.params as { bookingId: string };
  const { bookings } = useBookingStore();
  const booking = bookings.find((b) => b.id === bookingId) || mockBookings[0];

  const [extendType, setExtendType] = useState<'hours' | 'days'>('hours');
  const [hours, setHours] = useState(0);
  const [newCheckout, setNewCheckout] = useState(booking.checkOut);
  const [extraCost, setExtraCost] = useState(0);

  const calculateCost = (value: number) => {
    if (extendType === 'hours') {
      return value * 25; // $25 per hour
    } else {
      return value * (booking.totalCost / 3); // Daily rate
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card} elevated>
        {/* Booking Summary */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Current Booking
          </Text>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Room</Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              Room {booking.roomId}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Check-out</Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              {formatDate(booking.checkOut)}
            </Text>
          </View>
        </View>

        {/* Extend Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Extend Options
          </Text>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                extendType === 'hours' && {
                  backgroundColor: theme.colors.primary[500],
                },
                { borderColor: theme.colors.primary[500] },
              ]}
              onPress={() => setExtendType('hours')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  extendType === 'hours' && { color: '#FFFFFF' },
                  extendType !== 'hours' && { color: theme.colors.primary[500] },
                ]}
              >
                By Hours
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                extendType === 'days' && {
                  backgroundColor: theme.colors.primary[500],
                },
                { borderColor: theme.colors.primary[500] },
              ]}
              onPress={() => setExtendType('days')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  extendType === 'days' && { color: '#FFFFFF' },
                  extendType !== 'days' && { color: theme.colors.primary[500] },
                ]}
              >
                By Days
              </Text>
            </TouchableOpacity>
          </View>

          {extendType === 'hours' ? (
            <View style={styles.hourSelector}>
              <TouchableOpacity
                style={[styles.stepperButton, { backgroundColor: theme.colors.surface }]}
                onPress={() => {
                  const newHours = Math.max(0, hours - 1);
                  setHours(newHours);
                  setExtraCost(calculateCost(newHours));
                }}
              >
                <Text style={[styles.stepperText, { color: theme.colors.text.primary }]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.hourValue, { color: theme.colors.text.primary }]}>
                {hours} hours
              </Text>
              <TouchableOpacity
                style={[styles.stepperButton, { backgroundColor: theme.colors.surface }]}
                onPress={() => {
                  const newHours = hours + 1;
                  setHours(newHours);
                  setExtraCost(calculateCost(newHours));
                }}
              >
                <Text style={[styles.stepperText, { color: theme.colors.text.primary }]}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Input
              label="New Check-out Date"
              placeholder="Select date"
              value={formatDate(newCheckout)}
              containerStyle={styles.input}
              // TODO: Add date picker
            />
          )}
        </View>

        {/* Extra Cost Display */}
        {extraCost > 0 && (
          <Card style={styles.costCard}>
            <View style={styles.costRow}>
              <Text style={[styles.costLabel, { color: theme.colors.text.secondary }]}>
                Extra Cost
              </Text>
              <Text style={[styles.costValue, { color: theme.colors.text.primary }]}>
                ${extraCost}
              </Text>
            </View>
          </Card>
        )}

        {/* Payment Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Payment
          </Text>
          <Text style={[styles.paymentInfo, { color: theme.colors.text.secondary }]}>
            Use saved card ending in •••• 1234
          </Text>
          <Button
            title="Use Different Card"
            variant="ghost"
            onPress={() => {
              // TODO: Show card selector
            }}
            fullWidth
            style={styles.cardButton}
          />
        </View>

        <Button
          title="Extend Stay"
          onPress={() => {
            // TODO: Process extension
          }}
          fullWidth
          style={styles.confirmButton}
          disabled={extraCost === 0}
        />
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
  card: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  hourSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperText: {
    fontSize: 24,
    fontWeight: '700',
  },
  hourValue: {
    fontSize: 24,
    fontWeight: '700',
    minWidth: 80,
    textAlign: 'center',
  },
  input: {
    marginTop: 8,
  },
  costCard: {
    padding: 16,
    marginBottom: 24,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 16,
  },
  costValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  paymentInfo: {
    fontSize: 14,
    marginBottom: 12,
  },
  cardButton: {
    marginTop: 8,
  },
  confirmButton: {
    marginTop: 8,
  },
});

