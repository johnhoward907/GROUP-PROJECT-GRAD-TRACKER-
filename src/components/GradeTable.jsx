import React from 'react';
import '../App.css';

function GradeTable({ grades, onEdit, onDelete }) {
  const handleDeleteConfirmation = (index) => {
    if (window.confirm("Are you sure you want to delete this grade?")) {
      onDelete(index);
    }
  };

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
                <td>{entry.studentName}</td>
                <td>{entry.subject}</td>
                <td>{entry.assignment}</td>
                <td>{entry.grade}</td>
                <td>{entry.comments}</td>
                <td className="actions-column"> {/* Style this column in CSS if needed */}
                  <button className="btn btn-info btn-sm" onClick={() => onEdit(index)}> {/* Changed to info */}
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteConfirmation(index)}>
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