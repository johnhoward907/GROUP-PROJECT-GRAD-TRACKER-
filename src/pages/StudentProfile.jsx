import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useParams } from "react-router-dom";
import '../App.css';

function StudentProfile() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // TODO: Implement search/filter logic here
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
                <h2>Welcome, {student?.name || "Loading..."}</h2>
                {/* Display personalized content */}
            </div>
            {/* rest of the dashboard content */}
        </>
    );
}

export default StudentProfile;
