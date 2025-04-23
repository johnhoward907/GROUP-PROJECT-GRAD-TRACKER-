import React, { useState } from 'react'
import '../App.css'

function GradeFilterBar({ onFilterChange, onSortChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onFilterChange({ searchTerm: value, subject: subjectFilter })
  }

  const handleSubjectChange = (e) => {
    const value = e.target.value
    setSubjectFilter(value)
    onFilterChange({ searchTerm, subject: value })
  }
<li><a href="#students">Students</a></li>
  const handleSortChange = (e) => {
    const value = e.target.value
    setSortOrder(value)
    onSortChange(value)
  }

  return (
    <div className="grade-filter-bar">
      <input
        type="text"
        placeholder="Search by student name..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="filter-input"
        aria-label="Search by student name"
      />
      <select
        value={subjectFilter}
        onChange={handleSubjectChange}
        className="filter-select"
        aria-label="Filter by subject"
      >
        <option value="">All Subjects</option>
        <option value="math">Math</option>
        <option value="english">English</option>
        <option value="science">Science</option>
        <option value="history">History</option>
        <option value="geography">Geography</option>
      </select>
      <select
        value={sortOrder}
        onChange={handleSortChange}
        className="filter-select"
        aria-label="Sort by grade"
      >
        <option value="asc">Sort by Grade: Low to High</option>
        <option value="desc">Sort by Grade: High to Low</option>
      </select>
    </div>
  )
}

export default GradeFilterBar
