import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
  logoutButton: {
    marginTop: 16,
  },
});

