import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginForm from "./pages/LoginForm";
import SignUpForm from './pages/SignUpForm';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherProfile from './pages/TeacherProfile';

import StudentProfile from './pages/StudentProfile';
import MyGrades from './pages/MyGrades';


import NavBar from './components/NavBar';
import GradeFilterBar from './components/GradeFilterBar';
import GradeForm from './components/GradeForm';
import GradeTable from './components/GradeTable';
import './App.css';


function GroupWorkLayout() {
  const [grades, setGrades] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    subject: '',
    sortOrder: 'asc'
  });
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingGrade, setEditingGrade] = useState(null);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSortChange = (sortOrder) => {
    setFilters({ ...filters, sortOrder });
  };

  const handleGradeSubmit = (gradeData) => {
    if (editingIndex !== null) {
      // Update existing grade
      const updatedGrades = [...grades];
      updatedGrades[editingIndex] = gradeData;
      setGrades(updatedGrades);
      setEditingIndex(null);
      setEditingGrade(null);
    } else {
      // Add new grade
      setGrades([...grades, gradeData]);
    }
    setShowForm(false); // Close form after submission/update
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingIndex(null); // Reset editing state when form is closed
    setEditingGrade(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingGrade(grades[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const newGrades = [...grades];
    newGrades.splice(index, 1);
    setGrades(newGrades);
  };

  // Apply filtering, searching, and sorting to grades
  const filteredGrades = grades
    .filter((grade) => {
      // Filter by search term (student name)
      const nameMatch = grade.studentName.toLowerCase().includes(filters.searchTerm.toLowerCase());
      // Filter by subject if subject filter is set
      const subjectMatch = filters.subject ? grade.subject.toLowerCase() === filters.subject.toLowerCase() : true;
      return nameMatch && subjectMatch;
    })
    .sort((a, b) => {
      if (filters.sortOrder === 'asc') {
        return a.grade - b.grade;
      } else {
        return b.grade - a.grade;
      }
    });

  return (
    <>
      <NavBar />
      <main className="main-content">
        <GradeFilterBar
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />

        {/* Add/Cancel Button */}
        <div className="button-container">
          <button
            onClick={toggleForm}
            className="btn btn-primary"
            aria-expanded={showForm}
            aria-controls="grade-form"
          >
            {showForm ? 'Cancel' : 'Add New Grade'}
          </button>
        </div>

        {/* Conditionally render the form for adding or editing */}
        {showForm && (
          <GradeForm
            onSubmit={handleGradeSubmit}
            studentData={editingGrade} // Pass data for editing
          />
        )}

        <GradeTable
          grades={filteredGrades}
          onEdit={handleEdit} // Pass the edit function
          onDelete={handleDelete} // Pass the delete function
        />

        {/* Other content can go here */}
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/:userType" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />

      <Route path="/teacher/:id/dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher/:id/profile" element={<TeacherProfile />} />

      <Route path="/student/:id/profile" element={<StudentProfile />} />
      <Route path="/student/:id/my-grades" element={<MyGrades />} />

      <Route path="*" element={<GroupWorkLayout />} />
    </Routes>
  );
}

export default App;