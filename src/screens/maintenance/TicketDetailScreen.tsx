import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button } from '../../components/common';
import { useMaintenanceStore } from '../../store';
import { mockMaintenanceTickets } from '../../data/mockData';

export const TicketDetailScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { ticketId } = route.params as { ticketId: string };
  const { tickets } = useMaintenanceStore();

  const ticket = tickets.find((t) => t.id === ticketId) || mockMaintenanceTickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return null;
  }

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
          Problem Description
        </Text>
        <Text style={[styles.issueSummary, { color: theme.colors.text.primary }]}>
          {ticket.issueSummary}
        </Text>
        <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
          {ticket.description}
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary, marginTop: 16 }]}>
          Priority Level
        </Text>
        <Badge
          label={ticket.priority.toUpperCase()}
          variant={getPriorityVariant(ticket.priority)}
          style={styles.priorityBadge}
        />

        {ticket.photos && ticket.photos.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary, marginTop: 16 }]}>
              Photos
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
              {ticket.photos.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                  <View style={styles.photoPlaceholder}>
                    <Text style={styles.photoIcon}>📷</Text>
                  </View>
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
            <Text style={[styles.noteText, { color: theme.colors.text.secondary }]}>
              Issue discovered during room cleaning
            </Text>
          </View>
        )}
      </Card>

      {ticket.status === 'new' || ticket.status === 'pending_quote' ? (
        <Button
          title="Provide Quote"
          onPress={() => {
            navigation.navigate('ProvideQuote' as never, { ticketId: ticket.id } as never);
          }}
          fullWidth
          style={styles.actionButton}
        />
      ) : null}
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
  priorityBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  photosContainer: {
    marginTop: 12,
  },
  photoContainer: {
    marginRight: 12,
  },
  photoPlaceholder: {
    width: 200,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIcon: {
    fontSize: 48,
  },
  housekeepingNote: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 12,
  },
  actionButton: {
    marginTop: 8,
  },
});

