/**
 * Mock Data for Development and Testing
 */

import {
  User,
  Booking,
  Property,
  Room,
  DigitalKey,
  ServiceRequest,
  Investment,
  OwnerInvestment,
  MaintenanceTicket,
  HousekeepingTask,
  Notification,
  Subscription,
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'guest@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'guest',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'owner@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1234567891',
    role: 'owner',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Mountain View Resort',
    address: '123 Mountain Road',
    city: 'Aspen',
    state: 'CO',
    zipCode: '81611',
    country: 'USA',
    latitude: 39.1911,
    longitude: -106.8175,
    images: ['https://picsum.photos/800/600?random=1'],
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Hot Tub', 'Fireplace'],
  },
  {
    id: '2',
    name: 'Beachside Cabins',
    address: '456 Ocean Drive',
    city: 'Malibu',
    state: 'CA',
    zipCode: '90265',
    country: 'USA',
    latitude: 34.0259,
    longitude: -118.7798,
    images: ['https://picsum.photos/800/600?random=2'],
    amenities: ['WiFi', 'Parking', 'Beach Access', 'BBQ', 'Pool'],
  },
];

// Mock Rooms
export const mockRooms: Room[] = [
  {
    id: '1',
    propertyId: '1',
    roomNumber: '12A',
    name: 'Master Suite',
    type: 'suite',
    capacity: 4,
    images: ['https://picsum.photos/800/600?random=3'],
    amenities: ['King Bed', 'Jacuzzi', 'Balcony'],
    status: 'available',
  },
  {
    id: '2',
    propertyId: '1',
    roomNumber: '12B',
    name: 'Kids Room',
    type: 'room',
    capacity: 2,
    images: ['https://picsum.photos/800/600?random=4'],
    amenities: ['Twin Beds', 'TV'],
    status: 'available',
  },
  {
    id: '3',
    propertyId: '2',
    roomNumber: 'Cabin 5',
    name: 'Ocean View Cabin',
    type: 'cabin',
    capacity: 6,
    images: ['https://picsum.photos/800/600?random=5'],
    amenities: ['Full Kitchen', 'Fireplace', 'Deck'],
    status: 'occupied',
  },
];

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    propertyId: '1',
    roomId: '1',
    checkIn: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    checkOut: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    guests: [
      { name: 'John Doe', email: 'guest@example.com', phoneNumber: '+1234567890' },
    ],
    status: 'upcoming',
    paymentStatus: 'paid',
    totalCost: 450,
    bondAmount: 200,
    bondStatus: 'held',
    charges: [
      { id: '1', type: 'accommodation', description: '3 nights', amount: 300, status: 'paid' },
      { id: '2', type: 'cleaning', description: 'Cleaning fee', amount: 100, status: 'paid' },
      { id: '3', type: 'bond', description: 'Security bond', amount: 200, status: 'pending' },
    ],
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    propertyId: '2',
    roomId: '3',
    checkIn: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    checkOut: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    guests: [
      { name: 'John Doe', email: 'guest@example.com' },
      { name: 'Jane Guest', email: 'jane@example.com' },
    ],
    status: 'current',
    paymentStatus: 'paid',
    totalCost: 600,
    bondAmount: 300,
    bondStatus: 'held',
    charges: [
      { id: '4', type: 'accommodation', description: '5 nights', amount: 500, status: 'paid' },
      { id: '5', type: 'cleaning', description: 'Cleaning fee', amount: 100, status: 'paid' },
    ],
    createdAt: '2024-01-10T00:00:00Z',
  },
];

// Mock Digital Keys
export const mockDigitalKeys: DigitalKey[] = [
  {
    id: '1',
    bookingId: '2',
    roomId: '3',
    userId: '1',
    status: 'active',
    activatedAt: new Date(Date.now() - 86400000).toISOString(),
    expiresAt: new Date(Date.now() + 172800000).toISOString(),
    nfcEnabled: true,
  },
];

// Mock Service Requests
export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    bookingId: '2',
    roomId: '3',
    userId: '1',
    type: 'maintenance',
    category: 'Plumbing',
    description: 'Leaky faucet in bathroom',
    priority: 'normal',
    status: 'submitted',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    bookingId: '2',
    roomId: '3',
    userId: '1',
    type: 'housekeeping',
    category: 'Towels',
    description: 'Need extra towels',
    priority: 'normal',
    status: 'resolved',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    resolvedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

// Mock Investments
export const mockInvestments: Investment[] = [
  {
    id: '1',
    propertyId: '1',
    name: 'Mountain View Suite 12A',
    location: 'Aspen, CO',
    images: ['https://picsum.photos/800/600?random=6'],
    totalPrice: 500000,
    minimumBuyIn: 10000,
    roi: 12.5,
    availableUnits: 5,
    features: ['Fully Furnished', 'Housekeeping Included', 'Property Insurance', 'Maintenance Team'],
    status: 'available',
  },
  {
    id: '2',
    propertyId: '2',
    name: 'Beachside Cabin 5',
    location: 'Malibu, CA',
    images: ['https://picsum.photos/800/600?random=7'],
    totalPrice: 750000,
    minimumBuyIn: 15000,
    roi: 15.2,
    availableUnits: 2,
    features: ['Fully Furnished', 'Housekeeping Included', 'Property Insurance', 'Maintenance Team'],
    status: 'limited',
  },
];

// Mock Owner Investments
export const mockOwnerInvestments: OwnerInvestment[] = [
  {
    id: '1',
    investmentId: '1',
    userId: '2',
    ownershipPercentage: 25,
    purchaseAmount: 125000,
    purchaseDate: '2023-06-01T00:00:00Z',
    revenue: 15000,
    expenses: 3000,
    occupancy: 85,
    status: 'active',
  },
];

// Mock Maintenance Tickets
export const mockMaintenanceTickets: MaintenanceTicket[] = [
  {
    id: '1',
    roomId: '3',
    reportedBy: 'housekeeping',
    issueSummary: 'Broken door handle',
    description: 'The door handle to the master bedroom is loose and needs repair',
    priority: 'normal',
    status: 'pending_quote',
    photos: ['https://picsum.photos/400/300?random=8'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// Mock Housekeeping Tasks
export const mockHousekeepingTasks: HousekeepingTask[] = [
  {
    id: '1',
    roomId: '3',
    propertyId: '2',
    status: 'dirty',
    priority: 'normal',
    checkOutTime: new Date(Date.now() + 3600000).toISOString(),
  },
  {
    id: '2',
    roomId: '1',
    propertyId: '1',
    status: 'in_progress',
    priority: 'urgent',
    checkInTime: new Date(Date.now() + 7200000).toISOString(),
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'key',
    title: 'Digital Key Available',
    message: 'Your digital key for Cabin 5 is now active',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    userId: '1',
    type: 'booking',
    title: 'Check-in Reminder',
    message: 'Your stay at Beachside Cabins starts tomorrow',
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

// Mock Subscriptions
export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    userId: '1',
    plan: 'plus',
    nightsPerMonth: 8,
    selectedDates: [],
    status: 'active',
    nextBillingDate: new Date(Date.now() + 2592000000).toISOString(),
    renewalDate: new Date(Date.now() + 5184000000).toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  },
];

