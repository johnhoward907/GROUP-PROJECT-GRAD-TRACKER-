import React from 'react';
import NavBar from '../components/NavBar';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import '../App.css';

function StudentGrades() {
  // const { id } = useParams();
  // const [grades, setGrades] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/students/${id}/grades`)
//       .then(res => res.json())
//       .then(data => setGrades(data));
//   }, [id]);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem('user');
      window.location.href = '/login/student';
    }
  };

  return (
    <>
      <NavBar userType="student" handleLogout={handleLogout} />
      {/* <div>
        <h2>My Grades</h2>
        {/* If grades data is available, display it
        {grades ? (
          <ul>
            {grades.map((grade, index) => (
              <li key={index}>
                <strong>{grade.subject}: </strong>
                {grade.grade}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading grades...</p>
        )}
      </div> */}
    </>
  );
}

export default StudentGrades;
