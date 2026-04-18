import { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState('users');
  const [expandedMsg, setExpandedMsg] = useState(null);

  useEffect(() => {
    API.get('/admin/users').then((r) => setUsers(r.data)).catch(() => {});
    API.get('/admin/posts').then((r) => setPosts(r.data)).catch(() => {});
    API.get('/admin/messages').then((r) => setMessages(r.data)).catch(() => {});
  }, []);

  const toggleStatus = async (id) => {
    const { data } = await API.put(`/admin/users/${id}/status`);
    setUsers(users.map((u) => (u._id === id ? data.user : u)));
  };

  const removePost = async (id) => {
    await API.put(`/admin/posts/${id}/remove`);
    setPosts(posts.map((p) => (p._id === id ? { ...p, status: 'removed' } : p)));
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-page {
          min-height: 100vh;
          background: #f5f3ef;
          background-image:
            radial-gradient(ellipse at 15% 10%, rgba(139,165,120,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 85%, rgba(180,160,120,0.10) 0%, transparent 55%);
          font-family: 'DM Sans', sans-serif;
          padding: 2.5rem 1.5rem;
        }

        .ap-container {
          max-width: 900px;
          margin: 0 auto;
          animation: ap-fadeUp 0.5s ease both;
        }

        @keyframes ap-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ap-header { text-align: center; margin-bottom: 2rem; }
        .ap-icon { font-size: 2.6rem; display: block; margin-bottom: 0.6rem; filter: drop-shadow(0 2px 6px rgba(100,130,80,0.20)); }
        .ap-title { font-family: 'Lora', serif; font-size: 1.75rem; font-weight: 600; color: #3d4d34; letter-spacing: -0.3px; margin-bottom: 0.3rem; }
        .ap-subtitle { font-size: 0.875rem; color: #8a9a7e; font-weight: 300; }

        .ap-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .ap-stat-card { background: #ffffff; border-radius: 16px; padding: 1.4rem 1.75rem; border: 1px solid rgba(180,190,170,0.35); box-shadow: 0 2px 8px rgba(80,90,70,0.06); display: flex; align-items: center; gap: 1rem; }
        .ap-stat-icon { font-size: 1.8rem; flex-shrink: 0; }
        .ap-stat-num { font-family: 'Lora', serif; font-size: 1.75rem; font-weight: 600; color: #3d4d34; line-height: 1; }
        .ap-stat-label { font-size: 0.8rem; color: #8a9a7e; font-weight: 300; margin-top: 0.2rem; }

        .ap-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; background: #eceee8; border-radius: 14px; padding: 0.35rem; width: fit-content; }
        .ap-tab { padding: 0.55rem 1.4rem; border: none; border-radius: 10px; font-size: 0.875rem; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; background: transparent; color: #7a8870; transition: background 0.18s, color 0.18s, box-shadow 0.18s; position: relative; }
        .ap-tab.active { background: #ffffff; color: #3d4d34; box-shadow: 0 2px 8px rgba(80,90,70,0.10); }

        .ap-badge-dot { position: absolute; top: 4px; right: 6px; width: 8px; height: 8px; background: #c0392b; border-radius: 50%; }

        .ap-card { background: #ffffff; border-radius: 20px; border: 1px solid rgba(180,190,170,0.35); box-shadow: 0 2px 8px rgba(80,90,70,0.06), 0 8px 30px rgba(80,90,70,0.08); overflow: hidden; }

        .ap-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        .ap-table thead { background: #f2f5ee; border-bottom: 1.5px solid #e0e8d8; }
        .ap-table th { padding: 0.9rem 1.25rem; text-align: left; font-weight: 500; color: #4d5d42; font-size: 0.8rem; letter-spacing: 0.04em; text-transform: uppercase; }
        .ap-table td { padding: 0.9rem 1.25rem; color: #4a5a40; border-bottom: 1px solid #f0f4ec; vertical-align: middle; }
        .ap-table tbody tr:last-child td { border-bottom: none; }
        .ap-table tbody tr:hover td { background: #fafbf8; }

        .ap-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; letter-spacing: 0.03em; }
        .ap-badge--active    { background: #d8edcc; color: #3a6228; }
        .ap-badge--inactive  { background: #ece8e0; color: #6a5840; }
        .ap-badge--published { background: #c8ddb8; color: #3a5828; }
        .ap-badge--removed   { background: #f5dcd8; color: #8a3828; }
        .ap-badge--unread    { background: #fde8cc; color: #8a5020; }
        .ap-badge--read      { background: #eceee8; color: #7a8870; }

        .ap-btn { padding: 0.4rem 0.9rem; border: none; border-radius: 8px; font-size: 0.8rem; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.15s, transform 0.12s; }
        .ap-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .ap-btn:active { transform: translateY(0); }
        .ap-btn--danger  { background: #f5dcd8; color: #8a3828; }
        .ap-btn--success { background: #d8edcc; color: #3a6228; }
        .ap-btn--neutral { background: #eceee8; color: #4a5a40; }

        .ap-empty { padding: 3rem; text-align: center; color: #9aaa8e; font-size: 0.9rem; font-weight: 300; }

        /* Message expand row */
        .ap-msg-expand { background: #f8faf5 !important; }
        .ap-msg-expand td { padding: 0 1.25rem 1rem !important; }
        .ap-msg-body { background: #ffffff; border: 1px solid #e0e8d8; border-radius: 10px; padding: 1rem 1.25rem; font-size: 0.875rem; color: #4a5a40; line-height: 1.7; white-space: pre-wrap; }

        .ap-msg-row { cursor: pointer; }
        .ap-msg-row td { font-weight: 400; }
        .ap-msg-row.unread td { font-weight: 600; color: #3d4d34; }

        @media (max-width: 600px) {
          .ap-table th:nth-child(2), .ap-table td:nth-child(2) { display: none; }
          .ap-stats { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ap-page">
        <div className="ap-container">

          <div className="ap-header">
            <span className="ap-icon">🛡️</span>
            <h1 className="ap-title">Admin Dashboard</h1>
            <p className="ap-subtitle">Manage members, content, and messages</p>
          </div>

          <div className="ap-stats">
            <div className="ap-stat-card">
              <span className="ap-stat-icon">👥</span>
              <div>
                <div className="ap-stat-num">{users.length}</div>
                <div className="ap-stat-label">Total Members</div>
              </div>
            </div>
            <div className="ap-stat-card">
              <span className="ap-stat-icon">📝</span>
              <div>
                <div className="ap-stat-num">{posts.length}</div>
                <div className="ap-stat-label">Total Posts</div>
              </div>
            </div>
            <div className="ap-stat-card">
              <span className="ap-stat-icon">✉️</span>
              <div>
                <div className="ap-stat-num">{messages.length}</div>
                <div className="ap-stat-label">Messages {unreadCount > 0 && `(${unreadCount} new)`}</div>
              </div>
            </div>
          </div>

          <div className="ap-tabs">
            <button className={`ap-tab${tab === 'users' ? ' active' : ''}`} onClick={() => setTab('users')}>
              Members ({users.length})
            </button>
            <button className={`ap-tab${tab === 'posts' ? ' active' : ''}`} onClick={() => setTab('posts')}>
              All Posts ({posts.length})
            </button>
            <button className={`ap-tab${tab === 'messages' ? ' active' : ''}`} onClick={() => setTab('messages')}>
              Messages ({messages.length})
              {unreadCount > 0 && <span className="ap-badge-dot" />}
            </button>
          </div>

          <div className="ap-card">

            {/* USERS TAB */}
            {tab === 'users' && (
              users.length === 0 ? <div className="ap-empty">No members found.</div> : (
                <table className="ap-table">
                  <thead>
                    <tr><th>Name</th><th>Email</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td><span className={`ap-badge ap-badge--${u.status}`}>{u.status}</span></td>
                        <td>
                          <button
                            className={`ap-btn ${u.status === 'active' ? 'ap-btn--danger' : 'ap-btn--success'}`}
                            onClick={() => toggleStatus(u._id)}
                          >
                            {u.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}

            {/* POSTS TAB */}
            {tab === 'posts' && (
              posts.length === 0 ? <div className="ap-empty">No posts found.</div> : (
                <table className="ap-table">
                  <thead>
                    <tr><th>Title</th><th>Author</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {posts.map((p) => (
                      <tr key={p._id}>
                        <td>{p.title}</td>
                        <td>{p.author?.name}</td>
                        <td><span className={`ap-badge ap-badge--${p.status}`}>{p.status}</span></td>
                        <td>
                          {p.status === 'published' && (
                            <button className="ap-btn ap-btn--danger" onClick={() => removePost(p._id)}>
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}

            {/* MESSAGES TAB */}
            {tab === 'messages' && (
              messages.length === 0 ? <div className="ap-empty">No messages yet.</div> : (
                <table className="ap-table">
                  <thead>
                    <tr><th>From</th><th>Email</th><th>Status</th><th>Received</th></tr>
                  </thead>
                  <tbody>
                    {messages.map((m) => (
                      <>
                        <tr
                          key={m._id}
                          className={`ap-msg-row${!m.read ? ' unread' : ''}`}
                          onClick={async () => {
                            setExpandedMsg(expandedMsg === m._id ? null : m._id);
                            if (!m.read) {
                              try {
                                await API.put(`/admin/messages/${m._id}/read`);
                                setMessages(msgs => msgs.map(msg => msg._id === m._id ? { ...msg, read: true } : msg));
                              } catch {}
                            }
                          }}
                        >
                          <td>{m.name}</td>
                          <td>{m.email}</td>
                          <td><span className={`ap-badge ap-badge--${m.read ? 'read' : 'unread'}`}>{m.read ? 'Read' : 'New'}</span></td>
                          <td>{new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        </tr>
                        {expandedMsg === m._id && (
                          <tr className="ap-msg-expand">
                            <td colSpan={4}>
                              <div className="ap-msg-body">{m.message}</div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              )
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;