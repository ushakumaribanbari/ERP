import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AttendanceProvider } from "./context/AttendanceContext";
import { useAuth } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/auth/Login/LoginPage";
import RegisterPage from "./pages/auth/Register/RegisterPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import EmployeesPage from "./pages/Employees/EmployeesPage";
import AttendancePage from "./pages/Attendance/AttendancePage";
import LeavePage from "./pages/Leave/LeavePage";
import PayrollPage from "./pages/Payroll/PayrollPage";
import FinancePage from "./pages/Finance/FinancePage";
import ReportsPage from "./pages/Reports/ReportsPage";
import SettingsPage from "./pages/Settings/SettingsPage";

import CompanySettingsPage from "./pages/settings/company/CompanySettingsPage";
import ProfileSettingsPage from "./pages/settings/profile/ProfileSettingsPage";
import SecuritySettingsPage from "./pages/settings/security/SecuritySettingsPage";
import ThemeSettingsPage from "./pages/settings/theme/ThemeSettingsPage";
import NotificationSettingsPage from "./pages/settings/notifications/NotificationSettingsPage";
import SystemPreferencesPage from "./pages/settings/preferences/SystemPreferencesPage";

function App() {
    const { isAuthenticated, loading } = useAuth();

    // Wait until token validation is complete
    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "20px",
                    fontWeight: "600",
                }}
            >
                Loading...
            </div>
        );
    }

    return (
        
            <BrowserRouter>
                <Routes>

                    {/* Root */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated
                                ? <Navigate to="/dashboard" replace />
                                : <Navigate to="/login" replace />
                        }
                    />

                    
                    {/* Login */}
                    <Route
                        path="/login"
                        element={
                            isAuthenticated
                                ? <Navigate to="/dashboard" replace />
                                : <LoginPage />
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            isAuthenticated
                                ? <Navigate to="/dashboard" replace />
                                : <RegisterPage />
                        }
                    />

                    {/* Protected ERP Routes */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <MainLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            path="/dashboard"
                            element={<DashboardPage />}
                        />

                        <Route
                            path="/employees"
                            element={<EmployeesPage />}
                        />

                        <Route
                            path="/attendance"
                            element={<AttendancePage />}
                        />

                        <Route
                            path="/leaves"
                            element={<LeavePage />}
                        />

                        <Route
                            path="/payroll"
                            element={<PayrollPage />}
                        />

                        <Route
                            path="/finance"
                            element={<FinancePage />}
                        />

                        <Route
                            path="/reports"
                            element={<ReportsPage />}
                        />

                        <Route
                            path="/settings"
                            element={<SettingsPage />}
                        />

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

                    {/* Unknown Routes */}
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to={isAuthenticated ? "/dashboard" : "/login"}
                                replace
                            />
                        }
                    />

                </Routes>
            </BrowserRouter>
        
    );
}

export default App;