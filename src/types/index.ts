/**
 * Type Definitions for Accommodation App
 */

export type UserRole = 'guest' | 'owner' | 'housekeeping' | 'maintenance';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  amenities: string[];
}

export interface Room {
  id: string;
  propertyId: string;
  roomNumber: string;
  name: string;
  type: 'room' | 'cabin' | 'suite';
  capacity: number;
  images: string[];
  amenities: string[];
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'offline';
  isOffline?: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  propertyId: string;
  roomId: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guests: Guest[];
  status: 'upcoming' | 'current' | 'past' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded';
  totalCost: number;
  bondAmount: number;
  bondStatus: 'pending' | 'held' | 'refunded' | 'deducted';
  charges: BookingCharge[];
  createdAt: string;
}

export interface Guest {
  id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
}

export interface BookingCharge {
  id: string;
  type: 'accommodation' | 'cleaning' | 'extra' | 'discount' | 'bond';
  description: string;
  amount: number;
  status: 'pending' | 'paid';
}

export interface DigitalKey {
  id: string;
  bookingId: string;
  roomId: string;
  userId: string;
  status: 'not_available' | 'active' | 'expired' | 'revoked';
  activatedAt?: string;
  expiresAt: string;
  accessCode?: string;
  nfcEnabled: boolean;
}

export interface ServiceRequest {
  id: string;
  bookingId?: string;
  roomId: string;
  userId: string;
  type: 'housekeeping' | 'maintenance' | 'upgrade' | 'concierge';
  category: string;
  description: string;
  priority: 'low' | 'normal' | 'urgent';
  status: 'submitted' | 'assigned' | 'in_progress' | 'resolved' | 'cancelled';
  photos?: string[];
  createdAt: string;
  resolvedAt?: string;
}

export interface MaintenanceTicket {
  id: string;
  roomId: string;
  reportedBy: string; // userId or 'housekeeping'
  issueSummary: string;
  description: string;
  priority: 'low' | 'normal' | 'urgent';
  status: 'new' | 'pending_quote' | 'approved' | 'in_progress' | 'completed';
  photos: string[];
  quote?: MaintenanceQuote;
  invoice?: MaintenanceInvoice;
  createdAt: string;
}

export interface MaintenanceQuote {
  id: string;
  ticketId: string;
  laborCost: number;
  materials: MaterialItem[];
  photos?: string[];
  notes?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface MaintenanceInvoice {
  id: string;
  ticketId: string;
  quoteId: string;
  totalCost: number;
  status: 'pending' | 'approved' | 'paid';
  createdAt: string;
}

export interface MaintenanceJob {
  id: string;
  ticketId: string;
  roomId: string;
  status: 'approved' | 'in_progress' | 'completed';
  tasks: JobTask[];
  accessKey?: DigitalKey;
  startedAt?: string;
  completedAt?: string;
}

export interface JobTask {
  id: string;
  description: string;
  completed: boolean;
  notes?: string;
  photos?: string[];
}

export interface HousekeepingTask {
  id: string;
  roomId: string;
  propertyId: string;
  status: 'dirty' | 'in_progress' | 'ready_for_inspection' | 'cleaned';
  priority: 'normal' | 'urgent' | 'late_checkout' | 'extended_stay';
  checkInTime?: string;
  checkOutTime?: string;
  preCleanPhotos?: string[];
  cleaningChecklist?: CleaningChecklistItem[];
  completedAt?: string;
}

export interface CleaningChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  photos?: string[];
}

export interface BondClaim {
  id: string;
  bookingId: string;
  type: 'property_damage' | 'broken_item' | 'excessive_mess';
  description: string;
  photos: string[];
  amount: number;
  status: 'submitted' | 'pending_approval' | 'approved' | 'rejected';
  isUrgent: boolean;
  createdAt: string;
}

export interface Investment {
  id: string;
  propertyId: string;
  name: string;
  location: string;
  images: string[];
  totalPrice: number;
  minimumBuyIn: number;
  roi: number; // Percentage
  availableUnits: number;
  features: string[];
  status: 'available' | 'limited' | 'sold_out';
}

export interface OwnerInvestment {
  id: string;
  investmentId: string;
  userId: string;
  ownershipPercentage: number;
  purchaseAmount: number;
  purchaseDate: string;
  revenue: number;
  expenses: number;
  occupancy: number; // Percentage
  status: 'active' | 'sold';
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'basic' | 'plus' | 'premium';
  nightsPerMonth: number;
  selectedDates: string[]; // ISO date strings
  status: 'active' | 'cancelled' | 'expired';
  nextBillingDate: string;
  renewalDate: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'key' | 'payment' | 'message' | 'service';
  title: string;
  message: string;
  icon?: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

