import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button } from '../../components/common';
import { useBookingStore } from '../../store';
import { Booking } from '../../types';
import { GuestStackParamList } from '../../navigation/types';
import { mockBookings, mockProperties } from '../../data/mockData';

type NavigationProp = NativeStackNavigationProp<GuestStackParamList, 'Tabs'>;

type BookingFilter = 'all' | 'upcoming' | 'current' | 'past';

export const BookingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { bookings } = useBookingStore();
  const [filter, setFilter] = useState<BookingFilter>('all');

  const allBookings = bookings.length > 0 ? bookings : mockBookings;

  const filteredBookings = allBookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimeUntilCheckIn = (checkIn: string) => {
    const now = new Date();
    const checkInDate = new Date(checkIn);
    const diff = checkInDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Check-in available';
  };

  const getStatusBadge = (booking: Booking) => {
    if (booking.status === 'upcoming') {
      if (booking.paymentStatus === 'pending') return 'Bond Pending';
      if (booking.bondStatus === 'pending') return 'Needs Verification';
      return 'Check-in Available';
    }
    return booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
  };

  const getStatusVariant = (status: Booking['status'], badgeText: string) => {
    if (badgeText.includes('Pending') || badgeText.includes('Verification')) return 'warning';
    if (badgeText.includes('Available')) return 'success';
    switch (status) {
      case 'current':
        return 'success';
      case 'upcoming':
        return 'info';
      case 'past':
        return 'default';
      default:
        return 'default';
    }
  };

  const renderBooking = ({ item }: { item: Booking }) => {
    const property = mockProperties.find((p) => p.id === item.propertyId);
    const badgeText = getStatusBadge(item);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('BookingDetail', { bookingId: item.id })}
        activeOpacity={0.7}
      >
        <Card style={styles.bookingCard} elevated>
          <View style={styles.bookingHeader}>
            <View style={styles.bookingInfo}>
              <Text style={[styles.propertyName, { color: theme.colors.text.primary }]}>
                {property?.name || 'Property'}
              </Text>
              <Text style={[styles.bookingTitle, { color: theme.colors.text.secondary }]}>
                Room {item.roomId}
              </Text>
              {item.status === 'upcoming' && (
                <Text style={[styles.countdown, { color: theme.colors.primary[500] }]}>
                  {getTimeUntilCheckIn(item.checkIn)} until check-in
                </Text>
              )}
            </View>
            <Badge
              label={badgeText.toUpperCase()}
              variant={getStatusVariant(item.status, badgeText)}
            />
          </View>
          <Text style={[styles.bookingDates, { color: theme.colors.text.secondary }]}>
            {formatDate(item.checkIn)} - {formatDate(item.checkOut)}
          </Text>
          {item.status === 'current' && (
            <View style={styles.currentActions}>
              <Button
                title="Get Key"
                variant="primary"
                size="small"
                onPress={() => navigation.navigate('Keys')}
                style={styles.quickAction}
              />
              <Button
                title="Request Service"
                variant="outline"
                size="small"
                onPress={() => navigation.navigate('Services')}
                style={styles.quickAction}
              />
            </View>
          )}
          {item.status === 'past' && (
            <View style={styles.pastActions}>
              <Button
                title="Review"
                variant="outline"
                size="small"
                onPress={() => {
                  // TODO: Navigate to review
                }}
                style={styles.quickAction}
              />
              <Button
                title="View Charges"
                variant="ghost"
                size="small"
                onPress={() => navigation.navigate('BookingDetail', { bookingId: item.id })}
                style={styles.quickAction}
              />
            </View>
          )}
          <View style={styles.bookingFooter}>
            <Text style={[styles.bookingPrice, { color: theme.colors.text.primary }]}>
              ${item.totalCost}
            </Text>
            <Text style={[styles.bookingGuests, { color: theme.colors.text.secondary }]}>
              {item.guests.length} {item.guests.length === 1 ? 'guest' : 'guests'}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Filter Tabs */}
      <View style={[styles.filterContainer, { backgroundColor: theme.colors.surface }]}>
        {(['all', 'upcoming', 'current', 'past'] as BookingFilter[]).map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterTab,
              filter === filterType && {
                backgroundColor: theme.colors.primary[500],
              },
            ]}
            onPress={() => setFilter(filterType)}
          >
            <Text
              style={[
                styles.filterText,
                filter === filterType
                  ? { color: '#FFFFFF' }
                  : { color: theme.colors.text.secondary },
              ]}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              My Bookings
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.text.tertiary }]}>
              No {filter === 'all' ? '' : filter} bookings found
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  bookingCard: {
    marginBottom: 16,
    padding: 20,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bookingInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  bookingTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  countdown: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  bookingDates: {
    fontSize: 14,
    marginBottom: 12,
  },
  currentActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  pastActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  quickAction: {
    flex: 1,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  bookingPrice: {
    fontSize: 18,
    fontWeight: '700',
  },
  bookingGuests: {
    fontSize: 14,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

