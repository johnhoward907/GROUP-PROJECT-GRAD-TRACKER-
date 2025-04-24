import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function LoginForm() {
  const navigate = useNavigate();
  const { userType } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email && password) {
      if (userType === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } else {
      alert("Please enter both email and password");
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
