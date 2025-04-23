import React, { useState } from 'react';
import '../App.css';

function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (role) => {
    setLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add search functionality here
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">Grade Tracker</div>
        {loggedIn && userRole === 'Teacher' && (
          <ul className="navbar-links">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#students">Students</a></li>
            <li><a href="#student-grades">Grades</a></li>
            <li><a href="#analytics">Analytics</a></li>
          </ul>
        )}
        {loggedIn && userRole === 'student' && (
          <ul className="navbar-links">
            <li><a href="#my-grades">My Grades</a></li>
            <li><a href="#assignments">Assignments</a></li>
            <li><a href="#profile">Profile</a></li>
          </ul>
        )}
      </div>
      
      <div className="navbar-center">
        <input
          type="search"
          className="navbar-search"
          placeholder="Search students, grades..."
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      
      <div className="navbar-right">
        {!loggedIn ? (
          <>
            <button 
              className="navbar-btn secondary"
              onClick={() => handleLogin('Teacher')}
            >
              Teacher Login
            </button>
            <button 
              className="navbar-btn"
              onClick={() => handleLogin('student')}
            >
              Student Login
            </button>
          </>
        ) : (
          <div className="user-actions">
            <span className="user-welcome">Welcome, {userRole}</span>
            <button 
              className="navbar-btn secondary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;