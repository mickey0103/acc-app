import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button } from '../../components/common';
import { useBookingStore } from '../../store';
import { mockBookings, mockProperties, mockDigitalKeys } from '../../data/mockData';
import * as Calendar from 'expo-calendar';

type DetailTab = 'overview' | 'keys' | 'charges' | 'bond' | 'concierge';

export const BookingDetailScreenEnhanced: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingId } = route.params as { bookingId: string };
  const { bookings } = useBookingStore();
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [conciergeQuestion, setConciergeQuestion] = useState('');

  const booking = bookings.find((b) => b.id === bookingId) || mockBookings[0];
  const property = mockProperties.find((p) => p.id === booking.propertyId);
  const digitalKey = mockDigitalKeys.find((k) => k.bookingId === bookingId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleAddToCalendar = async () => {
    try {
      // TODO: Implement calendar sync
      // const calendars = await Calendar.getCalendarsAsync();
      // await Calendar.createEventAsync(calendars[0].id, {
      //   title: `Stay at ${property?.name}`,
      //   startDate: new Date(booking.checkIn),
      //   endDate: new Date(booking.checkOut),
      // });
    } catch (error) {
      console.error('Calendar error:', error);
    }
  };

  const handleAddToWallet = (platform: 'apple' | 'google') => {
    // TODO: Implement wallet integration
    console.log(`Add to ${platform} wallet`);
  };

  const handleDirections = () => {
    if (property?.latitude && property?.longitude) {
      const url = `https://maps.google.com/?q=${property.latitude},${property.longitude}`;
      Linking.openURL(url);
    }
  };

  const handleConciergeSubmit = () => {
    // TODO: Implement AI concierge
    console.log('Question:', conciergeQuestion);
  };

  const renderOverview = () => (
    <View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Dates</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Check-in</Text>
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>
            {formatDate(booking.checkIn)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Check-out</Text>
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>
            {formatDate(booking.checkOut)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Guests</Text>
        {booking.guests.map((guest, index) => (
          <View key={index} style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
              Guest {index + 1}
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary }]}>
              {guest.name} {guest.email && `(${guest.email})`}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Room Info</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Property</Text>
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>
            {property?.name || 'Property'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Room</Text>
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>
            Room {booking.roomId}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Payment Status
        </Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Status</Text>
          <Badge
            label={booking.paymentStatus.toUpperCase()}
            variant={booking.paymentStatus === 'paid' ? 'success' : 'warning'}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Bond</Text>
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>
            ${booking.bondAmount} ({booking.bondStatus})
          </Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Button
          title="Add to Calendar"
          variant="outline"
          onPress={handleAddToCalendar}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="Get Directions"
          variant="outline"
          onPress={handleDirections}
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="Modify Booking"
          variant="outline"
          onPress={() => {
            // TODO: Navigate to modify booking
          }}
          fullWidth
          style={styles.actionButton}
        />
      </View>
    </View>
  );

  const renderKeys = () => (
    <View>
      {digitalKey ? (
        <Card style={styles.keyCard} elevated>
          <View style={styles.keyHeader}>
            <View>
              <Text style={[styles.keyTitle, { color: theme.colors.text.primary }]}>
                Room {booking.roomId}
              </Text>
              <Text style={[styles.keyStatus, { color: theme.colors.text.secondary }]}>
                {digitalKey.status === 'active'
                  ? `Active until ${formatDate(digitalKey.expiresAt)}`
                  : digitalKey.status === 'not_available'
                  ? `Available at ${formatDate(digitalKey.expiresAt)}`
                  : 'Expired'}
              </Text>
            </View>
            <Badge
              label={digitalKey.status.replace('_', ' ').toUpperCase()}
              variant={
                digitalKey.status === 'active'
                  ? 'success'
                  : digitalKey.status === 'not_available'
                  ? 'warning'
                  : 'error'
              }
            />
          </View>

          {digitalKey.status === 'active' && (
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
          )}
        </Card>
      ) : (
        <Card style={styles.emptyCard}>
          <Text style={[styles.emptyText, { color: theme.colors.text.tertiary }]}>
            No digital keys available
          </Text>
        </Card>
      )}
    </View>
  );

  const renderCharges = () => (
    <View>
      <View style={styles.section}>
        {booking.charges.map((charge) => (
          <View key={charge.id} style={styles.chargeRow}>
            <View>
              <Text style={[styles.chargeLabel, { color: theme.colors.text.primary }]}>
                {charge.description}
              </Text>
              <Text style={[styles.chargeType, { color: theme.colors.text.secondary }]}>
                {charge.type}
              </Text>
            </View>
            <View style={styles.chargeAmountContainer}>
              <Text style={[styles.chargeAmount, { color: theme.colors.text.primary }]}>
                ${charge.amount}
              </Text>
              <Badge
                label={charge.status.toUpperCase()}
                variant={charge.status === 'paid' ? 'success' : 'warning'}
                size="small"
              />
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.totalRow, { borderTopColor: theme.colors.border }]}>
        <Text style={[styles.totalLabel, { color: theme.colors.text.primary }]}>Total</Text>
        <Text style={[styles.totalAmount, { color: theme.colors.text.primary }]}>
          ${booking.totalCost}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Bond Information
        </Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Bond Amount</Text>
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>
            ${booking.bondAmount}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Status</Text>
          <Badge
            label={booking.bondStatus.toUpperCase()}
            variant={
              booking.bondStatus === 'refunded'
                ? 'success'
                : booking.bondStatus === 'deducted'
                ? 'error'
                : 'warning'
            }
          />
        </View>
      </View>
    </View>
  );

  const renderBond = () => (
    <View>
      <Card style={styles.bondCard} elevated>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Bond Amount</Text>
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>
            ${booking.bondAmount}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
            Pre-auth Status
          </Text>
          <Badge
            label={booking.bondStatus === 'held' ? 'HELD' : booking.bondStatus.toUpperCase()}
            variant={booking.bondStatus === 'held' ? 'warning' : 'success'}
          />
        </View>
      </Card>

      {booking.bondStatus === 'deducted' && (
        <Card style={styles.bondCard} elevated>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Deduction Reasons
          </Text>
          <Text style={[styles.deductionText, { color: theme.colors.text.secondary }]}>
            Property damage reported by housekeeping
          </Text>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary, marginTop: 16 }]}>
            Photos
          </Text>
          <View style={styles.photoGrid}>
            {/* TODO: Display photos from housekeeping */}
            <Text style={[styles.photoPlaceholder, { color: theme.colors.text.tertiary }]}>
              No photos available
            </Text>
          </View>
          <Button
            title="Dispute Bond Deduction"
            variant="outline"
            onPress={() => {
              // TODO: Navigate to dispute
            }}
            fullWidth
            style={styles.disputeButton}
          />
        </Card>
      )}
    </View>
  );

  const renderConcierge = () => (
    <View>
      <Card style={styles.conciergeCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          AI Concierge
        </Text>
        <Text style={[styles.conciergeDescription, { color: theme.colors.text.secondary }]}>
          Ask me anything about your stay
        </Text>

        <View style={styles.questionInput}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.text.primary,
                borderColor: theme.colors.border,
              },
            ]}
            placeholder="Ask a question..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={conciergeQuestion}
            onChangeText={setConciergeQuestion}
            multiline
          />
          <Button
            title="Ask"
            onPress={handleConciergeSubmit}
            disabled={!conciergeQuestion.trim()}
            style={styles.askButton}
          />
        </View>

        <View style={styles.featuredQuestions}>
          <Text style={[styles.featuredTitle, { color: theme.colors.text.primary }]}>
            Popular Questions
          </Text>
          {['Where do I park?', 'Can I get late checkout?', 'Best things to do nearby?'].map(
            (question, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.questionChip, { backgroundColor: theme.colors.surface }]}
                onPress={() => setConciergeQuestion(question)}
              >
                <Text style={[styles.questionChipText, { color: theme.colors.text.primary }]}>
                  {question}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </Card>
    </View>
  );

  const tabs: { key: DetailTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'keys', label: 'Keys' },
    { key: 'charges', label: 'Charges' },
    { key: 'bond', label: 'Bond' },
    { key: 'concierge', label: 'AI Concierge' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.tabsContainer, { backgroundColor: theme.colors.surface }]}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && {
                backgroundColor: theme.colors.primary[500],
              },
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key
                  ? { color: '#FFFFFF' }
                  : { color: theme.colors.text.secondary },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'keys' && renderKeys()}
        {activeTab === 'charges' && renderCharges()}
        {activeTab === 'bond' && renderBond()}
        {activeTab === 'concierge' && renderConcierge()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  section: {
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
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionsSection: {
    marginTop: 8,
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
  keyCard: {
    padding: 20,
  },
  keyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  keyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  keyStatus: {
    fontSize: 14,
  },
  walletButtons: {
    gap: 12,
  },
  walletButton: {
    marginBottom: 0,
  },
  emptyCard: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  chargeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  chargeType: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  chargeAmountContainer: {
    alignItems: 'flex-end',
  },
  chargeAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 2,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
  },
  bondCard: {
    padding: 20,
    marginBottom: 16,
  },
  deductionText: {
    fontSize: 14,
    marginTop: 8,
  },
  photoGrid: {
    marginTop: 12,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholder: {
    fontSize: 14,
  },
  disputeButton: {
    marginTop: 16,
  },
  conciergeCard: {
    padding: 20,
  },
  conciergeDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  questionInput: {
    marginBottom: 20,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  askButton: {
    marginTop: 0,
  },
  featuredQuestions: {
    marginTop: 8,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  questionChip: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  questionChipText: {
    fontSize: 14,
  },
});

