import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button, Input } from '../../components/common';
import { useBookingStore } from '../../store';
import { DigitalKey } from '../../types';
import { mockDigitalKeys, mockBookings } from '../../data/mockData';

export const KeysScreenEnhanced: React.FC = () => {
  const { theme } = useTheme();
  const { digitalKeys } = useBookingStore();
  const [showAssignGuest, setShowAssignGuest] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');

  const keys = digitalKeys.length > 0 ? digitalKeys : mockDigitalKeys;
  const activeKeys = keys.filter((k) => k.status === 'active');
  const multiRoomKeys = activeKeys.length > 1;

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

  const getStatusText = (key: DigitalKey) => {
    if (key.status === 'active') {
      return `Key active until ${formatDate(key.expiresAt)}`;
    } else if (key.status === 'not_available') {
      return `Not active yet — available at ${formatDate(key.expiresAt)}`;
    } else {
      return 'Expired';
    }
  };

  const handleAddToWallet = (platform: 'apple' | 'google', keyId: string) => {
    // TODO: Implement wallet integration
    console.log(`Add key ${keyId} to ${platform} wallet`);
  };

  const handleUnlock = (keyId: string) => {
    // TODO: Implement NFC unlock
    console.log(`Unlock with key ${keyId}`);
  };

  const handleShareWithGuest = () => {
    // TODO: Send key invite
    console.log('Send key invite to:', guestEmail);
    setShowAssignGuest(false);
    setGuestEmail('');
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
        <>
          {/* Active Keys */}
          {activeKeys.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Active Keys
              </Text>
              {activeKeys.map((key) => {
                const booking = mockBookings.find((b) => b.id === key.bookingId);
                return (
                  <Card key={key.id} style={styles.keyCard} elevated>
                    <View style={styles.keyHeader}>
                      <View style={styles.keyInfo}>
                        <Text style={[styles.keyTitle, { color: theme.colors.text.primary }]}>
                          {multiRoomKeys ? `Room ${key.roomId}` : `Room ${key.roomId}`}
                        </Text>
                        {multiRoomKeys && (
                          <Text style={[styles.keySubtitle, { color: theme.colors.text.secondary }]}>
                            {key.roomId === '12A' ? 'Master' : 'Kids'}
                          </Text>
                        )}
                        <Text style={[styles.keyStatus, { color: theme.colors.text.secondary }]}>
                          {getStatusText(key)}
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
                          title="Press to Unlock"
                          variant="primary"
                          size="small"
                          onPress={() => handleUnlock(key.id)}
                          fullWidth
                          style={styles.unlockButton}
                        />
                        <View style={styles.walletButtons}>
                          <TouchableOpacity
                            style={[styles.walletButton, { backgroundColor: theme.colors.surface }]}
                            onPress={() => handleAddToWallet('apple', key.id)}
                          >
                            <Text style={styles.walletIcon}>🍎</Text>
                            <Text style={[styles.walletText, { color: theme.colors.text.primary }]}>
                              Apple Wallet
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.walletButton, { backgroundColor: theme.colors.surface }]}
                            onPress={() => handleAddToWallet('google', key.id)}
                          >
                            <Text style={styles.walletIcon}>📱</Text>
                            <Text style={[styles.walletText, { color: theme.colors.text.primary }]}>
                              Google Wallet
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Button
                          title="Share with Guest"
                          variant="ghost"
                          size="small"
                          onPress={() => setShowAssignGuest(true)}
                          fullWidth
                          style={styles.shareButton}
                        />
                      </View>
                    )}
                  </Card>
                );
              })}
            </View>
          )}

          {/* Not Available Keys */}
          {keys.filter((k) => k.status === 'not_available').length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Upcoming Keys
              </Text>
              {keys
                .filter((k) => k.status === 'not_available')
                .map((key) => (
                  <Card key={key.id} style={styles.keyCard} elevated>
                    <View style={styles.keyHeader}>
                      <View>
                        <Text style={[styles.keyTitle, { color: theme.colors.text.primary }]}>
                          Room {key.roomId}
                        </Text>
                        <Text style={[styles.keyStatus, { color: theme.colors.text.secondary }]}>
                          {getStatusText(key)}
                        </Text>
                      </View>
                      <Badge
                        label={key.status.replace('_', ' ').toUpperCase()}
                        variant={getStatusVariant(key.status)}
                      />
                    </View>
                  </Card>
                ))}
            </View>
          )}

          {/* Assign Guest Key Modal */}
          {showAssignGuest && (
            <Card style={styles.assignCard} elevated>
              <Text style={[styles.assignTitle, { color: theme.colors.text.primary }]}>
                Assign Guest Key
              </Text>
              <Text style={[styles.assignDescription, { color: theme.colors.text.secondary }]}>
                Send a key invite to a guest. They must install the app to activate the key.
              </Text>
              <Input
                label="Guest Email"
                placeholder="Enter guest email"
                value={guestEmail}
                onChangeText={setGuestEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.emailInput}
              />
              <View style={styles.assignActions}>
                <Button
                  title="Cancel"
                  variant="outline"
                  onPress={() => {
                    setShowAssignGuest(false);
                    setGuestEmail('');
                  }}
                  style={styles.cancelButton}
                />
                <Button
                  title="Send Key Invite"
                  onPress={handleShareWithGuest}
                  disabled={!guestEmail.trim()}
                  style={styles.sendButton}
                />
              </View>
            </Card>
          )}
        </>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
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
  keyInfo: {
    flex: 1,
  },
  keyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  keySubtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  keyStatus: {
    fontSize: 14,
  },
  keyActions: {
    gap: 12,
  },
  unlockButton: {
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
  shareButton: {
    marginTop: 8,
  },
  assignCard: {
    padding: 20,
    marginTop: 20,
  },
  assignTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  assignDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
  emailInput: {
    marginBottom: 20,
  },
  assignActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
  },
  sendButton: {
    flex: 1,
  },
});

