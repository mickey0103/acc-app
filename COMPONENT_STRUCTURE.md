# Component Structure Documentation

## 📁 Organized Screen Structure

All screens have been restructured for better maintainability and organization.

## 🎯 Structure Principles

1. **Tab Screens**: Remain in the main folder (e.g., `src/screens/guest/HomeScreen.tsx`)
2. **Feature Screens**: Organized into feature folders (e.g., `src/screens/guest/booking/`)
3. **Index Files**: Each role folder has an `index.ts` for clean imports
4. **Re-exports**: Feature screens re-export from original locations for backward compatibility

## 📂 Guest Screens Structure

```
src/screens/guest/
├── HomeScreen.tsx                    # Tab Screen
├── BookingsScreen.tsx                # Tab Screen
├── KeysScreenEnhanced.tsx           # Tab Screen (exported as KeysScreen)
├── ServicesScreenEnhanced.tsx       # Tab Screen (exported as ServicesScreen)
├── ProfileScreenEnhanced.tsx        # Tab Screen (exported as ProfileScreen)
├── ContactSupportScreen.tsx          # Feature Screen
├── NotificationsScreen.tsx           # Feature Screen
├── booking/                         # Booking Feature Screens
│   ├── BookingDetailScreen.tsx
│   ├── ViewBookingScreen.tsx
│   ├── AddGuestScreen.tsx
│   └── ExtendStayScreen.tsx
├── subscription/                     # Subscription Feature Screens
│   ├── SubscriptionOverviewScreen.tsx
│   ├── SubscriptionPlanDetailScreen.tsx
│   ├── SubscriptionPreselectDatesScreen.tsx
│   ├── SubscriptionPaymentScreen.tsx
│   ├── SubscriptionConfirmationScreen.tsx
│   ├── ManageSubscriptionScreen.tsx
│   └── SubscriptionCalendarScreen.tsx
└── index.ts                          # Centralized exports
```

## 📂 Owner Screens Structure

```
src/screens/owner/
├── DashboardScreen.tsx               # Tab Screen
├── InvestmentsScreen.tsx             # Tab Screen
├── ApprovalsScreen.tsx               # Tab Screen
├── MarketplaceScreenEnhanced.tsx     # Tab Screen (exported as MarketplaceScreen)
├── ProfileScreen.tsx                  # Tab Screen
├── BalancePayoutScreen.tsx           # Feature Screen
├── investment/                       # Investment Feature Screens
│   ├── InvestmentDetailScreen.tsx
│   ├── BuyROIExtrasScreen.tsx
│   └── BuyMarketingBoostsScreen.tsx
├── marketplace/                      # Marketplace Feature Screens
│   ├── MarketplaceInvestmentDetailScreen.tsx
│   ├── CheckoutScreen.tsx
│   └── PaymentConfirmationScreen.tsx
├── approval/                         # Approval Feature Screens
│   └── ApprovalDetailScreen.tsx
└── index.ts                          # Centralized exports
```

## 📂 Maintenance Screens Structure

```
src/screens/maintenance/
├── TicketsScreenEnhanced.tsx         # Tab Screen (exported as TicketsScreen)
├── JobsInProgressScreen.tsx          # Tab Screen
├── RoomsScreenEnhanced.tsx           # Tab Screen (exported as RoomsScreen)
├── ProfileScreen.tsx                  # Tab Screen
├── ticket/                           # Ticket Feature Screens
│   ├── TicketDetailScreen.tsx
│   └── ProvideQuoteScreen.tsx
├── job/                              # Job Feature Screens
│   ├── ApprovedJobDetailScreen.tsx
│   ├── AccessRoomScreen.tsx
│   ├── FixChecklistScreen.tsx
│   └── JobCompletionScreen.tsx
└── index.ts                          # Centralized exports
```

## 📂 Housekeeping Screens Structure

```
src/screens/housekeeping/
├── HousekeepingDashboardScreen.tsx  # Tab Screen (exported as RoomsScreen)
├── MaintenanceRequestsScreen.tsx     # Tab Screen
├── HistoryScreen.tsx                 # Tab Screen
├── ProfileScreen.tsx                 # Tab Screen
├── MasterKeyScreen.tsx               # Feature Screen
├── BondClaimScreen.tsx               # Feature Screen
├── CreateMaintenanceRequestScreen.tsx # Feature Screen
├── cleaning/                          # Cleaning Feature Screens
│   ├── PreCleanPhotosScreen.tsx
│   ├── CleaningChecklistScreen.tsx
│   └── MarkCleanSummaryScreen.tsx
└── index.ts                          # Centralized exports
```

## 🔄 Import Pattern

### Before (Scattered Imports)
```typescript
import { HomeScreen } from '../screens/guest/HomeScreen';
import { BookingDetailScreen } from '../screens/guest/BookingDetailScreenEnhanced';
import { SubscriptionOverviewScreen } from '../screens/guest/SubscriptionOverviewScreen';
// ... many more imports
```

### After (Centralized Imports)
```typescript
import {
  HomeScreen,
  BookingDetailScreen,
  SubscriptionOverviewScreen,
  // ... all screens from one import
} from '../screens/guest';
```

## ✅ Benefits

1. **Better Organization**: Related screens grouped together
2. **Cleaner Imports**: Single import statement per role
3. **Easier Navigation**: Clear folder structure
4. **Maintainability**: Easy to find and update screens
5. **Scalability**: Easy to add new feature screens
6. **Backward Compatible**: Original files still exist, re-exported through index

## 📝 Navigation Updates

All navigators have been updated to use the new centralized imports:

- ✅ `GuestNavigator.tsx` - Uses `../screens/guest`
- ✅ `OwnerNavigator.tsx` - Uses `../screens/owner`
- ✅ `MaintenanceNavigator.tsx` - Uses `../screens/maintenance`
- ✅ `HousekeepingNavigator.tsx` - Uses `../screens/housekeeping`

## 🎯 Tab Screens vs Feature Screens

### Tab Screens (Main Folder)
- Directly accessible from bottom tab navigation
- Main entry points for each role
- Examples: `HomeScreen`, `BookingsScreen`, `DashboardScreen`

### Feature Screens (Subfolders)
- Accessed via navigation from tab screens
- Related to specific features or workflows
- Examples: `booking/AddGuestScreen`, `subscription/SubscriptionPaymentScreen`

## 🔧 File Organization Rules

1. **Tab screens** → Main folder (`src/screens/{role}/`)
2. **Feature screens** → Feature folders (`src/screens/{role}/{feature}/`)
3. **Index file** → Exports all screens (`src/screens/{role}/index.ts`)
4. **Re-exports** → Feature folders re-export from original locations

## 📦 Example: Adding a New Feature Screen

### Guest - New Payment Feature
1. Create folder: `src/screens/guest/payment/`
2. Add screen: `src/screens/guest/payment/PaymentMethodScreen.tsx`
3. Export in: `src/screens/guest/payment/index.ts`
4. Add to: `src/screens/guest/index.ts`
5. Use in navigator: `import { PaymentMethodScreen } from '../screens/guest'`

This structure makes the codebase more maintainable and scalable!

