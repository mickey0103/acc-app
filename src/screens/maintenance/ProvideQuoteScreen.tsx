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
import { MaterialItem } from '../../types';

export const ProvideQuoteScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { ticketId } = route.params as { ticketId: string };

  const [laborCost, setLaborCost] = useState('');
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [notes, setNotes] = useState('');
  const [newMaterial, setNewMaterial] = useState({ name: '', price: '', quantity: '1' });

  const addMaterial = () => {
    if (newMaterial.name && newMaterial.price) {
      setMaterials([
        ...materials,
        {
          id: Date.now().toString(),
          name: newMaterial.name,
          price: parseFloat(newMaterial.price),
          quantity: parseInt(newMaterial.quantity) || 1,
        },
      ]);
      setNewMaterial({ name: '', price: '', quantity: '1' });
    }
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const totalMaterialsCost = materials.reduce((sum, m) => sum + m.price * m.quantity, 0);
  const totalCost = (parseFloat(laborCost) || 0) + totalMaterialsCost;

  const handleSubmit = () => {
    // TODO: Submit quote
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card} elevated>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Provide Quote
        </Text>

        {/* Labor Cost */}
        <Input
          label="Labor Cost"
          placeholder="Enter labor cost"
          value={laborCost}
          onChangeText={setLaborCost}
          keyboardType="decimal-pad"
          containerStyle={styles.input}
        />

        {/* Materials */}
        <View style={styles.materialsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Materials
          </Text>
          {materials.map((material) => (
            <Card key={material.id} style={styles.materialCard} elevated>
              <View style={styles.materialRow}>
                <View style={styles.materialInfo}>
                  <Text style={[styles.materialName, { color: theme.colors.text.primary }]}>
                    {material.name}
                  </Text>
                  <Text style={[styles.materialDetails, { color: theme.colors.text.secondary }]}>
                    ${material.price} × {material.quantity} = ${(material.price * material.quantity).toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeMaterial(material.id)}>
                  <Text style={[styles.removeText, { color: theme.colors.error[500] }]}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}

          <Card style={styles.addMaterialCard} elevated>
            <Input
              label="Item Name"
              placeholder="Enter item name"
              value={newMaterial.name}
              onChangeText={(text) => setNewMaterial({ ...newMaterial, name: text })}
              containerStyle={styles.input}
            />
            <View style={styles.materialInputRow}>
              <Input
                label="Price"
                placeholder="0.00"
                value={newMaterial.price}
                onChangeText={(text) => setNewMaterial({ ...newMaterial, price: text })}
                keyboardType="decimal-pad"
                containerStyle={[styles.input, styles.halfInput]}
              />
              <Input
                label="Quantity"
                placeholder="1"
                value={newMaterial.quantity}
                onChangeText={(text) => setNewMaterial({ ...newMaterial, quantity: text })}
                keyboardType="number-pad"
                containerStyle={[styles.input, styles.halfInput]}
              />
            </View>
            <Button
              title="Add Item"
              variant="outline"
              onPress={addMaterial}
              fullWidth
              style={styles.addButton}
            />
          </Card>
        </View>

        {/* Upload Photos */}
        <Button
          title="Upload Photos of Materials/Damage"
          variant="outline"
          onPress={() => {
            // TODO: Open image picker
          }}
          fullWidth
          style={styles.photoButton}
        />

        {/* Notes */}
        <Input
          label="Notes (Optional)"
          placeholder="Add any additional notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          containerStyle={styles.input}
        />

        {/* Total Cost */}
        {totalCost > 0 && (
          <Card style={styles.totalCard} elevated>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: theme.colors.text.primary }]}>
                Total Quote
              </Text>
              <Text style={[styles.totalValue, { color: theme.colors.text.primary }]}>
                ${totalCost.toFixed(2)}
              </Text>
            </View>
          </Card>
        )}

        <Button
          title="Submit Quote"
          onPress={handleSubmit}
          fullWidth
          style={styles.submitButton}
          disabled={!laborCost || totalCost === 0}
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
  input: {
    marginBottom: 20,
  },
  materialsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  materialCard: {
    padding: 16,
    marginBottom: 12,
  },
  materialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  materialInfo: {
    flex: 1,
  },
  materialName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  materialDetails: {
    fontSize: 14,
  },
  removeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addMaterialCard: {
    padding: 16,
    marginTop: 12,
  },
  materialInputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  addButton: {
    marginTop: 8,
  },
  photoButton: {
    marginBottom: 20,
  },
  totalCard: {
    padding: 20,
    marginBottom: 24,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  submitButton: {
    marginTop: 8,
  },
});

