import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import CoverLetterProvider from './context/CoverLetterContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from './context/AlertContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './styles/index.css'
import Alert from './layout/Alert.jsx'
import { RegisterProvider } from './context/RegisterContext.jsx'
import { ForgotProvider } from './context/ForgotContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <CoverLetterProvider>
          <AuthProvider>
            <RegisterProvider>
              <ForgotProvider>
                <App />
                <Alert />
              </ForgotProvider>
            </RegisterProvider>
          </AuthProvider>
        </CoverLetterProvider>
      </AlertProvider>
    </BrowserRouter>
  </StrictMode>,
)