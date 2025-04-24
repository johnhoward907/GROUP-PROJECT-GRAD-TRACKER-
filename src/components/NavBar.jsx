import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function NavBar({ userType, handleLogout, searchQuery, onSearchChange }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">Grade Tracker</div>
        
        {user && userType === 'teacher' && (
          <ul className="navbar-links">
              <li><NavLink to={`/teacher/${user.id}/dashboard`}>Dashboard</NavLink></li>
              <li><NavLink to={`/teacher/${user.id}/students`}>Students</NavLink></li>
              <li><NavLink to={`/teacher/${user.id}/grades`}>Grades</NavLink></li>
              <li><NavLink to={`/teacher/${user.id}/profile`}>Profile</NavLink></li>
            {/* <li><NavLink to={`/teacher/${user.id}/analytics`}>Analytics</NavLink></li> */}
          </ul>
        )}
        {user && userType === 'student' && (
          <ul className="navbar-links">
          <li><NavLink to={`/student/${user.id}/my-grades`}>My Grades</NavLink></li>
          {/* <li><NavLink to={`/student/${user.id}/assignments`}>Assignments</NavLink></li> */}
          <li><NavLink to={`/student/${user.id}/profile`}>Profile</NavLink></li>
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
          onChange={onSearchChange}
        />
      </div>
      
      <div className="navbar-right">
        {userType && (
          <div className="user-actions">
            <span className="user-welcome">Welcome, {user?.name}</span>
            <button 
              className="navbar-btn secondary"
              onClick={handleLogout}> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
