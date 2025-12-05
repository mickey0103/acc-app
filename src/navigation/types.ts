import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  RoleSelection: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  MagicLink: undefined;
  OneTimeCode: { email?: string };
};

// Guest Stack
export type GuestTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Keys: undefined;
  Services: undefined;
  Profile: undefined;
  Subscriptions?: undefined;
};

export type GuestStackParamList = {
  Tabs: NavigatorScreenParams<GuestTabParamList>;
  BookingDetail: { bookingId: string };
  ViewBooking: { bookingId: string };
  AddGuest: { bookingId: string };
  ExtendStay: { bookingId: string };
  ContactSupport: undefined;
  Notifications: undefined;
  Directions: { propertyId: string };
  ServiceRequestDetail: { requestId: string };
  SubscriptionOverview: undefined;
  SubscriptionPlanDetail: { planId: string };
  SubscriptionPreselectDates: { planId: string };
  SubscriptionPayment: { planId: string; dates: string[] };
  SubscriptionConfirmation: { subscriptionId: string };
  ManageSubscription: undefined;
  SubscriptionCalendar: undefined;
};

// Owner Stack
export type OwnerTabParamList = {
  Dashboard: undefined;
  Investments: undefined;
  Approvals: undefined;
  Marketplace: undefined;
  Profile: undefined;
};

export type OwnerStackParamList = {
  Tabs: NavigatorScreenParams<OwnerTabParamList>;
  InvestmentDetail: { investmentId: string };
  BuyROIExtras: { investmentId: string };
  BuyMarketingBoosts: { investmentId: string };
  BalancePayout: undefined;
  MarketplaceInvestmentDetail: { investmentId: string };
  Checkout: { investmentId: string; amount: number };
  PaymentConfirmation: { investmentId: string };
  ApprovalDetail: { ticketId: string };
  MaintenanceDetail: { ticketId: string };
  QuoteDetail: { quoteId: string };
  InvoiceDetail: { invoiceId: string };
};

// Maintenance Stack
export type MaintenanceTabParamList = {
  Tickets: undefined;
  JobsInProgress: undefined;
  Rooms: undefined;
  Profile: undefined;
};

export type MaintenanceStackParamList = {
  Tabs: NavigatorScreenParams<MaintenanceTabParamList>;
  TicketDetail: { ticketId: string };
  ProvideQuote: { ticketId: string };
  ApprovedJobDetail: { jobId: string };
  AccessRoom: { roomId: string };
  FixChecklist: { jobId: string };
  JobCompletion: { jobId: string };
};

// Housekeeping Stack
export type HousekeepingTabParamList = {
  Rooms: undefined;
  MaintenanceRequests: undefined;
  History: undefined;
  Profile: undefined;
};

export type HousekeepingStackParamList = {
  Tabs: NavigatorScreenParams<HousekeepingTabParamList>;
  HousekeepingDashboard: undefined;
  RoomDetail: { roomId: string };
  PreCleanPhotos: { taskId: string };
  CleaningChecklist: { taskId: string };
  MarkCleanSummary: { taskId: string };
  BondClaim: { bookingId: string };
  CreateMaintenanceRequest: { roomId: string };
  MaintenanceRequestDetail: { requestId: string };
  RoomHistoryDetail: { roomId: string };
  MasterKey: undefined;
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Guest: NavigatorScreenParams<GuestStackParamList>;
  Owner: NavigatorScreenParams<OwnerStackParamList>;
  Maintenance: NavigatorScreenParams<MaintenanceStackParamList>;
  Housekeeping: NavigatorScreenParams<HousekeepingStackParamList>;
};

