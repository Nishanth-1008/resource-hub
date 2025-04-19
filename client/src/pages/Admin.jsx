import React, { useEffect, useState, useRef } from 'react';
import './styles/Admin.css';

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USER || 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASS || 'secure123';
const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 5 * 60 * 1000;
const SESSION_TIMEOUT = 30 * 60 * 1000;

export default function Admin() {
  // State
  const [notes, setNotes] = useState({ subjects: {} });
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failed, setFailed] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lastActivity, setLastActivity] = useState(null);

  const [notif, setNotif] = useState(null); // { type: 'success'|'error', msg }
  const notifTimer = useRef();

  // Modal control
  const [modal, setModal] = useState(null);
  // modal = { type: 'subject'|'topic'|'file', subject?, topic? }

  // Session timeout
  useEffect(() => {
    if (!auth) return;
    const iv = setInterval(() => {
      if (Date.now() - lastActivity > SESSION_TIMEOUT) {
        logout();
        alert('Session expired.');
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [auth, lastActivity]);

  // Load on auth
  useEffect(() => {
    if (auth) {
      const saved = localStorage.getItem('class-notes');
      setNotes(saved ? JSON.parse(saved) : { subjects: {} });
      setLastActivity(Date.now());
    }
  }, [auth]);

  // Helpers
  const notify = (type, msg) => {
    clearTimeout(notifTimer.current);
    setNotif({ type, msg });
    notifTimer.current = setTimeout(() => setNotif(null), 3000);
  };
  const save = newNotes => {
    setNotes(newNotes);
    localStorage.setItem('class-notes', JSON.stringify(newNotes));
    setLastActivity(Date.now());
  };

  // Auth handlers
  const login = e => {
    e.preventDefault();
    if (locked) return notify('error', 'Account locked.');
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuth(true);
      setFailed(0);
      notify('success', 'Welcome back!');
    } else {
      const f = failed + 1;
      setFailed(f);
      setPassword('');
      notify('error', `Invalid credentials (${MAX_ATTEMPTS - f} left)`);
      if (f >= MAX_ATTEMPTS) {
        setLocked(true);
        setTimeout(() => setLocked(false), LOCKOUT_TIME);
      }
    }
  };
  const logout = () => {
    setAuth(false);
    setUsername('');
    setPassword('');
  };

  // CRUD via modals
  const openModal = (type, sub = null, topic = null) => setModal({ type, sub, topic });
  const closeModal = () => setModal(null);

  const handleModalSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    let copy = { ...notes };

    if (modal.type === 'subject') {
      if (!data.name) return notify('error', 'Subject is required');
      copy.subjects[data.name] = {};
      notify('success', `Subject "${data.name}" added`);
    }

    if (modal.type === 'topic') {
      if (!data.name) return notify('error', 'Topic is required');
      copy.subjects[modal.sub][data.name] = [];
      notify('success', `Topic "${data.name}" added under ${modal.sub}`);
    }

    if (modal.type === 'file') {
      if (!data.title || !data.link) return notify('error', 'All fields required');
      copy.subjects[modal.sub][modal.topic].push({ title: data.title, link: data.link });
      notify('success', `File "${data.title}" added under ${modal.topic}`);
    }

    save(copy);
    closeModal();
    form.reset();
  };

  const handleDelete = (sub, topic = null, idx = null) => {
    let copy = { ...notes };
    if (idx != null) {
      copy.subjects[sub][topic].splice(idx, 1);
      notify('success', 'File deleted');
    } else if (topic) {
      delete copy.subjects[sub][topic];
      notify('success', 'Topic deleted');
    } else {
      delete copy.subjects[sub];
      notify('success', 'Subject deleted');
    }
    save(copy);
  };

  // Render
  if (!auth) {
    return (
      <div className="login-container">
        <div className="login-header">
          <h2>🔐 Admin Portal</h2>
          {failed > 0 && <p className="attempts-warning">{failed}/{MAX_ATTEMPTS} failed</p>}
        </div>
        <form onSubmit={login}>
          <div className="input-group">
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} disabled={locked}/>
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={locked}/>
            </div>
          </div>
          <button className="login-button" disabled={locked}>
            {locked ? 'Locked' : 'Login'}
          </button>
        </form>
        {notif && <div className={`notification ${notif.type}`}>{notif.msg}</div>}
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button onClick={logout} className="btn danger">Logout</button>
        </div>

        <div className="admin-controls">
          <button onClick={() => openModal('subject')} className="btn primary">+ Add Subject</button>
        </div>

        {Object.entries(notes.subjects).map(([sub, topics]) => (
          <div key={sub} className="subject-block">
            <div className="subject-header">
              <h2>{sub}</h2>
              <button onClick={() => handleDelete(sub)} className="delete-btn">×</button>
            </div>
            <button onClick={() => openModal('topic', sub)} className="btn primary btn-sm">+ Add Topic</button>

            {Object.entries(topics).map(([topic, files]) => (
              <div key={topic} className="topic-block">
                <div className="topic-header">
                  <h3>{topic}</h3>
                  <button onClick={() => handleDelete(sub, topic)} className="delete-btn">×</button>
                </div>
                <button onClick={() => openModal('file', sub, topic)} className="btn primary btn-sm">+ Add File</button>
                <ul className="files-list">
                  {files.map((f, i) => (
                    <li key={i}>
                      <span>{f.title}</span>
                      <button onClick={() => handleDelete(sub, topic, i)} className="delete-btn">×</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {/* Modal */}
        {modal && (
          <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>
                {modal.type === 'subject' && 'New Subject'}
                {modal.type === 'topic' && `New Topic in "${modal.sub}"`}
                {modal.type === 'file' && `New File in "${modal.topic}"`}
              </h2>
              <form onSubmit={handleModalSubmit}>
                {modal.type !== 'file' && (
                  <div className="input-group">
                    <label>Name</label>
                    <input name="name" autoFocus/>
                  </div>
                )}
                {modal.type === 'file' && (
                  <>
                    <div className="input-group">
                      <label>Title</label>
                      <input name="title" autoFocus/>
                    </div>
                    <div className="input-group">
                      <label>Drive Link</label>
                      <input name="link"/>
                    </div>
                  </>
                )}
                <button className="btn primary">Create</button>
              </form>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
          </div>
        )}

        {notif && <div className={`notification ${notif.type}`}>{notif.msg}</div>}
      </div>
    </div>
  );
}
