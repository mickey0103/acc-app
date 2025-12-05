import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OwnerStackParamList, OwnerTabParamList } from './types';
import {
  DashboardScreen,
  InvestmentsScreen,
  ApprovalsScreen,
  MarketplaceScreen,
  ProfileScreen,
  BalancePayoutScreen,
  InvestmentDetailScreen,
  BuyROIExtrasScreen,
  BuyMarketingBoostsScreen,
  ApprovalDetailScreen,
  MarketplaceInvestmentDetailScreen,
  CheckoutScreen,
  PaymentConfirmationScreen,
} from '../screens/owner';
import { useTheme } from '../theme/ThemeProvider';
import { MarketplaceScreenEnhanced } from '@/screens/owner/MarketplaceScreenEnhanced';

const Stack = createNativeStackNavigator<OwnerStackParamList>();
const Tab = createBottomTabNavigator<OwnerTabParamList>();

const OwnerTabs: React.FC = () => {
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Investments" component={InvestmentsScreen} />
      <Tab.Screen name="Approvals" component={ApprovalsScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreenEnhanced} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const OwnerNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Tabs" component={OwnerTabs} />
      <Stack.Screen name="BalancePayout" component={BalancePayoutScreen} />
      <Stack.Screen name="InvestmentDetail" component={InvestmentDetailScreen} />
      <Stack.Screen name="BuyROIExtras" component={BuyROIExtrasScreen} />
      <Stack.Screen name="BuyMarketingBoosts" component={BuyMarketingBoostsScreen} />
      <Stack.Screen name="ApprovalDetail" component={ApprovalDetailScreen} />
      <Stack.Screen name="MarketplaceInvestmentDetail" component={MarketplaceInvestmentDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
    </Stack.Navigator>
  );
};

