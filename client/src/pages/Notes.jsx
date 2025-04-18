import React, { useState, useEffect } from 'react';
import './styles/Notes.css';
import { defaultNotes } from '../data/defaultNotes';

function Notes() {
  const [notesData, setNotesData] = useState({});
  const [openFolder, setOpenFolder] = useState(null);
  const [modalUrl, setModalUrl] = useState(null);

  // On mount: load from localStorage or fallback
  useEffect(() => {
    const saved = localStorage.getItem('resourceHubNotes');
    setNotesData(saved ? JSON.parse(saved) : defaultNotes);
  }, []);

  const toggleFolder = (folder) => {
    setOpenFolder(openFolder === folder ? null : folder);
  };

  const openPDF = (fileId) => {
    if (!fileId) {
      alert("This file is no longer available. Please upload it again.");
      return;
    }
    setModalUrl(`https://drive.google.com/file/d/${fileId}/preview`);
  };

  const closeModal = () => setModalUrl(null);

  return (
    <div className="notes-container">
      <h1>🎮 Hacker's Notes Portal</h1>
      <div className="notes-board">
        {Object.keys(notesData).map(subject => (
          <div key={subject} className="folder">
            <div className="folder-header" onClick={() => toggleFolder(subject)}>
              📂 {subject}
            </div>
            {openFolder === subject && (
              <div className="folder-content">
                {Object.keys(notesData[subject]).map(topic => (
                  <div key={topic} className="topic">
                    <div className="topic-header">🗂️ {topic}</div>
                    <div className="files">
                      {notesData[subject][topic].map((file, i) => (
                        <div
                          key={i}
                          className="file"
                          onClick={() => openPDF(file.fileId)}
                        >
                          📄 {file.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {modalUrl && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <iframe
              className="iframe-player"
              src={modalUrl}
              allow="autoplay"
              allowFullScreen
              title="PDF Viewer"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
