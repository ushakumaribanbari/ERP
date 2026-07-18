import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import './ForgotPasswordPage.css';

// ── Icons ──────────────────────────────────────────────────────
const Icons = {
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Eye: ({ off }) => off ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
};

function ERPLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
      <rect x="2"  y="2"  width="12" height="12" rx="2" fill="white" fillOpacity="0.9"/>
      <rect x="18" y="2"  width="12" height="12" rx="2" fill="white" fillOpacity="0.5"/>
      <rect x="2"  y="18" width="12" height="12" rx="2" fill="white" fillOpacity="0.5"/>
      <rect x="18" y="18" width="12" height="12" rx="2" fill="white" fillOpacity="0.7"/>
    </svg>
  );
}

function ForgotPasswordPage() {
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Phase: 'email' | 'otp' | 'reset'
  const [phase, setPhase] = useState('email');
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Strength logic
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[@$!%*?&#^_-]/.test(pwd)) score++;
    return score;
  };
  const pwdStrength = getPasswordStrength(password);

  const startCooldown = (seconds = 60) => {
    setResendCooldown(seconds);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const dispatchOtp = async () => {
    if (!email.trim() || !email.toLowerCase().endsWith('@gmail.com')) {
      setError('Please enter a valid @gmail.com address.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await forgotPassword({ email: email.trim().toLowerCase() });
      setSuccess(res.message || 'OTP sent successfully!');
      setPhase('otp');
      setOtp('');
      startCooldown(60);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Failed to send OTP.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    setError('');
    setSuccess('OTP entered. Please choose a new password.');
    setPhase('reset');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (!/[a-z]/.test(password)) return setError('Password must contain at least one lowercase letter.');
    if (!/[A-Z]/.test(password)) return setError('Password must contain at least one uppercase letter.');
    if (!/\d/.test(password)) return setError('Password must contain at least one number.');
    if (!/[@$!%*?&#^_-]/.test(password)) return setError('Password must contain at least one special character.');
    if (password !== confirmPassword) return setError('Passwords do not match.');

    setLoading(true);
    try {
      await resetPassword({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        password
      });
      setSuccess('🎉 Password reset successfully! Redirecting to login…');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Failed to reset password.'
      );
      if (err.response?.data?.message?.toLowerCase().includes('otp')) {
        setPhase('otp'); // push back to OTP phase if OTP failed
        setOtp('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-bg">
      <div className="forgot-brand">
        <div className="forgot-logo">
          <ERPLogo /> AICoreSystemERP
        </div>
        <div>
          <h2>Secure Account Recovery</h2>
          <p style={{ opacity: 0.8, marginTop: '1rem', lineHeight: 1.6 }}>
            Gain access back to your account using secure email verification.
          </p>
        </div>
      </div>

      <div className="forgot-form-container">
        <div className="forgot-card">
          <div className="forgot-header">
            <h1>Reset Password</h1>
            <p>
              {phase === 'email' && 'Enter your email to receive an OTP.'}
              {phase === 'otp' && `We sent a code to ${email}`}
              {phase === 'reset' && 'Create a strong new password.'}
            </p>
          </div>

          {error && <div className="forgot-alert forgot-alert--error">{error}</div>}
          {success && <div className="forgot-alert forgot-alert--success">{success}</div>}

          {/* Phase 1: Email */}
          {phase === 'email' && (
            <form onSubmit={(e) => { e.preventDefault(); dispatchOtp(); }}>
              <div className="forgot-group">
                <label>Email Address</label>
                <div className="forgot-input-wrapper">
                  <span className="forgot-input-icon"><Icons.Mail /></span>
                  <input
                    type="email"
                    className="forgot-input"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="forgot-submit" disabled={loading}>
                {loading ? <span className="forgot-spinner" /> : (
                  <>Send Verification Code <Icons.ArrowRight /></>
                )}
              </button>
            </form>
          )}

          {/* Phase 2: OTP */}
          {phase === 'otp' && (
            <form onSubmit={handleVerifyOtp}>
              <div className="forgot-group">
                <label style={{ textAlign: 'center' }}>Enter 6-Digit Code</label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    className="forgot-input"
                    style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}
                    maxLength="6"
                    placeholder="------"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="forgot-submit" disabled={!otp || otp.length < 6}>
                Continue <Icons.ArrowRight />
              </button>
              
              <div className="forgot-resend">
                {resendCooldown > 0 ? (
                  <span>Resend code in {resendCooldown}s</span>
                ) : (
                  <button type="button" onClick={dispatchOtp} disabled={loading}>
                    Resend Code
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Phase 3: New Password */}
          {phase === 'reset' && (
            <form onSubmit={handleResetPassword}>
              <div className="forgot-group">
                <label>New Password</label>
                <div className="forgot-input-wrapper">
                  <span className="forgot-input-icon"><Icons.Lock /></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="forgot-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icons.Eye off={showPassword} />
                  </button>
                </div>
                {/* Strength Indicator */}
                {password && (
                  <div className="pwd-strength-bar">
                    <div 
                      className="pwd-strength-fill"
                      style={{
                        width: `${(pwdStrength / 5) * 100}%`,
                        backgroundColor: pwdStrength <= 2 ? '#ef4444' : pwdStrength === 3 ? '#f59e0b' : '#10b981'
                      }}
                    />
                  </div>
                )}
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: password.length >= 8 ? '#10b981' : 'inherit' }}>✓ At least 8 characters</span>
                  <span style={{ color: /[a-z]/.test(password) && /[A-Z]/.test(password) ? '#10b981' : 'inherit' }}>✓ Upper & lowercase letters</span>
                  <span style={{ color: /\d/.test(password) && /[@$!%*?&#^_-]/.test(password) ? '#10b981' : 'inherit' }}>✓ Numbers & special characters</span>
                </div>
              </div>

              <div className="forgot-group">
                <label>Confirm Password</label>
                <div className="forgot-input-wrapper">
                  <span className="forgot-input-icon"><Icons.Lock /></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="forgot-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="forgot-submit" disabled={loading}>
                {loading ? <span className="forgot-spinner" /> : (
                  <>Reset Password <Icons.CheckCircle /></>
                )}
              </button>
            </form>
          )}

          <div className="forgot-footer">
            Remembered your password? <Link to="/login" className="forgot-link">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
