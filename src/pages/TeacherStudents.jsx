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
      <div className="students-container">
        <h2>Students of {teacher?.name || "Loading..."}</h2>
        {students.length === 0 ? (
          <p className="no-students">No students found.</p>) 
          :
          (
            <table className="students-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {/* Add more headers if needed */}
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td data-label="Name">{student.name}</td>
                    <td data-label="Email"><strong>Email:</strong> {student.email}</td>
                    {/* Add more cells if needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </>
  );
}

export default TeacherStudents;
