// services/authService.js
// Axios instance + all auth API calls.
// Automatically attaches JWT token to every request via interceptor.

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// ── Create Axios instance ─────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach token if present ─────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('erp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 globally ────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear storage
      localStorage.removeItem('erp_token');
      localStorage.removeItem('erp_user');
    }
    return Promise.reject(error);
  }
);

// ── Auth API calls ────────────────────────────────────────────

/**
 * Send OTP for registration.
 * @param {{ email }} data
 */
export const sendOtp = async (data) => {
  const response = await api.post('/auth/send-otp', data);
  return response.data;
};

/**
 * Verify OTP.
 * @param {{ email, otp }} data
 */
export const verifyOtpApi = async (data) => {
  const response = await api.post('/auth/verify-otp', data);
  return response.data;
};

/**
 * Register a new user with OTP.
 * @param {{ username, fullName, email, password, role, otp }} data
 */
export const registerUser = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

/**
 * Login with email and password.
 * @param {{ email, password }} data
 */
export const loginUser = async (data) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

/**
 * Get the currently logged-in user (requires token).
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

/**
 * Send OTP for forgotten password.
 * @param {{ email }} data
 */
export const forgotPasswordApi = async (data) => {
  const response = await api.post('/auth/forgot-password', data);
  return response.data;
};

/**
 * Reset password with OTP.
 * @param {{ email, otp, password }} data
 */
export const resetPasswordApi = async (data) => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};

export default api;
