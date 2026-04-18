import React, { useState, useEffect } from 'react';

const SplashPage = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #9caf88 0%, #c1d6c1 50%, #f5f5dc 100%)',
    color: '#3d4a35',
    fontFamily: 'system-ui, sans-serif',
  };

  const spinnerStyle = {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(92, 107, 82, 0.2)',
    borderTop: '4px solid #5c6b52',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '2rem 0',
  };

  const textStyle = {
    fontSize: '2.5rem',
    fontWeight: 500,
    color: '#5c6b52',
    marginBottom: '0.5rem',
  };

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌿</div>
      <h1 style={textStyle}>Welcome</h1>
      <div style={spinnerStyle}></div>
      <p style={{ color: '#6b7a5f', fontSize: '1.1rem' }}>Loading{dots}</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SplashPage;