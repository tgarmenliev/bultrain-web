import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App, { preloadRoute } from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { normalizePath, stripLang } from './i18n/routes.js'
import ErrorBoundary from './site/ErrorBoundary.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'
import './index.css'
import './design/tokens.css'
import './design/base.css'

const tree = (
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)

const container = document.getElementById('root')
const here = normalizePath(window.location.pathname)

// A prerendered page is hydrated (the HTML is kept and made interactive). Anything else - the dev server, or an
// address that has no prerendered file - is rendered from scratch.
if (container.dataset.prerendered === here) {
  preloadRoute(stripLang(here)).finally(() => ReactDOM.hydrateRoot(container, tree, {
    onRecoverableError: (e) => console.warn('hydration:', e),
  }))
} else {
  container.textContent = ''
  ReactDOM.createRoot(container).render(tree)
}
