import { create } from 'zustand';
import { MaintenanceTicket, MaintenanceJob, Room } from '../types';

interface MaintenanceState {
  tickets: MaintenanceTicket[];
  jobs: MaintenanceJob[];
  rooms: Room[];
  selectedTicket: MaintenanceTicket | null;
  selectedJob: MaintenanceJob | null;
  isLoading: boolean;
  setTickets: (tickets: MaintenanceTicket[]) => void;
  setJobs: (jobs: MaintenanceJob[]) => void;
  setRooms: (rooms: Room[]) => void;
  setSelectedTicket: (ticket: MaintenanceTicket | null) => void;
  setSelectedJob: (job: MaintenanceJob | null) => void;
  addTicket: (ticket: MaintenanceTicket) => void;
  updateTicket: (id: string, updates: Partial<MaintenanceTicket>) => void;
  updateJob: (id: string, updates: Partial<MaintenanceJob>) => void;
  updateRoomStatus: (roomId: string, status: Room['status'], isOffline?: boolean) => void;
}

export const useMaintenanceStore = create<MaintenanceState>((set) => ({
  tickets: [],
  jobs: [],
  rooms: [],
  selectedTicket: null,
  selectedJob: null,
  isLoading: false,
  setTickets: (tickets) => set({ tickets }),
  setJobs: (jobs) => set({ jobs }),
  setRooms: (rooms) => set({ rooms }),
  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),
  updateTicket: (id, updates) =>
    set((state) => ({
      tickets: state.tickets.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      selectedTicket: state.selectedTicket?.id === id
        ? { ...state.selectedTicket, ...updates }
        : state.selectedTicket,
    })),
  updateJob: (id, updates) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
      selectedJob: state.selectedJob?.id === id
        ? { ...state.selectedJob, ...updates }
        : state.selectedJob,
    })),
  updateRoomStatus: (roomId, status, isOffline) =>
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId ? { ...r, status, isOffline: isOffline ?? r.isOffline } : r
      ),
    })),
}));

