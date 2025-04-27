import React, { useState, useEffect } from 'react';
import '../App.css';

function GradeForm({ onSubmit, studentData, isStudent, studentsList = [], teacherInfo = {} }) {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    subject: teacherInfo.subject || '',
    assignment: '',
    grade: '',
    comments: ''
  });

  useEffect(() => {
    if (!studentData && !teacherInfo.subject) return;

    setFormData(prev => {
      const newData = {
        studentId: studentData ? studentData.studentId || '' : prev.studentId,
        studentName: studentData ? studentData.studentName || '' : prev.studentName,
        subject: studentData ? studentData.subject || teacherInfo.subject || '' : teacherInfo.subject || prev.subject,
        assignment: studentData ? studentData.assignment || '' : prev.assignment,
        grade: studentData ? studentData.grade || '' : prev.grade,
        comments: studentData ? studentData.comments || '' : prev.comments
      };
      
      return JSON.stringify(newData) !== JSON.stringify(prev) ? newData : prev;
    });
  }, [studentData, teacherInfo.subject]);

  const handleChange = (e) => {
    if (isStudent) return;

    const name = e.target.name;
    const value = e.target.value;

    if (name === "studentId") {
      const selectedStudent = studentsList.find(student => student.id === value);
      setFormData(prev => ({
        ...prev,
        studentId: value,
        studentName: selectedStudent ? selectedStudent.studentName : '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isStudent) return;

    onSubmit({
      ...formData,
      teacherId: teacherInfo.id,
      teacherName: teacherInfo.name
    });
  };

  return (
    <div className="card form-container" style={{ margin: '0 auto' }}>
      <h2 className="form-title">{studentData ? 'Edit Grade' : 'Add New Grade'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId">Student Name</label>
          <select
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="form-select"
            disabled={isStudent}
          >
            <option value="">Select Student</option>
            {studentsList.map(student => (
              <option key={student.id} value={student.id}>
                {student.studentName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            disabled
            className="form-input"
          />
        </div>

        <div className="form-row">
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