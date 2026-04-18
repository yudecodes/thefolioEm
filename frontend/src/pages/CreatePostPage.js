import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);

    try {
      const { data } = await API.post('/posts', fd);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cp-page {
          min-height: 100vh;
          background: #f5f3ef;
          background-image:
            radial-gradient(ellipse at 15% 10%, rgba(139,165,120,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 85%, rgba(180,160,120,0.10) 0%, transparent 55%);
          font-family: 'DM Sans', sans-serif;
          padding: 2.5rem 1.5rem;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .cp-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 2.75rem 2.5rem;
          width: 100%;
          max-width: 680px;
          box-shadow: 0 2px 8px rgba(80,90,70,0.06), 0 12px 40px rgba(80,90,70,0.10);
          border: 1px solid rgba(180,190,170,0.35);
          animation: cp-fadeUp 0.5s ease both;
        }

        @keyframes cp-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cp-header {
          text-align: center;
          margin-bottom: 2.25rem;
        }

        .cp-icon {
          font-size: 2.6rem;
          display: block;
          margin-bottom: 0.75rem;
          filter: drop-shadow(0 2px 6px rgba(100,130,80,0.20));
        }

        .cp-title {
          font-family: 'Lora', serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: #3d4d34;
          letter-spacing: -0.3px;
          margin-bottom: 0.4rem;
        }

        .cp-subtitle {
          font-size: 0.9rem;
          color: #7a8870;
          font-weight: 300;
        }

        .cp-error {
          background: #fdf0ed;
          border: 1px solid #e8b8ac;
          color: #a0503a;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .cp-group {
          margin-bottom: 1.3rem;
        }

        .cp-label {
          display: block;
          margin-bottom: 0.45rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4d5d42;
          letter-spacing: 0.01em;
        }

        .cp-input,
        .cp-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid #d0d8c8;
          border-radius: 12px;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          background: #fafaf8;
          color: #2d3828;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          resize: vertical;
        }

        .cp-input::placeholder,
        .cp-textarea::placeholder { color: #b0b8a8; }

        .cp-input:focus,
        .cp-textarea:focus {
          border-color: #7a9a60;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(122,154,96,0.12);
        }

        .cp-textarea { min-height: 260px; line-height: 1.7; }

        /* Image upload */
        .cp-upload-box {
          border: 1.5px dashed #c0ceb4;
          border-radius: 14px;
          padding: 1.5rem;
          background: #f7f9f5;
          cursor: pointer;
          transition: border-color 0.18s, background 0.18s;
          text-align: center;
        }

        .cp-upload-box:hover {
          border-color: #7a9a60;
          background: #f0f5eb;
        }

        .cp-upload-icon { font-size: 1.8rem; margin-bottom: 0.5rem; display: block; }

        .cp-upload-hint {
          font-size: 0.825rem;
          color: #8a9a7e;
          font-weight: 300;
        }

        .cp-upload-input {
          display: none;
        }

        .cp-preview {
          margin-top: 1rem;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #d0d8c8;
        }

        .cp-preview img {
          width: 100%;
          max-height: 220px;
          object-fit: cover;
          display: block;
        }

        .cp-admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #5a7a40;
          background: #e4f0d8;
          border-radius: 20px;
          padding: 0.25rem 0.75rem;
          margin-bottom: 0.75rem;
          letter-spacing: 0.04em;
        }

        .cp-submit {
          width: 100%;
          padding: 0.9rem;
          background: #5a7a40;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 0.75rem;
          letter-spacing: 0.02em;
          transition: background 0.18s, transform 0.12s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(70,100,50,0.18);
        }

        .cp-submit:hover:not(:disabled) {
          background: #4a6832;
          box-shadow: 0 4px 14px rgba(70,100,50,0.28);
          transform: translateY(-1px);
        }

        .cp-submit:active:not(:disabled) { transform: translateY(0); }

        .cp-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        @media (max-width: 480px) {
          .cp-card { padding: 2rem 1.4rem; }
        }
      `}</style>

      <div className="cp-page">
        <div className="cp-card">
          <div className="cp-header">
            <span className="cp-icon">✍️</span>
            <h1 className="cp-title">Write a New Post</h1>
            <p className="cp-subtitle">Share your thoughts on climate and sustainability</p>
          </div>

          {error && <div className="cp-error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="cp-group">
              <label className="cp-label">Post Title</label>
              <input
                className="cp-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your post a title…"
                required
              />
            </div>

            <div className="cp-group">
              <label className="cp-label">Content</label>
              <textarea
                className="cp-textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your post here…"
                required
              />
            </div>

            {user?.role === 'admin' && (
              <div className="cp-group">
                <span className="cp-admin-badge">🔒 Admin Only</span>
                <label className="cp-label">Cover Image</label>
                <label className="cp-upload-box">
                  <input
                    className="cp-upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                  />
                  <span className="cp-upload-icon">🖼️</span>
                  <span className="cp-upload-hint">
                    {image ? image.name : 'Click to upload a cover image'}
                  </span>
                </label>
                {preview && (
                  <div className="cp-preview">
                    <img src={preview} alt="Cover preview" />
                  </div>
                )}
              </div>
            )}

            <button className="cp-submit" type="submit" disabled={loading}>
              {loading ? 'Publishing…' : '🌿 Publish Post'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;