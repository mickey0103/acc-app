import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Input } from '../../components/common';
import { Guest } from '../../types';

export const AddGuestScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const { bookingId } = route.params as { bookingId: string };
  const [guests, setGuests] = useState<Guest[]>([
    { name: '', email: '', phoneNumber: '' },
  ]);
  const [splitPayment, setSplitPayment] = useState(false);
  const [extraCost, setExtraCost] = useState(0);

  const addGuest = () => {
    setGuests([...guests, { name: '', email: '', phoneNumber: '' }]);
    setExtraCost(extraCost + 50); // $50 per additional guest
  };

  const updateGuest = (index: number, field: keyof Guest, value: string) => {
    const updated = [...guests];
    updated[index] = { ...updated[index], [field]: value };
    setGuests(updated);
  };

  const removeGuest = (index: number) => {
    if (guests.length > 1) {
      const updated = guests.filter((_, i) => i !== index);
      setGuests(updated);
      setExtraCost(Math.max(0, extraCost - 50));
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card} elevated>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Add Guests
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Add additional guests to your booking
        </Text>

        {/* Guest List */}
        <View style={styles.guestsSection}>
          {guests.map((guest, index) => (
            <View key={index} style={styles.guestCard}>
              <View style={styles.guestHeader}>
                <Text style={[styles.guestNumber, { color: theme.colors.text.primary }]}>
                  Guest {index + 1}
                </Text>
                {guests.length > 1 && (
                  <TouchableOpacity onPress={() => removeGuest(index)}>
                    <Text style={[styles.removeText, { color: theme.colors.error[500] }]}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Input
                label="Name"
                placeholder="Enter guest name"
                value={guest.name}
                onChangeText={(text) => updateGuest(index, 'name', text)}
                containerStyle={styles.input}
              />
              <Input
                label="Email"
                placeholder="Enter guest email"
                value={guest.email}
                onChangeText={(text) => updateGuest(index, 'email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.input}
              />
              <Input
                label="Mobile"
                placeholder="Enter mobile number"
                value={guest.phoneNumber || ''}
                onChangeText={(text) => updateGuest(index, 'phoneNumber', text)}
                keyboardType="phone-pad"
                containerStyle={styles.input}
              />
            </View>
          ))}
        </View>

        <Button
          title="Add Another Guest"
          variant="ghost"
          onPress={addGuest}
          fullWidth
          style={styles.addButton}
        />

        {/* Extra Cost Summary */}
        {extraCost > 0 && (
          <Card style={styles.costCard}>
            <View style={styles.costRow}>
              <Text style={[styles.costLabel, { color: theme.colors.text.secondary }]}>
                Additional Guest Fee
              </Text>
              <Text style={[styles.costValue, { color: theme.colors.text.primary }]}>
                ${extraCost}
              </Text>
            </View>
          </Card>
        )}

        {/* Payment Options */}
        <View style={styles.paymentSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Payment Options
          </Text>
          <View style={styles.splitRow}>
            <Text style={[styles.splitLabel, { color: theme.colors.text.primary }]}>
              Split Payment
            </Text>
            <Switch
              value={splitPayment}
              onValueChange={setSplitPayment}
              trackColor={{ false: theme.colors.neutral[300], true: theme.colors.primary[500] }}
            />
          </View>
          {splitPayment && (
            <Button
              title="Send Payment Link"
              variant="outline"
              onPress={() => {
                // TODO: Send payment link via SMS/Email
              }}
              fullWidth
              style={styles.paymentButton}
            />
          )}
        </View>

        <Button
          title="Confirm Guests"
          onPress={() => {
            // TODO: Confirm guests
          }}
          fullWidth
          style={styles.confirmButton}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  guestsSection: {
    marginBottom: 16,
  },
  guestCard: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  guestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  guestNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  removeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    marginBottom: 16,
  },
  addButton: {
    marginBottom: 24,
  },
  costCard: {
    padding: 16,
    marginBottom: 24,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 16,
  },
  costValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  paymentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  splitLabel: {
    fontSize: 16,
  },
  paymentButton: {
    marginTop: 8,
  },
  confirmButton: {
    marginTop: 8,
  },
});

