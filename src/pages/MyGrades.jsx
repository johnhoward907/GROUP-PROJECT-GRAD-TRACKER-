import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import GradeTable from '../components/GradeTable';
import '../App.css';

function MyGrades() {
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    // Ensure the user exists and has an ID
    if (user && user.id) {
      import('../../db.json').then((data) => {
        const studentGrades = data.grades?.filter(
          (grade) => grade.studentId === user.id
        ) || [];
        setGrades(studentGrades);
        setFilteredGrades(studentGrades);
        setLoading(false);
      }).catch((error) => {
        console.error('Error loading grades:', error);
        setGrades([]);
        setFilteredGrades([]);
        setLoading(false);
      });
    } else {
      setGrades([]);
      setFilteredGrades([]);
      setLoading(false);
    }
  }, [user]); 

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem('user');
      window.location.href = '/login/student';
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query) {
      setFilteredGrades(grades.filter(grade => {
        // Check all searchable fields
        return (
          (grade.subject?.toLowerCase().includes(query) ?? false) ||
          (String(grade.grade).toLowerCase().includes(query) ||
          (grade.assignment?.toLowerCase().includes(query) ?? false) ||
          (grade.comments?.toLowerCase().includes(query) ?? false)
        ));
      }));
    } else {
      setFilteredGrades(grades);
    }
  };

  const calculateAverage = () => {
    if (filteredGrades.length === 0) return 0;
    const total = filteredGrades.reduce((sum, grade) => {
      // Ensure grade is a number
      const gradeValue = typeof grade.grade === 'string' 
        ? parseFloat(grade.grade.replace(/[^0-9.]/g, '')) 
        : Number(grade.grade);
      return sum + (isNaN(gradeValue) ? 0 : gradeValue);
    }, 0);
    return (total / filteredGrades.length).toFixed(2);
  };

  return (
    <>
      <NavBar 
        userType="student" 
        handleLogout={handleLogout} 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
      />
      <div>
        <h2>My Grades</h2>
        {loading ? (
          <p>Loading grades...</p>
        ) : (
          <>
            {searchQuery && (
              <p className="search-results-info">
                Showing {filteredGrades.length} of {grades.length} grades matching "{searchQuery}"
              </p>
            )}
            <GradeTable grades={filteredGrades} onEdit={() => {}} onDelete={() => {}} isStudent={true} />
            <div className="average-grade-container">
              <div className="average-card">
                <h4>Average Grade: {calculateAverage()}</h4>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MyGrades;
