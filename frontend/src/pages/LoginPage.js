import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const dm = darkMode;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: dm
        ? 'linear-gradient(135deg, #2e3a28 0%, #3d4a35 100%)'
        : 'linear-gradient(135deg, #f0f2eb 0%, #dce8dc 100%)',
      padding: '2rem',
    }}>

      {/* Card */}
      <div style={{
        background: dm ? '#3d4a35' : '#ffffff',
        border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}`,
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: '420px',
        boxShadow: dm
          ? '0 8px 32px rgba(0,0,0,0.3)'
          : '0 8px 32px rgba(92, 107, 82, 0.12)',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌿</div>
          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: dm ? '#c1d6c1' : '#5c6b52',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            Welcome back
          </h1>
          <p style={{
            color: dm ? '#8aa88a' : '#8a9a7e',
            fontSize: '0.9rem',
            marginTop: '0.4rem',
          }}>
            Sign in to Climate Matters
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: dm ? '#3a2020' : '#fdecea',
            border: '1px solid #e0a0a0',
            color: '#c0392b',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
            marginBottom: '1.25rem',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: dm ? '#9ab89a' : '#6b7a5f',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: `1px solid ${dm ? '#4a5a42' : '#c8cfc2'}`,
                background: dm ? '#2e3a28' : '#f9faf7',
                color: dm ? '#c1d6c1' : '#3a4a30',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#9caf88'}
              onBlur={e => e.target.style.borderColor = dm ? '#4a5a42' : '#c8cfc2'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: dm ? '#9ab89a' : '#6b7a5f',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: `1px solid ${dm ? '#4a5a42' : '#c8cfc2'}`,
                background: dm ? '#2e3a28' : '#f9faf7',
                color: dm ? '#c1d6c1' : '#3a4a30',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#9caf88'}
              onBlur={e => e.target.style.borderColor = dm ? '#4a5a42' : '#c8cfc2'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.5rem',
              padding: '0.85rem',
              background: loading
                ? (dm ? '#4a5e42' : '#a8bf98')
                : 'linear-gradient(135deg, #7a9b6e, #9caf88)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s, transform 0.1s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => { if (!loading) e.target.style.opacity = '0.9'; }}
            onMouseLeave={e => { e.target.style.opacity = '1'; }}
            onMouseDown={e => { if (!loading) e.target.style.transform = 'scale(0.98)'; }}
            onMouseUp={e => { e.target.style.transform = 'scale(1)'; }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          margin: '1.5rem 0',
        }}>
          <div style={{ flex: 1, height: '1px', background: dm ? '#4a5a42' : '#d4d9cf' }} />
          <span style={{ fontSize: '0.8rem', color: dm ? '#8aa88a' : '#9aaa8e' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: dm ? '#4a5a42' : '#d4d9cf' }} />
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: dm ? '#9ab89a' : '#6b7a5f',
          margin: 0,
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: '#7a9b6e',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;