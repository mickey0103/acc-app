import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button } from '../../components/common';
import { useHousekeepingStore } from '../../store';
import { mockHousekeepingTasks } from '../../data/mockData';

export const MarkCleanSummaryScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId } = route.params as { taskId: string };
  const { updateTask } = useHousekeepingStore();

  const task = mockHousekeepingTasks.find((t) => t.id === taskId);

  const formatTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleConfirm = () => {
    updateTask(taskId, {
      status: 'cleaned',
      completedAt: new Date().toISOString(),
    });
    // TODO: Send "Cleaned & Ready" to RMS, trigger cleaning fee
    navigation.navigate('Tabs' as never, { screen: 'Rooms' } as never);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.summaryCard} elevated>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Cleaning Summary
        </Text>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Room Number
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            {task?.roomId}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Cleaning Start Time
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            {formatTime(task?.completedAt)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Cleaning Finish Time
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Photos Taken
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            {task?.preCleanPhotos?.length || 0}
          </Text>
        </View>
      </Card>

      <Card style={styles.actionsCard} elevated>
        <Text style={[styles.actionsTitle, { color: theme.colors.text.primary }]}>
          System Actions
        </Text>
        <View style={styles.actionItem}>
          <Text style={styles.actionIcon}>✓</Text>
          <Text style={[styles.actionText, { color: theme.colors.text.secondary }]}>
            Send "Cleaned & Ready" to RMS
          </Text>
        </View>
        <View style={styles.actionItem}>
          <Text style={styles.actionIcon}>✓</Text>
          <Text style={[styles.actionText, { color: theme.colors.text.secondary }]}>
            Trigger cleaning fee
          </Text>
        </View>
      </Card>

      <Button
        title="Confirm Clean Status"
        onPress={handleConfirm}
        fullWidth
        style={styles.confirmButton}
      />
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
  summaryCard: {
    padding: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionsCard: {
    padding: 20,
    marginBottom: 24,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 16,
    color: '#22C55E',
    marginRight: 12,
    fontWeight: '700',
  },
  actionText: {
    fontSize: 14,
    flex: 1,
  },
  confirmButton: {
    marginTop: 8,
  },
});

