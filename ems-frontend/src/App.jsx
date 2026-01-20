import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import ListEmployeeComponents from './components/ListEmployeeComponents'
import EmployeeComponent from './components/EmployeeComponent'
import LoginComponent from './components/LoginComponent'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {/* ===== Header ===== */}
        <HeaderComponent />

        {/* ===== Main Content ===== */}
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/" element={<LoginComponent />} />

            {/* Protected Routes */}
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <ListEmployeeComponents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-employee"
              element={
                <ProtectedRoute>
                  <EmployeeComponent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-employee/:id"
              element={
                <ProtectedRoute>
                  <EmployeeComponent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {/* ===== Footer ===== */}
        <FooterComponent />
      </div>
    </BrowserRouter>
  )
}

export default App
