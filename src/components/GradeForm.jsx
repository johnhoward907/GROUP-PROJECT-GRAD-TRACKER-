import React, { useState } from 'react';
import '../App.css';

function GradeForm({ onSubmit, studentData }) {
  const [formData, setFormData] = useState({
    studentId: studentData?.id || '',
    studentName: studentData?.name || '',
    subject: '',
    assignment: '',
    grade: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      studentId: '',
      studentName: '',
      subject: '',
      assignment: '',
      grade: '',
      comments: ''
    });
  };

  return (
    <div className="card form-container" style={{ margin: '0 auto' }}>
      <h2 className="form-title">{studentData ? 'Edit Grade' : 'Add New Grade'}</h2>
      <form onSubmit={handleSubmit}>
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
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {studentData ? 'Update Grade' : 'Add Grade'}
          </button>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default GradeForm;