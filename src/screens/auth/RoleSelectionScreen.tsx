import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { Button, Card } from '../../components/common';
import { useAuthStore } from '../../store';
import { UserRole } from '../../types';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const roles: { role: UserRole; title: string; description: string; icon: string }[] = [
  {
    role: 'guest',
    title: 'Guest',
    description: 'Book stays and manage your reservations',
    icon: '👤',
  },
  {
    role: 'owner',
    title: 'Owner',
    description: 'Manage investments and track ROI',
    icon: '💼',
  },
  {
    role: 'housekeeping',
    title: 'Housekeeping',
    description: 'Manage cleaning tasks and room status',
    icon: '🧹',
  },
  {
    role: 'maintenance',
    title: 'Maintenance',
    description: 'Handle maintenance requests and repairs',
    icon: '🔧',
  },
];

export const RoleSelectionScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { updateUser } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      updateUser({ role: selectedRole });
      // Navigation will be handled by RootNavigator based on role
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Select Your Role
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Choose how you'll use the app
        </Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.role}
            onPress={() => setSelectedRole(role.role)}
            activeOpacity={0.7}
          >
            <Card
              style={[
                styles.roleCard,
                selectedRole === role.role && {
                  borderColor: theme.colors.primary[500],
                  borderWidth: 2,
                  backgroundColor: theme.colors.primary[50],
                },
              ]}
            >
              <Text style={styles.icon}>{role.icon}</Text>
              <Text style={[styles.roleTitle, { color: theme.colors.text.primary }]}>
                {role.title}
              </Text>
              <Text style={[styles.roleDescription, { color: theme.colors.text.secondary }]}>
                {role.description}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={!selectedRole}
        fullWidth
        style={styles.button}
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
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  rolesContainer: {
    marginBottom: 32,
  },
  roleCard: {
    marginBottom: 16,
    alignItems: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});

