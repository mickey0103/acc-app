import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button } from '../../components/common';
import { useAuthStore } from '../../store';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuthStore();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary[500] }]}>
          <Text style={styles.avatarText}>
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Text>
        </View>
        <Text style={[styles.name, { color: theme.colors.text.primary }]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={[styles.email, { color: theme.colors.text.secondary }]}>
          {user?.email}
        </Text>
      </View>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Account Settings
        </Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuLabel, { color: theme.colors.text.primary }]}>
            Edit Profile
          </Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuLabel, { color: theme.colors.text.primary }]}>
            Payment Methods
          </Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuLabel, { color: theme.colors.text.primary }]}>
            Notification Preferences
          </Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </Card>

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
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuLabel: {
    fontSize: 16,
  },
  menuArrow: {
    fontSize: 24,
    color: '#A3A3A3',
  },
  logoutButton: {
    marginTop: 16,
  },
});

