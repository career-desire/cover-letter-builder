import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import CoverLetterProvider from './context/CoverLetterContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CoverLetterProvider>
        <App />
      </CoverLetterProvider>
    </BrowserRouter>
  </StrictMode>,
)