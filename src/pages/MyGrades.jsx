import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import GradeTable from '../components/GradeTable';
import '../App.css';

function MyGrades() {
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.id) {
      import('../../db.json').then((data) => {
        const studentGrades = data.grades.filter(
          (grade) => grade.studentId === user.id
        );
        setGrades(studentGrades);
        setFilteredGrades(studentGrades); // Initialize filtered grades with all data
        setLoading(false);
      }).catch(() => {
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
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query) {
      setFilteredGrades(grades.filter(grade => 
        grade.subject.toLowerCase().includes(query.toLowerCase()) || 
        grade.grade.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredGrades(grades);
    }
  };

  const calculateAverage = () => {
    if (filteredGrades.length === 0) return 0;

    const total = filteredGrades.reduce((sum, grade) => sum + parseFloat(grade.grade), 0);
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
