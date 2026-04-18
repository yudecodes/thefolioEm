import React from 'react';

const HomePage = ({ darkMode = false }) => {
  const dm = !!darkMode;

  const heroStyle = {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: dm 
      ? 'linear-gradient(135deg, #3d4a35 0%, #4a5a42 100%)'
      : 'linear-gradient(135deg, #f5f5dc 0%, #c1d6c1 100%)',
    borderRadius: '20px',
    marginBottom: '3rem',
    border: `1px solid ${dm ? '#5a6a52' : '#d4d9cf'}`,
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem',
  };

  const listItemStyle = {
    padding: '1.25rem',
    background: dm ? '#2e3a28' : '#f5f5dc',
    borderRadius: '12px',
    borderLeft: `4px solid ${dm ? '#7a9a7a' : '#9caf88'}`,
    color: dm ? '#c1d6c1' : '#3d4a35',
    fontWeight: 500,
  };

  const infoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  };

  const infoCardStyle = {
    padding: '2rem',
    background: dm ? '#3d4a35' : '#ffffff',
    borderRadius: '16px',
    border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}`,
    boxShadow: dm ? 'none' : '0 2px 8px rgba(92, 107, 82, 0.06)',
  };

  const tagStyle = (color) => ({
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: color === 'green' 
      ? (dm ? '#4a6a3a' : '#c1d6c1')
      : (dm ? '#3a3a2a' : '#e8e4d9'),
    color: dm ? '#b0d0b0' : '#3d4a35',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: 600,
    marginBottom: '1rem',
  });

  return (
    <div className="page" style={{ background: dm ? '#2a3424' : '#f2f4ee' }}>
      <div className="container">
        <div style={heroStyle}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52', marginBottom: '1rem' }}>Understanding Climate Change</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: dm ? '#9ab89a' : '#6b7a5f' }}>
            This portfolio focuses on climate change awareness, its causes, effects,
            and how individuals can help protect the planet.
          </p>
        </div>

        <section className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52' }}>Why Climate Change Matters</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>🌡️ Rising global temperatures</li>
            <li style={listItemStyle}>⛈️ Extreme weather events</li>
            <li style={listItemStyle}>🐾 Threats to wildlife and ecosystems</li>
            <li style={listItemStyle}>🏥 Impact on human health</li>
          </ul>
        </section>

        <div style={infoGridStyle}>
          <div style={infoCardStyle}>
            <span style={tagStyle('green')}>CAUSES</span>
            <h4 style={{ color: dm ? '#d0e8d0' : '#5c6b52', marginBottom: '0.75rem' }}>Human Activities</h4>
            <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', lineHeight: 1.7 }}>Burning fossil fuels and deforestation are major contributors to climate change, releasing greenhouse gases into our atmosphere.</p>
          </div>
          <div style={infoCardStyle}>
            <span style={tagStyle('cream')}>EFFECTS</span>
            <h4 style={{ color: dm ? '#d0e8d0' : '#5c6b52', marginBottom: '0.75rem' }}>Global Impact</h4>
            <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', lineHeight: 1.7 }}>Climate change leads to stronger storms, prolonged droughts, rising sea levels, and disrupted ecosystems worldwide.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;