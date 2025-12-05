import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Badge } from '../../components/common';
import { useMaintenanceStore } from '../../store';
import { mockMaintenanceTickets } from '../../data/mockData';

export const ApprovalDetailScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const { ticketId } = route.params as { ticketId: string };
  const { updateTicket } = useMaintenanceStore();

  const ticket = mockMaintenanceTickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return null;
  }

  const handleApprove = () => {
    Alert.alert('Approve Request', 'Are you sure you want to approve this request?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Approve',
        onPress: () => {
          updateTicket(ticketId, { status: 'approved' });
        },
      },
    ]);
  };

  const handleReject = () => {
    Alert.alert('Reject Request', 'Are you sure you want to reject this request?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reject',
        style: 'destructive',
        onPress: () => {
          updateTicket(ticketId, { status: 'rejected' });
        },
      },
    ]);
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'normal':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.headerCard} elevated>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.ticketNumber, { color: theme.colors.text.primary }]}>
              Ticket #{ticket.id}
            </Text>
            <Text style={[styles.roomNumber, { color: theme.colors.text.secondary }]}>
              Room {ticket.roomId}
            </Text>
          </View>
          <Badge
            label={ticket.priority.toUpperCase()}
            variant={getPriorityVariant(ticket.priority)}
          />
        </View>
      </Card>

      <Card style={styles.detailsCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Issue Summary
        </Text>
        <Text style={[styles.issueSummary, { color: theme.colors.text.primary }]}>
          {ticket.issueSummary}
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary, marginTop: 16 }]}>
          Description
        </Text>
        <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
          {ticket.description}
        </Text>

        {ticket.photos && ticket.photos.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary, marginTop: 16 }]}>
              Photos
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
              {ticket.photos.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                </View>
              ))}
            </ScrollView>
          </>
        )}

        {ticket.reportedBy === 'housekeeping' && (
          <View style={styles.housekeepingNote}>
            <Text style={[styles.noteLabel, { color: theme.colors.text.secondary }]}>
              Reported by Housekeeping
            </Text>
          </View>
        )}
      </Card>

      {ticket.quote && (
        <Card style={styles.quoteCard} elevated>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Quote Details
          </Text>
          <View style={styles.quoteRow}>
            <Text style={[styles.quoteLabel, { color: theme.colors.text.secondary }]}>
              Labor Cost
            </Text>
            <Text style={[styles.quoteValue, { color: theme.colors.text.primary }]}>
              ${ticket.quote.laborCost}
            </Text>
          </View>
          {ticket.quote.materials && ticket.quote.materials.length > 0 && (
            <>
              <Text style={[styles.materialsTitle, { color: theme.colors.text.primary }]}>
                Materials
              </Text>
              {ticket.quote.materials.map((material, index) => (
                <View key={index} style={styles.materialRow}>
                  <Text style={[styles.materialName, { color: theme.colors.text.secondary }]}>
                    {material.name} (x{material.quantity})
                  </Text>
                  <Text style={[styles.materialPrice, { color: theme.colors.text.primary }]}>
                    ${(material.price * material.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </>
          )}
          <View style={[styles.totalRow, { borderTopColor: theme.colors.border }]}>
            <Text style={[styles.totalLabel, { color: theme.colors.text.primary }]}>
              Total
            </Text>
            <Text style={[styles.totalValue, { color: theme.colors.text.primary }]}>
              $
              {(
                ticket.quote.laborCost +
                (ticket.quote.materials?.reduce((sum, m) => sum + m.price * m.quantity, 0) || 0)
              ).toFixed(2)}
            </Text>
          </View>
        </Card>
      )}

      <View style={styles.actions}>
        <Button
          title="Approve"
          onPress={handleApprove}
          fullWidth
          style={styles.approveButton}
        />
        <Button
          title="Reject"
          variant="danger"
          onPress={handleReject}
          fullWidth
          style={styles.rejectButton}
        />
      </View>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  roomNumber: {
    fontSize: 16,
  },
  detailsCard: {
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  issueSummary: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  photosContainer: {
    marginTop: 12,
  },
  photoContainer: {
    marginRight: 12,
  },
  photo: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  housekeepingNote: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  noteLabel: {
    fontSize: 12,
  },
  quoteCard: {
    padding: 20,
    marginBottom: 24,
  },
  quoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quoteLabel: {
    fontSize: 14,
  },
  quoteValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  materialsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  materialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  materialName: {
    fontSize: 14,
  },
  materialPrice: {
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
  actions: {
    gap: 12,
  },
  approveButton: {
    marginBottom: 0,
  },
  rejectButton: {
    marginTop: 0,
  },
});

