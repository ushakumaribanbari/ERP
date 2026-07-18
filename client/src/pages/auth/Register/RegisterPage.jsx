import { useState } from 'react';
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

// ═══════════════════════════════════════════════════════════════
// Smart Registration Flow
// ─────────────────────────────────────────────────────────────
// The "Register" button is ALWAYS enabled and drives the whole flow:
//
//  Phase 1  →  User fills all fields, clicks "Register"
//              • Validates fields client-side
//              • Sends OTP to email automatically
//              • Shows OTP input panel
//
//  Phase 2  →  User enters 6-digit OTP, clicks "Verify & Continue"
//              • Verifies OTP against server
//              • On success → advances to Phase 3
//
//  Phase 3  →  Button becomes "Create Account"
//              • Submits the full registration payload
//              • Redirects to /login on success
// ═══════════════════════════════════════════════════════════════

// ── Password strength ──────────────────────────────────────────
function getPasswordStrength(pwd) {
  if (!pwd) return { score: 0, label: '', tier: '' };
  let score = 0;
  if (pwd.length >= 8)           score++;
  if (/[A-Z]/.test(pwd))        score++;
  if (/[0-9]/.test(pwd))        score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { score, label: 'Weak',   tier: 'weak'   };
  if (score <= 2) return { score, label: 'Fair',   tier: 'fair'   };
  return          { score, label: 'Strong', tier: 'strong' };
}

// ── Inline SVG icons ───────────────────────────────────────────
const Icon = {
  User: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  Badge: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  Mail: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
    </svg>
  ),
  Lock: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>
    </svg>
  ),
  Shield: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7z"/>
    </svg>
  ),
  Briefcase: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  ),
  Key: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="17" r="4"/><path d="M10.5 13.5L21 3m-4 0l2 2-2 2"/>
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ),
  Check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Alert: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Send: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
};

// ── ERP logo ───────────────────────────────────────────────────
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

// ══════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════
function RegisterPage() {
  const { register, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  // ── Form fields ──────────────────────────────────────────────
  const [username,        setUsername]        = useState('');
  const [fullName,        setFullName]        = useState('');
  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role,            setRole]            = useState('Employee');
  const [showPassword,    setShowPassword]    = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);

  // ── OTP state ────────────────────────────────────────────────
  // phase: 'fill' | 'otp' | 'verified'
  const [phase,       setPhase]       = useState('fill');
  const [otp,         setOtp]         = useState('');
  const [verifiedOtp, setVerifiedOtp] = useState('');

  // ── OTP resend cooldown ──────────────────────────────────────
  const [resendCooldown, setResendCooldown] = useState(0);

  // ── UI state ─────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  const pwdStrength = getPasswordStrength(password);

  // ── Step numbers for the indicator ───────────────────────────
  const stepNum = phase === 'fill' ? 1 : phase === 'otp' ? 2 : 3;

  // ── Field validation ─────────────────────────────────────────
  const validateFields = () => {
    if (!username.trim())             return 'Username is required.';
    if (username.trim().length < 3)   return 'Username must be at least 3 characters.';
    if (!fullName.trim())             return 'Full name is required.';
    if (!email.trim())                return 'Email address is required.';
    if (!email.toLowerCase().endsWith('@gmail.com'))
                                      return 'Only @gmail.com accounts are accepted.';
    if (!password)                    return 'Password is required.';
    if (password.length < 8)          return 'Password must be at least 8 characters.';
    if (!/[a-z]/.test(password))      return 'Password must contain at least one lowercase letter.';
    if (!/[A-Z]/.test(password))      return 'Password must contain at least one uppercase letter.';
    if (!/\d/.test(password))         return 'Password must contain at least one number.';
    if (!/[@$!%*?&#^_-]/.test(password)) return 'Password must contain at least one special character.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  // ── Cooldown timer ────────────────────────────────────────────
  const startCooldown = (seconds = 60) => {
    setResendCooldown(seconds);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Dispatch OTP (shared between first send & resend) ─────────
  const dispatchOtp = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const result = await sendOtp({
        email: email.trim().toLowerCase(),
        username: username.trim(),
      });
      setPhase('otp');
      setOtp('');
      setSuccess(result.message || `Verification code sent to ${email.trim().toLowerCase()}.`);
      startCooldown(60);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Failed to send OTP. Please check your email address and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ══════════════════════════════════════════════════════════════
  // THE SINGLE SMART BUTTON HANDLER
  // ══════════════════════════════════════════════════════════════
  const handleMainAction = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // ── Phase 1: Validate fields → send OTP ───────────────────
    if (phase === 'fill') {
      const fieldError = validateFields();
      if (fieldError) {
        setError(fieldError);
        return;
      }
      await dispatchOtp();
      return;
    }

    // ── Phase 2: Verify OTP ───────────────────────────────────
    if (phase === 'otp') {
      if (!otp.trim() || otp.length < 6) {
        setError('Please enter the complete 6-digit OTP sent to your email.');
        return;
      }
      setLoading(true);
      try {
        await verifyOtp({ email: email.trim().toLowerCase(), otp: otp.trim() });
        setVerifiedOtp(otp.trim());
        setPhase('verified');
        setSuccess('✅ Email verified! Click "Create Account" below to complete your registration.');
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          'Invalid or expired OTP. Please try again or request a new one.'
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    // ── Phase 3: Submit registration ──────────────────────────
    if (phase === 'verified') {
      const fieldError = validateFields();
      if (fieldError) { setError(fieldError); return; }

      setLoading(true);
      try {
        await register({
          username:  username.trim(),
          fullName:  fullName.trim(),
          email:     email.trim().toLowerCase(),
          password,
          role,
          otp:       verifiedOtp,
        });
        setSuccess('🎉 Account created successfully! Redirecting to login…');
        setTimeout(() => navigate('/login'), 2200);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          'Registration failed. Please try again.'
        );
        // If OTP expired server-side, reset to fill phase
        if (err.response?.data?.message?.toLowerCase().includes('otp')) {
          setPhase('fill');
          setOtp('');
          setVerifiedOtp('');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // ── Go back to edit fields ────────────────────────────────────
  const handleEditFields = () => {
    setPhase('fill');
    setOtp('');
    setVerifiedOtp('');
    setError('');
    setSuccess('');
  };

  // ── Main button label & icon ──────────────────────────────────
  const btnLabel = () => {
    if (loading) {
      const labels = { fill: 'Sending OTP…', otp: 'Verifying…', verified: 'Creating Account…' };
      return <><span className="register-spinner" /> {labels[phase]}</>;
    }
    if (phase === 'fill')     return <><Icon.Send />     Send OTP &amp; Continue</>;
    if (phase === 'otp')      return <><Icon.Check />    Verify Email &amp; Continue</>;
    return                          <><Icon.ArrowRight /> Create Account</>;
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="register-bg">

      {/* ── Left Brand Panel ─────────────────────────────────── */}
      <aside className="register-brand">
        <div className="register-brand__logo">
          <div className="register-brand__logo-icon"><ERPLogo /></div>
          <div className="register-brand__logo-text">
            <span className="register-brand__logo-name">AiCoreSystem ERP</span>
            <span className="register-brand__logo-tag">Enterprise Platform</span>
          </div>
        </div>

        <div className="register-brand__body">
          <h2 className="register-brand__headline">
            The command center for your <span>entire business</span>
          </h2>
          <p className="register-brand__desc">
            Join your team on AICoreSystemERP — a unified platform for HR, inventory,
            finance, and operations. Everything you need, in one place.
          </p>
          <ul className="register-brand__features">
            {[
              { icon: '🔐', text: 'Secure OTP email verification' },
              { icon: '🏢', text: 'Role-based access control' },
              { icon: '📊', text: 'Real-time dashboards & analytics' },
              { icon: '🔗', text: 'Seamless cross-department workflows' },
            ].map(({ icon, text }) => (
              <li key={text} className="register-brand__feature">
                <span className="register-brand__feature-icon">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="register-brand__footer">
          © {new Date().getFullYear()} AiCoreSystem · All rights reserved.<br />
          Secure · Reliable · Enterprise-ready
        </p>
      </aside>

      {/* ── Right Form Panel ─────────────────────────────────── */}
      <main className="register-panel">
        <div className="register-card">

          {/* Header */}
          <div className="register-card__header">
            <div className="register-card__eyebrow">
              <span>🔐</span> Employee Registration Portal
            </div>
            <h1 className="register-card__title">Create your account</h1>
            <p className="register-card__subtitle">
              {phase === 'fill'     && 'Fill in your details and we\'ll verify your email before creating your account.'}
              {phase === 'otp'      && `Enter the 6-digit OTP sent to ${email}.`}
              {phase === 'verified' && 'Your email is verified. Click below to complete registration.'}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="register-steps" role="list" aria-label="Registration steps">
            {[
              { n: 1, label: 'Fill Details' },
              { n: 2, label: 'Verify Email' },
              { n: 3, label: 'Complete'     },
            ].map(({ n, label }) => {
              const isDone   = stepNum > n;
              const isActive = stepNum === n;
              return (
                <div
                  key={n}
                  className={`register-step${isDone ? ' register-step--done' : ''}${isActive ? ' register-step--active' : ''}`}
                  role="listitem"
                >
                  <div className="register-step__bubble">
                    {isDone ? <Icon.Check /> : n}
                  </div>
                  <span className="register-step__label">{label}</span>
                </div>
              );
            })}
          </div>

          {/* Alerts */}
          {error && (
            <div className="register-alert register-alert--error" role="alert">
              <span className="register-alert__icon"><Icon.Alert /></span>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="register-alert register-alert--success" role="alert">
              <span className="register-alert__icon"><Icon.CheckCircle /></span>
              <span>{success}</span>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              FORM
          ══════════════════════════════════════════════════ */}
          <form className="register-form" onSubmit={handleMainAction} noValidate>

            {/* ─── Phase 1 & 3: Show all fields ─────────────── */}
            {(phase === 'fill' || phase === 'verified') && (
              <>
                {/* Username + Full Name */}
                <div className="register-form__row">
                  <div className="register-form__group">
                    <label className="register-form__label" htmlFor="reg-username">
                      <Icon.User /> Username
                    </label>
                    <div className="register-input-wrap">
                      <span className="register-input-icon"><Icon.User /></span>
                      <input
                        id="reg-username"
                        type="text"
                        className="register-form__input"
                        placeholder="johndoe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={phase === 'verified'}
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  <div className="register-form__group">
                    <label className="register-form__label" htmlFor="reg-fullName">
                      <Icon.Badge /> Full Name
                    </label>
                    <div className="register-input-wrap">
                      <span className="register-input-icon"><Icon.Badge /></span>
                      <input
                        id="reg-fullName"
                        type="text"
                        className="register-form__input"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={phase === 'verified'}
                        autoComplete="name"
                      />
                    </div>
                  </div>
                </div>

                {/* Email — with verified badge in phase 3 */}
                <div className="register-form__group">
                  <label className="register-form__label" htmlFor="reg-email">
                    <Icon.Mail /> Email Address
                    {phase === 'verified' && (
                      <span className="register-form__label-badge">✓ Verified</span>
                    )}
                  </label>
                  <div className="register-input-wrap">
                    <span className="register-input-icon"><Icon.Mail /></span>
                    <input
                      id="reg-email"
                      type="email"
                      className={`register-form__input${phase === 'verified' ? ' register-form__input--verified' : ''}`}
                      placeholder="you@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={phase === 'verified'}
                      autoComplete="email"
                    />
                  </div>
                  {phase === 'verified' && (
                    <button type="button" className="register-change-link" onClick={handleEditFields}>
                      ← Change email or edit details
                    </button>
                  )}
                </div>

                {/* System Role */}
                <div className="register-form__group">
                  <label className="register-form__label" htmlFor="reg-role">
                    <Icon.Briefcase /> System Role
                  </label>
                  <div className="register-input-wrap">
                    <span className="register-input-icon"><Icon.Briefcase /></span>
                    <select
                      id="reg-role"
                      className="register-form__input"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Employee">Employee</option>
                      <option value="Admin">Admin</option>
                      <option value="HR">HR Manager</option>
                      <option value="Accountant">Accountant</option>
                      <option value="Inventory Manager">Inventory Manager</option>
                      <option value="Sales Executive">Sales Executive</option>
                    </select>
                  </div>
                </div>

                {/* Password + Confirm */}
                <div className="register-form__row">
                  <div className="register-form__group">
                    <label className="register-form__label" htmlFor="reg-password">
                      <Icon.Lock /> Password
                    </label>
                    <div className="register-input-wrap">
                      <span className="register-input-icon"><Icon.Lock /></span>
                      <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        className="register-form__input"
                        placeholder="Min. 6 chars"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={phase === 'verified'}
                        autoComplete="new-password"
                        style={{ paddingRight: 38 }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="register-eye-btn"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <Icon.EyeOff /> : <Icon.Eye />}
                      </button>
                    </div>
                    {password && (
                      <>
                        <div className="register-pwd-strength">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`register-pwd-bar${i <= pwdStrength.score ? ` register-pwd-bar--${pwdStrength.tier}` : ''}`}
                            />
                          ))}
                        </div>
                        <span className={`register-pwd-label register-pwd-label--${pwdStrength.tier}`}>
                          {pwdStrength.label} password
                        </span>
                      </>
                    )}
                  </div>

                  <div className="register-form__group">
                    <label className="register-form__label" htmlFor="reg-confirmPassword">
                      <Icon.Shield /> Confirm
                    </label>
                    <div className="register-input-wrap">
                      <span className="register-input-icon"><Icon.Shield /></span>
                      <input
                        id="reg-confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        className="register-form__input"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={phase === 'verified'}
                        autoComplete="new-password"
                        style={{ paddingRight: 38 }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="register-eye-btn"
                        aria-label={showConfirm ? 'Hide' : 'Show'}
                      >
                        {showConfirm ? <Icon.EyeOff /> : <Icon.Eye />}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ─── Phase 2: OTP Input panel ─────────────────── */}
            {phase === 'otp' && (
              <div className="register-otp-panel">
                {/* Email summary */}
                <div className="register-otp-email-chip">
                  <Icon.Mail />
                  <span>{email}</span>
                  <button type="button" onClick={handleEditFields} className="register-otp-change">
                    Change
                  </button>
                </div>

                {/* OTP digits */}
                <div className="register-form__group">
                  <label className="register-form__label" htmlFor="reg-otp">
                    <Icon.Key /> Enter 6-digit OTP
                  </label>
                  <input
                    id="reg-otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className="register-form__input register-form__input--no-icon register-form__input--otp"
                    placeholder="• • • • • •"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    autoFocus
                    autoComplete="one-time-code"
                  />
                  <p className="register-otp-hint">
                    Didn&apos;t receive the code?&nbsp;
                    {resendCooldown > 0
                      ? <span style={{ color: '#94a3b8' }}>Resend in {resendCooldown}s</span>
                      : (
                        <button
                          type="button"
                          onClick={dispatchOtp}
                          disabled={loading}
                          className="register-otp-resend-btn"
                        >
                          Resend OTP
                        </button>
                      )
                    }
                  </p>
                </div>
              </div>
            )}

            {/* ─── Divider ──────────────────────────────────── */}
            <div className="register-divider">
              {phase === 'fill'     && 'Step 1 — Verify your email first'}
              {phase === 'otp'      && 'Step 2 — Enter the code from your inbox'}
              {phase === 'verified' && 'Step 3 — Confirm and create your account'}
            </div>

            {/* ─── THE SMART SUBMIT BUTTON ──────────────────── */}
            <button
              type="submit"
              id="reg-submit-btn"
              className="register-form__submit"
              disabled={loading}
            >
              {btnLabel()}
            </button>

            <p className="register-form__footer-text">
              Already have an account?{' '}
              <Link to="/login" className="register-form__link">Sign in here</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
