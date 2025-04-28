import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../App.css';

function NavBar({ userType, handleLogout, searchQuery, onSearchChange }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">Grade Tracker</div>
        
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`menu-icon-bar ${isMobileMenuOpen ? 'open' : ''}`} />
          <span className={`menu-icon-bar ${isMobileMenuOpen ? 'open' : ''}`} />
          <span className={`menu-icon-bar ${isMobileMenuOpen ? 'open' : ''}`} />
        </button>

        {/* Navigation links - shown on desktop, hidden on mobile unless menu is open */}
        <div className={`navbar-links-container ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {user && userType === 'teacher' && (
            <ul className="navbar-links">
              <li>
                <NavLink 
                  to={`/teacher/${user.id}/dashboard`} 
                  className={({ isActive }) => 
                    isActive || location.pathname.startsWith(`/teacher/${user.id}/dashboard`) 
                      ? 'active-nav-link' 
                      : ''
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                > 
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={`/teacher/${user.id}/students`} 
                  className={({ isActive }) => 
                    isActive || location.pathname.startsWith(`/teacher/${user.id}/students`) 
                      ? 'active-nav-link' 
                      : ''
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Students
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={`/teacher/${user.id}/grades`} 
                  className={({ isActive }) => 
                    isActive || location.pathname.startsWith(`/teacher/${user.id}/grades`) 
                      ? 'active-nav-link' 
                      : ''
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Grades
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={`/teacher/${user.id}/profile`} 
                  className={({ isActive }) => 
                    isActive || location.pathname.startsWith(`/teacher/${user.id}/profile`) 
                      ? 'active-nav-link' 
                      : ''
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          )}
          {user && userType === 'student' && (
            <ul className="navbar-links">
              <li>
                <NavLink 
                  to={`/student/${user.id}/my-grades`} 
                  className={({ isActive }) => 
                    isActive || location.pathname.startsWith(`/student/${user.id}/my-grades`) 
                      ? 'active-nav-link' 
                      : ''
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Grades
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={`/student/${user.id}/profile`} 
                  className={({ isActive }) => 
                    isActive || location.pathname.startsWith(`/student/${user.id}/profile`) 
                      ? 'active-nav-link' 
                      : ''
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
      
      <div className={`navbar-center ${isMobileMenuOpen ? 'mobile-hidden' : ''}`}>
        <input
          type="search"
          className="navbar-search"
          placeholder={userType === 'student' ? "Search subjects, grades..." : "Search students, grades..."}
          aria-label="Search"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      
      <div className={`navbar-right ${isMobileMenuOpen ? 'mobile-hidden' : ''}`}>
        {userType && (
          <div className="user-actions">
            <span className="user-welcome">Welcome, {user?.name}</span>
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