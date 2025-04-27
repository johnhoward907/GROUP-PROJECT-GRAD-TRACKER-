import React, { useState } from 'react';
import '../App.css';

function GradeFilterBar({ onFilterChange, onSortChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ searchTerm: value });
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