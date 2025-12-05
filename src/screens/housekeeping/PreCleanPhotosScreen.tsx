import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Input } from '../../components/common';
import { useHousekeepingStore } from '../../store';
import { mockHousekeepingTasks } from '../../data/mockData';

export const PreCleanPhotosScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId } = route.params as { taskId: string };
  const { updateTask } = useHousekeepingStore();

  const task = mockHousekeepingTasks.find((t) => t.id === taskId);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoNotes, setPhotoNotes] = useState<Record<string, string>>({});

  const handleAddPhoto = () => {
    // TODO: Open camera/image picker
    const newPhoto = `photo_${Date.now()}`;
    setPhotos([...photos, newPhoto]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    updateTask(taskId, { preCleanPhotos: photos });
    navigation.navigate('CleaningChecklist' as never, { taskId } as never);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Room Summary */}
      <Card style={styles.headerCard} elevated>
        <Text style={[styles.roomNumber, { color: theme.colors.text.primary }]}>
          Room {task?.roomId}
        </Text>
        <Text style={[styles.propertyName, { color: theme.colors.text.secondary }]}>
          Pre-Clean Documentation
        </Text>
      </Card>

      {/* Instructions */}
      <Card style={styles.instructionCard} elevated>
        <Text style={[styles.instructionText, { color: theme.colors.text.secondary }]}>
          Take photos of room before cleaning begins.
        </Text>
      </Card>

      {/* Camera UI */}
      <Card style={styles.cameraCard} elevated>
        <TouchableOpacity
          style={[styles.cameraButton, { backgroundColor: theme.colors.primary[500] }]}
          onPress={handleAddPhoto}
        >
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={styles.cameraText}>Capture Photo</Text>
        </TouchableOpacity>
      </Card>

      {/* Photo Preview Grid */}
      {photos.length > 0 && (
        <Card style={styles.photosCard} elevated>
          <Text style={[styles.photosTitle, { color: theme.colors.text.primary }]}>
            Photos ({photos.length})
          </Text>
          <View style={styles.photosGrid}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoIcon}>📷</Text>
                </View>
                <Input
                  placeholder="Add note (optional)"
                  value={photoNotes[photo] || ''}
                  onChangeText={(text) =>
                    setPhotoNotes({ ...photoNotes, [photo]: text })
                  }
                  containerStyle={styles.photoNote}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemovePhoto(index)}
                >
                  <Text style={[styles.removeText, { color: theme.colors.error[500] }]}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Card>
      )}

      <Button
        title="Submit Pre-clean Photos"
        onPress={handleSubmit}
        fullWidth
        style={styles.submitButton}
        disabled={photos.length === 0}
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
  headerCard: {
    padding: 20,
    marginBottom: 24,
  },
  roomNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  propertyName: {
    fontSize: 16,
  },
  instructionCard: {
    padding: 20,
    marginBottom: 24,
    backgroundColor: '#F0F9FF',
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cameraCard: {
    padding: 20,
    marginBottom: 24,
  },
  cameraButton: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  cameraText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  photosCard: {
    padding: 20,
    marginBottom: 24,
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  photosGrid: {
    gap: 16,
  },
  photoContainer: {
    marginBottom: 16,
  },
  photoPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  photoIcon: {
    fontSize: 48,
  },
  photoNote: {
    marginBottom: 8,
  },
  removeButton: {
    alignSelf: 'flex-end',
  },
  removeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 8,
  },
});

