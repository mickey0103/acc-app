import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OwnerStackParamList, OwnerTabParamList } from './types';
import { DashboardScreen } from '../screens/owner/DashboardScreen';
import { InvestmentsScreen } from '../screens/owner/InvestmentsScreen';
import { ApprovalsScreen } from '../screens/owner/ApprovalsScreen';
import { MarketplaceScreen } from '../screens/owner/MarketplaceScreen';
import { MarketplaceScreenEnhanced } from '../screens/owner/MarketplaceScreenEnhanced';
import { ProfileScreen } from '../screens/owner/ProfileScreen';
import { BalancePayoutScreen } from '../screens/owner/BalancePayoutScreen';
import { InvestmentDetailScreen } from '../screens/owner/InvestmentDetailScreen';
import { BuyROIExtrasScreen } from '../screens/owner/BuyROIExtrasScreen';
import { BuyMarketingBoostsScreen } from '../screens/owner/BuyMarketingBoostsScreen';
import { ApprovalDetailScreen } from '../screens/owner/ApprovalDetailScreen';
import { MarketplaceInvestmentDetailScreen } from '../screens/owner/MarketplaceInvestmentDetailScreen';
import { CheckoutScreen } from '../screens/owner/CheckoutScreen';
import { PaymentConfirmationScreen } from '../screens/owner/PaymentConfirmationScreen';
import { useTheme } from '../theme/ThemeProvider';

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

