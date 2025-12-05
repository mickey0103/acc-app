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
import { useBookingStore } from '../../store';
import { DigitalKey } from '../../types';
import { mockDigitalKeys } from '../../data/mockData';

export const KeysScreen: React.FC = () => {
  const { theme } = useTheme();
  const { digitalKeys } = useBookingStore();

  const keys = digitalKeys.length > 0 ? digitalKeys : mockDigitalKeys;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getStatusVariant = (status: DigitalKey['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'not_available':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleAddToWallet = (platform: 'apple' | 'google') => {
    // TODO: Implement wallet integration
    console.log(`Add to ${platform} wallet`);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Digital Keys
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Access your rooms with digital keys
        </Text>
      </View>

      {keys.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={[styles.emptyText, { color: theme.colors.text.tertiary }]}>
            No active keys available
          </Text>
        </Card>
      ) : (
        keys.map((key) => (
          <Card key={key.id} style={styles.keyCard} elevated>
            <View style={styles.keyHeader}>
              <View>
                <Text style={[styles.keyTitle, { color: theme.colors.text.primary }]}>
                  Room {key.roomId}
                </Text>
                <Text style={[styles.keyStatus, { color: theme.colors.text.secondary }]}>
                  {key.status === 'active'
                    ? `Active until ${formatDate(key.expiresAt)}`
                    : key.status === 'not_available'
                    ? `Available at ${formatDate(key.expiresAt)}`
                    : 'Expired'}
                </Text>
              </View>
              <Badge
                label={key.status.replace('_', ' ').toUpperCase()}
                variant={getStatusVariant(key.status)}
              />
            </View>

            {key.status === 'active' && (
              <View style={styles.keyActions}>
                <Button
                  title="Unlock Door"
                  variant="primary"
                  size="small"
                  onPress={() => {
                    // TODO: Implement NFC unlock
                  }}
                  style={styles.actionButton}
                />
                <View style={styles.walletButtons}>
                  <TouchableOpacity
                    style={[styles.walletButton, { backgroundColor: theme.colors.surface }]}
                    onPress={() => handleAddToWallet('apple')}
                  >
                    <Text style={styles.walletIcon}>🍎</Text>
                    <Text style={[styles.walletText, { color: theme.colors.text.primary }]}>
                      Apple Wallet
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.walletButton, { backgroundColor: theme.colors.surface }]}
                    onPress={() => handleAddToWallet('google')}
                  >
                    <Text style={styles.walletIcon}>📱</Text>
                    <Text style={[styles.walletText, { color: theme.colors.text.primary }]}>
                      Google Wallet
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Card>
        ))
      )}
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  emptyCard: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  keyCard: {
    marginBottom: 20,
    padding: 20,
  },
  keyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  keyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  keyStatus: {
    fontSize: 14,
  },
  keyActions: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  walletButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  walletButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  walletIcon: {
    fontSize: 20,
  },
  walletText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

