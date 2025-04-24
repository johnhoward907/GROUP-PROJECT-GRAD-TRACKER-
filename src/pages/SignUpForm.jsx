import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function SignUpForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
        const [teacherRes, studentRes] = await Promise.all([
            axios.get(`http://localhost:3000/teachers?email=${email}`),
            axios.get(`http://localhost:3000/students?email=${email}`)
        ]);

        if (teacherRes.data.length > 0 || studentRes.data.length > 0) {
          alert("User with that email already exists.");
          return;
        }
  
        const normalizedUserType = userType.toLowerCase();

        const newUser = {
          name,
          email,
          password,
          userType: normalizedUserType
        };

        const endpoint = normalizedUserType === "teacher" ? "teachers" : "students";
  
        await axios.post(`http://localhost:3000/${endpoint}`, newUser);

        alert("Account created successfully!");

        navigate(`/login/${normalizedUserType}`);
    } catch (err) {
        console.error("Sign-up error:", err);
        alert("Error creating account. Please try again.");
    }
  };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Create Account</h2>
                <form onSubmit={handleSignUp}>
                    <div className="signup-row">
                        <label htmlFor="name" className="signup-label">Name:</label>
                        <input
                        type="text"
                        id="name"
                        className="signup-input"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    </div>

                    <div className="signup-row">
                        <label htmlFor="email" className="signup-label">Email:</label>
                        <input
                        type="email"
                        id="email"
                        className="signup-input"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    <div className="signup-row">
                        <label htmlFor="password" className="signup-label">Password:</label>
                        <input
                        type="password"
                        id="password"
                        className="signup-input"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>

                    <div className="signup-row">
                        <label htmlFor="confirmPassword" className="signup-label">Confirm Password:</label>
                        <input
                        type="password"
                        id="confirmPassword"
                        className="signup-input"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                    </div>

                    <div className="signup-row">
                        <label htmlFor="userType" className="signup-label">I am a:</label>
                        <select
                        id="userType"
                        className="signup-input"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                        >
                        <option value="">Select role</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                        </select>
                    </div>

                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                
                <p className="signup-prompt">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/')}
                        style={{ color: '#c76338', cursor: 'pointer', textDecoration: 'underline' }}> Login Here
                    </span>.
                </p>
            </div>
        </div>
    );
}

export default SignUpForm;
