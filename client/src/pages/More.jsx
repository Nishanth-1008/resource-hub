import React from 'react';
import { Link } from 'react-router-dom';
import './styles/More.css';

const More = () => {
  return (
    <div className="more-container">
      <h1>⚙️ More</h1>
      <ul className="more-list">
        <li>
          <Link to="/recordings">🎥 Class Recordings</Link>
        </li>
        <li>
          <a href="https://whatsapp.com/channel/0029Vahojsi0bIdieW7Khc3c" target="_blank" rel="noopener noreferrer">
            📲 Join WhatsApp Channel
          </a>
        </li>
        {/* Add more links here if needed */}
      </ul>
    </div>
  );
};

export default More;
