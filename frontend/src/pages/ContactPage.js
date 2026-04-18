import React, { useState } from 'react';
import API from '../api/axios';

const ContactPage = ({ darkMode = false }) => {
  const dm = !!darkMode;
  const [formData, setFormData] = useState({
    name: '',
    preferredName: '',
    email: '',
    message: ''
  });
  const [greeting, setGreeting] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/messages', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      console.log('Message sent successfully:', response.data);
      const name = formData.preferredName || 'friend';
      alert(`Message sent successfully! Thank you, ${name}.`);
      setGreeting(`Thanks for reaching out, ${name}! We'll get back to you soon. 🌿`);
      setFormData({ name: '', preferredName: '', email: '', message: '' });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to send message';
      console.error('Error sending message:', {
        status: err.response?.status,
        message: errorMsg,
        fullError: err
      });
      alert(`Failed to send message: ${errorMsg}`);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const resources = [
    { name: 'NASA Climate', desc: 'Scientific information about climate change', url: 'https://climate.nasa.gov' },
    { name: 'IPCC', desc: 'International climate research reports', url: 'https://www.ipcc.ch' },
    { name: 'WWF', desc: 'Environmental conservation organization', url: 'https://www.worldwildlife.org' }
  ];

  const inputGroupStyle = {
    marginBottom: '1.25rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: dm ? '#9ab89a' : '#5c6b52',
  };

  return (
    <div className="page" style={{ background: dm ? '#2a3424' : '#f2f4ee' }}>
      <div className="container">
        <div className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52', textAlign: 'center', marginBottom: '0.5rem' }}>Get In Touch</h2>
          <p style={{ textAlign: 'center', color: dm ? '#9ab89a' : '#6b7a5f', marginBottom: '2rem' }}>
            Have questions? We'd love to hear from you.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div style={inputGroupStyle}>
              <label htmlFor="name" style={labelStyle}>Full Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} required style={{ background: dm ? '#2e3a28' : '#f8faf5', color: dm ? '#c1d6c1' : '#2d3828', border: `1px solid ${dm ? '#4a5a42' : '#cdd8c4'}` }} />
            </div>
            
            <div style={inputGroupStyle}>
              <label htmlFor="preferredName" style={labelStyle}>Preferred Name <span style={{ color: dm ? '#7a9a7a' : '#9caf88', fontWeight: 400 }}>(optional)</span></label>
              <input type="text" id="preferredName" value={formData.preferredName} onChange={handleChange} placeholder="What should we call you?" style={{ background: dm ? '#2e3a28' : '#f8faf5', color: dm ? '#c1d6c1' : '#2d3828', border: `1px solid ${dm ? '#4a5a42' : '#cdd8c4'}` }} />
            </div>
            
            <div style={inputGroupStyle}>
              <label htmlFor="email" style={labelStyle}>Email Address</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required style={{ background: dm ? '#2e3a28' : '#f8faf5', color: dm ? '#c1d6c1' : '#2d3828', border: `1px solid ${dm ? '#4a5a42' : '#cdd8c4'}` }} />
            </div>
            
            <div style={inputGroupStyle}>
              <label htmlFor="message" style={labelStyle}>Your Message</label>
              <textarea id="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="Tell us what's on your mind..." style={{ background: dm ? '#2e3a28' : '#f8faf5', color: dm ? '#c1d6c1' : '#2d3828', border: `1px solid ${dm ? '#4a5a42' : '#cdd8c4'}` }} />
            </div>
            
            <button type="submit" style={{ width: '100%' }}>Send Message</button>
          </form>
          
          {greeting && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: dm ? '#4a6a3a' : '#c1d6c1', 
              borderRadius: '10px',
              textAlign: 'center',
            }}>
              <p style={{ color: dm ? '#c1d6c1' : '#3d4a35', margin: 0, fontWeight: 500 }}>{greeting}</p>
            </div>
          )}
        </div>

        <div className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h3 style={{ color: dm ? '#d0e8d0' : '#5c6b52', marginBottom: '1.5rem' }}>Helpful Resources</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {resources.map((res, idx) => (
              <a 
                key={idx} 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.25rem',
                  background: dm ? '#2e3a28' : '#f5f5dc',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div>
                  <strong style={{ color: dm ? '#d0e8d0' : '#5c6b52', display: 'block', marginBottom: '0.25rem' }}>{res.name}</strong>
                  <span style={{ color: dm ? '#9ab89a' : '#6b7a5f', fontSize: '0.9rem' }}>{res.desc}</span>
                </div>
                <span style={{ color: dm ? '#7a9a7a' : '#9caf88', fontSize: '1.25rem' }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;