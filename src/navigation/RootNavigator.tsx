import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { GuestNavigator } from './GuestNavigator';
import { OwnerNavigator } from './OwnerNavigator';
import { MaintenanceNavigator } from './MaintenanceNavigator';
import { HousekeepingNavigator } from './HousekeepingNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  const getInitialRoute = () => {
    if (!isAuthenticated || !user) {
      return 'Auth';
    }

    switch (user.role) {
      case 'guest':
        return 'Guest';
      case 'owner':
        return 'Owner';
      case 'maintenance':
        return 'Maintenance';
      case 'housekeeping':
        return 'Housekeeping';
      default:
        return 'Auth';
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRoute()}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Guest" component={GuestNavigator} />
        <Stack.Screen name="Owner" component={OwnerNavigator} />
        <Stack.Screen name="Maintenance" component={MaintenanceNavigator} />
        <Stack.Screen name="Housekeeping" component={HousekeepingNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

