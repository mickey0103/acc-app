import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge } from '../../components/common';
import { Notification } from '../../types';
import { mockNotifications } from '../../data/mockData';

type NotificationTab = 'all' | 'bookings' | 'keys' | 'payments' | 'messages';

export const NotificationsScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');

  const tabs: { key: NotificationTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'bookings', label: 'Bookings' },
    { key: 'keys', label: 'Keys' },
    { key: 'payments', label: 'Payments' },
    { key: 'messages', label: 'Messages' },
  ];

  const filteredNotifications = mockNotifications.filter((notif) => {
    if (activeTab === 'all') return true;
    return notif.type === activeTab.slice(0, -1); // Remove 's' from plural
  });

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return '📅';
      case 'key':
        return '🔑';
      case 'payment':
        return '💳';
      case 'message':
        return '💬';
      default:
        return '🔔';
    }
  };

  const handleNotificationPress = (notification: Notification) => {
    switch (notification.type) {
      case 'booking':
        navigation.navigate('BookingDetail' as never, { bookingId: '1' } as never);
        break;
      case 'key':
        navigation.navigate('Keys' as never);
        break;
      case 'payment':
        // TODO: Navigate to payment details
        break;
      case 'message':
        // TODO: Navigate to message thread
        break;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours < 1) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <Card
        style={[
          styles.notificationCard,
          !item.read && { backgroundColor: theme.colors.primary[50] },
        ]}
        elevated
      >
        <View style={styles.notificationContent}>
          <Text style={styles.notificationIcon}>{getIcon(item.type)}</Text>
          <View style={styles.notificationText}>
            <Text style={[styles.notificationTitle, { color: theme.colors.text.primary }]}>
              {item.title}
            </Text>
            <Text style={[styles.notificationMessage, { color: theme.colors.text.secondary }]}>
              {item.message}
            </Text>
            <Text style={[styles.notificationTime, { color: theme.colors.text.tertiary }]}>
              {formatTime(item.createdAt)}
            </Text>
          </View>
          {!item.read && (
            <View
              style={[styles.unreadDot, { backgroundColor: theme.colors.primary[500] }]}
            />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.surface }]}>
        <FlatList
          horizontal
          data={tabs}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === item.key && {
                  backgroundColor: theme.colors.primary[500],
                },
              ]}
              onPress={() => setActiveTab(item.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === item.key
                    ? { color: '#FFFFFF' }
                    : { color: theme.colors.text.secondary },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        />
      </View>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={[styles.emptyText, { color: theme.colors.text.tertiary }]}>
            No notifications yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Settings Button */}
      <TouchableOpacity
        style={[styles.settingsButton, { backgroundColor: theme.colors.surface }]}
        onPress={() => {
          // TODO: Navigate to notification preferences
        }}
      >
        <Text style={[styles.settingsText, { color: theme.colors.primary[500] }]}>
          Notification Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  notificationCard: {
    marginBottom: 12,
    padding: 16,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
  },
  settingsButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

