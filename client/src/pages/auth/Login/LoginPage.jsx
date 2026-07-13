import { useState } from 'react';
import { useAuth } from "../../../context/AuthContext";
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
    <div className="login-container">

      {/* Left Panel */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="login-left-logo">
            ERP
          </div>

          <h1 className="login-left-title">
            AI ERP System
          </h1>

          <p className="login-left-subtitle">
            Manage your employees, payroll, finance, inventory and reports from one powerful platform.
          </p>

          <div className="login-features">

            <div className="login-feature">
              ✅ Employee Management
            </div>

            <div className="login-feature">
              ✅ Payroll Management
            </div>

            <div className="login-feature">
              ✅ Inventory Control
            </div>

            <div className="login-feature">
              ✅ Finance Dashboard
            </div>

            <div className="login-feature">
              ✅ Analytics & Reports
            </div>

          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right">

        <div className="login-card">

          {/* Header */}
          <div className="login-card__header">

            <div className="login-logo">
              ERP SYSTEM
            </div>

            <h1 className="login-card__title">
              Welcome Back
            </h1>

            <p className="login-card__subtitle">
              Sign in to access your dashboard
            </p>

          </div>

          {/* Form */}
          <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
          >

            {error && (
              <div
                className="login-form__error"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Email */}
            <div className="login-form__group">

              <label
                htmlFor="login-email"
                className="login-form__label"
              >
                Email
              </label>

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

                <label
                  htmlFor="login-password"
                  className="login-form__label"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="login-form__forgot"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="login-form__input-wrap">

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="login-form__input login-form__input--password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="login-form__eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>

              </div>

            </div>

            {/* Remember */}
            <div className="login-form__remember-me">

              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <label htmlFor="rememberMe">
                Remember Me
              </label>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-form__submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="login-form__footer-text">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="login-form__link"
              >
                Register Here
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  </div>
);
}
export default LoginPage;
