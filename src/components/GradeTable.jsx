import React from 'react';
import '../App.css'; 

function GradeTable({ grades }) {
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GradeTable;
