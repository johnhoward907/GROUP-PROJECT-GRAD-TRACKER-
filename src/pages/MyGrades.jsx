import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import GradeTable from '../components/GradeTable';
import '../App.css';

function StudentGrades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Parse logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.id) {
      // Fetch grades from local db.json or API
      import('../../db.json').then((data) => {
        // Filter grades for logged-in student by studentId
        const studentGrades = data.grades.filter(
          (grade) => grade.studentId === user.id
        );
        setGrades(studentGrades);
        setLoading(false);
      }).catch(() => {
        setGrades([]);
        setLoading(false);
      });
    } else {
      setGrades([]);
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

  return (
    <>
      <NavBar userType="student" handleLogout={handleLogout} />
      <div>
        <h2>My Grades</h2>
        {loading ? (
          <p>Loading grades...</p>
        ) : (
          <GradeTable grades={grades} onEdit={() => {}} onDelete={() => {}} isStudent={true} />
        )}
      </div>
    </>
  );
}

export default StudentGrades;
