import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Input } from '../../components/common';
import { useAuthStore } from '../../store';

export const ProfileScreenEnhanced: React.FC = () => {
  const { theme } = useTheme();
  const { user, updateUser, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    bookings: true,
    keys: true,
    payments: true,
    messages: true,
    marketing: false,
  });
  const [paymentMethods] = useState([
    { id: '1', type: 'card', last4: '1234', brand: 'Visa', expiry: '12/25' },
  ]);

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const handleAddPayment = () => {
    // TODO: Navigate to add payment method
    Alert.alert('Add Payment Method', 'This will open payment method form');
  };

  const handleRemovePayment = (id: string) => {
    Alert.alert('Remove Payment', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          // TODO: Remove payment method
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Quick View */}
      <Card style={styles.profileCard} elevated>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary[500] }]}>
            <Text style={styles.avatarText}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.editAvatarButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => {
              // TODO: Open image picker
            }}
          >
            <Text style={styles.editAvatarIcon}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.name, { color: theme.colors.text.primary }]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={[styles.email, { color: theme.colors.text.secondary }]}>
          {user?.email}
        </Text>
        <Text style={[styles.role, { color: theme.colors.text.tertiary }]}>
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
        </Text>
        {user?.phoneNumber && (
          <Text style={[styles.phone, { color: theme.colors.text.secondary }]}>
            {user.phoneNumber}
          </Text>
        )}
      </Card>

      {/* Edit Profile */}
      <Card style={styles.sectionCard} elevated>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Personal Information
          </Text>
          {!isEditing ? (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={[styles.editButton, { color: theme.colors.primary[500] }]}>
                Edit
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSave}>
              <Text style={[styles.saveButton, { color: theme.colors.primary[500] }]}>
                Save
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          <View style={styles.editForm}>
            <Input
              label="First Name"
              value={editData.firstName}
              onChangeText={(text) => setEditData({ ...editData, firstName: text })}
              containerStyle={styles.input}
            />
            <Input
              label="Last Name"
              value={editData.lastName}
              onChangeText={(text) => setEditData({ ...editData, lastName: text })}
              containerStyle={styles.input}
            />
            <Input
              label="Phone Number"
              value={editData.phoneNumber}
              onChangeText={(text) => setEditData({ ...editData, phoneNumber: text })}
              keyboardType="phone-pad"
              containerStyle={styles.input}
            />
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => {
                setIsEditing(false);
                setEditData({
                  firstName: user?.firstName || '',
                  lastName: user?.lastName || '',
                  phoneNumber: user?.phoneNumber || '',
                });
              }}
              fullWidth
              style={styles.cancelButton}
            />
          </View>
        ) : (
          <View style={styles.infoView}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>
                First Name
              </Text>
              <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
                {user?.firstName}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>
                Last Name
              </Text>
              <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
                {user?.lastName}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>
                Phone Number
              </Text>
              <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
                {user?.phoneNumber || 'Not set'}
              </Text>
            </View>
          </View>
        )}
      </Card>

      {/* Payment Methods */}
      <Card style={styles.sectionCard} elevated>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Payment Methods
          </Text>
          <TouchableOpacity onPress={handleAddPayment}>
            <Text style={[styles.addButton, { color: theme.colors.primary[500] }]}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {paymentMethods.length === 0 ? (
          <View style={styles.emptyPayment}>
            <Text style={[styles.emptyText, { color: theme.colors.text.tertiary }]}>
              No payment methods added
            </Text>
            <Button
              title="Add Payment Method"
              variant="outline"
              onPress={handleAddPayment}
              fullWidth
              style={styles.addPaymentButton}
            />
          </View>
        ) : (
          paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentMethod}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentIcon}>💳</Text>
                <View>
                  <Text style={[styles.paymentBrand, { color: theme.colors.text.primary }]}>
                    {method.brand} •••• {method.last4}
                  </Text>
                  <Text style={[styles.paymentExpiry, { color: theme.colors.text.secondary }]}>
                    Expires {method.expiry}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleRemovePayment(method.id)}>
                <Text style={[styles.removeText, { color: theme.colors.error[500] }]}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </Card>

      {/* Notification Preferences */}
      <Card style={styles.sectionCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Notification Preferences
        </Text>
        {Object.entries(notificationSettings).map(([key, value]) => (
          <View key={key} style={styles.notificationRow}>
            <View style={styles.notificationInfo}>
              <Text style={[styles.notificationLabel, { color: theme.colors.text.primary }]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <Text style={[styles.notificationDescription, { color: theme.colors.text.secondary }]}>
                Receive notifications for {key}
              </Text>
            </View>
            <Switch
              value={value}
              onValueChange={(newValue) =>
                setNotificationSettings({ ...notificationSettings, [key]: newValue })
              }
              trackColor={{ false: theme.colors.neutral[300], true: theme.colors.primary[500] }}
            />
          </View>
        ))}
      </Card>

      {/* Logout */}
      <Button
        title="Sign Out"
        variant="outline"
        onPress={logout}
        fullWidth
        style={styles.logoutButton}
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
  profileCard: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editAvatarIcon: {
    fontSize: 18,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
  },
  sectionCard: {
    padding: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  editButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  editForm: {
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  cancelButton: {
    marginTop: 8,
  },
  infoView: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyPayment: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    marginBottom: 16,
  },
  addPaymentButton: {
    marginTop: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentBrand: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentExpiry: {
    fontSize: 12,
  },
  removeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  notificationInfo: {
    flex: 1,
    marginRight: 16,
  },
  notificationLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 12,
  },
  logoutButton: {
    marginTop: 16,
  },
});

