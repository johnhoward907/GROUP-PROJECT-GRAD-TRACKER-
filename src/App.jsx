import React from 'react'
import NavBar from './components/NavBar'
import './App.css'
import GradeFilterBar from './components/GradeFilterBar'

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <GradeFilterBar />
        {/* Main content of the grade tracker app goes here */}
      </main>
    </>
  )
}

export default App
