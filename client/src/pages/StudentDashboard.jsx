import React, { useState, useEffect } from 'react';
import './styles/StudentDashboard.css';

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
      <h1>📚 Your Notes Library</h1>
      {library.length === 0 ? (
        <p className="empty-msg">No notes yet! Add them from the Notes page.</p>
      ) : (
        <ul className="library-list">
          {library.map((note, index) => (
            <li key={index} className="library-item">
              <span>{note.title}</span>
              <div className="note-actions">
                <a href={note.link} target="_blank" rel="noopener noreferrer">View</a>
                <button onClick={() => removeNote(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
