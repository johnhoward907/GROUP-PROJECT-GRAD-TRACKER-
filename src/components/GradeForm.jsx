import React, { useState, useEffect } from 'react';
import '../App.css';

function GradeForm({ onSubmit, studentData, isStudent }) {
  const [formData, setFormData] = useState({
    studentId: studentData?.id || '', // Keep if you have IDs
    studentName: studentData?.studentName || '',
    subject: studentData?.subject || '',
    assignment: studentData?.assignment || '',
    grade: studentData?.grade || '',
    comments: studentData?.comments || ''
  });

  useEffect(() => {
    // Update form data when studentData prop changes (for editing)
    if (studentData) {
      setFormData({
        studentId: studentData.id || '',
        studentName: studentData.studentName || '',
        subject: studentData.subject || '',
        assignment: studentData.assignment || '',
        grade: studentData.grade || '',
        comments: studentData.comments || ''
      });
    } else {
      // Reset form data when not editing
      setFormData({
        studentId: '',
        studentName: '',
        subject: '',
        assignment: '',
        grade: '',
        comments: ''
      });
    }
  }, [studentData]);

  const handleChange = (e) => {
    if (isStudent) return; // Prevent changes if student
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isStudent) return; // Prevent submit if student
    onSubmit(formData);
    // The App component will handle resetting the form after submission/update
  };

  return (
    <div className="card form-container" style={{ margin: '0 auto' }}>
      <h2 className="form-title">{studentData ? 'Edit Grade' : 'Add New Grade'}</h2>
      <form onSubmit={handleSubmit}>
        {/* ... rest of your form fields ... */}
        <div className="form-group">
          <label htmlFor="studentName">Student Name</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            className="form-input"
            disabled={isStudent}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-select"
              disabled={isStudent}
            >
              <option value="">Select Subject</option>
              <option value="math">Mathematics</option>
              <option value="english">English</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="art">Art</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <input
              type="number"
              id="grade"
              name="grade"
              min="0"
              max="100"
              value={formData.grade}
              onChange={handleChange}
              required
              className="form-input"
              disabled={isStudent}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="assignment">Assignment</label>
          <input
            type="text"
            id="assignment"
            name="assignment"
            value={formData.assignment}
            onChange={handleChange}
            required
            className="form-input"
            disabled={isStudent}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="3"
            className="form-textarea"
            disabled={isStudent}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isStudent}>
            {studentData ? 'Update Grade' : 'Add Grade'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GradeForm;