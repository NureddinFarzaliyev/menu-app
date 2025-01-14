import React from 'react'
import Logout from './components/authentication/Logout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Verify from './components/verification/Verify'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import NotVerified from './components/verification/NotVerified'
import Auth from './components/authentication/Auth'

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>hi</h1>} />
        <Route path="/auth" element={<Auth />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <h1>Dashboard</h1>
            <Logout />
          </ProtectedRoute>
        } />
        
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/not-verified" element={<NotVerified />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
