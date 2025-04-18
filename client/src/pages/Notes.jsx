// Notes.jsx
import React, { useState, useEffect } from 'react';
import './styles/Notes.css';

const Notes = () => {
    const [notes, setNotes] = useState({ subjects: {} });
    const [expandedSubjects, setExpandedSubjects] = useState({});
    const [expandedTopics, setExpandedTopics] = useState({});
    const [modal, setModal] = useState({ open: false, link: '', title: '' });

    // Load notes from localStorage
    useEffect(() => {
        const loadNotes = () => {
            try {
                const savedNotes = localStorage.getItem('class-notes');
                return savedNotes ? JSON.parse(savedNotes) : { subjects: {} };
            } catch {
                return { subjects: {} };
            }
        };
        setNotes(loadNotes());
    }, []);

    const toggleSubject = (subjectId) => {
        setExpandedSubjects(prev => ({
            ...prev,
            [subjectId]: !prev[subjectId]
        }));
    };

    const toggleTopic = (subjectId, topicId) => {
        const key = `${subjectId}-${topicId}`;
        setExpandedTopics(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="notes-container">
            <h1 className="notes-title">Class Notes</h1>
            
            {Object.entries(notes.subjects).map(([subjectId, subjectData]) => (
                <div key={subjectId} className="subject">
                    <div 
                        className="subject-header"
                        onClick={() => toggleSubject(subjectId)}
                    >
                        <span className="subject-toggle">
                            {expandedSubjects[subjectId] ? '▼' : '▶'}
                        </span>
                        <span className="subject-name">{subjectId}</span>
                    </div>
                    
                    {expandedSubjects[subjectId] && Object.entries(subjectData).map(([topicId, files]) => (
                        <div key={topicId} className="topic">
                            <div 
                                className="topic-header"
                                onClick={() => toggleTopic(subjectId, topicId)}
                            >
                                <span className="topic-toggle">
                                    {expandedTopics[`${subjectId}-${topicId}`] ? '▼' : '▶'}
                                </span>
                                <span className="topic-name">{topicId}</span>
                            </div>
                            
                            {expandedTopics[`${subjectId}-${topicId}`] && (
                                <ul className="file-list">
                                    {files.map((file, index) => (
                                        <li 
                                            key={index}
                                            className="file-item"
                                            onClick={() => setModal({
                                                open: true,
                                                link: file.link,
                                                title: file.title
                                            })}
                                        >
                                            {file.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            ))}

            {modal.open && (
                <div className="modal-overlay" onClick={() => setModal({ open: false })}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{modal.title}</h2>
                            <button 
                                className="close-btn"
                                onClick={() => setModal({ open: false })}
                            >
                                ×
                            </button>
                        </div>
                        <iframe
                            src={modal.link}
                            className="pdf-viewer"
                            title={modal.title}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;