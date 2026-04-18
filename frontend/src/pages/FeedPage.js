import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const FeedPage = ({ darkMode = false }) => {
  const auth = useAuth();
  const user = auth?.user ?? null;
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [comments, setComments] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [commentLoading, setCommentLoading] = useState({});
  const [search, setSearch] = useState('');

  const fileRef = useRef();
  const dm = !!darkMode;

  const getImageURL = (filename) => {
    const { hostname } = window.location;
    return `http://${hostname}:5000/uploads/${filename}`;
  };

  const filteredPosts = posts.filter(p => {
    const q = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.body?.toLowerCase().includes(q) ||
      p.author?.name?.toLowerCase().includes(q)
    );
  });

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await API.get('/posts');
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('FeedPage fetchPosts error:', err);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    setPostError('');
    setPosting(true);
    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);
    try {
      const { data } = await API.post('/posts', fd);
      setPosts(prev => [data, ...prev]);
      setTitle(''); setBody(''); setImage(null); setPreview(null); setShowForm(false);
    } catch (err) {
      setPostError(err.response?.data?.message || 'Failed to publish post.');
    } finally {
      setPosting(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await API.delete(`/posts/${postId}`);
      setPosts(prev => prev.filter(p => p._id !== postId));
    } catch { alert('Failed to delete post.'); }
  };

  const toggleComments = async (postId) => {
    const isOpen = openComments[postId];
    setOpenComments(prev => ({ ...prev, [postId]: !isOpen }));
    if (!isOpen && !comments[postId]) {
      try {
        const { data } = await API.get(`/comments/${postId}`);
        setComments(prev => ({ ...prev, [postId]: Array.isArray(data) ? data : [] }));
      } catch {
        setComments(prev => ({ ...prev, [postId]: [] }));
      }
    }
  };

  const handleComment = async (postId) => {
    const text = commentInput[postId]?.trim();
    if (!text) return;
    setCommentLoading(prev => ({ ...prev, [postId]: true }));
    try {
      const { data } = await API.post(`/comments/${postId}`, { body: text });
      setComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), data] }));
      setCommentInput(prev => ({ ...prev, [postId]: '' }));
    } catch { alert('Failed to post comment.'); }
    finally { setCommentLoading(prev => ({ ...prev, [postId]: false })); }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(prev => ({ ...prev, [postId]: (prev[postId] || []).filter(c => c._id !== commentId) }));
    } catch { alert('Failed to delete comment.'); }
  };

  const formatDate = (d) => {
    try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
    catch { return ''; }
  };

  const initials = (name) => (name ? name.charAt(0).toUpperCase() : '?');

  const s = {
    page: { minHeight: '100vh', background: dm ? '#2a3424' : '#f2f4ee', padding: '2rem 1.25rem', fontFamily: "'DM Sans', sans-serif" },
    container: { maxWidth: '680px', margin: '0 auto' },
    pageTitle: { fontSize: '1.5rem', fontWeight: 700, color: dm ? '#c1d6c1' : '#3d4d34', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    searchBar: { width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '12px', border: `1.5px solid ${dm ? '#4a5a42' : '#cdd8c4'}`, background: dm ? '#3d4a35' : '#ffffff', color: dm ? '#c1d6c1' : '#2d3828', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: '1.25rem' },
    newPostBtn: { width: '100%', padding: '0.85rem 1.25rem', background: dm ? '#3d4a35' : '#ffffff', border: `1.5px dashed ${dm ? '#5a6e52' : '#b0c4a0'}`, borderRadius: '14px', color: dm ? '#9ab89a' : '#7a9a60', fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer', marginBottom: '1.5rem', textAlign: 'left', transition: 'border-color 0.2s, background 0.2s' },
    formCard: { background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4deca'}`, borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: dm ? 'none' : '0 2px 12px rgba(80,100,60,0.08)' },
    label: { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: dm ? '#9ab89a' : '#5a7a40', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' },
    input: { width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', border: `1.5px solid ${dm ? '#4a5a42' : '#cdd8c4'}`, background: dm ? '#2e3a28' : '#f8faf5', color: dm ? '#c1d6c1' : '#2d3828', fontSize: '0.9rem', outline: 'none', marginBottom: '0.85rem', fontFamily: 'inherit', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', border: `1.5px solid ${dm ? '#4a5a42' : '#cdd8c4'}`, background: dm ? '#2e3a28' : '#f8faf5', color: dm ? '#c1d6c1' : '#2d3828', fontSize: '0.9rem', outline: 'none', marginBottom: '0.85rem', minHeight: '100px', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6, boxSizing: 'border-box' },
    submitBtn: { padding: '0.7rem 1.5rem', background: '#5a7a40', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', marginRight: '0.75rem' },
    cancelBtn: { padding: '0.7rem 1.25rem', background: 'transparent', color: dm ? '#9ab89a' : '#7a8870', border: `1px solid ${dm ? '#4a5a42' : '#cdd8c4'}`, borderRadius: '10px', fontSize: '0.9rem', cursor: 'pointer' },
    postCard: { background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4deca'}`, borderRadius: '16px', marginBottom: '1.25rem', overflow: 'hidden', boxShadow: dm ? 'none' : '0 2px 12px rgba(80,100,60,0.07)', transition: 'transform 0.15s' },
    postImage: { width: '100%', maxHeight: '280px', objectFit: 'cover', display: 'block', cursor: 'pointer' },
    postBody: { padding: '1.25rem 1.5rem' },
    postMeta: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' },
    authorRow: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
    avatar: { width: '32px', height: '32px', borderRadius: '50%', background: dm ? '#4a5a42' : '#ddebd0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: dm ? '#9ab89a' : '#5a7a40', overflow: 'hidden', flexShrink: 0 },
    // ← Clickable author name
    authorName: { fontSize: '0.875rem', fontWeight: 600, color: dm ? '#c1d6c1' : '#3d4d34', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.15s' },
    authorNameHover: { color: '#5a7a40' },
    postDate: { fontSize: '0.775rem', color: dm ? '#7a9a7a' : '#8a9a7e' },
    postTitle: { fontSize: '1.1rem', fontWeight: 700, color: dm ? '#d0e8d0' : '#2d3d24', marginBottom: '0.5rem', lineHeight: 1.35, cursor: 'pointer', transition: 'color 0.15s' },
    postText: { fontSize: '0.9rem', color: dm ? '#9ab89a' : '#5a6a50', lineHeight: 1.65, marginBottom: '1rem' },
    postActions: { display: 'flex', gap: '0.75rem', alignItems: 'center', paddingTop: '0.75rem', borderTop: `1px solid ${dm ? '#4a5a42' : '#eaeee6'}` },
    actionBtn: (color) => ({ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: color || (dm ? '#9ab89a' : '#7a8a6e'), fontWeight: 500, padding: '0.3rem 0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'background 0.15s' }),
    deleteBtn: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#c0392b', fontWeight: 500, padding: '0.3rem 0.5rem', borderRadius: '6px', marginLeft: 'auto' },
    commentsSection: { padding: '0 1.5rem 1.25rem', borderTop: `1px solid ${dm ? '#4a5a42' : '#eaeee6'}` },
    comment: { display: 'flex', gap: '0.6rem', marginBottom: '0.85rem', alignItems: 'flex-start' },
    commentBubble: { background: dm ? '#2e3a28' : '#f4f7f0', borderRadius: '10px', padding: '0.5rem 0.85rem', flex: 1 },
    commentAuthor: { fontSize: '0.78rem', fontWeight: 700, color: dm ? '#b0d0b0' : '#4a6a30', marginBottom: '0.15rem', cursor: 'pointer' },
    commentText: { fontSize: '0.875rem', color: dm ? '#9ab89a' : '#4a5a40', lineHeight: 1.5 },
    commentInput: { width: '100%', padding: '0.6rem 0.9rem', borderRadius: '20px', border: `1.5px solid ${dm ? '#4a5a42' : '#cdd8c4'}`, background: dm ? '#2e3a28' : '#f8faf5', color: dm ? '#c1d6c1' : '#2d3828', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' },
    commentSubmit: { padding: '0.5rem 1rem', background: '#5a7a40', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={s.container}>
        <h1 style={s.pageTitle}>🌿 Community Feed</h1>

        <div style={{ position: 'relative', marginBottom: '0' }}>
          <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-60%)', fontSize: '1rem', pointerEvents: 'none', color: dm ? '#7a9a7a' : '#9aaa8e' }}>🔍</span>
          <input style={s.searchBar} placeholder="Search posts by title, content, or author…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {user && !showForm && (
          <button style={s.newPostBtn} onClick={() => setShowForm(true)}>✏️ &nbsp; What's on your mind? Share a post…</button>
        )}

        {user && showForm && (
          <div style={s.formCard}>
            <form onSubmit={handlePost}>
              {postError && <div style={{ color: '#c0392b', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{postError}</div>}
              <label style={s.label}>Title</label>
              <input style={s.input} value={title} onChange={e => setTitle(e.target.value)} placeholder="Give your post a title…" required />
              <label style={s.label}>Content</label>
              <textarea style={s.textarea} value={body} onChange={e => setBody(e.target.value)} placeholder="Share your thoughts on climate and sustainability…" required />
              {user.role === 'admin' && (
                <>
                  <label style={s.label}>Cover Image (Admin only)</label>
                  <input ref={fileRef} type="file" accept="image/*" style={{ marginBottom: '0.85rem', color: dm ? '#c1d6c1' : '#3d4d34' }}
                    onChange={e => { const f = e.target.files[0]; setImage(f); if (f) setPreview(URL.createObjectURL(f)); }} />
                  {preview && <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: '10px', marginBottom: '0.85rem', maxHeight: '180px', objectFit: 'cover' }} />}
                </>
              )}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={s.submitBtn} type="submit" disabled={posting}>{posting ? 'Publishing…' : '🌿 Publish'}</button>
                <button style={s.cancelBtn} type="button" onClick={() => { setShowForm(false); setPostError(''); }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading && <div style={{ textAlign: 'center', color: dm ? '#9ab89a' : '#7a8a6e', padding: '3rem' }}>Loading posts…</div>}
        {!loading && error && (
          <div style={{ textAlign: 'center', color: '#c0392b', padding: '2rem' }}>
            {error}<br />
            <button onClick={fetchPosts} style={{ marginTop: '0.75rem', padding: '0.5rem 1rem', background: '#5a7a40', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Retry</button>
          </div>
        )}
        {!loading && !error && posts.length === 0 && <div style={{ textAlign: 'center', color: dm ? '#9ab89a' : '#7a8a6e', padding: '3rem' }}>No posts yet. Be the first to share something! 🌱</div>}
        {!loading && !error && posts.length > 0 && filteredPosts.length === 0 && <div style={{ textAlign: 'center', color: dm ? '#9ab89a' : '#7a8a6e', padding: '3rem' }}>No posts match "<strong>{search}</strong>"</div>}

        {!loading && !error && filteredPosts.map(post => {
          const isOwner = user?._id && post.author?._id && user._id === post.author._id;
          const isAdmin = user?.role === 'admin';
          const canDelete = isOwner || isAdmin;
          const commentsOpen = openComments[post._id];
          const postComments = comments[post._id] || [];

          return (
            <div key={post._id} style={s.postCard}>
              {post.image && (
                <img src={getImageURL(post.image)} alt={post.title || ''} style={s.postImage} onClick={() => navigate(`/posts/${post._id}`)} onError={e => { e.target.style.display = 'none'; }} />
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

                <div 
                  style={s.postTitle} 
                  onClick={() => navigate(`/posts/${post._id}`)}
                  onMouseEnter={e => e.target.style.color = '#5a7a40'}
                  onMouseLeave={e => e.target.style.color = dm ? '#d0e8d0' : '#2d3d24'}
                >
                  {post.title}
                </div>
                <div style={s.postText}>{post.body}</div>

                <div style={s.postActions}>
                  <button style={s.actionBtn()} onClick={() => toggleComments(post._id)}>
                    💬 {commentsOpen ? 'Hide' : 'Comments'}
                  </button>
                  {canDelete && (
                    <button style={s.deleteBtn} onClick={() => handleDeletePost(post._id)}>🗑 Delete</button>
                  )}
                </div>
              </div>

              {commentsOpen && (
                <div style={s.commentsSection}>
                  <div style={{ marginTop: '1rem', marginBottom: '0.85rem' }}>
                    {postComments.length === 0 && (
                      <div style={{ fontSize: '0.85rem', color: dm ? '#7a9a7a' : '#9aaa8e', marginBottom: '0.75rem' }}>No comments yet. Be the first!</div>
                    )}
                    {postComments.map(c => {
                      const canDeleteComment = (user?._id && c.author?._id && user._id === c.author._id) || user?.role === 'admin';
                      return (
                        <div key={c._id} style={s.comment}>
                          <div style={{ ...s.avatar, width: '28px', height: '28px', fontSize: '0.75rem' }}>
                            {c.author?.profilePic
                              ? <img src={getImageURL(c.author.profilePic)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                              : initials(c.author?.name)
                            }
                          </div>
                          <div style={s.commentBubble}>
                            {/* ← CLICKABLE COMMENT AUTHOR */}
                            <div
                              style={s.commentAuthor}
                              onClick={() => c.author?._id && navigate(`/profile/${c.author._id}`)}
                            >
                              {c.author?.name || 'Unknown'}
                            </div>
                            <div style={s.commentText}>{c.body}</div>
                          </div>
                          {canDeleteComment && (
                            <button onClick={() => handleDeleteComment(post._id, c._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', fontSize: '0.8rem', paddingTop: '0.3rem' }}>✕</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {user && (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input style={s.commentInput} placeholder="Write a comment…" value={commentInput[post._id] || ''} onChange={e => setCommentInput(prev => ({ ...prev, [post._id]: e.target.value }))} onKeyDown={e => { if (e.key === 'Enter') handleComment(post._id); }} />
                      <button style={s.commentSubmit} onClick={() => handleComment(post._id)} disabled={commentLoading[post._id]}>{commentLoading[post._id] ? '…' : 'Post'}</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedPage;