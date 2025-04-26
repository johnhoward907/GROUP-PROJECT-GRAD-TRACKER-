import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function SignUpForm() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        const normalizedUserType = userType.toLowerCase();
        let generatedId = "";
        let assignedClass = "";

        if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
        }

        fetch(`http://localhost:3000/teachers?email=${email}`)
            .then(teacherRes => teacherRes.json())
            .then(teacherData => {
                if (teacherData.length > 0) {
                    alert("User with that email already exists.");
                    throw new Error("User already exists as teacher.");
                }

                return fetch(`http://localhost:3000/students?email=${email}`);
            })
            .then(studentRes => studentRes.json())
            .then(studentData => {
                if (studentData.length > 0) {
                    alert("User with that email already exists.");
                    throw new Error("User already exists as student.");
                }

                const endpoint = normalizedUserType === "teacher" ? "teachers" : "students";

                return fetch(`http://localhost:3000/${endpoint}`);

            })
            .then(allUsersRes => allUsersRes.json())
            .then(allUsers => {
                const newIdPrefix = normalizedUserType === "teacher" ? "T" : "S";
                const newIdNumber = allUsers.length + 1;
                generatedId = `${newIdPrefix}${newIdNumber}`;

                if (normalizedUserType === "student") {
                    // Automatically assign class to students using 4-class cycle: North, SOuth, East, West.
                    const classCycle = ['North', 'South', 'East', 'West'];
                    assignedClass = classCycle[allUsers.length % 4];
                }

                const newUser = {
                    id: generatedId,
                    name: name,
                    email: email,
                    password: password,
                    userType: normalizedUserType,
                    class: assignedClass
                };

                const endpoint = normalizedUserType === "teacher" ? "teachers" : "students";

                return fetch(`http://localhost:3000/${endpoint}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error creating account.');
                }
                alert("Account created successfully!");
    
                if (normalizedUserType === "teacher") {
                    navigate(`/teacher/${generatedId}/assignment`, { state: { firstTime: true } });
                } else {
                    navigate(`/login/student`);
                }
        })
        .catch(err => {
            console.error("Sign-up error:", err);
            alert("Error creating account. Please try again.");
        });
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
