import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Input } from '../../components/common';
import { useMaintenanceStore } from '../../store';

export const JobCompletionScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { jobId } = route.params as { jobId: string };
  const { updateJob } = useMaintenanceStore();

  const [notes, setNotes] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [finalCost, setFinalCost] = useState('');

  const handleComplete = () => {
    // TODO: Submit completion with photos, notes, time, cost
    updateJob(jobId, { status: 'completed' });
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card} elevated>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Job Completion Summary
        </Text>

        {/* Photos Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Photos of Completed Work
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
          <View style={styles.photosGrid}>
            {/* TODO: Display uploaded photos */}
            <Text style={[styles.placeholderText, { color: theme.colors.text.tertiary }]}>
              No photos added yet
            </Text>
          </View>
        </View>

        {/* Notes */}
        <Input
          label="Notes"
          placeholder="Add any notes about the completed work"
          value={notes}
          onChangeText={setNotes}
          multiline
          containerStyle={styles.input}
        />

        {/* Time Spent */}
        <Input
          label="Time Spent (hours)"
          placeholder="Enter time spent"
          value={timeSpent}
          onChangeText={setTimeSpent}
          keyboardType="decimal-pad"
          containerStyle={styles.input}
        />

        {/* Materials Used */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Materials Used
          </Text>
          <Text style={[styles.materialsText, { color: theme.colors.text.secondary }]}>
            Materials from quote will be automatically included
          </Text>
        </View>

        {/* Final Cost Summary */}
        <Card style={styles.costCard} elevated>
          <Text style={[styles.costTitle, { color: theme.colors.text.primary }]}>
            Final Cost Summary
          </Text>
          <View style={styles.costRow}>
            <Text style={[styles.costLabel, { color: theme.colors.text.secondary }]}>
              Labor Cost
            </Text>
            <Text style={[styles.costValue, { color: theme.colors.text.primary }]}>
              $500.00
            </Text>
          </View>
          <View style={styles.costRow}>
            <Text style={[styles.costLabel, { color: theme.colors.text.secondary }]}>
              Materials
            </Text>
            <Text style={[styles.costValue, { color: theme.colors.text.primary }]}>
              $150.00
            </Text>
          </View>
          <View style={[styles.totalRow, { borderTopColor: theme.colors.border }]}>
            <Text style={[styles.totalLabel, { color: theme.colors.text.primary }]}>
              Total Cost
            </Text>
            <Text style={[styles.totalValue, { color: theme.colors.text.primary }]}>
              $650.00
            </Text>
          </View>
        </Card>

        <Button
          title="Mark Job Completed"
          onPress={handleComplete}
          fullWidth
          style={styles.completeButton}
        />

        <Text style={[styles.systemNote, { color: theme.colors.text.tertiary }]}>
          System will automatically: Set room to "Dirty" and send job to Housekeeping queue
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
  photoButton: {
    marginBottom: 12,
  },
  photosGrid: {
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 14,
  },
  input: {
    marginBottom: 20,
  },
  materialsText: {
    fontSize: 14,
  },
  costCard: {
    padding: 20,
    marginBottom: 24,
  },
  costTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  costLabel: {
    fontSize: 14,
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 2,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  completeButton: {
    marginTop: 8,
  },
  systemNote: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
});

