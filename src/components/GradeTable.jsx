import React from 'react';
import '../App.css';

function GradeTable({ grades, onEdit, onDelete, isStudent }) {
  return (
    <div className="card table-container" style={{ margin: '2rem auto', padding: '1rem' }}>
      <h2 className="table-title">Submitted Grades</h2>
      {grades.length === 0 ? (
        <p>No grades submitted yet.</p>
      ) : (
        <table className="grade-table">
          <thead>
            <tr>
              {!isStudent && <th>Student Name</th>} {/* Hide Student Name for students */}
              <th>Subject</th>
              <th>Assignment</th>
              <th>Grade</th>
              <th>Comments</th>
              {!isStudent && <th>Actions</th>} {/* Hide Actions for students */}
            </tr>
          </thead>
          <tbody>
            {grades.map((entry, index) => (
              <tr key={index}>
                {!isStudent && <td data-label="Student Name">{entry.studentName}</td>} {/* Hide Student Name for students */}
                <td data-label="Subject">{entry.subject}</td>
                <td data-label="Assignment">{entry.assignment}</td>
                <td data-label="Grade">{entry.grade}</td>
                <td data-label="Comments">{entry.comments}</td>
                {!isStudent && (
                  <td className="actions-column">
                    <button className="btn btn-info btn-sm" onClick={() => onEdit(index)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(index)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GradeTable;
