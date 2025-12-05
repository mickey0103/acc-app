import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button } from '../../components/common';
import { useBookingStore } from '../../store';
import { mockBookings } from '../../data/mockData';

export const BookingDetailScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const { bookingId } = route.params as { bookingId: string };
  const { bookings } = useBookingStore();

  const booking = bookings.find((b) => b.id === bookingId) || mockBookings[0];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Booking Details
          </Text>
          <Badge
            label={booking.status.toUpperCase()}
            variant={booking.status === 'current' ? 'success' : 'info'}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Dates
          </Text>
          <Text style={[styles.sectionText, { color: theme.colors.text.secondary }]}>
            Check-in: {formatDate(booking.checkIn)}
          </Text>
          <Text style={[styles.sectionText, { color: theme.colors.text.secondary }]}>
            Check-out: {formatDate(booking.checkOut)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Guests
          </Text>
          {booking.guests.map((guest, index) => (
            <Text
              key={index}
              style={[styles.sectionText, { color: theme.colors.text.secondary }]}
            >
              {guest.name} {guest.email && `(${guest.email})`}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Charges
          </Text>
          {booking.charges.map((charge) => (
            <View key={charge.id} style={styles.chargeRow}>
              <Text style={[styles.chargeLabel, { color: theme.colors.text.secondary }]}>
                {charge.description}
              </Text>
              <Text style={[styles.chargeAmount, { color: theme.colors.text.primary }]}>
                ${charge.amount}
              </Text>
            </View>
          ))}
          <View style={[styles.chargeRow, styles.totalRow]}>
            <Text style={[styles.totalLabel, { color: theme.colors.text.primary }]}>
              Total
            </Text>
            <Text style={[styles.totalAmount, { color: theme.colors.text.primary }]}>
              ${booking.totalCost}
            </Text>
          </View>
        </View>

        <Button
          title="View Digital Key"
          onPress={() => {
            // TODO: Navigate to keys
          }}
          fullWidth
          style={styles.button}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 4,
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  chargeLabel: {
    fontSize: 16,
  },
  chargeAmount: {
    fontSize: 16,
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
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
  },
  button: {
    marginTop: 8,
  },
});

