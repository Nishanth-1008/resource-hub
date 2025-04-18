// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import './styles/Admin.css';

// Helper function to load notes from localStorage
const loadNotes = () => {
  try {
    const savedNotes = localStorage.getItem('class-notes');
    return savedNotes ? JSON.parse(savedNotes) : { subjects: {} };
  } catch (error) {
    console.error('Failed to load notes:', error);
    return { subjects: {} };
  }
};

// Helper function to save notes to localStorage
const saveNotes = (notes) => {
  try {
    localStorage.setItem('class-notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes:', error);
  }
};

export default function Admin() {
  const [notes, setNotes] = useState(loadNotes());

  // Load notes on component mount
  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
  }, []);

  // Save helper
  const save = async (newNotes) => {
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  // CRUD operations
  const addSubject = async () => {
    const name = prompt('Subject name?');
    if (!name) return;
    const copy = { ...notes };
    copy.subjects[name] = {};
    await save(copy);
  };

  const deleteSubject = async (sub) => {
    if (!confirm(`Delete ${sub}?`)) return;
    const copy = { ...notes };
    delete copy.subjects[sub];
    await save(copy);
  };

  const addTopic = async (sub) => {
    const topic = prompt('Topic name?');
    if (!topic) return;
    const copy = { ...notes };
    copy.subjects[sub][topic] = [];
    await save(copy);
  };

  const deleteTopic = async (sub, topic) => {
    if (!confirm(`Delete ${topic}?`)) return;
    const copy = { ...notes };
    delete copy.subjects[sub][topic];
    await save(copy);
  };

  const addFile = async (sub, topic) => {
    const title = prompt('File title?');
    const link = prompt('Drive preview link?');
    if (!title || !link) return;
    const copy = { ...notes };
    copy.subjects[sub][topic].push({ title, link });
    await save(copy);
  };

  const deleteFile = async (sub, topic, idx) => {
    if (!confirm('Delete file?')) return;
    const copy = { ...notes };
    copy.subjects[sub][topic].splice(idx, 1);
    await save(copy);
  };

  return (
    <div className="admin-container">
      <h1>Admin – Manage Notes</h1>
      <button className="add-btn" onClick={addSubject}>
        + Add Subject
      </button>
      
      {Object.entries(notes.subjects).map(([sub, topics]) => (
        <div key={sub} className="subject-block">
          <div className="subject-header">
            <h2>{sub}</h2>
            <button onClick={() => deleteSubject(sub)}>× Delete Subject</button>
          </div>
          <button className="add-btn" onClick={() => addTopic(sub)}>
            + Add Topic
          </button>
          
          {Object.entries(topics).map(([topic, files]) => (
            <div key={topic} className="topic-block">
              <div className="topic-header">
                <h3>{topic}</h3>
                <button onClick={() => deleteTopic(sub, topic)}>× Delete Topic</button>
              </div>
              <button className="add-btn" onClick={() => addFile(sub, topic)}>
                + Add File
              </button>
              
              <ul className="files-list">
                {files.map((f, i) => (
                  <li key={i}>
                    <span>{f.title}</span>
                    <button onClick={() => deleteFile(sub, topic, i)}>× Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}