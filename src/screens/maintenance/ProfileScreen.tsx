import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Button } from '../../components/common';
import { useAuthStore } from '../../store';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuthStore();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>Profile</Text>
      <Button title="Sign Out" variant="outline" onPress={logout} fullWidth />
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
});

