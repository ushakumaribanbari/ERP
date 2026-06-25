import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__inner navbar__inner--centered">
        <nav className="navbar__actions" aria-label="Main navigation">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/dashboard" style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--primary)',
                textDecoration: 'none',
              }}>
                Dashboard ({user?.role})
              </Link>
              <button
                onClick={logout}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                  background: '#ef4444',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar__btn-login" id="nav-login-btn">
              <span className="navbar__btn-login-text">Login</span>
              <svg className="navbar__btn-login-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
