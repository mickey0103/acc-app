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
import { Card, Badge, Button } from '../../components/common';
import { useAuthStore, useBookingStore } from '../../store';
import { GuestStackParamList } from '../../navigation/types';
import { mockBookings } from '../../data/mockData';

type NavigationProp = NativeStackNavigationProp<GuestStackParamList, 'Tabs'>;

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuthStore();
  const { bookings } = useBookingStore();

  // Get upcoming booking
  const upcomingBooking = bookings.find((b) => b.status === 'upcoming') || mockBookings[0];
  const currentBooking = bookings.find((b) => b.status === 'current') || mockBookings[1];

  const activeBooking = currentBooking || upcomingBooking;

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
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: theme.colors.text.secondary }]}>
          Welcome back,
        </Text>
        <Text style={[styles.nameText, { color: theme.colors.text.primary }]}>
          {user?.firstName || 'Guest'}
        </Text>
      </View>

      {/* Upcoming Stay Card */}
      {activeBooking && (
        <Card style={styles.bookingCard} elevated>
          <View style={styles.bookingHeader}>
            <View>
              <Text style={[styles.bookingTitle, { color: theme.colors.text.primary }]}>
                {activeBooking.status === 'current' ? 'Current Stay' : 'Upcoming Stay'}
              </Text>
              <Text style={[styles.bookingDates, { color: theme.colors.text.secondary }]}>
                {formatDate(activeBooking.checkIn)} - {formatDate(activeBooking.checkOut)}
              </Text>
            </View>
            <Badge
              label={activeBooking.status.toUpperCase()}
              variant={activeBooking.status === 'current' ? 'success' : 'info'}
            />
          </View>

          <View style={styles.quickActions}>
            <Button
              title="View Booking"
              variant="outline"
              size="small"
              onPress={() => navigation.navigate('BookingDetail', { bookingId: activeBooking.id })}
              style={styles.actionButton}
            />
            <Button
              title="Get Key"
              variant="primary"
              size="small"
              onPress={() => navigation.navigate('Keys')}
              style={styles.actionButton}
            />
          </View>
        </Card>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Quick Actions
        </Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => navigation.navigate('Bookings')}
          >
            <Text style={styles.actionIcon}>📅</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>
              Bookings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => navigation.navigate('Keys')}
          >
            <Text style={styles.actionIcon}>🔑</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>
              Keys
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => navigation.navigate('Services')}
          >
            <Text style={styles.actionIcon}>🛎️</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>
              Services
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => navigation.navigate('ContactSupport')}
          >
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>
              Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Notifications
        </Text>
        <Card style={styles.notificationCard}>
          <Text style={[styles.emptyText, { color: theme.colors.text.tertiary }]}>
            No new notifications
          </Text>
        </Card>
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
  welcomeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 32,
    fontWeight: '700',
  },
  bookingCard: {
    marginBottom: 32,
    padding: 20,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  bookingDates: {
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  notificationCard: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
});

