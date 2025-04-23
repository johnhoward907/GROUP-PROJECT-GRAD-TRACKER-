import React, { useState } from 'react';
import '../App.css';

function GradeFilterBar({ onFilterChange, onSortChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, subject: subjectFilter });
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setSubjectFilter(value);
    onFilterChange({ searchTerm, subject: value });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    onSortChange(value);
  };

  return (
    <div className="grade-filter-bar">
      <div className="filter-group">
        <label htmlFor="student-search" className="filter-label">Search Students</label>
        <input
          id="student-search"
          type="text"
          placeholder="Enter student name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="filter-input"
          aria-label="Search by student name"
        />
      </div>
      
      <div className="filter-group">
        <label htmlFor="subject-filter" className="filter-label">Filter by Subject</label>
        <select
          id="subject-filter"
          value={subjectFilter}
          onChange={handleSubjectChange}
          className="filter-select"
          aria-label="Filter by subject"
        >
          <option value="">All Subjects</option>
          <option value="math">Mathematics</option>
          <option value="english">English</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="art">Art</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort-order" className="filter-label">Sort Grades</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={handleSortChange}
          className="filter-select"
          aria-label="Sort by grade"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default GradeFilterBar;