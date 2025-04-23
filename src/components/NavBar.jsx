import React, { useState } from 'react'
import '../App.css'

function NavBar() {
  
  const [loggedIn, setLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null) // 'Teacher' or 'student'

  const handleLogin = (role) => {
    setLoggedIn(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setUserRole(null)
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">Grade Tracker</div>
        {loggedIn && userRole === 'Teacher' && (
          <ul className="navbar-links">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#students">Students</a></li>
            <li><a href="#student-grades">Student Grades</a></li>
          </ul>
        )}
        {loggedIn && userRole === 'student' && (
          <ul className="navbar-links">
            <li><a href="#my-grades">My Grades</a></li>
            <li><a href="#profile">Profile</a></li>
          </ul>
        )}
      </div>
      <div className="navbar-center">
        <input
          type="search"
          className="navbar-search"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
      <div className="navbar-right">
        {!loggedIn ? (
          <>
            <button className="navbar-btn" onClick={() => handleLogin('Teacher')}>Login as Teacher</button>
            <button className="navbar-btn" onClick={() => handleLogin('student')}>Login as Student</button>
          </>
        ) : (
          <button className="navbar-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  )
}

export default NavBar
