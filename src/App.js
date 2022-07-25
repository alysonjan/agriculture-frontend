import React, { useMemo } from 'react'
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
import ProtectedRoute from './ProtectedRoute'
import { Auth } from './helpers/AuthContext'
import useLocalStorage from './helpers/useLocalStorage'

export const App = () => {
  const [user, setUser] = useLocalStorage(
    '$2a$12$AV9q8pQqQ5zVz2iVSvQTsOfVfbM.SvVvCO4wtED8m/A3dup.x4VhW'
  )
  const value = useMemo(() => ({ user, setUser }), [user, setUser])
  return (
    <div className="App">
      <Auth.Provider value={value}>
        {/* <Routes>
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
        </Routes> */}
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<WithNav />}>
              <Route path="/home" element={<Homepage />} />
              <Route path="/announcement" element={<AnnouncementPage />} />
              <Route path="/publication" element={<PublicationPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/users" element={<UserPage />} />
            </Route>
          </Route>

          <Route element={<WithoutNav />}>
            <Route path="/" element={<LoginPage />} />
          </Route>
        </Routes>
      </Auth.Provider>
    </div>
  )
}

export default App
// "start": "serve -s build",
