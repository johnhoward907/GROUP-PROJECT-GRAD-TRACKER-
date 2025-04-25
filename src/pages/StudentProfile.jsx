import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useParams } from "react-router-dom";
import '../App.css';

function StudentProfile() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/students/${id}`)
          .then(res => res.json())
          .then(data => setStudent(data));
    }, [id]);

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
            <div className="container profile-container">
                <h2 className="profile-title">Welcome, {student?.name || "Loading..."}</h2>
                {student && (
                <div className="teacher-info card">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    {/* Add other relevant info here */}
                </div>
                )}
            </div>
        </>
    );
}

export default StudentProfile;
