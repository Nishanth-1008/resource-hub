// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import './styles/Admin.css';
import { defaultNotes } from '../data/defaultNotes';

export default function Admin() {
  const [data, setData] = useState({});
  const [form, setForm] = useState({ subject: '', topic: '', title: '', fileId: '' });

  // Load existing or default on mount
  useEffect(() => {
    const saved = localStorage.getItem('resourceHubNotes');
    setData(saved ? JSON.parse(saved) : defaultNotes);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('resourceHubNotes', JSON.stringify(data));
  }, [data]);

  const addSubject = () => {
    if (!form.subject || data[form.subject]) return;
    setData({ ...data, [form.subject]: {} });
    setForm({ ...form, subject: '' });
  };

  const addTopic = (sub) => {
    if (!form.topic || data[sub][form.topic]) return;
    setData({
      ...data,
      [sub]: { ...data[sub], [form.topic]: [] }
    });
    setForm({ ...form, topic: '' });
  };

  const addFile = () => {
    if (!form.subject || !form.topic || !form.title || !form.fileId) {
      return alert('Fill all fields');
    }
    const updated = {
      ...data,
      [form.subject]: {
        ...data[form.subject],
        [form.topic]: [
          ...(data[form.subject][form.topic] || []),
          { title: form.title, fileId: form.fileId }
        ]
      }
    };
    setData(updated);
    setForm({ ...form, title: '', fileId: '' });
  };

  const removeSubject = (sub) => {
    const { [sub]: _, ...rest } = data;
    setData(rest);
  };

  const removeTopic = (sub, top) => {
    const { [top]: _, ...rest } = data[sub];
    setData({ ...data, [sub]: rest });
  };

  const removeFile = (sub, top, idx) => {
    const arr = [...data[sub][top]];
    arr.splice(idx, 1);
    setData({
      ...data,
      [sub]: { ...data[sub], [top]: arr }
    });
  };

  return (
    <div className="admin-container">
      <h1>🛠️ Admin Dashboard</h1>

      <section className="admin-section">
        <h2>Subjects &amp; Topics</h2>
        <div className="btn-row">
          <input
            placeholder="New Subject"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
          />
          <button onClick={addSubject}>+ Subject</button>
        </div>

        {Object.keys(data).map(sub => (
          <div key={sub} className="subject-block">
            <div className="subject-header">
              📁 {sub}
              <button className="del-btn" onClick={() => removeSubject(sub)}>✕</button>
            </div>
            <div className="btn-row">
              <input
                placeholder={`New Topic under ${sub}`}
                value={form.topic}
                onChange={e => setForm({ ...form, topic: e.target.value })}
              />
              <button onClick={() => addTopic(sub)}>+ Topic</button>
            </div>
            {Object.keys(data[sub]).map(top => (
              <div key={top} className="topic-block">
                <div className="topic-header">
                  🗂️ {top}
                  <button className="del-btn" onClick={() => removeTopic(sub, top)}>✕</button>
                </div>
                <ul className="file-list">
                  {data[sub][top].map((f, i) => (
                    <li key={i}>
                      📄 {f.title} ({f.fileId})
                      <button className="del-btn" onClick={() => removeFile(sub, top, i)}>✕</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Add a File</h2>
        <div className="add-file-form">
          <select
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
          >
            <option value="">Select Subject</option>
            {Object.keys(data).map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
          <select
            value={form.topic}
            onChange={e => setForm({ ...form, topic: e.target.value })}
            disabled={!form.subject}
          >
            <option value="">Select Topic</option>
            {form.subject && Object.keys(data[form.subject]).map(top => (
              <option key={top} value={top}>{top}</option>
            ))}
          </select>
          <input
            placeholder="File Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Drive File ID"
            value={form.fileId}
            onChange={e => setForm({ ...form, fileId: e.target.value })}
          />
          <button onClick={addFile}>+ Add File</button>
        </div>
      </section>
    </div>
  );
}
