import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import '../App.css';

function TeacherDashboard() {

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
            <div>
                <h2>Welcome, {teacher?.name || "Loading..."}</h2>
                {/* Display personalized content */}
            </div>
            {/* rest of the dashboard content */}
        </>
      );
}

export default TeacherDashboard;