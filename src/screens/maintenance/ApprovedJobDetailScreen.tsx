import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button } from '../../components/common';
import { useMaintenanceStore } from '../../store';
import { MaintenanceJob } from '../../types';

export const ApprovedJobDetailScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { jobId } = route.params as { jobId: string };
  const { jobs } = useMaintenanceStore();

  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return null;
  }

  const handleAddToWallet = (platform: 'apple' | 'google') => {
    // TODO: Implement wallet integration
    console.log(`Add key to ${platform} wallet`);
  };

  const handleStartJob = () => {
    navigation.navigate('FixChecklist' as never, { jobId: job.id } as never);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.statusCard} elevated>
        <View style={styles.statusRow}>
          <Text style={[styles.statusLabel, { color: theme.colors.text.secondary }]}>Status</Text>
          <Badge label="APPROVED" variant="success" />
        </View>
      </Card>

      <Card style={styles.summaryCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Job Summary
        </Text>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>Room</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
            Room {job.roomId}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>Ticket ID</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
            #{job.ticketId}
          </Text>
        </View>
      </Card>

      {job.accessKey && (
        <Card style={styles.keyCard} elevated>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Access Key Status
          </Text>
          <Text style={[styles.keyStatus, { color: theme.colors.success[500] }]}>
            Master Maintenance Key Available
          </Text>
          <View style={styles.walletButtons}>
            <Button
              title="Add to Apple Wallet"
              variant="outline"
              onPress={() => handleAddToWallet('apple')}
              fullWidth
              style={styles.walletButton}
            />
            <Button
              title="Add to Google Wallet"
              variant="outline"
              onPress={() => handleAddToWallet('google')}
              fullWidth
              style={styles.walletButton}
            />
          </View>
        </Card>
      )}

      <Button
        title="Start Job"
        onPress={handleStartJob}
        fullWidth
        style={styles.startButton}
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
  statusCard: {
    padding: 20,
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
  },
  summaryCard: {
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  keyCard: {
    padding: 20,
    marginBottom: 24,
  },
  keyStatus: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  walletButtons: {
    gap: 12,
  },
  walletButton: {
    marginBottom: 0,
  },
  startButton: {
    marginTop: 8,
  },
});

