import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TeacherAssignment() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstTime = location.state?.firstTime;
  const teacherId = location.pathname.split("/")[2];

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // If not first time, immediately kick them out
  useEffect(() => {
    if (!isFirstTime) {
      navigate("/");
    }
  }, [isFirstTime, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSubject) {
      alert("Please select both a class and subject before submitting.");
      return;
    }

    // Update the teacher record with selected class and subject
    fetch(`http://localhost:3000/teachers/${teacherId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        class: selectedClass,
        subject: selectedSubject,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update teacher assignment.");
        }
        return response.json();
      })
      .then(() => {
        alert("Assignment saved successfully!");
        navigate("/login/teacher"); // After successful assignment, redirect to teacher login
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="form-container">
        {isFirstTime && (
            <p className="welcome-message">Welcome! Select your assigned class and subject to get started.</p>
        )}

        <form onSubmit={handleSubmit} className="assignment-form">
            <div className="form-group">
                <label htmlFor="class-select">Class:</label>
                <select
                    id="class-select"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="form-select"
                    required>
                        <option value="">-- Select a class --</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="subject-select">Subject:</label>
                <select
                    id="subject-select"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="form-select"
                    required>
                        <option value="">-- Select a subject --</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="English">English</option>
                        <option value="Kiswahili">Kiswahili</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Geography">Geography</option>
                        <option value="Art">Art</option>
                </select>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    Save Assignment
                </button>
            </div>
        </form>
    </div>
  );
}

export default TeacherAssignment;
