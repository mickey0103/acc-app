import { create } from 'zustand';
import { Booking, DigitalKey, ServiceRequest } from '../types';

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  digitalKeys: DigitalKey[];
  serviceRequests: ServiceRequest[];
  isLoading: boolean;
  setBookings: (bookings: Booking[]) => void;
  setCurrentBooking: (booking: Booking | null) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  setDigitalKeys: (keys: DigitalKey[]) => void;
  addServiceRequest: (request: ServiceRequest) => void;
  updateServiceRequest: (id: string, updates: Partial<ServiceRequest>) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  currentBooking: null,
  digitalKeys: [],
  serviceRequests: [],
  isLoading: false,
  setBookings: (bookings) => set({ bookings }),
  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  updateBooking: (id, updates) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
      currentBooking: state.currentBooking?.id === id 
        ? { ...state.currentBooking, ...updates } 
        : state.currentBooking,
    })),
  setDigitalKeys: (keys) => set({ digitalKeys: keys }),
  addServiceRequest: (request) =>
    set((state) => ({ serviceRequests: [...state.serviceRequests, request] })),
  updateServiceRequest: (id, updates) =>
    set((state) => ({
      serviceRequests: state.serviceRequests.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),
}));

