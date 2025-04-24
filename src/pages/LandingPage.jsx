import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
        <div className="landing-card">
            <h1 className="form-title">Welcome to Grade Tracker</h1>
            <div className="button-group">
                <button
                    className="login-button teacher"
                    onClick={() => navigate('/login/teacher')}> Teacher's Login 
                </button>
                <button
                    className="login-button student"
                    onClick={() => navigate('/login/student')}> Student's Login 
                </button>
            </div>

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

export default LandingPage;
