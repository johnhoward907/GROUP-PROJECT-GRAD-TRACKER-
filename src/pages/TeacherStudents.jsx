import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../App.css';

function TeacherStudents() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/teachers/${id}`)
      .then(res => res.json())
      .then(data => setTeacher(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/students`)
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  useEffect(() => {
    if (teacher && students.length > 0) {
      const studentsOfMyClass = students.filter(student => student.class === teacher.class);
      setFilteredStudents(studentsOfMyClass);
    }
  }, [teacher, students]);

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
        <h2>Students of class: {teacher?.class || "Loading..."}</h2>
        
        {filteredStudents.length === 0 ? (
          <p className="no-students">No students found.</p>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td data-label="Name">{student.name}</td>
                  <td data-label="Email">{student.email}</td>
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
