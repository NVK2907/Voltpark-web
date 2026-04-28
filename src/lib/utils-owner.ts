import {
  MOCK_STATIONS,
  MOCK_CHARGERS,
  MOCK_TRANSACTIONS,
  MOCK_USERS,
  MOCK_ALERTS,
  MOCK_EVENTS,
  MOCK_SLOTS,
} from './mock-data';
import { currentOwnerId } from './mock-owner';

export const getOwnerParkings = () => {
  return MOCK_STATIONS.filter((s) => s.ownerId === currentOwnerId);
};

export const getOwnerSlots = (parkingId?: string) => {
  const ownerParkings = getOwnerParkings().map((p) => p.id);
  let slots = MOCK_SLOTS.filter((s) => ownerParkings.includes(s.parkingId));
  if (parkingId) slots = slots.filter((s) => s.parkingId === parkingId);
  return slots;
};

export const getOwnerChargers = () => {
  const ownerParkings = getOwnerParkings().map((p) => p.id);
  return MOCK_CHARGERS.filter((c) => ownerParkings.includes(c.stationId));
};

export const getOwnerSessions = () => {
  const ownerParkings = getOwnerParkings().map((p) => p.id);
  return MOCK_TRANSACTIONS.filter((t) => ownerParkings.includes(t.stationId));
};

export const getOwnerCustomers = () => {
  const ownerSessions = getOwnerSessions();
  const customerIds = [...new Set(ownerSessions.map((s) => s.userId))];
  return MOCK_USERS.filter((u) => customerIds.includes(u.id));
};

export const getOwnerAlerts = () => {
  const ownerParkings = getOwnerParkings().map((p) => p.id);
  return MOCK_ALERTS.filter((a) => ownerParkings.includes(a.stationId));
};

export const getOwnerEvents = () => {
  const ownerChargers = getOwnerChargers().map((c) => c.id);
  return MOCK_EVENTS.filter((e) => ownerChargers.includes(e.chargerId));
};
