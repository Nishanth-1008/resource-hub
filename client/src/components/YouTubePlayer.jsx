// src/components/YouTubePlayer.jsx
import React, { useState, useEffect } from 'react';
import './YouTubePlayer.css';

const API_KEY = 'AIzaSyA2UAfkfRShq4ojYGC7dWfYrX-SXFB8T5I'; // Replace with your actual API key

const YouTubePlayer = () => {
  const [videoId, setVideoId] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const extractVideoId = (url) => {
    try {
      const regex = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : '';
    } catch {
      return '';
    }
  };

  const handlePlay = () => {
    const id = extractVideoId(urlInput);
    if (!id) return alert('Invalid YouTube link!');
    setVideoId(id);
    setSearchResults([]); // Clear search results when playing directly
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}&type=video`
      );
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Error searching YouTube:', error);
      alert('Failed to search YouTube');
    } finally {
      setIsSearching(false);
    }
  };

  const handlePlayFromSearch = (id) => {
    setVideoId(id);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="yt-container">
      <h2 className="yt-title">🎬 YouTube Lecture Player</h2>
      
      <div className="yt-input-area">
        <input
          type="text"
          placeholder="Paste YouTube link here..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <button onClick={handlePlay}>▶ Play</button>
      </div>
      
      <div className="yt-search-area">
        <input
          type="text"
          placeholder="Search YouTube videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? 'Searching...' : '🔍 Search'}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="yt-search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((item) => (
              <li key={item.id.videoId} onClick={() => handlePlayFromSearch(item.id.videoId)}>
                <img 
                  src={item.snippet.thumbnails.default.url} 
                  alt={item.snippet.title}
                />
                <span>{item.snippet.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {videoId && (
        <div className="yt-frame-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Lecture"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default YouTubePlayer;