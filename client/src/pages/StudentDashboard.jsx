// Updated StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import './styles/StudentDashboard.css';
import YouTubePlayer from '../components/YoutubePlayer';
import FocusTimer from '../components/FocusTimer';

const StudentDashboard = () => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('student-library');
    setLibrary(saved ? JSON.parse(saved) : []);
  }, []);

  const removeNote = (index) => {
    const updated = [...library];
    updated.splice(index, 1);
    setLibrary(updated);
    localStorage.setItem('student-library', JSON.stringify(updated));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📚 Study Dashboard</h1>
      </header>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-column timer-column">
          <FocusTimer />
        </div>

        {/* Right Column */}
        <div className="dashboard-column content-column">
          <section className="notes-section">
            <h2>Your Notes Library</h2>
            {library.length === 0 ? (
              <p className="empty-msg">No notes yet! Add them from the Notes page.</p>
            ) : (
              <ul className="library-list">
                {library.map((note, index) => (
                  <li key={index} className="library-item">
                    <span className="note-title">{note.title}</span>
                    <div className="note-actions">
                      <a href={note.link} target="_blank" rel="noopener noreferrer">View</a>
                      <button onClick={() => removeNote(index)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="video-section">
            <h2>Lecture Player</h2>
            <YouTubePlayer />
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;