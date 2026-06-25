import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password, rememberMe);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">

        {/* Header */}
        <div className="login-card__header">
          <h1 className="login-card__title">Sign in</h1>
          <p className="login-card__subtitle">Enter your credentials to continue</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>

          {error && (
            <div className="login-form__error" role="alert">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="login-form__group">
            <label className="login-form__label" htmlFor="login-email">Email</label>
            <div className="login-form__input-wrap">
              <input
                id="login-email"
                type="email"
                className="login-form__input"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-form__group">
            <div className="login-form__label-row">
              <label className="login-form__label" htmlFor="login-password">Password</label>
              <Link to="/forgot-password" className="login-form__forgot">Forgot password?</Link>
            </div>
            <div className="login-form__input-wrap">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="login-form__input login-form__input--password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="login-form__eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 2l14 14M7.5 7.6A3 3 0 0110.4 10.5M4.2 4.3C2.8 5.4 1.7 7 1 9c1.3 3.4 4.7 5.5 8 5.5 1.5 0 2.9-.4 4.1-1.1M6.5 3.7C7.3 3.3 8.1 3 9 3c3.3 0 6.7 2.1 8 5.5-.5 1.3-1.3 2.4-2.3 3.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <ellipse cx="9" cy="9" rx="3" ry="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M1 9C2.3 5.6 5.7 3.5 9 3.5S15.7 5.6 17 9c-1.3 3.4-4.7 5.5-8 5.5S2.3 12.4 1 9z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="login-form__remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="login-submit-btn"
            className="login-form__submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-form__spinner" />
                Signing in…
              </>
            ) : 'Sign in'}
          </button>

          {/* Register Link */}
          <p className="login-form__footer-text">
            Don't have an account? <Link to="/register" className="login-form__link">Register here</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;
