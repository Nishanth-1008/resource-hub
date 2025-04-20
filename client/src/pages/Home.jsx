import React from 'react'
import './styles/Home.css'
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { FaBook, FaVideo, FaCalendarAlt, FaTools } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="main-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="glow-text">Lights On Learning. Dark Mode On Style.</h1>
          <br></br>
          <p className="hero-subtext">Welcome to <span className="highlight">Resource Hub</span> — A student dashboard built for the future.</p>
          <br></br>
          <div className="hero-buttons">
          <Link to="/calendar">
            <button className="btn primary" >Check Schedule</button>
          </Link>
          <Link to="/notes">
            <button className="btn secondary">Get Class Notes</button>
          </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="features">
        <div className="feature-grid">
          <Link to="/notes" className="feature-card">
            <FaBook className="feature-icon" />
            <h3>Class Notes</h3>
            <p>All your subjects. Organized and downloadable.</p>
          </Link>
          <Link to="/recordings" className="feature-card">
            <FaVideo className="feature-icon" />
            <h3>Recordings</h3>
            <p>Replay and relearn from past classes.</p>
          </Link>
          <Link to="/calendar" className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Calendar</h3>
            <p>Your academic planner, reimagined.</p>
          </Link>
          <Link to="/more" className="feature-card">
            <FaTools className="feature-icon" />
            <h3>More Tools</h3>
            <p>Extra utilities for smarter learning.</p>
          </Link>
        </div>
      </section>

      {/* Preview Section */}
      <section className="preview-section">
        <div className="preview-container">
          <div className="preview-text">
            <h2 className="glow-text-sm">Next-Gen Dashboard Experience</h2>
            <p>Manage notes, track classes, and explore tools — all from one sleek interface.</p>
            <br></br>
            <link to="/dashboard">
            <button className="btn secondary">View Dashboard</button>
            </link>
          </div>
          <div className="preview-box">
            <div className="dashboard-mockup">
              <div className="mock-card"></div>
              <div className="mock-card"></div>
              <div className="mock-card"></div>
              <div className="mock-card"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <h2 className="glow-text-sm">Contact Us</h2>
        <ContactForm />
      </section>
    </div>
  )
}

export default Home