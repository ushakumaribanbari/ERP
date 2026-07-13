import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LeavePage from "./pages/Leave/LeavePage";
import MainLayout from "./layouts/MainLayout";
import {AttendanceProvider} from "./context/AttendanceContext";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import EmployeesPage from "./pages/Employees/EmployeesPage";
import AttendancePage from "./pages/Attendance/AttendancePage";
import PayrollPage from "./pages/Payroll/PayrollPage";
import FinancePage from "./pages/Finance/FinancePage";
//import InventoryPage from "./pages/Inventory/InventoryPage";
import ReportsPage from "./pages/Reports/ReportsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import CompanySettingsPage from "./pages/settings/company/CompanySettingsPage";
import ProfileSettingsPage from "./pages/settings/profile/ProfileSettingsPage";
import SecuritySettingsPage from "./pages/settings/security/SecuritySettingsPage";
import ThemeSettingsPage from "./pages/settings/theme/ThemeSettingsPage";
import NotificationSettingsPage from "./pages/settings/notifications/NotificationSettingsPage";
import SystemPreferencesPage from "./pages/settings/preferences/SystemPreferencesPage";



function App() {
  return (
    <AttendanceProvider>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* All ERP pages use the common layout */}
        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/employees" element={<EmployeesPage />} />

          <Route path="/attendance" element={<AttendancePage />} />

          <Route
    path="/leaves"
    element={<LeavePage />}
/>

          <Route path="/payroll" element={<PayrollPage />} />

          <Route path="/finance" element={<FinancePage />} />

          {/* <Route path="/inventory" element={<InventoryPage />} /> */}

          <Route path="/reports" element={<ReportsPage />} />

          <Route path="/settings" element={<SettingsPage />} />

          <Route
    path="/settings/company"
    element={<CompanySettingsPage />}
/>

<Route
    path="/settings/profile"
    element={<ProfileSettingsPage />}
/>
<Route
    path="/settings/security"
    element={<SecuritySettingsPage />}
/>

<Route
    path="/settings/theme"
    element={<ThemeSettingsPage />}
/>

<Route
    path="/settings/notifications"
    element={<NotificationSettingsPage />}
/>

<Route
    path="/settings/preferences"
    element={<SystemPreferencesPage />}
/>
        </Route>

      </Routes>
    </BrowserRouter>
    </AttendanceProvider>
  );
}

export default App;