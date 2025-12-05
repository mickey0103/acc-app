import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button } from '../../components/common';
import { useBookingStore } from '../../store';
import { mockBookings, mockProperties } from '../../data/mockData';

export const ViewBookingScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingId } = route.params as { bookingId: string };
  const { bookings } = useBookingStore();

  const booking = bookings.find((b) => b.id === bookingId) || mockBookings[0];
  const property = mockProperties.find((p) => p.id === booking.propertyId);

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
        {/* Booking Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Booking Information
          </Text>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Property</Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              {property?.name || 'Property Name'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Room</Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              Room {booking.roomId}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Check-in</Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              {formatDate(booking.checkIn)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Check-out</Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              {formatDate(booking.checkOut)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Guests</Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              {booking.guests.length} {booking.guests.length === 1 ? 'guest' : 'guests'}
            </Text>
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Payment Information
          </Text>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Total Cost</Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              ${booking.totalCost}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Bond</Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              ${booking.bondAmount} ({booking.bondStatus})
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Status</Text>
            <Badge
              label={booking.paymentStatus.toUpperCase()}
              variant={booking.paymentStatus === 'paid' ? 'success' : 'warning'}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Button
            title="Modify Booking"
            variant="outline"
            onPress={() => {
              // TODO: Navigate to modify booking
            }}
            fullWidth
            style={styles.actionButton}
          />
          <Button
            title="Extend Stay"
            variant="outline"
            onPress={() => {
              // TODO: Navigate to extend stay
            }}
            fullWidth
            style={styles.actionButton}
          />
          <Button
            title="Add Guests"
            variant="outline"
            onPress={() => {
              // TODO: Navigate to add guests
            }}
            fullWidth
            style={styles.actionButton}
          />
          <Button
            title="Contact Support"
            variant="primary"
            onPress={() => {
              // TODO: Navigate to contact support
            }}
            fullWidth
            style={styles.actionButton}
          />
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
  actionsSection: {
    marginTop: 8,
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
});

