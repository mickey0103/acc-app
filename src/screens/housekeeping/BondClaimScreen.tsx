import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Input } from '../../components/common';

type DamageType = 'property_damage' | 'broken_item' | 'excessive_mess';

export const BondClaimScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingId } = route.params as { bookingId: string };

  const [damageType, setDamageType] = useState<DamageType | ''>('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isUrgent, setIsUrgent] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');

  const damageTypes: { key: DamageType; label: string }[] = [
    { key: 'property_damage', label: 'Property Damage' },
    { key: 'broken_item', label: 'Broken Item' },
    { key: 'excessive_mess', label: 'Excessive Mess' },
  ];

  const handleSubmit = () => {
    // TODO: Submit bond claim
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card} elevated>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Trigger Bond Claim
        </Text>

        {/* Damage Type */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Damage Type
          </Text>
          {damageTypes.map((type) => (
            <TouchableOpacity
              key={type.key}
              style={[
                styles.typeOption,
                damageType === type.key && {
                  borderColor: theme.colors.primary[500],
                  backgroundColor: theme.colors.primary[50],
                },
                { borderColor: theme.colors.border },
              ]}
              onPress={() => setDamageType(type.key)}
            >
              <Text
                style={[
                  styles.typeText,
                  damageType === type.key
                    ? { color: theme.colors.primary[500] }
                    : { color: theme.colors.text.primary },
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Description */}
        <Input
          label="Describe the Issue"
          placeholder="Provide details about the damage or mess"
          value={description}
          onChangeText={setDescription}
          multiline
          containerStyle={styles.input}
        />

        {/* Claim Amount */}
        <Input
          label="Claim Amount (Optional)"
          placeholder="Enter estimated cost"
          value={claimAmount}
          onChangeText={setClaimAmount}
          keyboardType="decimal-pad"
          containerStyle={styles.input}
        />

        {/* Photo Attachments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Photo Attachments
          </Text>
          <Button
            title="Add Multiple Photos"
            variant="outline"
            onPress={() => {
              // TODO: Open image picker
            }}
            fullWidth
            style={styles.photoButton}
          />
          {photos.length > 0 && (
            <View style={styles.photosGrid}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoPlaceholder}>
                  <Text style={styles.photoIcon}>📷</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Urgent Toggle */}
        <View style={styles.urgentSection}>
          <View style={styles.urgentInfo}>
            <Text style={[styles.urgentLabel, { color: theme.colors.text.primary }]}>
              Urgent Claim
            </Text>
            <Text style={[styles.urgentDescription, { color: theme.colors.text.secondary }]}>
              Auto-notifies owner immediately
            </Text>
          </View>
          <Switch
            value={isUrgent}
            onValueChange={setIsUrgent}
            trackColor={{ false: theme.colors.neutral[300], true: theme.colors.error[500] }}
          />
        </View>

        <Button
          title="Submit Bond Claim"
          onPress={handleSubmit}
          fullWidth
          style={styles.submitButton}
          disabled={!damageType || !description}
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
  typeOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 8,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    marginBottom: 20,
  },
  photoButton: {
    marginBottom: 12,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIcon: {
    fontSize: 32,
  },
  urgentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 24,
  },
  urgentInfo: {
    flex: 1,
    marginRight: 16,
  },
  urgentLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  urgentDescription: {
    fontSize: 12,
  },
  submitButton: {
    marginTop: 8,
  },
});

