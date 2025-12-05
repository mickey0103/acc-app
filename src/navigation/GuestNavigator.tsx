import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GuestStackParamList, GuestTabParamList } from './types';
import {
  HomeScreen,
  BookingsScreen,
  KeysScreen,
  ServicesScreen,
  ProfileScreen,
  BookingDetailScreen,
  ViewBookingScreen,
  AddGuestScreen,
  ExtendStayScreen,
  ContactSupportScreen,
  NotificationsScreen,
  SubscriptionOverviewScreen,
  SubscriptionPlanDetailScreen,
  SubscriptionPreselectDatesScreen,
  SubscriptionPaymentScreen,
  SubscriptionConfirmationScreen,
  ManageSubscriptionScreen,
  SubscriptionCalendarScreen,
} from '../screens/guest';
import { useTheme } from '../theme/ThemeProvider';

const Stack = createNativeStackNavigator<GuestStackParamList>();
const Tab = createBottomTabNavigator<GuestTabParamList>();

const GuestTabs: React.FC = () => {
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Keys" component={KeysScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const GuestNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Tabs" component={GuestTabs} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
      <Stack.Screen name="ViewBooking" component={ViewBookingScreen} />
      <Stack.Screen name="AddGuest" component={AddGuestScreen} />
      <Stack.Screen name="ExtendStay" component={ExtendStayScreen} />
      <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="SubscriptionOverview" component={SubscriptionOverviewScreen} />
      <Stack.Screen name="SubscriptionPlanDetail" component={SubscriptionPlanDetailScreen} />
      <Stack.Screen name="SubscriptionPreselectDates" component={SubscriptionPreselectDatesScreen} />
      <Stack.Screen name="SubscriptionPayment" component={SubscriptionPaymentScreen} />
      <Stack.Screen name="SubscriptionConfirmation" component={SubscriptionConfirmationScreen} />
      <Stack.Screen name="ManageSubscription" component={ManageSubscriptionScreen} />
      <Stack.Screen name="SubscriptionCalendar" component={SubscriptionCalendarScreen} />
    </Stack.Navigator>
  );
};

