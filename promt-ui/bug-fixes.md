You are a senior frontend engineer. Fix ALL of the following bugs in the voltpark-web
project (React 18 + Vite + React Router DOM v6 + TypeScript + Zustand).

DO NOT refactor or change anything outside the exact files and lines listed.
DO NOT add new packages.
Fix ONLY what is described — nothing more.

═══════════════════════════════════════════════════════
ROOT CAUSE SUMMARY
═══════════════════════════════════════════════════════

There are TWO conflicting ROUTES objects in the project:
  • src/app/router/routes.config.ts  → DASHBOARD = '/dashboard'  (stale, only used by route guards)
  • src/lib/constants.ts             → DASHBOARD = '/admin/dashboard'  (current, used by router)

PrivateRoute.tsx and PublicRoute.tsx both import from routes.config.ts.
After login, PublicRoute redirects authenticated users to '/dashboard' which has NO route → 404.

All broken buttons share a common pattern: DropdownMenuItems and Buttons have visual styling
but NO onClick handler attached.

═══════════════════════════════════════════════════════
BUG FIXES — IMPLEMENT IN ORDER
═══════════════════════════════════════════════════════

──────────────────────────────────────────────────────
FIX 1 — CRITICAL: Post-login 404 redirect
──────────────────────────────────────────────────────
File: src/app/router/PublicRoute.tsx

Problem: Imports ROUTES from './routes.config' where DASHBOARD = '/dashboard'.
  After admin logs in, PublicRoute redirects to '/dashboard' → no route → 404.

Fix:
  Change the import from:
    import { ROUTES } from './routes.config';
  To:
    import { AUTH_ROUTES, ROUTES } from '@/lib/constants';

  Change the redirect target from:
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  To:
    return <Navigate to={ROUTES.DASHBOARD} replace />;
    // ROUTES.DASHBOARD from @/lib/constants is '/admin/dashboard' ✓

  Also update the unauthenticated redirect in PrivateRoute.tsx:
  File: src/app/router/PrivateRoute.tsx

  Change the import from:
    import { ROUTES } from './routes.config';
  To:
    import { AUTH_ROUTES } from '@/lib/constants';

  Change the redirect target from:
    return <Navigate to={`${ROUTES.LOGIN}?from=...`} replace />;
  To:
    return <Navigate to={`${AUTH_ROUTES.LOGIN}?from=${encodeURIComponent(location.pathname)}`} replace />;
    // AUTH_ROUTES.LOGIN = '/auth/login' — the admin login page

  NOTE: After this fix, unauthenticated access to admin routes redirects to /auth/login.
  Unauthenticated access to user routes (/map, /wallet, etc.) also redirects to /auth/login.
  This is acceptable for now — both login pages share the same PrivateRoute guard.

──────────────────────────────────────────────────────
FIX 2 — CRITICAL: Broken /charging/history link
──────────────────────────────────────────────────────
File: src/features/user/charging/pages/ChargingDashboardPage.tsx  line ~21

Problem: <Link to="/charging/history"> points to a non-existent route → 404 on click.
The closest existing route is /charging/sessions/:id (session detail).

Fix: Replace with link to session list (use the existing transactions/sessions concept):
  Change:
    <Link to="/charging/history">
  To:
    <Link to="/charging">

  (User stays on the charging dashboard — history is shown in the page below)
  Remove the wrapping <Link> and make the Button non-navigating OR link to
  /wallet/transactions which shows charge payment history.

  Recommended: Change to /wallet/transactions (closest to "charge history"):
    <Link to="/wallet/transactions">

──────────────────────────────────────────────────────
FIX 3 — CRITICAL: Broken /checkin link in ChargingDashboardPage
──────────────────────────────────────────────────────
File: src/features/user/charging/pages/ChargingDashboardPage.tsx  line ~29

Problem: <Link to="/checkin"> points to a non-existent route → 404 on click.
The route /checkin does NOT exist in the router yet.

Fix (two options — pick Option A for now):
  Option A (quick fix — remove link, keep button as placeholder):
    Replace <Link to="/checkin"><Button ...>SẠC NGAY</Button></Link>
    With:    <Button ... onClick={() => toast.info("Tính năng đang phát triển")}>SẠC NGAY</Button>
    Add import: import { toast } from 'sonner';

  Option B (add the missing route — do this if /checkin page is ready):
    In src/app/router/index.tsx, add under User Authenticated Routes children:
      { path: 'checkin', element: withSuspense(<CheckInPage />) }
    And add the lazy import at the top of the router file.

──────────────────────────────────────────────────────
FIX 4 — CRITICAL: Broken marketing footer links
──────────────────────────────────────────────────────
File: src/features/user/layout/MarketingLayout.tsx

Problem: Footer/nav contains links to non-existent routes:
  • /features  → 404
  • /app       → 404
  • /report    → 404

Fix: Replace broken href values with '#' (anchor placeholder) until pages are created:
  For each <Link to="/features">, <Link to="/app">, <Link to="/report">:
    Change to <a href="#" onClick={(e) => e.preventDefault()}>

  OR remove those nav items entirely from the footer if they are not needed now.
  (Search for "features", "/app", "/report" strings in the file and fix each occurrence)

Also fix:
  • Any <Link to="/support"> in MarketingLayout that tries to link from the public
    marketing layout to the authenticated /support route:
    Change to a scroll-to-contact section or link to /contact (which exists as a marketing page)

──────────────────────────────────────────────────────
FIX 5 — CRITICAL: Admin logout button has no onClick
──────────────────────────────────────────────────────
File: src/layouts/components/Header.tsx  lines ~100–103

Problem:
  <DropdownMenuItem className="text-destructive focus:text-destructive">
    <LogOut className="mr-2 h-4 w-4" />
    <span>Đăng xuất</span>
  </DropdownMenuItem>
  → No onClick. Clicking does nothing. User cannot log out.

Fix:
  Step 1 — Add import at top of file:
    import { useAuthStore } from '@/features/auth';

  Step 2 — Inside the component function, add:
    const logout = useAuthStore((s) => s.logout);

  Step 3 — Add onClick to the DropdownMenuItem:
    <DropdownMenuItem
      className="text-destructive focus:text-destructive"
      onClick={() => {
        logout();
        navigate(AUTH_ROUTES.LOGIN);
      }}
    >

  Step 4 — Add AUTH_ROUTES to the existing ROUTES import from '@/lib/constants':
    import { ROUTES, AUTH_ROUTES } from '@/lib/constants';

──────────────────────────────────────────────────────
FIX 6 — CRITICAL: User header dropdown items have no onClick handlers
──────────────────────────────────────────────────────
File: src/features/user/layout/components/UserHeader.tsx

Problem: 4 DropdownMenuItems with NO onClick:
  1. "Hồ sơ cá nhân"  → line ~80
  2. "Ví & Thanh toán" → line ~84
  3. "Cài đặt"         → line ~88
  4. "Đăng xuất"       → line ~93

Fix:
  Step 1 — Add imports at top of file:
    import { useNavigate } from 'react-router-dom';
    import { useAuthStore } from '@/features/auth';
    import { AUTH_ROUTES } from '@/lib/constants';

  Step 2 — Inside component function add:
    const navigate = useNavigate();
    const logout = useAuthStore((s) => s.logout);

  Step 3 — Wire each DropdownMenuItem:

  "Hồ sơ cá nhân":
    <DropdownMenuItem
      className="cursor-pointer gap-3 rounded-xl px-3 py-2.5"
      onClick={() => navigate('/profile')}
    >

  "Ví & Thanh toán":
    <DropdownMenuItem
      className="cursor-pointer gap-3 rounded-xl px-3 py-2.5"
      onClick={() => navigate('/wallet')}
    >

  "Cài đặt":
    <DropdownMenuItem
      className="cursor-pointer gap-3 rounded-xl px-3 py-2.5"
      onClick={() => navigate('/profile/preferences')}
    >
    (Route /profile/preferences exists. /settings does not exist yet for user.)

  "Đăng xuất":
    <DropdownMenuItem
      className="cursor-pointer gap-3 rounded-xl px-3 py-2.5 text-red-500 focus:bg-red-50 focus:text-red-500 dark:focus:bg-red-900/20"
      onClick={() => {
        logout();
        navigate('/login');
      }}
    >
    Add import { toast } from 'sonner'; and add toast.info("Đã đăng xuất") before navigate.

──────────────────────────────────────────────────────
FIX 7 — Broken "DỪNG SẠC NGAY" button in ChargingDashboardPage
──────────────────────────────────────────────────────
File: src/features/user/charging/pages/ChargingDashboardPage.tsx  line ~110

Problem: <Button className="h-14 w-full ...">DỪNG SẠC NGAY</Button>  — no onClick.

Fix:
  Add import: import { toast } from 'sonner';
  Add onClick:
    <Button
      className="h-14 w-full rounded-2xl bg-white font-black ..."
      onClick={() => {
        toast.success("Phiên sạc đã dừng lại");
        // In future: call stopChargingSession() API
      }}
    >

──────────────────────────────────────────────────────
FIX 8 — Broken "DỪNG SẠC NGAY" button in LiveChargingPage
──────────────────────────────────────────────────────
File: src/features/user/charging/pages/LiveChargingPage.tsx  line ~156

Problem: <Button className="h-16 w-full rounded-2xl bg-red-500 ...">DỪNG SẠC NGAY</Button>
  No onClick handler.

Fix:
  Add import: import { toast } from 'sonner';
  Add onClick with confirmation:
    import { useState } from 'react';
    const [stopping, setStopping] = useState(false);

    <Button
      className="h-16 w-full rounded-2xl bg-red-500 ..."
      disabled={stopping}
      onClick={() => {
        setStopping(true);
        setTimeout(() => {
          toast.success("Đã dừng sạc. Hóa đơn đang được xử lý...");
          setStopping(false);
          // In future: navigate('/charging/sessions/SESS-ID')
        }, 1200);
      }}
    >
      {stopping ? "Đang dừng..." : "DỪNG SẠC NGAY"}
    </Button>

──────────────────────────────────────────────────────
FIX 9 — Broken "Chấm công ngay" button in StaffHomePage
──────────────────────────────────────────────────────
File: src/features/staff/home/pages/StaffHomePage.tsx  line ~21

Problem: <Button className="w-full bg-yellow-500 ...">Chấm công ngay</Button>  — no onClick.

Fix:
  Add imports:
    import { useState } from 'react';
    import { toast } from 'sonner';
  Add state:
    const [isClockedIn, setIsClockedIn] = useState(false);
  Update button:
    <Button
      className={`w-full ${isClockedIn ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-yellow-500 hover:bg-yellow-600'} ...`}
      onClick={() => {
        setIsClockedIn(!isClockedIn);
        if (!isClockedIn) {
          toast.success("Đã chấm công vào lúc " + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
        } else {
          toast.info("Đã chấm công ra");
        }
      }}
    >
      {isClockedIn ? "✓ Đã chấm công" : "Chấm công ngay"}
    </Button>

──────────────────────────────────────────────────────
FIX 10 — Broken "Phân ca mới" button in SchedulePage
──────────────────────────────────────────────────────
File: src/features/owner/staff/pages/SchedulePage.tsx  line ~75

Problem: <Button className="gap-2"><Plus .../> Phân ca mới</Button>  — no onClick.

Fix (minimal — use toast until full dialog is built):
  Add import: import { toast } from 'sonner';
  Add onClick:
    <Button className="gap-2" onClick={() => toast.info("Tính năng phân ca mới đang được phát triển")}>
      <Plus className="h-4 w-4" /> Phân ca mới
    </Button>

  OR wire to the AssignShiftDialog if it has been built per missing-screens.md.

──────────────────────────────────────────────────────
FIX 11 — Broken profile avatar edit button in ProfileOverviewPage
──────────────────────────────────────────────────────
File: src/features/user/profile/pages/ProfileOverviewPage.tsx  line ~78

Problem: <button className="absolute -bottom-2 -right-2 ..."><Edit2 /></button>  — no onClick.

Fix:
  Add import: import { toast } from 'sonner';
  Add onClick:
    <button
      className="absolute -bottom-2 -right-2 ..."
      onClick={() => toast.info("Tính năng thay đổi ảnh đang được phát triển")}
    >

═══════════════════════════════════════════════════════
VERIFICATION CHECKLIST
═══════════════════════════════════════════════════════

After implementing all fixes, verify:

[ ] 1. Admin logs in → redirected to /admin/dashboard (NOT /dashboard → 404)
[ ] 2. Admin clicks "Đăng xuất" in header dropdown → auth cleared, redirected to /auth/login
[ ] 3. User clicks "Lịch sử sạc" → goes to /wallet/transactions (not 404)
[ ] 4. User clicks "SẠC NGAY" → shows toast OR navigates to /checkin (not 404)
[ ] 5. Marketing footer links (/features, /app, /report) → no longer 404
[ ] 6. User header "Hồ sơ cá nhân" → navigates to /profile
[ ] 7. User header "Ví & Thanh toán" → navigates to /wallet
[ ] 8. User header "Cài đặt" → navigates to /profile/preferences
[ ] 9. User header "Đăng xuất" → auth cleared, toast shown, redirected to /login
[ ] 10. "DỪNG SẠC NGAY" (both pages) → shows toast feedback
[ ] 11. "Chấm công ngay" (StaffHomePage) → toggles state, shows toast
[ ] 12. "Phân ca mới" (SchedulePage) → shows toast or opens dialog
[ ] 13. Avatar edit button (ProfileOverviewPage) → shows toast

═══════════════════════════════════════════════════════
FILES TO MODIFY (exact list)
═══════════════════════════════════════════════════════

1. src/app/router/PublicRoute.tsx
2. src/app/router/PrivateRoute.tsx
3. src/features/user/charging/pages/ChargingDashboardPage.tsx
4. src/features/user/charging/pages/LiveChargingPage.tsx
5. src/features/user/layout/MarketingLayout.tsx
6. src/features/user/layout/components/UserHeader.tsx
7. src/features/user/profile/pages/ProfileOverviewPage.tsx
8. src/features/staff/home/pages/StaffHomePage.tsx
9. src/features/owner/staff/pages/SchedulePage.tsx
10. src/layouts/components/Header.tsx
