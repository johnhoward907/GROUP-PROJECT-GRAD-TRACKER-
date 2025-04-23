import React, { useState } from 'react';
import NavBar from './components/NavBar';
import GradeFilterBar from './components/GradeFilterBar';
import GradeForm from './components/GradeForm';
import GradeTable from './components/GradeTable';
import './App.css';

function App() {
  const [grades, setGrades] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    subject: '',
    sortOrder: 'asc'
  });
  const [showForm, setShowForm] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSortChange = (sortOrder) => {
    setFilters({ ...filters, sortOrder });
  };

  const handleGradeSubmit = (gradeData) => {
    setGrades([...grades, gradeData]);
    setShowForm(false); // Close form after submission
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <NavBar />
      <main className="main-content">
        <GradeFilterBar 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        
        {/* Add Grade Button - Centered above where form will appear */}
        <div className="button-container">
          <button 
            onClick={toggleForm}
            className="btn btn-primary"
            aria-expanded={showForm}
            aria-controls="grade-form"
          >
            {showForm ? 'Cancel' : 'Add New Grade'}
          </button>
          <GradeTable grades={grades} />
        </div>

        {/* Conditionally render the form */}
        {showForm && <GradeForm onSubmit={handleGradeSubmit} />}
        
        {/* Other content can go here */}
      </main>
    </>
  );
}

export default App;