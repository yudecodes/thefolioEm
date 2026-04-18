import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const PostPage = ({ darkMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user ?? null;
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  
  const dm = !!darkMode;
  
  // Get the base URL for image uploads
  const getImageURL = (filename) => {
    const { hostname } = window.location;
    return `http://${hostname}:5000/uploads/${filename}`;
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
        
        try {
          const { data: commentData } = await API.get(`/comments/${id}`);
          setComments(Array.isArray(commentData) ? commentData : []);
        } catch {
          setComments([]);
        }
      } catch (err) {
        setError('Post not found.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  const handleComment = async () => {
    const text = commentInput.trim();
    if (!text || !user) return;
    
    setCommentLoading(true);
    try {
      const { data } = await API.post(`/comments/${id}`, { body: text });
      setComments([...comments, data]);
      setCommentInput('');
    } catch (err) {
      alert('Failed to post comment.');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch {
      alert('Failed to delete comment.');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await API.delete(`/posts/${id}`);
      navigate('/feed');
    } catch {
      alert('Failed to delete post.');
    }
  };

  const formatDate = (d) => {
    try { return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); }
    catch { return ''; }
  };

  const initials = (name) => (name ? name.charAt(0).toUpperCase() : '?');

  const s = {
    page: { minHeight: '100vh', background: dm ? '#2a3424' : '#f2f4ee', padding: '2rem 1.25rem', fontFamily: "'DM Sans', sans-serif" },
    container: { maxWidth: '680px', margin: '0 auto' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: dm ? '#9ab89a' : '#5a7a40', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, fontFamily: 'inherit' },
    postCard: { background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4deca'}`, borderRadius: '16px', overflow: 'hidden', boxShadow: dm ? 'none' : '0 2px 12px rgba(80,100,60,0.07)' },
    postImage: { width: '100%', maxHeight: '380px', objectFit: 'cover', display: 'block' },
    postBody: { padding: '2rem 1.75rem' },
    postMeta: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' },
    authorRow: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    avatar: { width: '48px', height: '48px', borderRadius: '50%', background: dm ? '#4a5a42' : '#ddebd0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, color: dm ? '#9ab89a' : '#5a7a40', overflow: 'hidden', flexShrink: 0 },
    authorName: { fontSize: '1rem', fontWeight: 700, color: dm ? '#c1d6c1' : '#3d4d34', cursor: 'pointer', transition: 'color 0.15s' },
    authorNameHover: { color: '#5a7a40' },
    postDate: { fontSize: '0.825rem', color: dm ? '#7a9a7a' : '#8a9a7e' },
    postTitle: { fontSize: '1.5rem', fontWeight: 700, color: dm ? '#d0e8d0' : '#2d3d24', marginBottom: '1rem', lineHeight: 1.35 },
    postText: { fontSize: '1rem', color: dm ? '#9ab89a' : '#5a6a50', lineHeight: 1.8, marginBottom: '1.5rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' },
    postActions: { display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: `1px solid ${dm ? '#4a5a42' : '#eaeee6'}` },
    deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', color: '#c0392b', fontWeight: 600, padding: '0.3rem 0.5rem', borderRadius: '6px', marginLeft: 'auto' },
    commentsSection: { marginTop: '2rem', paddingTop: '2rem', borderTop: `2px solid ${dm ? '#4a5a42' : '#eaeee6'}` },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 700, color: dm ? '#c1d6c1' : '#3d4d34', marginBottom: '1.25rem' },
    comment: { display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'flex-start' },
    commentBubble: { background: dm ? '#2e3a28' : '#f4f7f0', borderRadius: '12px', padding: '0.75rem 1rem', flex: 1 },
    commentAuthor: { fontSize: '0.85rem', fontWeight: 700, color: dm ? '#b0d0b0' : '#4a6a30', marginBottom: '0.3rem', cursor: 'pointer' },
    commentText: { fontSize: '0.9rem', color: dm ? '#9ab89a' : '#4a5a40', lineHeight: 1.6 },
    commentInput: { width: '100%', padding: '0.75rem 1rem', borderRadius: '20px', border: `1.5px solid ${dm ? '#4a5a42' : '#cdd8c4'}`, background: dm ? '#2e3a28' : '#f8faf5', color: dm ? '#c1d6c1' : '#2d3828', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' },
    commentSubmit: { padding: '0.6rem 1.25rem', background: '#5a7a40', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
    empty: { textAlign: 'center', color: dm ? '#9ab89a' : '#7a8a6e', padding: '2rem', fontSize: '0.9rem' },
    center: { textAlign: 'center', padding: '4rem', color: dm ? '#9ab89a' : '#7a8a6e' },
  };

  if (loading) return <div style={{ ...s.page, ...s.center }}>Loading post…</div>;
  if (error || !post) return <div style={{ ...s.page, ...s.center }}>⚠️ {error || 'Post not found'}</div>;

  const isOwner = user?._id && post.author?._id && user._id === post.author._id;
  const isAdmin = user?.role === 'admin';
  const canDelete = isOwner || isAdmin;

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={s.container}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>← Back</button>

        <div style={s.postCard}>
          {post.image && (
            <img src={getImageURL(post.image)} alt={post.title || ''} style={s.postImage} onError={e => { e.target.style.display = 'none'; }} />
          )}
          <div style={s.postBody}>
            <div style={s.postMeta}>
              <div style={s.authorRow}>
                <div style={s.avatar}>
                  {post.author?.profilePic
                    ? <img src={getImageURL(post.author.profilePic)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                    : initials(post.author?.name)
                  }
                </div>
                <div>
                  {/* ← CLICKABLE AUTHOR NAME */}
                  <div
                    style={s.authorName}
                    onClick={() => post.author?._id && navigate(`/profile/${post.author._id}`)}
                    onMouseEnter={e => e.target.style.color = '#5a7a40'}
                    onMouseLeave={e => e.target.style.color = dm ? '#c1d6c1' : '#3d4d34'}
                  >
                    {post.author?.name || 'Unknown'}
                  </div>
                  <div style={s.postDate}>{formatDate(post.createdAt)}</div>
                </div>
              </div>
            </div>

            <h1 style={s.postTitle}>{post.title}</h1>
            <div style={s.postText}>{post.body}</div>

            {canDelete && (
              <div style={s.postActions}>
                <button style={s.deleteBtn} onClick={handleDeletePost}>🗑 Delete Post</button>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div style={s.commentsSection}>
          <h2 style={s.sectionTitle}>Comments ({comments.length})</h2>

          {comments.length === 0 && (
            <div style={s.empty}>No comments yet. Be the first to comment!</div>
          )}

          {comments.map(c => {
            const canDeleteComment = (user?._id && c.author?._id && user._id === c.author._id) || user?.role === 'admin';
            return (
              <div key={c._id} style={s.comment}>
                <div style={{ ...s.avatar, width: '40px', height: '40px', fontSize: '0.9rem' }}>
                  {c.author?.profilePic
                    ? <img src={getImageURL(c.author.profilePic)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                    : initials(c.author?.name)
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={s.commentBubble}>
                    {/* ← CLICKABLE COMMENT AUTHOR */}
                    <div
                      style={s.commentAuthor}
                      onClick={() => c.author?._id && navigate(`/profile/${c.author._id}`)}
                      onMouseEnter={e => e.target.style.color = '#6a8a40'}
                      onMouseLeave={e => e.target.style.color = dm ? '#b0d0b0' : '#4a6a30'}
                    >
                      {c.author?.name || 'Unknown'}
                    </div>
                    <div style={s.commentText}>{c.body}</div>
                  </div>
                  {canDeleteComment && (
                    <button onClick={() => handleDeleteComment(c._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', fontSize: '0.75rem', marginTop: '0.3rem', fontWeight: 600 }}>Delete</button>
                  )}
                </div>
              </div>
            );
          })}

          {user && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${dm ? '#4a5a42' : '#eaeee6'}`, display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                style={s.commentInput}
                placeholder="Write a comment…"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleComment(); }}
              />
              <button style={s.commentSubmit} onClick={handleComment} disabled={commentLoading || !commentInput.trim()}>
                {commentLoading ? '…' : 'Post'}
              </button>
            </div>
          )}

          {!user && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${dm ? '#4a5a42' : '#eaeee6'}`, textAlign: 'center', color: dm ? '#9ab89a' : '#7a8a6e' }}>
              <a href="/login" style={{ color: '#5a7a40', fontWeight: 600, textDecoration: 'none' }}>Sign in</a> to comment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
