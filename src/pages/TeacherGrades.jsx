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
  const [studentsList, setStudentsList] = useState([]);
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  //const [filterSubject, setFilterSubject] = useState('');
  //const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/teachers/${id}`)
      .then(res => res.json())
      .then(data => {
        setTeacher(data);
        fetch(`http://localhost:3000/students?class=${data.class}`)
          .then(res => res.json())
          .then(students => {
            const formattedStudents = students.map(student => ({
              id: student.id,
              studentName: student.name || `${student.firstName} ${student.lastName}` || student.studentName
            }));
            setStudentsList(formattedStudents);
          });
      });

    fetch(`http://localhost:3000/grades?teacherId=${id}`)
      .then(res => res.json())
      .then(data => {
        setGrades(data);
        setFilteredGrades(data);
      });
  }, [id]);

  const handleGradeSubmit = (gradeData) => {
    if (editingIndex !== null) {
      fetch(`http://localhost:3000/grades/${editingGrade.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gradeData)
      })
      .then(res => res.json())
      .then(updatedGrade => {
        const updatedGrades = [...grades];
        const globalIndex = grades.findIndex(g => g.id === editingGrade.id);
        updatedGrades[globalIndex] = updatedGrade;
        setGrades(updatedGrades);
        setFilteredGrades(updatedGrades.filter(g => g.teacherId === id));
        setShowForm(false);
        setEditingIndex(null);
        setEditingGrade(null);
      })
      .catch(err => console.error('Error updating grade:', err));
    } else {
      fetch('http://localhost:3000/grades')
        .then(res => res.json())
        .then(allGrades => {
          const lastGradeId = allGrades.reduce((max, grade) => {
            const gradeNumber = parseInt(grade.id.replace('G', ''));
            return gradeNumber > max ? gradeNumber : max;
          }, 0);
          
          const nextId = `G${lastGradeId + 1}`;
  
          const newGrade = {
            ...gradeData,
            id: nextId,
            teacherId: id
          };
  
          return fetch('http://localhost:3000/grades', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGrade)
          })
          .then(res => res.json());
        })
        .then(newGrade => {
          const updatedGrades = [...grades, newGrade];
          setGrades(updatedGrades);
          setFilteredGrades(updatedGrades.filter(g => g.teacherId === id));
          setShowForm(false);
        })
        .catch(err => console.error('Error creating grade:', err));
    }
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

  const handleFilterChange = (filters) => {
    let updatedGrades = [...grades];

    if (filters.searchTerm) {
      updatedGrades = updatedGrades.filter(grade =>
        grade.studentName.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.subject) {
      updatedGrades = updatedGrades.filter(grade =>
        grade.subject.toLowerCase() === filters.subject.toLowerCase()
      );
    }

    setFilteredGrades(updatedGrades);
  };

  const handleSortChange = (sortOrder) => {
    const sortedGrades = [...filteredGrades].sort((a, b) => {
      return sortOrder === 'asc' ? a.grade - b.grade : b.grade - a.grade;
    });
    setFilteredGrades(sortedGrades);
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

  const handleDeleteGrade = (index) => {
    if (window.confirm("Are you sure you want to delete this grade?")) {
      const gradeToDelete = filteredGrades[index];
      fetch(`http://localhost:3000/grades/${gradeToDelete.id}`, {
        method: 'DELETE',
      }).then(() => {
        const newGrades = grades.filter(g => g.id !== gradeToDelete.id);
        setGrades(newGrades);
        setFilteredGrades(newGrades);
      });
    }
  };

  return (
    <>
      <NavBar userType="teacher" handleLogout={handleLogout} searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <div className="container">
        <h2>Grades for {teacher?.subject} - {teacher?.class} Class</h2>
        <GradeFilterBar onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
        <div className="button-container">
          <button onClick={toggleForm} className="btn btn-primary" aria-expanded={showForm} aria-controls="grade-form">
            {showForm ? 'Cancel' : 'Add New Grade'}
          </button>
        </div>
        {showForm && <GradeForm onSubmit={handleGradeSubmit} studentData={editingGrade} isStudent={false} studentsList={studentsList} teacherInfo={teacher}/>}
        <GradeTable grades={filteredGrades} onEdit={handleEditGrade} onDelete={handleDeleteGrade} isStudent={false} />
      </div>
    </>
  );
}

export default TeacherGrades;