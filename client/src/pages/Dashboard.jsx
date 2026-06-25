import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      color: '#111',
      fontFamily: 'inherit',
      padding: '24px',
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>ERP Dashboard</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>Welcome to your workspace dashboard</p>
        
        <div style={{
          textAlign: 'left',
          background: '#f9fafb',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          border: '1px solid #f3f4f6',
        }}>
          <p style={{ margin: '4px 0' }}><strong>Name:</strong> {user?.fullName}</p>
          <p style={{ margin: '4px 0' }}><strong>Email:</strong> {user?.email}</p>
          <p style={{ margin: '4px 0' }}>
            <strong>Role:</strong> <span style={{
              background: '#e0e7ff',
              color: '#4f46e5',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
            }}>{user?.role}</span>
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            width: '100%',
            padding: '11px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
