import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import AnnouncementPage from './pages/AnnoucementPage'
import LoginPage from './pages/LoginPage'
import WithoutNav from './components/WithoutNav'
import WithNav from './components/WithNav'
import PublicationPage from './pages/PublicationPage'
import EventsPage from './pages/EventsPage'
import MessagesPage from './pages/MessagesPage'
import UserPage from './pages/UserPage'

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
          <Route path="/publication" element={<PublicationPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/users" element={<UserPage />} />
        </Route>
      </Routes>
    </div>
  )
}
// "start": "serve -s build",

export default App
