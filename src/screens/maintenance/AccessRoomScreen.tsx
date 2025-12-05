import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button } from '../../components/common';

type DoorStatus = 'locked' | 'unlocked' | 'unknown';

export const AccessRoomScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const { roomId } = route.params as { roomId: string };
  const [doorStatus, setDoorStatus] = useState<DoorStatus>('locked');

  // TODO: Real-time status updates from backend
  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // In real app, fetch from backend
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    Alert.alert(
      'Unlock Door',
      'Are you sure you want to unlock this door?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unlock',
          onPress: () => {
            // TODO: Send unlock command
            setDoorStatus('unlocked');
            setTimeout(() => setDoorStatus('locked'), 5000);
          },
        },
      ]
    );
  };

  const getStatusVariant = (status: DoorStatus) => {
    switch (status) {
      case 'unlocked':
        return 'success';
      case 'locked':
        return 'default';
      default:
        return 'warning';
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.roomCard} elevated>
        <Text style={[styles.roomNumber, { color: theme.colors.text.primary }]}>
          Room {roomId}
        </Text>
      </Card>

      <Card style={styles.statusCard} elevated>
        <Text style={[styles.statusLabel, { color: theme.colors.text.secondary }]}>
          Door Status
        </Text>
        <View style={styles.statusRow}>
          <Badge
            label={doorStatus.toUpperCase()}
            variant={getStatusVariant(doorStatus)}
            style={styles.statusBadge}
          />
          <Text style={[styles.statusText, { color: theme.colors.text.secondary }]}>
            {doorStatus === 'locked' ? 'Door is locked' : 'Door is unlocked'}
          </Text>
        </View>
      </Card>

      <Button
        title="Unlock Door"
        onPress={handleUnlock}
        fullWidth
        style={styles.unlockButton}
      />

      <Card style={styles.warningCard} elevated>
        <Text style={[styles.warningText, { color: theme.colors.warning[500] }]}>
          ⚠️ Access denied if guest is inside.
        </Text>
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
  roomCard: {
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  roomNumber: {
    fontSize: 32,
    fontWeight: '700',
  },
  statusCard: {
    padding: 20,
    marginBottom: 24,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  unlockButton: {
    marginBottom: 24,
  },
  warningCard: {
    padding: 16,
    backgroundColor: '#FFF7ED',
  },
  warningText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

