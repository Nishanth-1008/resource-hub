import React, { useState } from 'react';
import './styles/Recordings.css'; // Adjust the path as necessary
import logo from '../assets/hub.ico'; // make sure the logo is in the correct path

export default function Recordings() {
  const [activeCard, setActiveCard] = useState(null);
  const [videoId, setVideoId] = useState('');

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const playVideo = (id) => {
    if (!id) return alert("Video not yet available.");
    setVideoId(id);
    setTimeout(() => {
      const player = document.getElementById('video-iframe');
      if (player) player.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="container">
      <h1>
        <img src={logo} alt="Resource Hub Logo" className="logo" />
        Class Recordings
      </h1>

      <div className="card-board">
        {/* Maths */}
        <div className={`card ${activeCard === 0 ? 'open' : ''}`}>
          <div className="card-header" onClick={() => toggleCard(0)}>
            📙 Mathematics
          </div>
          <div className="card-body">
            <a onClick={() => playVideo('1SnAD4PYS9iLjZlqP8G6E4XuM5idVgHZ9')}>Parabola – 17/04/2k25</a>
          </div>
        </div>

        {/* Physics */}
        <div className={`card ${activeCard === 1 ? 'open' : ''}`}>
          <div className="card-header" onClick={() => toggleCard(1)}>
            📘 Physics
          </div>
          <div className="card-body">
            <a onClick={() => playVideo('1L3hl9Wht4suHU35HHGXKKHbLMW207OGo')}>Wave Optics – 17/04/2k25</a>
          </div>
        </div>

        {/* Chemistry */}
        <div className={`card ${activeCard === 2 ? 'open' : ''}`}>
          <div className="card-header" onClick={() => toggleCard(2)}>
            📗 Chemistry
          </div>
          <div className="card-body">
            <a onClick={() => playVideo('')}>Electrochemistry – Unavailable</a>
          </div>
        </div>
      </div>

      {videoId && (
        <div id="video-player">
          <iframe
            className="iframe-player"
            id="video-iframe"
            allowFullScreen
            src={`https://drive.google.com/file/d/${videoId}/preview`}
          ></iframe>
        </div>
      )}

      <footer>
        © 2025 Resource Hub. All rights reserved.
        <div className="disclaimer">
          ⚠️ <strong>Disclaimer:</strong> Resource Hub does not claim ownership of any video content displayed here.
          All recordings belong to their respective creators. This site is for educational reference only and no copyright
          infringement is intended.
        </div>
      </footer>
    </div>
  );
}
