// src/components/FocusTimer.jsx
import React, { useState, useEffect } from 'react';
import './FocusTimer.css';

const FocusTimer = () => {
  const [activeTab, setActiveTab] = useState('pomodoro'); // 'pomodoro' or 'custom'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(30);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  // Handle tab change
  const handleTabChange = (tab) => {
    if (isActive) {
      const confirmChange = window.confirm('Timer is running. Are you sure you want to switch?');
      if (!confirmChange) return;
    }
    setActiveTab(tab);
    resetTimer();
  };

  // Reset timer based on current mode
  const resetTimer = () => {
    setIsActive(false);
    if (activeTab === 'pomodoro') {
      setTimeLeft(25 * 60);
    } else {
      setTimeLeft(customMinutes * 60);
    }
  };

  // Handle custom minutes change
  const handleCustomMinutesChange = (e) => {
    const minutes = Math.max(1, Math.min(120, parseInt(e.target.value) || 1));
    setCustomMinutes(minutes);
    if (!isActive && activeTab === 'custom') {
      setTimeLeft(minutes * 60);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle timer start/pause
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Timer logic
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
      audio.play();
      
      if (activeTab === 'pomodoro') {
        setCompletedPomodoros(prev => prev + 1);
      }
      
      setIsActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, activeTab]);

  return (
    <div className="focus-timer-container">
      <h2>⏱️ Focus Timer</h2>
      
      <div className="timer-tabs">
        <button
          className={`tab-button ${activeTab === 'pomodoro' ? 'active' : ''}`}
          onClick={() => handleTabChange('pomodoro')}
        >
          Pomodoro
        </button>
        <button
          className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => handleTabChange('custom')}
        >
          Custom Timer
        </button>
      </div>
      
      {activeTab === 'pomodoro' ? (
        <>
          <div className="timer-display">
            <div className="time">{formatTime(timeLeft)}</div>
            <div className="timer-info">25:00 Work Session</div>
          </div>
          <div className="pomodoro-count">
            Pomodoros Completed: {completedPomodoros}
          </div>
        </>
      ) : (
        <div className="custom-timer-controls">
          <div className="time-input">
            <label>Minutes:</label>
            <input
              type="number"
              min="1"
              max="120"
              value={customMinutes}
              onChange={handleCustomMinutesChange}
              disabled={isActive}
            />
          </div>
          <div className="timer-display">
            <div className="time">{formatTime(timeLeft)}</div>
          </div>
        </div>
      )}
      
      <div className="timer-controls">
        <button 
          className={`control-button ${isActive ? 'pause' : 'start'}`}
          onClick={toggleTimer}
        >
          {isActive ? '⏸ Pause' : '▶ Start'}
        </button>
        <button 
          className="control-button reset"
          onClick={resetTimer}
        >
          ↻ Reset
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;