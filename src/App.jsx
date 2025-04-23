import React from 'react'
import Home from './pages/Home'
import NavBar from './layout/NavBar'
import { Route, Routes } from 'react-router-dom'
import NotFoundPage from './layout/NotFoundPage'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App