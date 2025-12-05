import { create } from 'zustand';
import { HousekeepingTask, ServiceRequest, Room } from '../types';

interface HousekeepingState {
  tasks: HousekeepingTask[];
  maintenanceRequests: ServiceRequest[];
  rooms: Room[];
  selectedTask: HousekeepingTask | null;
  isLoading: boolean;
  setTasks: (tasks: HousekeepingTask[]) => void;
  setMaintenanceRequests: (requests: ServiceRequest[]) => void;
  setRooms: (rooms: Room[]) => void;
  setSelectedTask: (task: HousekeepingTask | null) => void;
  updateTask: (id: string, updates: Partial<HousekeepingTask>) => void;
  addMaintenanceRequest: (request: ServiceRequest) => void;
}

export const useHousekeepingStore = create<HousekeepingState>((set) => ({
  tasks: [],
  maintenanceRequests: [],
  rooms: [],
  selectedTask: null,
  isLoading: false,
  setTasks: (tasks) => set({ tasks }),
  setMaintenanceRequests: (requests) => set({ maintenanceRequests: requests }),
  setRooms: (rooms) => set({ rooms }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      selectedTask: state.selectedTask?.id === id
        ? { ...state.selectedTask, ...updates }
        : state.selectedTask,
    })),
  addMaintenanceRequest: (request) =>
    set((state) => ({ maintenanceRequests: [...state.maintenanceRequests, request] })),
}));

