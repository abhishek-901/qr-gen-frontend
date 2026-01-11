import { Routes, Route } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import Dashboard from './Components/Dashboard.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import LinkQr from './Components/LinkQr.jsx'
import AllLinqQR from './Components/AllLinqQR.jsx'
import ForgetPass from './Components/ForgetPass.jsx'
import ResetPass from './Components/ResetPass.jsx'



function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPass />} />

      <Route path="/reset-pass/:token" element={<ResetPass />} />


      {/* 🔐 Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/linkqr" element={<LinkQr />} />
        <Route path="/linkqr/:id" element={<LinkQr />} />
        <Route path="/showqr" element={<AllLinqQR />} />
      </Route>

    </Routes>
  )
}

export default App
