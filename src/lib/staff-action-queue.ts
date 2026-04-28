import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QueuedAction {
  id: string;
  type: string;
  payload: any;
  status: 'pending' | 'syncing' | 'synced' | 'failed';
  createdAt: string;
  error?: string;
  summary: string;
}

interface StaffActionQueueState {
  queue: QueuedAction[];
  isOnline: boolean;
  addAction: (type: string, payload: any, summary: string) => void;
  removeAction: (id: string) => void;
  updateActionStatus: (id: string, status: QueuedAction['status'], error?: string) => void;
  setOnlineStatus: (status: boolean) => void;
  clearSynced: () => void;
}

export const useStaffActionQueue = create<StaffActionQueueState>()(
  persist(
    (set) => ({
      queue: [],
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      addAction: (type, payload, summary) =>
        set((state) => ({
          queue: [
            ...state.queue,
            {
              id: Math.random().toString(36).substring(7),
              type,
              payload,
              status: 'pending',
              createdAt: new Date().toISOString(),
              summary,
            },
          ],
        })),
      removeAction: (id) =>
        set((state) => ({
          queue: state.queue.filter((a) => a.id !== id),
        })),
      updateActionStatus: (id, status, error) =>
        set((state) => ({
          queue: state.queue.map((a) => (a.id === id ? { ...a, status, error } : a)),
        })),
      setOnlineStatus: (status) => set({ isOnline: status }),
      clearSynced: () =>
        set((state) => ({
          queue: state.queue.filter((a) => a.status !== 'synced'),
        })),
    }),
    {
      name: 'staff-action-queue',
    },
  ),
);
