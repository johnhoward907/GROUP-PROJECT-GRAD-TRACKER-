import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function LoginForm() {
  const navigate = useNavigate();
  const { userType } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState(null);

  // Validate userType param
  const validUserTypes = ['teacher', 'student'];
  if (!validUserTypes.includes(userType)) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Invalid Login Type</h2>
          <p>Please use a valid login URL: /login/teacher or /login/student</p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const endpoint = `http://localhost:3000/${userType}s?email=${email}&password=${password}`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];
        localStorage.setItem("user", JSON.stringify(user));

        if (userType === "teacher") {
          navigate(`/teacher/${user.id}/dashboard`);
        } else if (userType === "student") {
          navigate(`/student/${user.id}/profile`);
        }

      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{userType === 'teacher' ? "Teacher Login" : "Student Login"}</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Password:</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="signup-prompt">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{ color: '#3498db', cursor: 'pointer', textDecoration: 'underline' }}> Sign Up Here
          </span>.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
