import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const RegisterPage = ({ darkMode = false }) => {
  const dm = !!darkMode;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    gender: '',
    interest: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.birthdate) {
      newErrors.birthdate = 'Birthdate is required';
    } else {
      const birth = new Date(formData.birthdate);
      const today = new Date();
      if (birth >= today) newErrors.birthdate = 'Birthdate must be in the past';
    }

    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.interest) newErrors.interest = 'Please select your interest level';
    if (!formData.terms) newErrors.terms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, name, type, checked, value } = e.target;
    const key = id || name;
    setFormData((prev) => ({ ...prev, [key]: type === 'checkbox' ? checked : value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rp-page {
          min-height: 100vh;
          background: ${dm ? '#2a3424' : '#f5f3ef'};
          background-image: ${dm ? 'none' : 'radial-gradient(ellipse at 20% 10%, rgba(139,165,120,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(180,160,120,0.10) 0%, transparent 55%)'};
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'DM Sans', sans-serif;
        }

        .rp-card {
          background: ${dm ? '#3d4a35' : '#ffffff'};
          border-radius: 24px;
          padding: 2.75rem 2.5rem;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 2px 8px rgba(${dm ? '0,0,0' : '80,90,70'}, ${dm ? '0.3' : '0.06'}), 0 12px 40px rgba(${dm ? '0,0,0' : '80,90,70'}, ${dm ? '0.3' : '0.10'});
          border: 1px solid ${dm ? 'rgba(100,120,80,0.4)' : 'rgba(180,190,170,0.35)'};
          animation: rp-fadeUp 0.5s ease both;
        }

        @keyframes rp-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .rp-header {
          text-align: center;
          margin-bottom: 2.25rem;
        }

        .rp-icon {
          font-size: 2.6rem;
          display: block;
          margin-bottom: 0.75rem;
          filter: drop-shadow(0 2px 6px rgba(100,130,80,0.20));
        }

        .rp-title {
          font-family: 'Lora', serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: ${dm ? '#d0e8d0' : '#3d4d34'};
          letter-spacing: -0.3px;
          margin-bottom: 0.4rem;
        }

        .rp-subtitle {
          font-size: 0.9rem;
          color: ${dm ? '#b5c9b5' : '#7a8870'};
          font-weight: 300;
          line-height: 1.5;
        }

        .rp-api-error {
          background: ${dm ? '#4a3a35' : '#fdf0ed'};
          border: 1px solid ${dm ? '#a0503a' : '#e8b8ac'};
          color: ${dm ? '#e8a8a0' : '#a0503a'};
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .rp-group {
          margin-bottom: 1.2rem;
        }

        .rp-label {
          display: block;
          margin-bottom: 0.45rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: ${dm ? '#d0e8d0' : '#4d5d42'};
          letter-spacing: 0.01em;
        }

        .rp-input,
        .rp-select {
          width: 100%;
          padding: 0.7rem 0.95rem;
          border: 1.5px solid ${dm ? '#5a6a52' : '#d0d8c8'};
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          background: ${dm ? '#364a2e' : '#fafaf8'};
          color: ${dm ? '#d0e8d0' : '#2d3828'};
          outline: 0 !important;
          -webkit-outline: 0 !important;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          appearance: none;
          -webkit-appearance: none;
        }

        .rp-input::placeholder { color: ${dm ? '#7a8870' : '#b0b8a8'}; }

        .rp-input:focus,
        .rp-select:focus {
          outline: 0 !important;
          -webkit-outline: 0 !important;
          border-color: ${dm ? '#8ab86a' : '#7a9a60'};
          background: ${dm ? '#3d5a35' : '#ffffff'};
          box-shadow: 0 0 0 3px ${dm ? 'rgba(138,184,106,0.2)' : 'rgba(122,154,96,0.12)'} !important;
        }

        .rp-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px ${dm ? '#364a2e' : '#fafaf8'} inset !important;
          -webkit-text-fill-color: ${dm ? '#d0e8d0' : '#2d3828'} !important;
          border-color: ${dm ? '#5a6a52' : '#d0d8c8'} !important;
          -webkit-transition-delay: 5000s !important;
        }

        .rp-input:-webkit-autofill:hover {
          -webkit-box-shadow: 0 0 0 1000px ${dm ? '#364a2e' : '#fafaf8'} inset !important;
          -webkit-text-fill-color: ${dm ? '#d0e8d0' : '#2d3828'} !important;
        }

        .rp-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px ${dm ? '#3d5a35' : '#ffffff'} inset !important;
          -webkit-text-fill-color: ${dm ? '#d0e8d0' : '#2d3828'} !important;
          border-color: ${dm ? '#8ab86a' : '#7a9a60'} !important;
          -webkit-transition-delay: 5000s !important;
        }

        .rp-input.rp-error,
        .rp-select.rp-error {
          border-color: ${dm ? '#c8956a' : '#d08878'};
        }

        .rp-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='${dm ? '%238ab86a' : '%237a8870'}' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.9rem center;
          padding-right: 2.5rem;
          cursor: pointer;
        }

        .rp-error-msg {
          display: block;
          color: ${dm ? '#e8a8a0' : '#b86a58'};
          font-size: 0.8rem;
          margin-top: 0.35rem;
        }

        .rp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .rp-fieldset {
          border: 1.5px solid ${dm ? '#5a6a52' : '#d0d8c8'};
          border-radius: 12px;
          padding: 1.1rem 1.2rem;
          margin-bottom: 1.2rem;
          background: ${dm ? '#2e3a28' : '#fafaf8'};
        }

        .rp-legend {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${dm ? '#d0e8d0' : '#4d5d42'};
          padding: 0 0.4rem;
          font-family: 'DM Sans', sans-serif;
        }

        .rp-radio-group {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 0.6rem;
        }

        .rp-radio-label {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          font-size: 0.875rem;
          color: ${dm ? '#c1d6c1' : '#5a6a52'};
          text-transform: capitalize;
          user-select: none;
        }

        .rp-radio-label input[type="radio"] {
          accent-color: ${dm ? '#8ab86a' : '#7a9a60'};
          width: 15px;
          height: 15px;
          cursor: pointer;
        }

        .rp-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          cursor: pointer;
          font-size: 0.875rem;
          color: ${dm ? '#c1d6c1' : '#5a6a52'};
          line-height: 1.4;
          user-select: none;
        }

        .rp-checkbox-label input[type="checkbox"] {
          accent-color: ${dm ? '#8ab86a' : '#7a9a60'};
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          cursor: pointer;
        }

        .rp-submit {
          width: 100%;
          padding: 0.85rem;
          background: ${dm ? '#6a9a4a' : '#5a7a40'};
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 0.5rem;
          letter-spacing: 0.02em;
          transition: background 0.18s, transform 0.12s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(${dm ? '106,154,74' : '70,100,50'}, ${dm ? '0.3' : '0.18'});
        }

        .rp-submit:hover:not(:disabled) {
          background: ${dm ? '#5a8a3a' : '#4a6832'};
          box-shadow: 0 4px 14px rgba(${dm ? '106,154,74' : '70,100,50'}, ${dm ? '0.4' : '0.28'});
          transform: translateY(-1px);
        }

        .rp-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .rp-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .rp-footer {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.85rem;
          color: ${dm ? '#b5c9b5' : '#7a8870'};
        }

        .rp-footer a {
          color: ${dm ? '#8ab86a' : '#5a7a40'};
          font-weight: 500;
          text-decoration: none;
        }

        .rp-footer a:hover { text-decoration: underline; }

        @media (max-width: 480px) {
          .rp-card { padding: 2rem 1.4rem; }
          .rp-grid { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>

      <div className="rp-page">
        <div className="rp-card">
          <div className="rp-header">
            <span className="rp-icon">🌿</span>
            <h1 className="rp-title">Join Us</h1>
            <p className="rp-subtitle">Receive climate news and sustainable living tips</p>
          </div>

          {apiError && <div className="rp-api-error">{apiError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="rp-group">
              <label htmlFor="name" className="rp-label">Full Name</label>
              <input
                className={`rp-input${errors.name ? ' rp-error' : ''}`}
                type="text" id="name" value={formData.name}
                onChange={handleChange} placeholder="Jane Doe"
              />
              {errors.name && <span className="rp-error-msg">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="rp-group">
              <label htmlFor="email" className="rp-label">Email Address</label>
              <input
                className={`rp-input${errors.email ? ' rp-error' : ''}`}
                type="email" id="email" value={formData.email}
                onChange={handleChange} placeholder="jane@example.com"
              />
              {errors.email && <span className="rp-error-msg">{errors.email}</span>}
            </div>

            {/* Password + Confirm */}
            <div className="rp-grid">
              <div className="rp-group">
                <label htmlFor="password" className="rp-label">Password</label>
                <input
                  className={`rp-input${errors.password ? ' rp-error' : ''}`}
                  type="password" id="password" value={formData.password}
                  onChange={handleChange} placeholder="••••••••"
                />
                {errors.password && <span className="rp-error-msg">{errors.password}</span>}
              </div>
              <div className="rp-group">
                <label htmlFor="confirmPassword" className="rp-label">Confirm</label>
                <input
                  className={`rp-input${errors.confirmPassword ? ' rp-error' : ''}`}
                  type="password" id="confirmPassword" value={formData.confirmPassword}
                  onChange={handleChange} placeholder="••••••••"
                />
                {errors.confirmPassword && <span className="rp-error-msg">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Birthdate */}
            <div className="rp-group">
              <label htmlFor="birthdate" className="rp-label">Birthdate</label>
              <input
                className={`rp-input${errors.birthdate ? ' rp-error' : ''}`}
                type="date" id="birthdate" value={formData.birthdate}
                onChange={handleChange}
              />
              {errors.birthdate && <span className="rp-error-msg">{errors.birthdate}</span>}
            </div>

            {/* Gender */}
            <fieldset className="rp-fieldset">
              <legend className="rp-legend">Gender</legend>
              <div className="rp-radio-group">
                {['male', 'female', 'other'].map((g) => (
                  <label key={g} className="rp-radio-label">
                    <input
                      type="radio" name="gender" value={g}
                      checked={formData.gender === g}
                      onChange={(e) =>
                        handleChange({ target: { id: 'gender', value: e.target.value } })
                      }
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && <span className="rp-error-msg">{errors.gender}</span>}
            </fieldset>

            {/* Interest Level */}
            <div className="rp-group">
              <label htmlFor="interest" className="rp-label">Interest Level</label>
              <select
                className={`rp-select${errors.interest ? ' rp-error' : ''}`}
                id="interest" value={formData.interest} onChange={handleChange}
              >
                <option value="">Select your level</option>
                <option value="beginner">🌱 Beginner</option>
                <option value="intermediate">🌿 Intermediate</option>
                <option value="expert">🌳 Expert</option>
              </select>
              {errors.interest && <span className="rp-error-msg">{errors.interest}</span>}
            </div>

            {/* Terms */}
            <div className="rp-group">
              <label className="rp-checkbox-label">
                <input
                  type="checkbox" id="terms"
                  checked={formData.terms} onChange={handleChange}
                />
                I agree to the terms and conditions
              </label>
              {errors.terms && <span className="rp-error-msg">{errors.terms}</span>}
            </div>

            <button type="submit" className="rp-submit" disabled={loading}>
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <p className="rp-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;