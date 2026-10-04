import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import ErrorBoundary from './site/ErrorBoundary.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'
import './index.css'
import './design/tokens.css'
import './design/base.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
