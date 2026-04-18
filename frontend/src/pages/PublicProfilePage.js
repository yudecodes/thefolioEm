import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const PublicProfilePage = ({ darkMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dm = !!darkMode;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get(`/users/${id}/profile`);
        setProfile(data.user);
        setPosts(data.posts || []);
      } catch {
        setError('User not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const formatDate = (d) => {
    try { return new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); }
    catch { return ''; }
  };

  const getImageURL = (filename) => {
    const { hostname } = window.location;
    return `http://${hostname}:5000/uploads/${filename}`;
  };

  const s = {
    page: { minHeight: '100vh', background: dm ? '#2a3424' : '#f2f4ee', padding: '2rem 1.25rem', fontFamily: "'DM Sans', sans-serif" },
    container: { maxWidth: '680px', margin: '0 auto' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: dm ? '#9ab89a' : '#7a9a60', fontSize: '0.9rem', fontWeight: 500, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, fontFamily: 'inherit' },
    card: { background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4deca'}`, borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem', boxShadow: dm ? 'none' : '0 2px 12px rgba(80,100,60,0.08)', display: 'flex', alignItems: 'center', gap: '1.5rem' },
    avatar: { width: '80px', height: '80px', borderRadius: '50%', background: dm ? '#4a5a42' : '#ddebd0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: dm ? '#9ab89a' : '#5a7a40', overflow: 'hidden', flexShrink: 0 },
    name: { fontSize: '1.4rem', fontWeight: 700, color: dm ? '#d0e8d0' : '#2d3d24', marginBottom: '0.25rem' },
    meta: { fontSize: '0.85rem', color: dm ? '#9ab89a' : '#7a8a6e' },
    sectionTitle: { fontSize: '1rem', fontWeight: 700, color: dm ? '#c1d6c1' : '#3d4d34', marginBottom: '1rem' },
    postCard: { background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4deca'}`, borderRadius: '14px', padding: '1.25rem 1.5rem', marginBottom: '1rem', boxShadow: dm ? 'none' : '0 2px 8px rgba(80,100,60,0.06)', cursor: 'pointer' },
    postTitle: { fontSize: '1rem', fontWeight: 700, color: dm ? '#d0e8d0' : '#2d3d24', marginBottom: '0.4rem' },
    postBody: { fontSize: '0.875rem', color: dm ? '#9ab89a' : '#5a6a50', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
    postDate: { fontSize: '0.775rem', color: dm ? '#7a9a7a' : '#8a9a7e', marginTop: '0.5rem' },
    empty: { textAlign: 'center', color: dm ? '#9ab89a' : '#7a8a6e', padding: '2rem', fontSize: '0.9rem' },
    center: { textAlign: 'center', padding: '4rem', color: dm ? '#9ab89a' : '#7a8a6e' },
  };

  if (loading) return <div style={s.page}><div style={s.center}>Loading profile…</div></div>;
  if (error)   return <div style={s.page}><div style={{ ...s.center, color: '#c0392b' }}>{error}</div></div>;

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={s.container}>

        <button style={s.backBtn} onClick={() => navigate(-1)}>← Back</button>

        {/* Profile Card */}
        <div style={s.card}>
          <div style={s.avatar}>
            {profile.profilePic
              ? <img src={getImageURL(profile.profilePic)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
              : (profile.name?.charAt(0).toUpperCase() || '?')
            }
          </div>
          <div>
            <div style={s.name}>{profile.name}</div>
            <div style={s.meta}>Member since {formatDate(profile.createdAt)}</div>
            {profile.bio && <div style={{ ...s.meta, marginTop: '0.5rem' }}>{profile.bio}</div>}
          </div>
        </div>

        {/* Posts */}
        <div style={s.sectionTitle}>🌿 Posts by {profile.name}</div>
        {posts.length === 0 ? (
          <div style={s.empty}>No posts yet.</div>
        ) : (
          posts.map(post => (
            <div key={post._id} style={s.postCard} onClick={() => navigate(`/posts/${post._id}`)}>
              <div style={s.postTitle}>{post.title}</div>
              <div style={s.postBody}>{post.body}</div>
              <div style={s.postDate}>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default PublicProfilePage;