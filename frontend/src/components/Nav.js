import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Nav = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navStyle = {
    background: darkMode ? '#3d4a35' : '#f5f5dc',
    padding: '1.25rem 2rem',
    boxShadow: '0 1px 3px rgba(92, 107, 82, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: `1px solid ${darkMode ? '#4a5a42' : '#d4d9cf'}`,
  };

  const headerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const titleStyle = {
    fontSize: '1.35rem',
    fontWeight: 600,
    color: darkMode ? '#c1d6c1' : '#5c6b52',
    letterSpacing: '-0.01em',
    textDecoration: 'none',
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  };

  const linkStyle = (isActive) => ({
    color: isActive ? '#7a8f6b' : (darkMode ? '#c1d6c1' : '#6b7a5f'),
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: isActive ? 600 : 400,
    transition: 'all 0.2s ease',
    position: 'relative',
    paddingBottom: '0.25rem',
  });

  const activeIndicator = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: '#9caf88',
    borderRadius: '2px',
  };

  const logoutBtnStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: darkMode ? '#c1d6c1' : '#6b7a5f',
    fontSize: '0.95rem',
    padding: 0,
  };

  // Guest links: Home, About, Contact
  const guestLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // Logged-in links: Home, About, Feed (no Contact)
  const userLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/feed', label: 'Feed' },
  ];

  const navLinks = user ? userLinks : guestLinks;

  return (
    <header style={navStyle}>
      <div style={headerStyle}>
        <Link to="/" style={titleStyle}>🌿 Climate Matters</Link>
        <nav>
          <ul style={ulStyle}>
            {navLinks.map(({ path, label }) => {
              const isActive = location.pathname === path;
              return (
                <li key={path}>
                  <Link to={path} style={linkStyle(isActive)}>
                    {label}
                    {isActive && <span style={activeIndicator} />}
                  </Link>
                </li>
              );
            })}

            {user ? (
              <>
                {user.role === 'admin' && (
                  <li>
                    <Link to="/admin" style={linkStyle(location.pathname === '/admin')}>
                      Admin
                      {location.pathname === '/admin' && <span style={activeIndicator} />}
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/profile" style={linkStyle(location.pathname === '/profile')}>
                    👤 {user.name || user.email}
                    {location.pathname === '/profile' && <span style={activeIndicator} />}
                  </Link>
                </li>
                <li>
                  <button style={logoutBtnStyle} onClick={() => { logout(); }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" style={linkStyle(location.pathname === '/login')}>
                    Login
                    {location.pathname === '/login' && <span style={activeIndicator} />}
                  </Link>
                </li>
                <li>
                  <Link to="/register" style={linkStyle(location.pathname === '/register')}>
                    Register
                    {location.pathname === '/register' && <span style={activeIndicator} />}
                  </Link>
                </li>
              </>
            )}

            <li>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;