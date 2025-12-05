import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button } from '../../components/common';
import { JobTask } from '../../types';

export const FixChecklistScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { jobId } = route.params as { jobId: string };

  const [tasks, setTasks] = useState<JobTask[]>([
    { id: '1', description: 'Replace broken door handle', completed: false },
    { id: '2', description: 'Fix loose door frame', completed: false },
    { id: '3', description: 'Test door lock mechanism', completed: false },
    { id: '4', description: 'Clean up work area', completed: false },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleFinish = () => {
    navigation.navigate('JobCompletion' as never, { jobId } as never);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.progressCard} elevated>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: theme.colors.text.secondary }]}>
            Progress
          </Text>
          <Text style={[styles.progressValue, { color: theme.colors.text.primary }]}>
            {completedCount} of {tasks.length} tasks complete
          </Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.neutral[200] }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
                backgroundColor: theme.colors.primary[500],
              },
            ]}
          />
        </View>
      </Card>

      <Card style={styles.checklistCard} elevated>
        <Text style={[styles.checklistTitle, { color: theme.colors.text.primary }]}>
          Fix Checklist
        </Text>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskItem}
            onPress={() => toggleTask(task.id)}
          >
            <View
              style={[
                styles.checkbox,
                task.completed && {
                  backgroundColor: theme.colors.primary[500],
                },
                { borderColor: theme.colors.primary[500] },
              ]}
            >
              {task.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.taskContent}>
              <Text
                style={[
                  styles.taskDescription,
                  task.completed && { textDecorationLine: 'line-through' },
                  { color: theme.colors.text.primary },
                ]}
              >
                {task.description}
              </Text>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={() => {
                  // TODO: Add photo for this task
                }}
              >
                <Text style={[styles.photoButtonText, { color: theme.colors.primary[500] }]}>
                  📷 Add Photo
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </Card>

      <Button
        title="Finish Fix"
        onPress={handleFinish}
        fullWidth
        style={styles.finishButton}
        disabled={completedCount !== tasks.length}
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
  progressCard: {
    padding: 20,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  checklistCard: {
    padding: 20,
    marginBottom: 24,
  },
  checklistTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  taskContent: {
    flex: 1,
  },
  taskDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  photoButton: {
    alignSelf: 'flex-start',
  },
  photoButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  finishButton: {
    marginTop: 8,
  },
});

