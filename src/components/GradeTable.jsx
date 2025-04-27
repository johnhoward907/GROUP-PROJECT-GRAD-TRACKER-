import React from 'react';
import '../App.css';

function GradeTable({ grades, onEdit, onDelete }) {
  return (
    <div className="card table-container" style={{ margin: '2rem auto', padding: '1rem' }}>
      <h2 className="table-title">Submitted Grades</h2>
      {grades.length === 0 ? (
        <p>No grades submitted yet.</p>
      ) : (
        <table className="grade-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Assignment</th>
              <th>Grade</th>
              <th>Comments</th>
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {grades.map((entry, index) => (
              <tr key={index}>
                <td data-label="Student Name">{entry.studentName}</td>
                <td data-label="Subject">{entry.subject}</td>
                <td data-label="Assignment">{entry.assignment}</td>
                <td data-label="Grade">{entry.grade}</td>
                <td data-label="Comments">{entry.comments}</td>
                <td className="actions-column"> {/* Style this column in CSS if needed */}
                  <button className="btn btn-info btn-sm" onClick={() => onEdit(index)}> {/* Changed to info */}
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GradeTable;