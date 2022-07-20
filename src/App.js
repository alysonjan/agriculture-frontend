import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import AnnouncementPage from './pages/AnnoucementPage'
import LoginPage from './pages/LoginPage'
import WithoutNav from './components/WithoutNav'
import WithNav from './components/WithNav'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<WithNav />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="/announcement" element={<AnnouncementPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
