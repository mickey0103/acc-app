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
import { Card, Badge, Button } from '../../components/common';
import { useHousekeepingStore } from '../../store';
import { HousekeepingTask } from '../../types';
import { mockHousekeepingTasks, mockProperties } from '../../data/mockData';

type TaskFilter = 'today' | 'upcoming' | 'completed';

export const HousekeepingDashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { tasks } = useHousekeepingStore();
  const [filter, setFilter] = useState<TaskFilter>('today');

  const allTasks = tasks.length > 0 ? tasks : mockHousekeepingTasks;

  const filteredTasks = allTasks.filter((task) => {
    if (filter === 'today') {
      return task.status === 'dirty' || task.status === 'in_progress';
    } else if (filter === 'upcoming') {
      return task.status === 'dirty';
    } else {
      return task.status === 'cleaned';
    }
  });

  const getStatusVariant = (status: HousekeepingTask['status']) => {
    switch (status) {
      case 'cleaned':
        return 'success';
      case 'in_progress':
        return 'info';
      case 'ready_for_inspection':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getPriorityVariant = (priority: HousekeepingTask['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'late_checkout':
        return 'warning';
      case 'extended_stay':
        return 'info';
      default:
        return 'default';
    }
  };

  const renderTask = ({ item }: { item: HousekeepingTask }) => {
    const property = mockProperties.find((p) => p.id === item.propertyId);

    return (
      <Card style={styles.taskCard} elevated>
        <View style={styles.taskHeader}>
          <View style={styles.taskInfo}>
            <Text style={[styles.roomNumber, { color: theme.colors.text.primary }]}>
              Room {item.roomId}
            </Text>
            <Text style={[styles.propertyName, { color: theme.colors.text.secondary }]}>
              {property?.name || 'Property'}
            </Text>
          </View>
          <Badge
            label={item.status.replace('_', ' ').toUpperCase()}
            variant={getStatusVariant(item.status)}
          />
        </View>

        {item.priority !== 'normal' && (
          <Badge
            label={item.priority.replace('_', ' ').toUpperCase()}
            variant={getPriorityVariant(item.priority)}
            style={styles.priorityBadge}
          />
        )}

        <Button
          title="Start Cleaning"
          variant="primary"
          size="small"
          onPress={() => {
            navigation.navigate('PreCleanPhotos' as never, { taskId: item.id } as never);
          }}
          fullWidth
          style={styles.startButton}
        />
      </Card>
    );
  };

  const filters: { key: TaskFilter; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Filter Tabs */}
      <View style={[styles.filtersContainer, { backgroundColor: theme.colors.surface }]}>
        {filters.map((filterOption) => (
          <TouchableOpacity
            key={filterOption.key}
            style={[
              styles.filterTab,
              filter === filterOption.key && {
                backgroundColor: theme.colors.primary[500],
              },
            ]}
            onPress={() => setFilter(filterOption.key)}
          >
            <Text
              style={[
                styles.filterText,
                filter === filterOption.key
                  ? { color: '#FFFFFF' }
                  : { color: theme.colors.text.secondary },
              ]}
            >
              {filterOption.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tasks List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Housekeeping Tasks
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
              {filteredTasks.length} {filter === 'today' ? 'tasks' : 'items'} {filter}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.text.tertiary }]}>
              No tasks found
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
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  filterTab: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  taskCard: {
    padding: 20,
    marginBottom: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  taskInfo: {
    flex: 1,
  },
  roomNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  propertyName: {
    fontSize: 14,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  startButton: {
    marginTop: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

