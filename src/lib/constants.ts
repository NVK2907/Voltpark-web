export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_2FA: '/auth/verify-2fa',
} as const;

export const ROUTES = {
  ROOT: '/',
  NOT_FOUND: '/404',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_2FA: '/verify-2fa',
  DASHBOARD: '/admin/dashboard',
  STATIONS: '/admin/stations',
  CHARGERS: '/admin/chargers',
  ANALYTICS: '/admin/analytics',
  USERS: '/admin/users',
  ALERTS: '/admin/alerts',
  AUDIT_LOG: '/admin/audit-log',
  NOTIFICATIONS: '/admin/notifications',
  PROFILE: '/admin/profile',
  SETTINGS: '/admin/settings',
  // User Portal Routes
  MAP: '/map',
  USER_STATIONS: '/stations',
  TRIP_PLANNER: '/trip-planner',
  FAVORITES: '/favorites',
  BOOKINGS: '/bookings',
  WALLET: '/wallet',
  ONBOARDING: '/onboarding',
  CHARGING: '/charging',
  LIVE_CHARGING: '/charging/live',
  USER_SETTINGS: '/settings',
} as const;

export const STATUS_LABELS = {
  online: 'Trực tuyến',
  offline: 'Ngoại tuyến',
  maintenance: 'Bảo trì',
  available: 'Sẵn sàng',
  charging: 'Đang sạc',
  fault: 'Lỗi',
  active: 'Hoạt động',
  suspended: 'Đã khóa',
  completed: 'Hoàn thành',
  failed: 'Thất bại',
  pending: 'Đang xử lý',
} as const;

export const SEVERITY_LABELS = {
  critical: 'Nghiêm trọng',
  warning: 'Cảnh báo',
  info: 'Thông tin',
} as const;

export const ALERT_TYPE_LABELS = {
  charger_fault: 'Lỗi bộ sạc',
  payment_failed: 'Thanh toán thất bại',
  offline_station: 'Trạm ngoại tuyến',
  high_load: 'Tải cao',
} as const;

export const CONNECTOR_LABELS = {
  Type2: 'Type 2',
  CCS2: 'CCS2',
  CHAdeMO: 'CHAdeMO',
} as const;

export const POWER_OPTIONS = [22, 50, 150] as const;

export const PAGE_SIZE = 10;

export const REALTIME_INTERVAL_MS = 30_000;
export const CHARGER_UPDATE_INTERVAL_MS = 10_000;

export const WALLET_MIN_BALANCE = 50_000;

export const OWNER_ROUTES = {
  DASHBOARD: '/owner/dashboard',
  PARKINGS: '/owner/parkings',
  CHARGERS: '/owner/chargers',
  SESSIONS: '/owner/sessions',
  RESERVATIONS: '/owner/reservations',
  CUSTOMERS: '/owner/customers',
  FEEDBACK: '/owner/feedback',
  PROMOTIONS: '/owner/promotions',
  REVENUE: '/owner/revenue',
  PAYOUTS: '/owner/payouts',
  PRICING: '/owner/pricing',
  STAFF: '/owner/staff',
  SCHEDULE: '/owner/staff/schedule',
  MAINTENANCE: '/owner/maintenance',
  REPORTS: '/owner/reports',
  NOTIFICATIONS: '/owner/notifications',
  PROFILE: '/owner/profile',
  SETTINGS: '/owner/settings',
} as const;

export const STAFF_ROUTES = {
  HOME: '/staff/home',
  SLOTS: '/staff/slots',
  SESSIONS: '/staff/sessions',
  SESSIONS_NEW: '/staff/sessions/new',
  SCAN: '/staff/scan',
  CUSTOMERS: '/staff/customers',
  TASKS: '/staff/tasks',
  REPORT: '/staff/report',
  REPORT_HISTORY: '/staff/report/history',
  NOTIFICATIONS: '/staff/notifications',
  SHIFT: '/staff/shift',
  SHIFT_HANDOVER: '/staff/shift/handover',
  EMERGENCY: '/staff/emergency',
  ME: '/staff/me',
  ME_SYNC: '/staff/me/sync',
  WALKIN: '/staff/walkin',
} as const;

export const NAV_GROUPS = [
  {
    label: 'Tổng quan',
    items: [{ label: 'Dashboard', href: ROUTES.DASHBOARD, icon: 'LayoutDashboard' }],
  },
  {
    label: 'Hạ tầng',
    items: [
      { label: 'Trạm sạc', href: ROUTES.STATIONS, icon: 'MapPin' },
      { label: 'Bộ sạc', href: ROUTES.CHARGERS, icon: 'Zap' },
    ],
  },
  {
    label: 'Vận hành',
    items: [
      { label: 'Phân tích', href: ROUTES.ANALYTICS, icon: 'BarChart3' },
      { label: 'Người dùng', href: ROUTES.USERS, icon: 'Users' },
      { label: 'Cảnh báo', href: ROUTES.ALERTS, icon: 'Bell' },
      { label: 'Nhật ký', href: ROUTES.AUDIT_LOG, icon: 'ClipboardList' },
    ],
  },
  {
    label: 'Hệ thống',
    items: [{ label: 'Cài đặt', href: ROUTES.SETTINGS, icon: 'Settings' }],
  },
] as const;

export const OWNER_NAV_GROUPS = [
  {
    label: 'Tổng quan',
    items: [{ label: 'Dashboard', href: OWNER_ROUTES.DASHBOARD, icon: 'LayoutDashboard' }],
  },
  {
    label: 'Vận hành',
    items: [
      { label: 'Bãi đỗ', href: OWNER_ROUTES.PARKINGS, icon: 'MapPin' },
      { label: 'Bộ sạc', href: OWNER_ROUTES.CHARGERS, icon: 'Zap' },
      { label: 'Phiên sạc', href: OWNER_ROUTES.SESSIONS, icon: 'Activity' },
      { label: 'Đặt chỗ', href: OWNER_ROUTES.RESERVATIONS, icon: 'Calendar' },
    ],
  },
  {
    label: 'Khách hàng',
    items: [
      { label: 'Danh sách', href: OWNER_ROUTES.CUSTOMERS, icon: 'Users' },
      { label: 'Phản hồi', href: OWNER_ROUTES.FEEDBACK, icon: 'MessageSquare' },
      { label: 'Khuyến mãi', href: OWNER_ROUTES.PROMOTIONS, icon: 'Tag' },
    ],
  },
  {
    label: 'Tài chính',
    items: [
      { label: 'Doanh thu', href: OWNER_ROUTES.REVENUE, icon: 'PieChart' },
      { label: 'Thanh toán', href: OWNER_ROUTES.PAYOUTS, icon: 'Wallet' },
      { label: 'Giá cước', href: OWNER_ROUTES.PRICING, icon: 'DollarSign' },
      { label: 'Báo cáo', href: OWNER_ROUTES.REPORTS, icon: 'FileText' },
    ],
  },
  {
    label: 'Nhân sự',
    items: [
      { label: 'Nhân viên', href: OWNER_ROUTES.STAFF, icon: 'UserCircle' },
      { label: 'Lịch ca', href: OWNER_ROUTES.SCHEDULE, icon: 'CalendarClock' },
    ],
  },
  {
    label: 'Hỗ trợ',
    items: [{ label: 'Bảo trì', href: OWNER_ROUTES.MAINTENANCE, icon: 'Wrench' }],
  },
  {
    label: 'Hệ thống',
    items: [
      { label: 'Thông báo', href: OWNER_ROUTES.NOTIFICATIONS, icon: 'Bell' },
      { label: 'Cài đặt', href: OWNER_ROUTES.SETTINGS, icon: 'Settings' },
    ],
  },
] as const;
