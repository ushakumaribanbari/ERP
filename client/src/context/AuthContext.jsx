// context/AuthContext.jsx
// Global auth state — provides user, token, isAuthenticated.
// Persists token in localStorage and validates it on app load.

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, getCurrentUser, sendOtp, verifyOtpApi, forgotPasswordApi, resetPasswordApi } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('erp_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // true while validating stored token

  // ── On mount: validate stored token ──────────────────────────
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('erp_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const data = await getCurrentUser();
        setUser(data.user);
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch {
        // Token invalid or expired — clear storage
        localStorage.removeItem('erp_token');
        localStorage.removeItem('erp_user');
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  // ── Login ─────────────────────────────────────────────────────
  const login = useCallback(async (email, password, rememberMe = false) => {
    const data = await loginUser({ email, password });
    const { token: newToken, user: newUser } = data;

    // Persist token
    if (rememberMe) {
      localStorage.setItem('erp_token', newToken);
      localStorage.setItem('erp_user', JSON.stringify(newUser));
    } else {
      // Still store in localStorage for session but note: sessionStorage is not shared
      localStorage.setItem('erp_token', newToken);
      localStorage.setItem('erp_user', JSON.stringify(newUser));
    }

    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
    return data;
  }, []);

  // ── Register ──────────────────────────────────────────────────
  const register = useCallback(async (formData) => {
    const data = await registerUser(formData);
    return data;
  }, []);

  // ── Send OTP ──────────────────────────────────────────────────
  const triggerSendOtp = useCallback(async (formData) => {
    const data = await sendOtp(formData);
    return data;
  }, []);

  // ── Verify OTP ────────────────────────────────────────────────
  const verifyOtp = useCallback(async (formData) => {
    const data = await verifyOtpApi(formData);
    return data;
  }, []);

  // ── Logout ────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('erp_token');
    localStorage.removeItem('erp_user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    sendOtp: triggerSendOtp,
    verifyOtp,
    forgotPassword: forgotPasswordApi,
    resetPassword: resetPasswordApi,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for easy context access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
