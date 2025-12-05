import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button } from '../../components/common';

export const MasterKeyScreen: React.FC = () => {
  const { theme } = useTheme();

  const formatTime = (hours: number) => {
    return `${hours}:00 ${hours >= 12 ? 'PM' : 'AM'}`;
  };

  const availableRooms = [
    { id: '1', roomNumber: '12A', property: 'Mountain View Resort' },
    { id: '2', roomNumber: '12B', property: 'Mountain View Resort' },
    { id: '3', roomNumber: 'Cabin 5', property: 'Beachside Cabins' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Info Box */}
      <Card style={styles.infoCard} elevated>
        <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
          This key gives temporary access to unoccupied rooms only.
        </Text>
        <Text style={[styles.expiryText, { color: theme.colors.text.secondary }]}>
          Key expires at: {formatTime(18)}
        </Text>
        <Badge label="ACTIVE" variant="success" style={styles.statusBadge} />
      </Card>

      {/* Wallet Actions */}
      <Card style={styles.walletCard} elevated>
        <Text style={[styles.walletTitle, { color: theme.colors.text.primary }]}>
          Add to Wallet
        </Text>
        <View style={styles.walletButtons}>
          <TouchableOpacity
            style={[styles.walletButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => {
              // TODO: Add to Apple Wallet
            }}
          >
            <Text style={styles.walletIcon}>🍎</Text>
            <Text style={[styles.walletText, { color: theme.colors.text.primary }]}>
              Apple Wallet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.walletButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => {
              // TODO: Add to Google Wallet
            }}
          >
            <Text style={styles.walletIcon}>📱</Text>
            <Text style={[styles.walletText, { color: theme.colors.text.primary }]}>
              Google Wallet
            </Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Available Rooms */}
      <View style={styles.roomsSection}>
        <Text style={[styles.roomsTitle, { color: theme.colors.text.primary }]}>
          Rooms Available to Access
        </Text>
        {availableRooms.map((room) => (
          <Card key={room.id} style={styles.roomCard} elevated>
            <View style={styles.roomHeader}>
              <View>
                <Text style={[styles.roomName, { color: theme.colors.text.primary }]}>
                  {room.roomNumber}
                </Text>
                <Text style={[styles.roomProperty, { color: theme.colors.text.secondary }]}>
                  {room.property}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.lockButton, { backgroundColor: theme.colors.primary[500] }]}
                onPress={() => {
                  // TODO: Open NFC interaction view
                }}
              >
                <Text style={styles.lockIcon}>🔓</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Open Door"
              variant="primary"
              size="small"
              onPress={() => {
                // TODO: Unlock door via NFC
              }}
              fullWidth
              style={styles.openButton}
            />
          </Card>
        ))}
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
  infoCard: {
    padding: 20,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
  },
  expiryText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
  },
  walletCard: {
    padding: 20,
    marginBottom: 24,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  walletButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  walletButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  walletIcon: {
    fontSize: 24,
  },
  walletText: {
    fontSize: 14,
    fontWeight: '600',
  },
  roomsSection: {
    marginBottom: 24,
  },
  roomsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  roomCard: {
    padding: 20,
    marginBottom: 16,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  roomName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  roomProperty: {
    fontSize: 14,
  },
  lockButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 24,
  },
  openButton: {
    marginTop: 8,
  },
});

