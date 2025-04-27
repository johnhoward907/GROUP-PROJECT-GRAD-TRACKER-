import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavBar from '../components/NavBar';
import GradeFilterBar from '../components/GradeFilterBar';
import GradeTable from '../components/GradeTable';
import '../App.css';

function TeacherDashboard() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [grades, setGrades] = useState([]);
    const [filteredGrades, setFilteredGrades] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSubject, setFilterSubject] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetch(`http://localhost:3000/teachers/${id}`)
          .then(res => res.json())
          .then(data => setTeacher(data));
    }, [id]);

    useEffect(() => {
        // Fetch grades for the teacher
        fetch(`http://localhost:3000/grades?teacherId=${id}`)
          .then(res => res.json())
          .then(data => {
            setGrades(data);
            setFilteredGrades(data);
          });
    }, [id]);

    useEffect(() => {
        // Filter and sort grades based on searchQuery, filterSubject, and sortOrder
        let updatedGrades = [...grades];

        if (searchQuery) {
            updatedGrades = updatedGrades.filter(grade =>
                grade.studentName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterSubject) {
            updatedGrades = updatedGrades.filter(grade =>
                grade.subject.toLowerCase() === filterSubject.toLowerCase()
            );
        }

        updatedGrades.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.grade - b.grade;
            } else {
                return b.grade - a.grade;
            }
        });

        setFilteredGrades(updatedGrades);
    }, [searchQuery, filterSubject, sortOrder, grades]);

    // Function to calculate average grade for a subject
    const calculateSubjectAverage = (subject) => {
        const subjectGrades = filteredGrades.filter(grade => grade.subject === subject);
        if (subjectGrades.length === 0) return 0;
        const total = subjectGrades.reduce((sum, grade) => sum + parseFloat(grade.grade), 0);
        return (total / subjectGrades.length).toFixed(2);
    };

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            localStorage.removeItem('user');
            window.location.href = '/login/teacher';
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = ({ searchTerm, subject }) => {
        setSearchQuery(searchTerm);
        setFilterSubject(subject);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const handleEditGrade = (index) => {
        alert(`Edit functionality not implemented yet for grade at index ${index}`);
    };

    const handleDeleteGrade = (index) => {
        if (window.confirm("Are you sure you want to delete this grade?")) {
            const gradeToDelete = filteredGrades[index];
            fetch(`http://localhost:3000/grades/${gradeToDelete.id}`, {
                method: 'DELETE',
            }).then(() => {
                // Remove from grades state
                const newGrades = grades.filter(g => g.id !== gradeToDelete.id);
                setGrades(newGrades);
            });
        }
    };

    // Get unique subjects
    const uniqueSubjects = [...new Set(filteredGrades.map(grade => grade.subject))];

    return (
        <>
            <NavBar 
                userType="teacher" 
                handleLogout={handleLogout} 
                searchQuery={searchQuery} 
                onSearchChange={handleSearchChange} 
            />
            <div>
                <h2>Welcome, {teacher?.name || "Loading..."}</h2>
                
                <GradeFilterBar 
                    onFilterChange={handleFilterChange} 
                    onSortChange={handleSortChange} 
                />
                <GradeTable 
                    grades={filteredGrades} 
                    onEdit={handleEditGrade} 
                    onDelete={handleDeleteGrade} 
                />

                {/* Class Subject Average Card */}
                <div className="card average-card" style={{ margin: '2rem auto', padding: '1rem' }}>
                    <h3>Class Subject Average</h3>
                    <div className="subject-averages">
                        {uniqueSubjects.map((subject) => (
                            <div key={subject} className="subject-card">
                                <h4>{subject}</h4>
                                <p>Average Grade: {calculateSubjectAverage(subject)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherDashboard;
