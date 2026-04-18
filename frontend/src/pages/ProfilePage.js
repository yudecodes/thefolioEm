import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [picPreview, setPicPreview] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const showMsg = (text, type = 'success') => setMsg({ text, type });

  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);
    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      showMsg('Profile updated successfully!');
    } catch (err) {
      showMsg(err.response?.data?.message || 'Error updating profile.', 'error');
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });
    try {
      await API.put('/auth/change-password', { currentPassword: curPw, newPassword: newPw });
      showMsg('Password changed successfully!');
      setCurPw('');
      setNewPw('');
    } catch (err) {
      showMsg(err.response?.data?.message || 'Error changing password.', 'error');
    }
  };

  const handlePic = (e) => {
    const file = e.target.files[0];
    setPic(file);
    if (file) setPicPreview(URL.createObjectURL(file));
  };

  const picSrc = picPreview
    || (user?.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pp-page {
          min-height: 100vh;
          background: #f5f3ef;
          background-image:
            radial-gradient(ellipse at 15% 10%, rgba(139,165,120,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 85%, rgba(180,160,120,0.10) 0%, transparent 55%);
          font-family: 'DM Sans', sans-serif;
          padding: 2.5rem 1.5rem;
          display: flex;
          justify-content: center;
        }

        .pp-container {
          width: 100%;
          max-width: 580px;
          animation: pp-fadeUp 0.5s ease both;
        }

        @keyframes pp-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Avatar header */
        .pp-hero {
          text-align: center;
          margin-bottom: 1.75rem;
        }

        .pp-avatar-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .pp-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #c8ddb8;
          box-shadow: 0 4px 16px rgba(80,100,60,0.15);
        }

        .pp-avatar-fallback {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c8ddb8, #9ab888);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border: 3px solid #c8ddb8;
          box-shadow: 0 4px 16px rgba(80,100,60,0.15);
        }

        .pp-username {
          font-family: 'Lora', serif;
          font-size: 1.4rem;
          color: #3d4d34;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .pp-email {
          font-size: 0.85rem;
          color: #8a9a7e;
          font-weight: 300;
        }

        /* Toast */
        .pp-toast {
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .pp-toast--success { background: #eaf4e0; border: 1px solid #b0d498; color: #3a6228; }
        .pp-toast--error   { background: #fdf0ed; border: 1px solid #e8b8ac; color: #a0503a; }

        /* Cards */
        .pp-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 2rem 2.25rem;
          border: 1px solid rgba(180,190,170,0.35);
          box-shadow: 0 2px 8px rgba(80,90,70,0.06), 0 8px 30px rgba(80,90,70,0.08);
          margin-bottom: 1.5rem;
        }

        .pp-card-title {
          font-family: 'Lora', serif;
          font-size: 1.1rem;
          color: #3d4d34;
          margin-bottom: 1.4rem;
          padding-bottom: 0.7rem;
          border-bottom: 1.5px solid #e4edd8;
        }

        .pp-group { margin-bottom: 1.2rem; }

        .pp-label {
          display: block;
          margin-bottom: 0.45rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4d5d42;
        }

        .pp-input,
        .pp-textarea {
          width: 100%;
          padding: 0.7rem 0.95rem;
          border: 1.5px solid #d0d8c8;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          background: #fafaf8;
          color: #2d3828;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          resize: vertical;
        }

        .pp-input::placeholder,
        .pp-textarea::placeholder { color: #b0b8a8; }

        .pp-input:focus,
        .pp-textarea:focus {
          border-color: #7a9a60;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(122,154,96,0.12);
        }

        .pp-textarea { min-height: 90px; line-height: 1.65; }

        /* File upload */
        .pp-upload-label {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1rem;
          border: 1.5px dashed #c0ceb4;
          border-radius: 10px;
          background: #f7f9f5;
          cursor: pointer;
          font-size: 0.85rem;
          color: #6a8a58;
          transition: border-color 0.18s, background 0.18s;
        }

        .pp-upload-label:hover { border-color: #7a9a60; background: #f0f5eb; }
        .pp-upload-input { display: none; }

        .pp-btn {
          width: 100%;
          padding: 0.8rem;
          background: #5a7a40;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.18s, transform 0.12s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(70,100,50,0.18);
        }

        .pp-btn:hover {
          background: #4a6832;
          box-shadow: 0 4px 14px rgba(70,100,50,0.28);
          transform: translateY(-1px);
        }

        .pp-btn:active { transform: translateY(0); }

        @media (max-width: 480px) {
          .pp-card { padding: 1.5rem; }
        }
      `}</style>

      <div className="pp-page">
        <div className="pp-container">

          {/* Avatar hero */}
          <div className="pp-hero">
            <div className="pp-avatar-wrap">
              {picSrc
                ? <img className="pp-avatar" src={picSrc} alt="Profile" />
                : <div className="pp-avatar-fallback">🌿</div>
              }
            </div>
            <div className="pp-username">{user?.name || 'Your Profile'}</div>
            <div className="pp-email">{user?.email}</div>
          </div>

          {/* Toast */}
          {msg.text && (
            <div className={`pp-toast pp-toast--${msg.type}`}>{msg.text}</div>
          )}

          {/* Edit Profile */}
          <div className="pp-card">
            <h2 className="pp-card-title">Edit Profile</h2>
            <form onSubmit={handleProfile} noValidate>
              <div className="pp-group">
                <label className="pp-label">Display Name</label>
                <input className="pp-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name" />
              </div>
              <div className="pp-group">
                <label className="pp-label">Short Bio</label>
                <textarea className="pp-textarea" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us a little about yourself…" rows={3} />
              </div>
              <div className="pp-group">
                <label className="pp-label">Profile Picture</label>
                <label className="pp-upload-label">
                  <input className="pp-upload-input" type="file" accept="image/*" onChange={handlePic} />
                  🖼️ {pic ? pic.name : 'Click to upload a new photo'}
                </label>
              </div>
              <button className="pp-btn" type="submit">Save Profile</button>
            </form>
          </div>

          {/* Change Password */}
          <div className="pp-card">
            <h2 className="pp-card-title">Change Password</h2>
            <form onSubmit={handlePassword} noValidate>
              <div className="pp-group">
                <label className="pp-label">Current Password</label>
                <input className="pp-input" type="password" placeholder="Current password" value={curPw} onChange={(e) => setCurPw(e.target.value)} required />
              </div>
              <div className="pp-group">
                <label className="pp-label">New Password</label>
                <input className="pp-input" type="password" placeholder="New password (min 6 chars)" value={newPw} onChange={(e) => setNewPw(e.target.value)} required minLength={6} />
              </div>
              <button className="pp-btn" type="submit">Change Password</button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProfilePage;