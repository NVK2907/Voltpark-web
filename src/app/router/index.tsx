import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { ROUTES } from '@/lib/constants';
import { PageLoader } from '@/shared/components/common/LoadingSpinner';

// ─── Lazy page imports ────────────────────────────────────────────────────────
const LoginPage = React.lazy(() =>
  import('@/features/auth').then((m) => ({ default: m.LoginPage })),
);

const ForgotPasswordPage = React.lazy(() =>
  import('@/features/auth').then((m) => ({ default: m.ForgotPasswordPage })),
);

const Verify2FaPage = React.lazy(() =>
  import('@/features/auth').then((m) => ({ default: m.Verify2FaPage })),
);

const DashboardPage = React.lazy(() =>
  import('@/features/dashboard').then((m) => ({ default: m.DashboardPage })),
);

const StationsListPage = React.lazy(() =>
  import('@/features/stations').then((m) => ({ default: m.StationsListPage })),
);

const StationDetailPage = React.lazy(() =>
  import('@/features/stations').then((m) => ({ default: m.StationDetailPage })),
);

const ChargersListPage = React.lazy(() =>
  import('@/features/chargers').then((m) => ({ default: m.ChargersListPage })),
);

const ChargerDetailPage = React.lazy(() =>
  import('@/features/chargers').then((m) => ({ default: m.ChargerDetailPage })),
);

const AnalyticsPage = React.lazy(() =>
  import('@/features/analytics').then((m) => ({ default: m.AnalyticsPage })),
);

const UsersListPage = React.lazy(() =>
  import('@/features/users').then((m) => ({ default: m.UsersListPage })),
);

const UserDetailPage = React.lazy(() =>
  import('@/features/users').then((m) => ({ default: m.UserDetailPage })),
);

const AlertsPage = React.lazy(() =>
  import('@/features/alerts').then((m) => ({ default: m.AlertsPage })),
);

const AuditLogPage = React.lazy(() =>
  import('@/features/alerts').then((m) => ({ default: m.AuditLogPage })),
);

const SettingsPage = React.lazy(() =>
  import('@/features/system').then((m) => ({ default: m.SettingsPage })),
);

const NotificationsPage = React.lazy(() =>
  import('@/features/system').then((m) => ({ default: m.NotificationsPage })),
);

const ProfilePage = React.lazy(() =>
  import('@/features/system').then((m) => ({ default: m.ProfilePage })),
);

const NotFoundPage = React.lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.default })),
);

// ─── Layouts ─────────────────────────────────────────────────────────────────
const AuthLayout = React.lazy(() =>
  import('@/layouts/AuthLayout').then((m) => ({ default: m.default })),
);

const AdminLayout = React.lazy(() =>
  import('@/layouts/AdminLayout').then((m) => ({ default: m.default })),
);

function withSuspense(Component: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{Component}</Suspense>;
}

// ─── Owner Lazy Imports ────────────────────────────────────────────────────────
const OwnerLayout = React.lazy(() =>
  import('@/layouts/OwnerLayout').then((m) => ({ default: m.default })),
);
const OwnerDashboardPage = React.lazy(() =>
  import('@/features/owner/dashboard/pages/OwnerDashboardPage').then((m) => ({
    default: m.default,
  })),
);
const ParkingsListPage = React.lazy(() =>
  import('@/features/owner/parkings/pages/ParkingsListPage').then((m) => ({ default: m.default })),
);
const ParkingDetailPage = React.lazy(() =>
  import('@/features/owner/parkings/pages/ParkingDetailPage').then((m) => ({ default: m.default })),
);
const OwnerChargersListPage = React.lazy(() =>
  import('@/features/owner/chargers/pages/OwnerChargersListPage').then((m) => ({
    default: m.default,
  })),
);
const OwnerChargerDetailPage = React.lazy(() =>
  import('@/features/owner/chargers/pages/OwnerChargerDetailPage').then((m) => ({
    default: m.default,
  })),
);
const OwnerSessionsListPage = React.lazy(() =>
  import('@/features/owner/sessions/pages/OwnerSessionsListPage').then((m) => ({
    default: m.default,
  })),
);
const OwnerSessionDetailPage = React.lazy(() =>
  import('@/features/owner/sessions/pages/OwnerSessionDetailPage').then((m) => ({
    default: m.default,
  })),
);
const ReservationsPage = React.lazy(() =>
  import('@/features/owner/reservations/pages/ReservationsPage').then((m) => ({
    default: m.default,
  })),
);
const OwnerCustomersPage = React.lazy(() =>
  import('@/features/owner/customers/pages/OwnerCustomersPage').then((m) => ({
    default: m.default,
  })),
);
const CustomerDetailPage = React.lazy(() =>
  import('@/features/owner/customers/pages/CustomerDetailPage').then((m) => ({
    default: m.default,
  })),
);
const FeedbackPage = React.lazy(() =>
  import('@/features/owner/feedback/pages/FeedbackPage').then((m) => ({ default: m.default })),
);
const PromotionsPage = React.lazy(() =>
  import('@/features/owner/promotions/pages/PromotionsPage').then((m) => ({ default: m.default })),
);
const RevenuePage = React.lazy(() =>
  import('@/features/owner/revenue/pages/RevenuePage').then((m) => ({ default: m.default })),
);
const PayoutsPage = React.lazy(() =>
  import('@/features/owner/payouts/pages/PayoutsPage').then((m) => ({ default: m.default })),
);
const PricingPage = React.lazy(() =>
  import('@/features/owner/pricing/pages/PricingPage').then((m) => ({ default: m.default })),
);
const StaffListPage = React.lazy(() =>
  import('@/features/owner/staff/pages/StaffListPage').then((m) => ({ default: m.default })),
);
const StaffDetailPage = React.lazy(() =>
  import('@/features/owner/staff/pages/StaffDetailPage').then((m) => ({ default: m.default })),
);
const SchedulePage = React.lazy(() =>
  import('@/features/owner/staff/pages/SchedulePage').then((m) => ({ default: m.default })),
);
const MaintenancePage = React.lazy(() =>
  import('@/features/owner/maintenance/pages/MaintenancePage').then((m) => ({
    default: m.default,
  })),
);
const ReportsPage = React.lazy(() =>
  import('@/features/owner/reports/pages/ReportsPage').then((m) => ({ default: m.default })),
);
const OwnerSettingsPage = React.lazy(() =>
  import('@/features/owner/settings/pages/OwnerSettingsPage').then((m) => ({ default: m.default })),
);
const OwnerNotificationsPage = React.lazy(() =>
  import('@/features/owner/notifications/pages/OwnerNotificationsPage').then((m) => ({
    default: m.default,
  })),
);
const OwnerProfilePage = React.lazy(() =>
  import('@/features/owner/profile/pages/OwnerProfilePage').then((m) => ({ default: m.default })),
);

// ─── Staff Module ────────────────────────────────────────────────────────────
const StaffLayout = React.lazy(() =>
  import('@/features/staff/layout/StaffLayout').then((m) => ({ default: m.default })),
);
const StaffHomePage = React.lazy(() =>
  import('@/features/staff/home/pages/StaffHomePage').then((m) => ({ default: m.default })),
);
const StaffSlotDetailPage = React.lazy(() =>
  import('@/features/staff/slots/pages/StaffSlotDetailPage').then((m) => ({ default: m.default })),
);
const StaffSessionsPage = React.lazy(() =>
  import('@/features/staff/sessions/pages/StaffSessionsPage').then((m) => ({ default: m.default })),
);
const StaffSessionDetailPage = React.lazy(() =>
  import('@/features/staff/sessions/pages/StaffSessionDetailPage').then((m) => ({
    default: m.default,
  })),
);
const StaffNewSessionPage = React.lazy(() =>
  import('@/features/staff/sessions/pages/StaffNewSessionPage').then((m) => ({
    default: m.default,
  })),
);
const StaffScanPage = React.lazy(() =>
  import('@/features/staff/scan/pages/StaffScanPage').then((m) => ({ default: m.default })),
);

const StaffCustomersPage = React.lazy(() =>
  import('@/features/staff/customers/pages/StaffCustomersPage').then((m) => ({
    default: m.default,
  })),
);
const StaffCustomerDetailPage = React.lazy(() =>
  import('@/features/staff/customers/pages/StaffCustomerDetailPage').then((m) => ({
    default: m.default,
  })),
);
const StaffTasksPage = React.lazy(() =>
  import('@/features/staff/tasks/pages/StaffTasksPage').then((m) => ({ default: m.default })),
);
const StaffTaskDetailPage = React.lazy(() =>
  import('@/features/staff/tasks/pages/StaffTaskDetailPage').then((m) => ({ default: m.default })),
);

const StaffReportPage = React.lazy(() =>
  import('@/features/staff/report/pages/StaffReportPage').then((m) => ({ default: m.default })),
);
const StaffReportHistoryPage = React.lazy(() =>
  import('@/features/staff/report/pages/StaffReportHistoryPage').then((m) => ({
    default: m.default,
  })),
);
const StaffEmergencyPage = React.lazy(() =>
  import('@/features/staff/emergency/pages/StaffEmergencyPage').then((m) => ({
    default: m.default,
  })),
);

const StaffShiftPage = React.lazy(() =>
  import('@/features/staff/shift/pages/StaffShiftPage').then((m) => ({ default: m.default })),
);
const StaffHandoverPage = React.lazy(() =>
  import('@/features/staff/shift/pages/StaffHandoverPage').then((m) => ({ default: m.default })),
);

const StaffNotificationsPage = React.lazy(() =>
  import('@/features/staff/notifications/pages/StaffNotificationsPage').then((m) => ({
    default: m.default,
  })),
);
const StaffProfilePage = React.lazy(() =>
  import('@/features/staff/profile/pages/StaffProfilePage').then((m) => ({ default: m.default })),
);
const StaffSyncQueuePage = React.lazy(() =>
  import('@/features/staff/profile/pages/StaffSyncQueuePage').then((m) => ({ default: m.default })),
);

// --- User Module Lazy Imports ---
const MarketingLayout = React.lazy(() =>
  import('@/features/user/layout/MarketingLayout').then((m) => ({ default: m.MarketingLayout })),
);
const LandingPage = React.lazy(() =>
  import('@/features/user/marketing/pages/LandingPage').then((m) => ({ default: m.default })),
);
const UserPricingPage = React.lazy(() =>
  import('@/features/user/marketing/pages/PricingPage').then((m) => ({ default: m.default })),
);
const AboutPage = React.lazy(() =>
  import('@/features/user/marketing/pages/AboutPage').then((m) => ({ default: m.default })),
);
const FAQPage = React.lazy(() =>
  import('@/features/user/marketing/pages/FAQPage').then((m) => ({ default: m.default })),
);
const ContactPage = React.lazy(() =>
  import('@/features/user/marketing/pages/ContactPage').then((m) => ({ default: m.default })),
);
const TermsPage = React.lazy(() =>
  import('@/features/user/marketing/pages/TermsPage').then((m) => ({ default: m.default })),
);
const PrivacyPage = React.lazy(() =>
  import('@/features/user/marketing/pages/PrivacyPage').then((m) => ({ default: m.default })),
);
const CookiesPage = React.lazy(() =>
  import('@/features/user/marketing/pages/CookiesPage').then((m) => ({ default: m.default })),
);
const BlogListPage = React.lazy(() =>
  import('@/features/user/marketing/pages/BlogListPage').then((m) => ({ default: m.default })),
);
const BlogArticlePage = React.lazy(() =>
  import('@/features/user/marketing/pages/BlogArticlePage').then((m) => ({ default: m.default })),
);
// --- User Auth Module ---
const UserAuthLayout = React.lazy(() =>
  import('@/features/user/layout/UserAuthLayout').then((m) => ({ default: m.UserAuthLayout })),
);
const UserLoginPage = React.lazy(() =>
  import('@/features/user/auth/pages/LoginPage').then((m) => ({ default: m.default })),
);
const UserSignupPage = React.lazy(() =>
  import('@/features/user/auth/pages/SignupPage').then((m) => ({ default: m.default })),
);
const UserForgotPasswordPage = React.lazy(() =>
  import('@/features/user/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.default })),
);
const UserResetPasswordPage = React.lazy(() =>
  import('@/features/user/auth/pages/ResetPasswordPage').then((m) => ({ default: m.default })),
);
const UserVerifyEmailPage = React.lazy(() =>
  import('@/features/user/auth/pages/VerifyEmailPage').then((m) => ({ default: m.default })),
);
const UserOnboardingPage = React.lazy(() =>
  import('@/features/user/auth/pages/OnboardingPage').then((m) => ({ default: m.default })),
);

// --- User Discovery Module ---
const UserLayout = React.lazy(() =>
  import('@/features/user/layout/UserLayout').then((m) => ({ default: m.default })),
);
const MapPage = React.lazy(() =>
  import('@/features/user/discovery/pages/MapPage').then((m) => ({ default: m.default })),
);
const UserStationsListPage = React.lazy(() =>
  import('@/features/user/discovery/pages/StationsListPage').then((m) => ({ default: m.default })),
);
const UserStationDetailPage = React.lazy(() =>
  import('@/features/user/discovery/pages/StationDetailPage').then((m) => ({ default: m.default })),
);
const TripPlannerPage = React.lazy(() =>
  import('@/features/user/discovery/pages/TripPlannerPage').then((m) => ({ default: m.default })),
);
const FavoritesPage = React.lazy(() =>
  import('@/features/user/discovery/pages/FavoritesPage').then((m) => ({ default: m.default })),
);

// --- User Booking Module ---
const UserMyBookingsPage = React.lazy(() =>
  import('@/features/user/booking/pages/MyBookingsPage').then((m) => ({ default: m.default })),
);
const UserNewBookingWizardPage = React.lazy(() =>
  import('@/features/user/booking/pages/NewBookingWizardPage').then((m) => ({
    default: m.default,
  })),
);

// --- User Charging Module ---
const ChargingDashboardPage = React.lazy(() =>
  import('@/features/user/charging/pages/ChargingDashboardPage').then((m) => ({
    default: m.default,
  })),
);
const LiveChargingPage = React.lazy(() =>
  import('@/features/user/charging/pages/LiveChargingPage').then((m) => ({ default: m.default })),
);
const ChargingSessionDetailPage = React.lazy(() =>
  import('@/features/user/charging/pages/ChargingSessionDetailPage').then((m) => ({
    default: m.default,
  })),
);

// --- User Wallet Module ---
const WalletOverviewPage = React.lazy(() =>
  import('@/features/user/wallet/pages/WalletOverviewPage').then((m) => ({ default: m.default })),
);
const TopUpPage = React.lazy(() =>
  import('@/features/user/wallet/pages/TopUpPage').then((m) => ({ default: m.default })),
);
const PaymentMethodsPage = React.lazy(() =>
  import('@/features/user/wallet/pages/PaymentMethodsPage').then((m) => ({ default: m.default })),
);
const TransactionsPage = React.lazy(() =>
  import('@/features/user/wallet/pages/TransactionsPage').then((m) => ({ default: m.default })),
);

// --- User Engagement Module ---
const VouchersPage = React.lazy(() =>
  import('@/features/user/engagement/pages/VouchersPage').then((m) => ({ default: m.default })),
);
const LoyaltyPage = React.lazy(() =>
  import('@/features/user/engagement/pages/LoyaltyPage').then((m) => ({ default: m.default })),
);
const ReferralPage = React.lazy(() =>
  import('@/features/user/engagement/pages/ReferralPage').then((m) => ({ default: m.default })),
);
const ReviewsPage = React.lazy(() =>
  import('@/features/user/engagement/pages/ReviewsPage').then((m) => ({ default: m.default })),
);

// --- User Notifications Module ---
const UserNotificationsPage = React.lazy(() =>
  import('@/features/user/notifications/pages/NotificationsPage').then((m) => ({
    default: m.default,
  })),
);

// --- User Support Module ---
const HelpCenterPage = React.lazy(() =>
  import('@/features/user/support/pages/HelpCenterPage').then((m) => ({ default: m.default })),
);
const HelpArticlePage = React.lazy(() =>
  import('@/features/user/support/pages/HelpArticlePage').then((m) => ({ default: m.default })),
);
const MyTicketsPage = React.lazy(() =>
  import('@/features/user/support/pages/MyTicketsPage').then((m) => ({ default: m.default })),
);
const NewTicketPage = React.lazy(() =>
  import('@/features/user/support/pages/NewTicketPage').then((m) => ({ default: m.default })),
);
const TicketDetailPage = React.lazy(() =>
  import('@/features/user/support/pages/TicketDetailPage').then((m) => ({ default: m.default })),
);
const LiveChatPage = React.lazy(() =>
  import('@/features/user/support/pages/LiveChatPage').then((m) => ({ default: m.default })),
);

// --- User Profile Module ---
const ProfileOverviewPage = React.lazy(() =>
  import('@/features/user/profile/pages/ProfileOverviewPage').then((m) => ({ default: m.default })),
);
const MyVehiclesPage = React.lazy(() =>
  import('@/features/user/profile/pages/MyVehiclesPage').then((m) => ({ default: m.default })),
);
const SecurityPage = React.lazy(() =>
  import('@/features/user/profile/pages/SecurityPage').then((m) => ({ default: m.default })),
);
const ConnectedAccountsPage = React.lazy(() =>
  import('@/features/user/profile/pages/ConnectedAccountsPage').then((m) => ({
    default: m.default,
  })),
);
const KYCVerificationPage = React.lazy(() =>
  import('@/features/user/profile/pages/KYCVerificationPage').then((m) => ({ default: m.default })),
);
const PrivacyDataPage = React.lazy(() =>
  import('@/features/user/profile/pages/PrivacyDataPage').then((m) => ({ default: m.default })),
);
const PreferencesPage = React.lazy(() =>
  import('@/features/user/profile/pages/PreferencesPage').then((m) => ({ default: m.default })),
);

export const router = createBrowserRouter([
  // User Marketing Routes
  {
    path: '/',
    element: withSuspense(<MarketingLayout />),
    children: [
      { index: true, element: withSuspense(<LandingPage />) },
      { path: 'pricing', element: withSuspense(<UserPricingPage />) },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'faq', element: withSuspense(<FAQPage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: 'terms', element: withSuspense(<TermsPage />) },
      { path: 'privacy', element: withSuspense(<PrivacyPage />) },
      { path: 'cookies', element: withSuspense(<CookiesPage />) },
      { path: 'blog', element: withSuspense(<BlogListPage />) },
      { path: 'blog/:slug', element: withSuspense(<BlogArticlePage />) },
    ],
  },
  // User Auth Routes
  {
    path: '/',
    element: withSuspense(<UserAuthLayout />),
    children: [
      { path: 'login', element: withSuspense(<UserLoginPage />) },
      { path: 'signup', element: withSuspense(<UserSignupPage />) },
      { path: 'forgot-password', element: withSuspense(<UserForgotPasswordPage />) },
      { path: 'reset-password', element: withSuspense(<UserResetPasswordPage />) },
      { path: 'verify-email', element: withSuspense(<UserVerifyEmailPage />) },
      { path: 'onboarding', element: withSuspense(<UserOnboardingPage />) },
    ],
  },
  // User Authenticated Routes
  {
    path: '/',
    element: <PrivateRoute>{withSuspense(<UserLayout />)}</PrivateRoute>,
    children: [
      { path: 'map', element: withSuspense(<MapPage />) },
      { path: 'stations', element: withSuspense(<UserStationsListPage />) },
      { path: 'stations/:id', element: withSuspense(<UserStationDetailPage />) },
      { path: 'trip-planner', element: withSuspense(<TripPlannerPage />) },
      { path: 'favorites', element: withSuspense(<FavoritesPage />) },
      // Booking
      { path: 'bookings', element: withSuspense(<UserMyBookingsPage />) },
      { path: 'bookings/new', element: withSuspense(<UserNewBookingWizardPage />) },
      // Charging
      { path: 'charging', element: withSuspense(<ChargingDashboardPage />) },
      { path: 'charging/live', element: withSuspense(<LiveChargingPage />) },
      { path: 'charging/sessions/:id', element: withSuspense(<ChargingSessionDetailPage />) },
      // Wallet
      { path: 'wallet', element: withSuspense(<WalletOverviewPage />) },
      { path: 'wallet/topup', element: withSuspense(<TopUpPage />) },
      { path: 'wallet/methods', element: withSuspense(<PaymentMethodsPage />) },
      { path: 'wallet/transactions', element: withSuspense(<TransactionsPage />) },
      // Engagement
      { path: 'vouchers', element: withSuspense(<VouchersPage />) },
      { path: 'loyalty', element: withSuspense(<LoyaltyPage />) },
      { path: 'referral', element: withSuspense(<ReferralPage />) },
      { path: 'reviews', element: withSuspense(<ReviewsPage />) },
      // Notifications
      { path: 'notifications', element: withSuspense(<UserNotificationsPage />) },
      // Support
      { path: 'support', element: withSuspense(<HelpCenterPage />) },
      { path: 'support/articles/:slug', element: withSuspense(<HelpArticlePage />) },
      { path: 'support/tickets', element: withSuspense(<MyTicketsPage />) },
      { path: 'support/tickets/new', element: withSuspense(<NewTicketPage />) },
      { path: 'support/tickets/:id', element: withSuspense(<TicketDetailPage />) },
      { path: 'support/chat', element: withSuspense(<LiveChatPage />) },
      // Profile & Settings
      { path: 'profile', element: withSuspense(<ProfileOverviewPage />) },
      { path: 'profile/vehicles', element: withSuspense(<MyVehiclesPage />) },
      { path: 'profile/security', element: withSuspense(<SecurityPage />) },
      { path: 'profile/connected', element: withSuspense(<ConnectedAccountsPage />) },
      { path: 'profile/kyc', element: withSuspense(<KYCVerificationPage />) },
      { path: 'profile/privacy', element: withSuspense(<PrivacyDataPage />) },
      { path: 'profile/preferences', element: withSuspense(<PreferencesPage />) },
    ],
  },
  // Admin Auth Routes
  {
    path: '/auth',
    element: withSuspense(<AuthLayout />),
    children: [
      {
        path: 'login',
        element: <PublicRoute>{withSuspense(<LoginPage />)}</PublicRoute>,
      },
      {
        path: 'forgot-password',
        element: <PublicRoute>{withSuspense(<ForgotPasswordPage />)}</PublicRoute>,
      },
      {
        path: 'verify-2fa',
        element: <PublicRoute>{withSuspense(<Verify2FaPage />)}</PublicRoute>,
      },
    ],
  },
  {
    path: '/',
    element: <PrivateRoute>{withSuspense(<AdminLayout />)}</PrivateRoute>,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: withSuspense(<DashboardPage />),
      },
      {
        path: ROUTES.STATIONS,
        element: withSuspense(<StationsListPage />),
      },
      {
        path: `${ROUTES.STATIONS}/:id`,
        element: withSuspense(<StationDetailPage />),
      },
      {
        path: ROUTES.CHARGERS,
        element: withSuspense(<ChargersListPage />),
      },
      {
        path: `${ROUTES.CHARGERS}/:id`,
        element: withSuspense(<ChargerDetailPage />),
      },
      {
        path: ROUTES.ANALYTICS,
        element: withSuspense(<AnalyticsPage />),
      },
      {
        path: ROUTES.USERS,
        element: withSuspense(<UsersListPage />),
      },
      {
        path: `${ROUTES.USERS}/:id`,
        element: withSuspense(<UserDetailPage />),
      },
      {
        path: ROUTES.ALERTS,
        element: withSuspense(<AlertsPage />),
      },
      {
        path: ROUTES.AUDIT_LOG,
        element: withSuspense(<AuditLogPage />),
      },
      {
        path: ROUTES.SETTINGS,
        element: withSuspense(<SettingsPage />),
      },
      {
        path: ROUTES.NOTIFICATIONS,
        element: withSuspense(<NotificationsPage />),
      },
      {
        path: ROUTES.PROFILE,
        element: withSuspense(<ProfilePage />),
      },
    ],
  },
  {
    path: '/owner',
    element: <PrivateRoute>{withSuspense(<OwnerLayout />)}</PrivateRoute>,
    children: [
      {
        path: 'dashboard',
        element: withSuspense(<OwnerDashboardPage />),
      },
      {
        path: 'parkings',
        element: withSuspense(<ParkingsListPage />),
      },
      {
        path: 'parkings/:id',
        element: withSuspense(<ParkingDetailPage />),
      },
      {
        path: 'chargers',
        element: withSuspense(<OwnerChargersListPage />),
      },
      {
        path: 'chargers/:id',
        element: withSuspense(<OwnerChargerDetailPage />),
      },
      {
        path: 'sessions',
        element: withSuspense(<OwnerSessionsListPage />),
      },
      {
        path: 'sessions/:id',
        element: withSuspense(<OwnerSessionDetailPage />),
      },
      {
        path: 'reservations',
        element: withSuspense(<ReservationsPage />),
      },
      {
        path: 'customers',
        element: withSuspense(<OwnerCustomersPage />),
      },
      {
        path: 'customers/:id',
        element: withSuspense(<CustomerDetailPage />),
      },
      {
        path: 'feedback',
        element: withSuspense(<FeedbackPage />),
      },
      {
        path: 'promotions',
        element: withSuspense(<PromotionsPage />),
      },
      {
        path: 'revenue',
        element: withSuspense(<RevenuePage />),
      },
      {
        path: 'payouts',
        element: withSuspense(<PayoutsPage />),
      },
      {
        path: 'pricing',
        element: withSuspense(<PricingPage />),
      },
      {
        path: 'staff',
        element: withSuspense(<StaffListPage />),
      },
      {
        path: 'staff/schedule',
        element: withSuspense(<SchedulePage />),
      },
      {
        path: 'staff/:id',
        element: withSuspense(<StaffDetailPage />),
      },
      {
        path: 'maintenance',
        element: withSuspense(<MaintenancePage />),
      },
      {
        path: 'reports',
        element: withSuspense(<ReportsPage />),
      },
      {
        path: 'settings',
        element: withSuspense(<OwnerSettingsPage />),
      },
      {
        path: 'notifications',
        element: withSuspense(<OwnerNotificationsPage />),
      },
      {
        path: 'profile',
        element: withSuspense(<OwnerProfilePage />),
      },
      // Thêm các sub-routes của owner sau này
    ],
  },
  {
    path: '/staff',
    element: (
      <PrivateRoute>
        <Suspense fallback={<PageLoader />}>
          <StaffLayout />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: 'home',
        element: withSuspense(<StaffHomePage />),
      },
      {
        path: 'slots/:id',
        element: withSuspense(<StaffSlotDetailPage />),
      },
      {
        path: 'sessions',
        element: withSuspense(<StaffSessionsPage />),
      },
      {
        path: 'sessions/new',
        element: withSuspense(<StaffNewSessionPage />),
      },
      {
        path: 'sessions/:id',
        element: withSuspense(<StaffSessionDetailPage />),
      },
      {
        path: 'scan',
        element: withSuspense(<StaffScanPage />),
      },
      {
        path: 'customers',
        element: withSuspense(<StaffCustomersPage />),
      },
      {
        path: 'customers/:id',
        element: withSuspense(<StaffCustomerDetailPage />),
      },
      {
        path: 'tasks',
        element: withSuspense(<StaffTasksPage />),
      },
      {
        path: 'tasks/:id',
        element: withSuspense(<StaffTaskDetailPage />),
      },
      {
        path: 'report',
        element: withSuspense(<StaffReportPage />),
      },
      {
        path: 'report/history',
        element: withSuspense(<StaffReportHistoryPage />),
      },
      {
        path: 'emergency',
        element: withSuspense(<StaffEmergencyPage />),
      },
      {
        path: 'shift',
        element: withSuspense(<StaffShiftPage />),
      },
      {
        path: 'shift/handover',
        element: withSuspense(<StaffHandoverPage />),
      },
      {
        path: 'notifications',
        element: withSuspense(<StaffNotificationsPage />),
      },
      {
        path: 'me',
        element: withSuspense(<StaffProfilePage />),
      },
      {
        path: 'me/sync',
        element: withSuspense(<StaffSyncQueuePage />),
      },
      // Thêm các sub-routes của staff sau này
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: withSuspense(<NotFoundPage />),
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.NOT_FOUND} replace />,
  },
]);
