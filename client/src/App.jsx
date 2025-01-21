import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Verify from './components/verification/Verify'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import NotVerified from './components/verification/NotVerified'
import Auth from './components/authentication/Auth'
import ResetPassword from './components/reset/ResetPassword'
import Dashboard from './components/dashboard/Dashboard'
import MenuPage from './components/dashboard/MenuPage'
import Site from './components/site/Site'

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>hi</h1>} />
        <Route path="/auth" element={<Auth />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />

        <Route path="/dashboard/menus/:menuId" element={
          <ProtectedRoute>
            <MenuPage />
          </ProtectedRoute>
        } />

        <Route path='/site/:url' element={<Site />} />

        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/not-verified" element={<NotVerified />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
