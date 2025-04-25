import React from 'react';
import NavBar from '../components/NavBar';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../App.css';

function TeacherProfile() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/teachers/${id}`)
      .then(res => res.json())
      .then(data => setTeacher(data));
  }, [id]);

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
      <div className="container profile-container">
          <h2 className="profile-title">Welcome, {teacher?.name || "Loading..."}</h2>
          {teacher && (
            <div className="teacher-info card">
              <p><strong>Name:</strong> {teacher.name}</p>
              <p><strong>Email:</strong> {teacher.email}</p>
              <p><strong>Class:</strong> {teacher.class}</p>
              <p><strong>Subject:</strong> {teacher.subject}</p>
              {/* Add other relevant info here */}
        </div>
        )}
      </div>
    </>
  );
}

export default TeacherProfile;
