import React from 'react'
import Home from './pages/Home'
import NavBar from './layout/NavBar'
import { Route, Routes } from 'react-router-dom'
import NotFoundPage from './layout/NotFoundPage'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App