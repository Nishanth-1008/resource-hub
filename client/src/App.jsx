import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BottomNavbar from './components/BottomNavbar'

import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Notes from './pages/Notes'
import Profile from './pages/Profile'
import More from './pages/More'
import Recordings from './pages/Recordings';
import Admin from './pages/Admin'
import StudentDashboard from './pages/StudentDashboard'; 

function App() {
  return (
    <div style={{ paddingBottom: '70px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/more" element={<More />} />
        <Route path="/recordings" element={<Recordings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Routes>
      <BottomNavbar />
    </div>
  )
}

export default App
