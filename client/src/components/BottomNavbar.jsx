import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './BottomNavbar.css'

function BottomNavbar() {
  const { pathname } = useLocation()

  return (
    <div className="bottom-navbar">
      <Link to="/more" className="nav-icon"><i className="fas fa-bars"></i></Link>
      <Link to="/calendar" className="nav-icon"><i className="fas fa-calendar-alt"></i></Link>
      <Link to="/" className={`nav-icon home-icon ${pathname === '/' ? 'active' : ''}`}>
        <img src="/src/assets/hub.ico" alt="Home" className="home-img"/>
      </Link>
      <Link to="/notes" className="nav-icon"><i className="fas fa-book"></i></Link>
      <Link to="/profile" className="nav-icon"><i className="fas fa-user"></i></Link>
    </div>
  )
}

export default BottomNavbar
