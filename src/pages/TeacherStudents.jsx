import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../App.css';

function TeacherStudents() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/teachers/${id}`)
      .then(res => res.json())
      .then(data => setTeacher(data));
  }, [id]);

  useEffect(() => {
    // Fetch students related to the teacher
    // Assuming an API endpoint or filter by teacherId if available
    fetch(`http://localhost:3000/students`)
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem('user');
      window.location.href = '/login/teacher';
    }
  };

  return (
    <>
      <NavBar userType="teacher" handleLogout={handleLogout} />
      <div className="container">
        <h2>Students of {teacher?.name || "Loading..."}</h2>
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="student-list">
            {students.map(student => (
              <div key={student.id} className="student-card">
                <h3>{student.name}</h3>
                <p><strong>Email:</strong> {student.email}</p>
                {/* Add more student info here if needed */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default TeacherStudents;
