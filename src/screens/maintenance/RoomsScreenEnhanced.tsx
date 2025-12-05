import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge } from '../../components/common';
import { useMaintenanceStore } from '../../store';
import { Room } from '../../types';
import { mockRooms } from '../../data/mockData';

export const RoomsScreenEnhanced: React.FC = () => {
  const { theme } = useTheme();
  const { rooms, updateRoomStatus } = useMaintenanceStore();
  const [roomOfflineStates, setRoomOfflineStates] = useState<Record<string, boolean>>({});

  const allRooms = rooms.length > 0 ? rooms : mockRooms;

  const handleToggleOffline = (roomId: string, currentStatus: boolean) => {
    if (!currentStatus) {
      Alert.alert(
        'Set Room Offline',
        'This will block future bookings. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm',
            onPress: () => {
              updateRoomStatus(roomId, 'maintenance', true);
              setRoomOfflineStates({ ...roomOfflineStates, [roomId]: true });
            },
          },
        ]
      );
    } else {
      updateRoomStatus(roomId, 'available', false);
      setRoomOfflineStates({ ...roomOfflineStates, [roomId]: false });
    }
  };

  const getStatusVariant = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'maintenance':
        return 'error';
      case 'cleaning':
        return 'warning';
      case 'occupied':
        return 'info';
      default:
        return 'default';
    }
  };

  const renderRoom = ({ item }: { item: Room }) => {
    const isOffline = roomOfflineStates[item.id] || item.isOffline;

    return (
      <Card style={styles.roomCard} elevated>
        <View style={styles.roomHeader}>
          <View style={styles.roomInfo}>
            <Text style={[styles.roomNumber, { color: theme.colors.text.primary }]}>
              Room {item.roomNumber}
            </Text>
            <Text style={[styles.roomName, { color: theme.colors.text.secondary }]}>
              {item.name}
            </Text>
          </View>
          <Badge
            label={item.status.toUpperCase()}
            variant={getStatusVariant(item.status)}
          />
        </View>

        {isOffline && (
          <View style={styles.offlineTag}>
            <Text style={[styles.offlineText, { color: theme.colors.error[500] }]}>
              Room Offline
            </Text>
          </View>
        )}

        <View style={styles.offlineSection}>
          <View style={styles.offlineInfo}>
            <Text style={[styles.offlineLabel, { color: theme.colors.text.primary }]}>
              Set Room Under Maintenance
            </Text>
            <Text style={[styles.offlineDescription, { color: theme.colors.text.secondary }]}>
              This will block future bookings
            </Text>
          </View>
          <Switch
            value={isOffline}
            onValueChange={(value) => handleToggleOffline(item.id, value)}
            trackColor={{ false: theme.colors.neutral[300], true: theme.colors.error[500] }}
          />
        </View>
      </Card>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={allRooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Rooms Status
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
              Manage room availability and maintenance status
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
  listContent: {
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
  roomCard: {
    padding: 20,
    marginBottom: 16,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  roomInfo: {
    flex: 1,
  },
  roomNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  roomName: {
    fontSize: 14,
  },
  offlineTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    marginBottom: 16,
  },
  offlineText: {
    fontSize: 12,
    fontWeight: '700',
  },
  offlineSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  offlineInfo: {
    flex: 1,
    marginRight: 16,
  },
  offlineLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  offlineDescription: {
    fontSize: 12,
  },
});

