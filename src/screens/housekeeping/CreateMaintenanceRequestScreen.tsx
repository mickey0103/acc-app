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
import { Card, Button, Input } from '../../components/common';
import { useHousekeepingStore } from '../../store';

type Priority = 'low' | 'normal' | 'urgent';

export const CreateMaintenanceRequestScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { roomId } = route.params as { roomId: string };
  const { addMaintenanceRequest } = useHousekeepingStore();

  const [priority, setPriority] = useState<Priority>('normal');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = () => {
    addMaintenanceRequest({
      id: Date.now().toString(),
      roomId,
      userId: 'housekeeping',
      type: 'maintenance',
      category: 'General',
      description,
      priority,
      status: 'submitted',
      photos,
      createdAt: new Date().toISOString(),
    });
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card} elevated>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Create Maintenance Request
        </Text>

        {/* Room Detail */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Room Detail
          </Text>
          <Text style={[styles.roomText, { color: theme.colors.text.secondary }]}>
            Room {roomId}
          </Text>
        </View>

        {/* Priority Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Priority
          </Text>
          <View style={styles.priorityButtons}>
            {(['low', 'normal', 'urgent'] as Priority[]).map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  priority === p && {
                    backgroundColor: theme.colors.primary[500],
                  },
                  { borderColor: theme.colors.primary[500] },
                ]}
                onPress={() => setPriority(p)}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === p
                      ? { color: '#FFFFFF' }
                      : { color: theme.colors.primary[500] },
                  ]}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <Input
          label="Describe the Issue"
          placeholder="Describe the issue discovered during cleaning"
          value={description}
          onChangeText={setDescription}
          multiline
          containerStyle={styles.input}
        />

        {/* Photos */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Add Photos (Multiple)
          </Text>
          <Button
            title="Add Photos"
            variant="outline"
            onPress={() => {
              // TODO: Open image picker
            }}
            fullWidth
            style={styles.photoButton}
          />
        </View>

        <Button
          title="Send Maintenance Request"
          onPress={handleSubmit}
          fullWidth
          style={styles.submitButton}
          disabled={!description}
        />
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
  card: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  roomText: {
    fontSize: 16,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    marginBottom: 20,
  },
  photoButton: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 8,
  },
});

