import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Routes - Any authenticated role */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Example of Role-Protected Routes */}
          {/* 
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin-only" element={<div>Admin Dashboard</div>} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['Admin', 'HR']} />}>
            <Route path="/hr-portal" element={<div>HR Dashboard</div>} />
          </Route>
          */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
