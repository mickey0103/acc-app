import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button, Input } from '../../components/common';

type ServiceCategory = 'housekeeping' | 'maintenance' | 'upgrades' | 'concierge';
type Priority = 'low' | 'normal' | 'urgent';

const housekeepingQuickRequests = [
  'New towels',
  'Make room',
  'Replace linen',
  'Extra toiletries',
];

const upgradeOptions = [
  { id: 'early_checkin', name: 'Early Check-in', price: 25 },
  { id: 'late_checkout', name: 'Late Check-out', price: 25 },
  { id: 'room_upgrade', name: 'Room Upgrade', price: 50 },
  { id: 'firewood', name: 'Firewood', price: 15 },
  { id: 'bbq_pack', name: 'BBQ Pack', price: 30 },
  { id: 'wine', name: 'Wine Selection', price: 40 },
  { id: 'breakfast', name: 'Breakfast', price: 20 },
];

const featuredQuestions = [
  'Where do I park?',
  'Can I get late checkout?',
  'Best things to do nearby?',
  'How do I use the heater?',
  'How do I unlock the cabin?',
];

export const ServicesScreenEnhanced: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [maintenanceForm, setMaintenanceForm] = useState({
    category: '',
    description: '',
    priority: 'normal' as Priority,
    photos: [] as string[],
  });
  const [housekeepingRequest, setHousekeepingRequest] = useState({
    type: '',
    notes: '',
    tip: 0,
  });
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [conciergeQuestion, setConciergeQuestion] = useState('');

  const handleMaintenanceSubmit = () => {
    // TODO: Submit maintenance request
    console.log('Maintenance request:', maintenanceForm);
  };

  const handleHousekeepingSubmit = () => {
    // TODO: Submit housekeeping request
    console.log('Housekeeping request:', housekeepingRequest);
  };

  const handleUpgradePurchase = () => {
    // TODO: Process upgrade purchase
    console.log('Upgrades:', selectedUpgrades);
  };

  const handleConciergeAsk = () => {
    // TODO: Send to AI concierge
    console.log('Question:', conciergeQuestion);
  };

  const toggleUpgrade = (id: string) => {
    setSelectedUpgrades((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const totalUpgradeCost = selectedUpgrades.reduce((sum, id) => {
    const upgrade = upgradeOptions.find((u) => u.id === id);
    return sum + (upgrade?.price || 0);
  }, 0);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Category Selection */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Select Service Type
        </Text>
        <View style={styles.categoriesGrid}>
          {[
            { id: 'housekeeping', label: 'Housekeeping', icon: '🧹' },
            { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
            { id: 'upgrades', label: 'Stay Upgrades', icon: '⭐' },
            { id: 'concierge', label: 'AI Concierge', icon: '🤖' },
          ].map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                selectedCategory === category.id && {
                  borderColor: theme.colors.primary[500],
                  borderWidth: 2,
                },
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={() => setSelectedCategory(category.id as ServiceCategory)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[styles.categoryLabel, { color: theme.colors.text.primary }]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Housekeeping Request */}
      {selectedCategory === 'housekeeping' && (
        <Card style={styles.requestCard} elevated>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Housekeeping Request
          </Text>

          <View style={styles.quickRequests}>
            <Text style={[styles.quickTitle, { color: theme.colors.text.secondary }]}>
              Quick Requests
            </Text>
            {housekeepingQuickRequests.map((request, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quickButton,
                  housekeepingRequest.type === request && {
                    backgroundColor: theme.colors.primary[500],
                  },
                  { borderColor: theme.colors.primary[500] },
                ]}
                onPress={() => setHousekeepingRequest({ ...housekeepingRequest, type: request })}
              >
                <Text
                  style={[
                    styles.quickButtonText,
                    housekeepingRequest.type === request
                      ? { color: '#FFFFFF' }
                      : { color: theme.colors.primary[500] },
                  ]}
                >
                  {request}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Notes for Staff (Optional)"
            placeholder="Add any special instructions..."
            value={housekeepingRequest.notes}
            onChangeText={(text) =>
              setHousekeepingRequest({ ...housekeepingRequest, notes: text })
            }
            multiline
            containerStyle={styles.input}
          />

          <Button
            title="Submit Request"
            onPress={handleHousekeepingSubmit}
            fullWidth
            style={styles.submitButton}
            disabled={!housekeepingRequest.type}
          />
        </Card>
      )}

      {/* Maintenance Request */}
      {selectedCategory === 'maintenance' && (
        <Card style={styles.requestCard} elevated>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Maintenance Request
          </Text>

          <Input
            label="What's broken?"
            placeholder="Describe the issue..."
            value={maintenanceForm.description}
            onChangeText={(text) =>
              setMaintenanceForm({ ...maintenanceForm, description: text })
            }
            multiline
            containerStyle={styles.input}
          />

          <View style={styles.prioritySection}>
            <Text style={[styles.priorityLabel, { color: theme.colors.text.secondary }]}>
              Urgency
            </Text>
            <View style={styles.priorityButtons}>
              {(['low', 'normal', 'urgent'] as Priority[]).map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityButton,
                    maintenanceForm.priority === priority && {
                      backgroundColor: theme.colors.primary[500],
                    },
                    { borderColor: theme.colors.primary[500] },
                  ]}
                  onPress={() => setMaintenanceForm({ ...maintenanceForm, priority })}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      maintenanceForm.priority === priority
                        ? { color: '#FFFFFF' }
                        : { color: theme.colors.primary[500] },
                    ]}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            title="Attach Photos"
            variant="outline"
            onPress={() => {
              // TODO: Open image picker
            }}
            fullWidth
            style={styles.photoButton}
          />

          <Button
            title="Submit Request"
            onPress={handleMaintenanceSubmit}
            fullWidth
            style={styles.submitButton}
            disabled={!maintenanceForm.description}
          />
        </Card>
      )}

      {/* Upgrades Store */}
      {selectedCategory === 'upgrades' && (
        <Card style={styles.requestCard} elevated>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Stay Upgrades
          </Text>
          <Text style={[styles.cardDescription, { color: theme.colors.text.secondary }]}>
            Enhance your stay with these premium options
          </Text>

          {upgradeOptions.map((upgrade) => (
            <TouchableOpacity
              key={upgrade.id}
              style={[
                styles.upgradeCard,
                selectedUpgrades.includes(upgrade.id) && {
                  borderColor: theme.colors.primary[500],
                  backgroundColor: theme.colors.primary[50],
                },
                { borderColor: theme.colors.border },
              ]}
              onPress={() => toggleUpgrade(upgrade.id)}
            >
              <View style={styles.upgradeContent}>
                <View style={styles.upgradeInfo}>
                  <Text style={[styles.upgradeName, { color: theme.colors.text.primary }]}>
                    {upgrade.name}
                  </Text>
                </View>
                <View style={styles.upgradeActions}>
                  <Text style={[styles.upgradePrice, { color: theme.colors.text.primary }]}>
                    ${upgrade.price}
                  </Text>
                  <View
                    style={[
                      styles.checkbox,
                      selectedUpgrades.includes(upgrade.id) && {
                        backgroundColor: theme.colors.primary[500],
                      },
                      { borderColor: theme.colors.primary[500] },
                    ]}
                  >
                    {selectedUpgrades.includes(upgrade.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {totalUpgradeCost > 0 && (
            <View style={styles.totalSection}>
              <Text style={[styles.totalLabel, { color: theme.colors.text.primary }]}>
                Total: ${totalUpgradeCost}
              </Text>
            </View>
          )}

          <Button
            title="Purchase Upgrades"
            onPress={handleUpgradePurchase}
            fullWidth
            style={styles.submitButton}
            disabled={selectedUpgrades.length === 0}
          />
        </Card>
      )}

      {/* AI Concierge */}
      {selectedCategory === 'concierge' && (
        <Card style={styles.requestCard} elevated>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            AI Concierge
          </Text>
          <Text style={[styles.cardDescription, { color: theme.colors.text.secondary }]}>
            Ask me anything about your stay
          </Text>

          <View style={styles.featuredQuestions}>
            {featuredQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.questionChip, { backgroundColor: theme.colors.surface }]}
                onPress={() => setConciergeQuestion(question)}
              >
                <Text style={[styles.questionText, { color: theme.colors.text.primary }]}>
                  {question}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={[
              styles.conciergeInput,
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
            onPress={handleConciergeAsk}
            fullWidth
            style={styles.submitButton}
            disabled={!conciergeQuestion.trim()}
          />
        </Card>
      )}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  requestCard: {
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
  quickRequests: {
    marginBottom: 20,
  },
  quickTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 8,
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    marginBottom: 20,
  },
  prioritySection: {
    marginBottom: 20,
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
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
  photoButton: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 8,
  },
  upgradeCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  upgradeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upgradeInfo: {
    flex: 1,
  },
  upgradeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  upgradeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  upgradePrice: {
    fontSize: 18,
    fontWeight: '700',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  totalSection: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  featuredQuestions: {
    marginBottom: 20,
  },
  questionChip: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 14,
  },
  conciergeInput: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
});

