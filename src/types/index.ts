// ─── Owner ───────────────────────────────────────────────────────────────────
export interface Owner {
  id: string; // "OWN001"
  name: string; // legal/business name
  legalName: string;
  taxId: string; // mã số thuế
  contactEmail: string;
  contactPhone: string;
  bankAccount: {
    bankName: string;
    accountNumber: string; // last 4 visible
    accountHolder: string;
  };
  ownsParkings: string[]; // station IDs
  revenueSharePercent: number; // 0-100, owner's cut
  createdAt: string;
}

export interface ParkingSlot {
  id: string; // "SLOT-A1"
  parkingId: string; // = stationId
  zone: string; // "A" | "B" | "C"
  number: number; // 1, 2, 3...
  hasCharger: boolean;
  chargerId?: string;
  status: 'available' | 'reserved' | 'charging' | 'fault' | 'occupied_no_charge';
  vehiclePlate?: string;
  reservedUntil?: string; // ISO datetime
}

export interface Reservation {
  id: string; // "RSV-001"
  parkingId: string;
  slotId: string;
  userId: string;
  userName: string;
  vehiclePlate: string;
  startTime: string; // ISO datetime
  endTime: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled' | 'no_show';
  estimatedKwh?: number;
}

export interface Staff {
  id: string; // "STF-001"
  ownerId: string;
  parkingId: string; // primary assignment
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'operator' | 'technician';
  shift: 'morning' | 'afternoon' | 'night' | 'rotating';
  status: 'on_duty' | 'off_duty' | 'leave';
  hireDate: string;
  performance: {
    sessionsHandled: number;
    complaintsResolved: number;
    rating: number; // 0-5
  };
}

export interface Payout {
  id: string; // "PO-2026-04-001"
  ownerId: string;
  periodStart: string; // ISO date
  periodEnd: string;
  grossRevenue: number; // VND, sum of transactions
  platformFee: number; // VND
  vat: number; // VND
  netAmount: number; // VND, what owner receives
  status: 'pending' | 'processing' | 'paid' | 'failed';
  scheduledDate: string;
  paidDate?: string;
  invoiceUrl?: string; // mock placeholder
}

export interface CustomerSummary {
  userId: string;
  userName: string;
  email: string;
  phone: string;
  totalSessionsAtMyParkings: number;
  totalKwhAtMyParkings: number;
  totalSpentAtMyParkings: number; // VND, gross
  lastVisitAt: string;
  favoriteStation: string;
  loyalty: 'new' | 'regular' | 'vip';
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  parkingId: string;
  parkingName: string;
  rating: number; // 1-5
  comment?: string;
  category: 'service' | 'charger' | 'cleanliness' | 'pricing' | 'other';
  createdAt: string;
  status: 'new' | 'responded' | 'resolved';
  ownerResponse?: string;
  respondedAt?: string;
}

export interface MaintenanceRequest {
  id: string; // "MNT-001"
  ownerId: string;
  chargerId?: string;
  parkingId: string;
  type: 'charger_repair' | 'facility' | 'cleaning' | 'upgrade';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  status: 'submitted' | 'in_review' | 'scheduled' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
  scheduledAt?: string;
  completedAt?: string;
  cost?: number; // VND, if owner-paid
}

export interface Promotion {
  id: string;
  ownerId: string;
  parkingIds: string[]; // applies to which of owner's parkings
  name: string; // "Giảm 20% cuối tuần"
  type: 'percent_off' | 'fixed_off' | 'free_minutes';
  value: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'scheduled' | 'active' | 'expired' | 'cancelled';
  usageCount: number;
  maxUsage?: number;
}

// ─── Station ───────────────────────────────────────────────────────────────
export interface Station {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  totalSlots: number;
  activeChargers: number;
  status: 'online' | 'offline' | 'maintenance';
  loadPercent: number;
  revenueToday: number;
  revenueMonth: number;
  operatingHours: string;
  managerId: string;
  ownerId?: string; // FK to Owner
}

// ─── Charger ────────────────────────────────────────────────────────────────
export interface Charger {
  id: string;
  stationId: string;
  stationName: string;
  status: 'available' | 'charging' | 'fault' | 'offline';
  powerKw: 22 | 50 | 150;
  connectorType: 'Type2' | 'CCS2' | 'CHAdeMO';
  currentEnergyKwh: number;
  lastHeartbeat: string;
  sessionDurationMin?: number;
  currentUserId?: string;
  firmwareVersion: string;
  installationDate: string;
}

// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  walletBalance: number;
  totalSessions: number;
  totalKwh: number;
  totalSpent: number;
  status: 'active' | 'suspended';
  role: 'user' | 'owner';
  createdAt: string;
  lastLoginAt: string;
}

// ─── Alert ───────────────────────────────────────────────────────────────────
export interface Alert {
  id: string;
  type: 'charger_fault' | 'payment_failed' | 'offline_station' | 'high_load';
  severity: 'critical' | 'warning' | 'info';
  deviceId: string;
  stationId: string;
  stationName: string;
  message: string;
  timestamp: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
}

// ─── Transaction ─────────────────────────────────────────────────────────────
export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  chargerId: string;
  stationId: string;
  stationName: string;
  startTime: string;
  endTime: string;
  durationMin: number;
  energyKwh: number;
  amount: number;
  status: 'completed' | 'failed' | 'pending';
}

// ─── ChargingEvent ────────────────────────────────────────────────────────────
export interface ChargingEvent {
  id: string;
  chargerId: string;
  type: 'heartbeat' | 'fault' | 'session_start' | 'session_end' | 'status_change';
  timestamp: string;
  payload: Record<string, string | number | boolean>;
  severity?: 'critical' | 'warning' | 'info';
}

// ─── AdminProfile ────────────────────────────────────────────────────────────
export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'operator';
  avatar?: string;
  lastLoginAt: string;
  twoFactorEnabled: boolean;
}

// ─── LoginHistoryEntry ────────────────────────────────────────────────────────
export interface LoginHistoryEntry {
  id: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  success: boolean;
  location: string;
}

// ─── RevenueDataPoint ────────────────────────────────────────────────────────
export interface RevenueDataPoint {
  time: string; // ISO string
  label: string; // "00:00", "T2", "01/04"
  revenue: number; // VND
  energyKwh: number;
  sessions: number;
}

// ─── AuditLogEntry ───────────────────────────────────────────────────────────
export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminName: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout';
  target: string;
  targetId: string;
  ip: string;
  timestamp: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
}

// ─── Notification ────────────────────────────────────────────────────────────
export interface Notification {
  id: string;
  type: 'system' | 'alert' | 'info';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

// ─── Staff Module Extensions ───────────────────────────────────────────────────
export interface StaffShift {
  id: string;
  staffId: string;
  parkingId: string;
  type: 'morning' | 'afternoon' | 'night';
  start: string; // "06:00"
  end: string; // "14:00"
  date: string; // ISO date
  clockedInAt?: string; // ISO datetime
  clockedOutAt?: string;
  handoverNote?: string;
}

export interface StaffTask {
  id: string; // "TASK-001"
  parkingId: string;
  assignedStaffId?: string; // null = unassigned, anyone can take
  type: 'opening_check' | 'hourly_inspection' | 'closing_check' | 'custom';
  title: string; // "Kiểm tra bộ sạc CHG-003"
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'done' | 'skipped';
  dueAt?: string;
  createdAt: string;
  completedAt?: string;
  completedBy?: string;
  checklistItems?: { label: string; checked: boolean }[];
}

export interface IssueReport {
  id: string;
  reporterId: string;
  parkingId: string;
  chargerId?: string;
  slotId?: string;
  type:
    | 'charger_fault'
    | 'wrong_parking'
    | 'payment_issue'
    | 'facility'
    | 'customer_complaint'
    | 'other';
  severity: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  photoUrls: string[]; // mock placeholder URLs
  voiceNoteUrl?: string; // optional, less central on web than mobile
  location?: { lat: number; lng: number };
  status: 'submitted' | 'received' | 'in_progress' | 'resolved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  resolution?: string;
}

export interface WalkInCustomer {
  id: string;
  name?: string;
  phone?: string;
  vehiclePlate: string;
  paymentMethod: 'cash' | 'qr_transfer' | 'wallet';
  walletUserId?: string;
  estimatedKwh?: number;
}

export interface ShiftHandover {
  id: string;
  fromStaffId: string;
  toStaffId?: string;
  parkingId: string;
  shiftDate: string;
  notes: string; // markdown supported
  flaggedItems: { type: string; description: string }[];
  createdAt: string;
}

export interface StaffNotification {
  id: string;
  recipientStaffId?: string;
  parkingId: string;
  type:
    | 'task_assigned'
    | 'session_alert'
    | 'fault_alert'
    | 'shift_reminder'
    | 'owner_message'
    | 'system';
  title: string;
  body: string;
  link?: string;
  read: boolean;
  createdAt: string;
  priority: 'info' | 'warning' | 'critical';
}

// ─── NavItem ─────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

// ─── Column Definition ───────────────────────────────────────────────────────
export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}
