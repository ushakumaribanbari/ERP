// routes/ProtectedRoute.jsx
// Guards routes based on authentication and optional role requirements.
// Usage:
//   <ProtectedRoute />                          — any authenticated user
//   <ProtectedRoute allowedRoles={["Admin"]} /> — Admin only

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccessDeniedInline = ({ role }) => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    color: '#111',
    fontFamily: 'inherit',
    gap: '12px',
  }}>
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="27" stroke="#ef4444" strokeWidth="2" fill="#fff0f0"/>
      <path d="M20 20l16 16M36 20L20 36" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
    <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Access Denied</h1>
    <p style={{ color: '#666', margin: 0 }}>
      Your role (<strong>{role}</strong>) is not authorized to view this page.
    </p>
    <a
      href="/"
      style={{
        marginTop: '8px',
        padding: '9px 20px',
        background: '#4f46e5',
        color: '#fff',
        borderRadius: '6px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 600,
      }}
    >
      Go Home
    </a>
  </div>
);

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // While validating stored token, render nothing (or a spinner)
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '32px', height: '32px',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #4f46e5',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }} />
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed → show access denied
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <AccessDeniedInline role={user?.role} />;
  }

  // Authorized — render the nested route
  return <Outlet />;
};

export default ProtectedRoute;
