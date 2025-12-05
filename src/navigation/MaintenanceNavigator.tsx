import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaintenanceStackParamList, MaintenanceTabParamList } from './types';
import { TicketsScreenEnhanced } from '../screens/maintenance/TicketsScreenEnhanced';
import { JobsInProgressScreen } from '../screens/maintenance/JobsInProgressScreen';
import { RoomsScreenEnhanced } from '../screens/maintenance/RoomsScreenEnhanced';
import { ProfileScreen } from '../screens/maintenance/ProfileScreen';
import { TicketDetailScreen } from '../screens/maintenance/TicketDetailScreen';
import { ProvideQuoteScreen } from '../screens/maintenance/ProvideQuoteScreen';
import { ApprovedJobDetailScreen } from '../screens/maintenance/ApprovedJobDetailScreen';
import { AccessRoomScreen } from '../screens/maintenance/AccessRoomScreen';
import { FixChecklistScreen } from '../screens/maintenance/FixChecklistScreen';
import { JobCompletionScreen } from '../screens/maintenance/JobCompletionScreen';
import { useTheme } from '../theme/ThemeProvider';

const Stack = createNativeStackNavigator<MaintenanceStackParamList>();
const Tab = createBottomTabNavigator<MaintenanceTabParamList>();

const MaintenanceTabs: React.FC = () => {
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
      <Tab.Screen name="Tickets" component={TicketsScreenEnhanced} />
      <Tab.Screen name="JobsInProgress" component={JobsInProgressScreen} />
      <Tab.Screen name="Rooms" component={RoomsScreenEnhanced} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const MaintenanceNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Tabs" component={MaintenanceTabs} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
      <Stack.Screen name="ProvideQuote" component={ProvideQuoteScreen} />
      <Stack.Screen name="ApprovedJobDetail" component={ApprovedJobDetailScreen} />
      <Stack.Screen name="AccessRoom" component={AccessRoomScreen} />
      <Stack.Screen name="FixChecklist" component={FixChecklistScreen} />
      <Stack.Screen name="JobCompletion" component={JobCompletionScreen} />
    </Stack.Navigator>
  );
};

