import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import GradeFilterBar from '../components/GradeFilterBar';
import GradeForm from '../components/GradeForm';
import GradeTable from '../components/GradeTable';
import '../App.css';

function TeacherGrades() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/teachers/${id}`)
      .then(res => res.json())
      .then(data => setTeacher(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/grades?teacherId=${id}`)
      .then(res => res.json())
      .then(data => {
        setGrades(data);
        setFilteredGrades(data);
      });
  }, [id]);

  useEffect(() => {
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
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingIndex(null);
    setEditingGrade(null);
  };

  const handleEditGrade = (index) => {
    setEditingIndex(index);
    setEditingGrade(filteredGrades[index]);
    setShowForm(true);
  };

  const handleDeleteGrade = (index) => {
    if (window.confirm("Are you sure you want to delete this grade?")) {
      const gradeToDelete = filteredGrades[index];
      fetch(`http://localhost:3000/grades/${gradeToDelete.id}`, {
        method: 'DELETE',
      }).then(() => {
        const newGrades = grades.filter(g => g.id !== gradeToDelete.id);
        setGrades(newGrades);
      });
    }
  };

  return (
    <>
      <NavBar userType="teacher" handleLogout={handleLogout} searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <div className="container">
        <h2>Grades for {teacher?.name || "Loading..."}</h2>
        <GradeFilterBar onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
        <div className="button-container">
          <button onClick={toggleForm} className="btn btn-primary" aria-expanded={showForm} aria-controls="grade-form">
            {showForm ? 'Cancel' : 'Add New Grade'}
          </button>
        </div>
        {showForm && <GradeForm onSubmit={handleGradeSubmit} studentData={editingGrade} isStudent={false} />}
        <GradeTable grades={filteredGrades} onEdit={handleEditGrade} onDelete={handleDeleteGrade} isStudent={false} />
      </div>
    </>
  );
}

export default TeacherGrades;
