import React, { useState, useEffect } from 'react';
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
import { useHousekeepingStore } from '../../store';
import { CleaningChecklistItem } from '../../types';
import { mockHousekeepingTasks } from '../../data/mockData';

export const CleaningChecklistScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId } = route.params as { taskId: string };
  const { updateTask } = useHousekeepingStore();

  const task = mockHousekeepingTasks.find((t) => t.id === taskId);
  const [startTime] = useState(new Date());
  const [checklist, setChecklist] = useState<CleaningChecklistItem[]>([
    { id: '1', task: 'Bathroom cleaned', completed: false },
    { id: '2', task: 'Bed made', completed: false },
    { id: '3', task: 'Floors vacuumed', completed: false },
    { id: '4', task: 'Trash removed', completed: false },
    { id: '5', task: 'Amenities restocked', completed: false },
    { id: '6', task: 'Kitchen surfaces wiped', completed: false },
  ]);

  const completedCount = checklist.filter((item) => item.completed).length;
  const allCompleted = completedCount === checklist.length;

  const toggleTask = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFinish = () => {
    updateTask(taskId, { cleaningChecklist: checklist });
    navigation.navigate('MarkCleanSummary' as never, { taskId } as never);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Timer */}
      <Card style={styles.timerCard} elevated>
        <Text style={[styles.timerLabel, { color: theme.colors.text.secondary }]}>
          Cleaning Started
        </Text>
        <Text style={[styles.timerValue, { color: theme.colors.text.primary }]}>
          {formatTime(startTime)}
        </Text>
      </Card>

      {/* Checklist */}
      <Card style={styles.checklistCard} elevated>
        <Text style={[styles.checklistTitle, { color: theme.colors.text.primary }]}>
          Cleaning Checklist
        </Text>
        {checklist.map((item) => (
          <View key={item.id} style={styles.checklistItem}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => toggleTask(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && {
                    backgroundColor: theme.colors.primary[500],
                  },
                  { borderColor: theme.colors.primary[500] },
                ]}
              >
                {item.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text
                style={[
                  styles.taskText,
                  item.completed && { textDecorationLine: 'line-through' },
                  { color: theme.colors.text.primary },
                ]}
              >
                {item.task}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.photoButton}
              onPress={() => {
                // TODO: Add photo for this checkpoint
              }}
            >
              <Text style={[styles.photoButtonText, { color: theme.colors.primary[500] }]}>
                📷
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Card>

      <Button
        title="Finish Cleaning"
        onPress={handleFinish}
        fullWidth
        style={styles.finishButton}
        disabled={!allCompleted}
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
  timerCard: {
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  timerValue: {
    fontSize: 32,
    fontWeight: '700',
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
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  photoButton: {
    padding: 8,
  },
  photoButtonText: {
    fontSize: 24,
  },
  finishButton: {
    marginTop: 8,
  },
});

