import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge } from '../../components/common';
import { useMaintenanceStore } from '../../store';
import { MaintenanceTicket } from '../../types';
import { mockMaintenanceTickets } from '../../data/mockData';

type TicketFilter = 'all' | 'new' | 'pending_quote' | 'approved' | 'in_progress' | 'completed';

export const TicketsScreenEnhanced: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { tickets } = useMaintenanceStore();
  const [filter, setFilter] = useState<TicketFilter>('all');

  const allTickets = tickets.length > 0 ? tickets : mockMaintenanceTickets;

  const filteredTickets = allTickets.filter((ticket) => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'normal':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'info';
      case 'approved':
        return 'success';
      default:
        return 'warning';
    }
  };

  const renderTicket = ({ item }: { item: MaintenanceTicket }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TicketDetail' as never, { ticketId: item.id } as never);
      }}
      activeOpacity={0.7}
    >
      <Card style={styles.ticketCard} elevated>
        <View style={styles.ticketHeader}>
          <View style={styles.ticketInfo}>
            <Text style={[styles.ticketNumber, { color: theme.colors.text.primary }]}>
              Ticket #{item.id}
            </Text>
            <Text style={[styles.roomNumber, { color: theme.colors.text.secondary }]}>
              Room {item.roomId}
            </Text>
          </View>
          <Badge
            label={item.priority.toUpperCase()}
            variant={getPriorityVariant(item.priority)}
            size="small"
          />
        </View>
        <Text style={[styles.issueSummary, { color: theme.colors.text.primary }]}>
          {item.issueSummary}
        </Text>
        {item.photos && item.photos.length > 0 && (
          <View style={styles.photosPreview}>
            {item.photos.slice(0, 3).map((photo, index) => (
              <View key={index} style={styles.photoThumbnail}>
                <Text style={styles.photoIcon}>📷</Text>
              </View>
            ))}
            {item.photos.length > 3 && (
              <View style={styles.morePhotos}>
                <Text style={[styles.morePhotosText, { color: theme.colors.text.primary }]}>
                  +{item.photos.length - 3}
                </Text>
              </View>
            )}
          </View>
        )}
        <View style={styles.ticketFooter}>
          <Badge
            label={item.status.replace('_', ' ').toUpperCase()}
            variant={getStatusVariant(item.status)}
            size="small"
          />
          <Text style={[styles.ticketDate, { color: theme.colors.text.tertiary }]}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const filters: { key: TicketFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'pending_quote', label: 'Pending Quote' },
    { key: 'approved', label: 'Approved' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.filtersContainer, { backgroundColor: theme.colors.surface }]}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filterOption) => (
          <TouchableOpacity
            key={filterOption.key}
            style={[
              styles.filterChip,
              filter === filterOption.key && {
                backgroundColor: theme.colors.primary[500],
              },
              { borderColor: theme.colors.primary[500] },
            ]}
            onPress={() => setFilter(filterOption.key)}
          >
            <Text
              style={[
                styles.filterText,
                filter === filterOption.key
                  ? { color: '#FFFFFF' }
                  : { color: theme.colors.primary[500] },
              ]}
            >
              {filterOption.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tickets List */}
      <FlatList
        data={filteredTickets}
        renderItem={renderTicket}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Maintenance Tickets
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.text.tertiary }]}>
              No tickets found
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
  filtersContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
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
  ticketCard: {
    marginBottom: 16,
    padding: 20,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketNumber: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  roomNumber: {
    fontSize: 14,
  },
  issueSummary: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  photosPreview: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  photoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIcon: {
    fontSize: 24,
  },
  morePhotos: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  morePhotosText: {
    fontSize: 14,
    fontWeight: '700',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ticketDate: {
    fontSize: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

