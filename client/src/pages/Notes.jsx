// src/pages/Notes.jsx
import React, { useEffect, useState } from 'react';
import './styles/Notes.css';

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

export default function Notes() {
  const [notes, setNotes] = useState({ subjects: {} });
  const [modal, setModal] = useState({ open: false, link: '', title: '' });

  // Load notes on component mount
  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
  }, []);

  return (
    <div className="notes-container">
      <h1>Class Notes</h1>
      
      {Object.entries(notes.subjects).map(([sub, topics]) => (
        <section key={sub} className="subject">
          <h2>{sub}</h2>
          
          {Object.entries(topics).map(([topic, files]) => (
            <div key={topic} className="topic">
              <h3>{topic}</h3>
              
              <ul>
                {files.map((f, i) => (
                  <li key={i}>
                    <button onClick={() => setModal({ open: true, link: f.link, title: f.title })}>
                      {f.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {modal.open && (
        <div className="modal" onClick={() => setModal({ open: false })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setModal({ open: false })}>
              ×
            </button>
            <h4>{modal.title}</h4>
            <iframe
              src={modal.link}
              className="pdf-frame"
              title={modal.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}