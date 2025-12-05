import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HousekeepingStackParamList, HousekeepingTabParamList } from './types';
import {
  RoomsScreen,
  MaintenanceRequestsScreen,
  HistoryScreen,
  ProfileScreen,
  MasterKeyScreen,
  PreCleanPhotosScreen,
  CleaningChecklistScreen,
  MarkCleanSummaryScreen,
  BondClaimScreen,
  CreateMaintenanceRequestScreen,
} from '../screens/housekeeping';
import { useTheme } from '../theme/ThemeProvider';

const Stack = createNativeStackNavigator<HousekeepingStackParamList>();
const Tab = createBottomTabNavigator<HousekeepingTabParamList>();

const HousekeepingTabs: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tab.Screen name="Rooms" component={RoomsScreen} />
      <Tab.Screen name="MaintenanceRequests" component={MaintenanceRequestsScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const HousekeepingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Tabs" component={HousekeepingTabs} />
      <Stack.Screen name="MasterKey" component={MasterKeyScreen} />
      <Stack.Screen name="PreCleanPhotos" component={PreCleanPhotosScreen} />
      <Stack.Screen name="CleaningChecklist" component={CleaningChecklistScreen} />
      <Stack.Screen name="MarkCleanSummary" component={MarkCleanSummaryScreen} />
      <Stack.Screen name="BondClaim" component={BondClaimScreen} />
      <Stack.Screen name="CreateMaintenanceRequest" component={CreateMaintenanceRequestScreen} />
    </Stack.Navigator>
  );
};

