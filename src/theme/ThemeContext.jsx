import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { tokens } from '../design/tokens.mjs'

const STORAGE_KEY = 'bultrain-theme'
const ThemeContext = createContext(null)

// The inline script in index.html has already set data-theme before first paint.
const readTheme = () => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readTheme)

  const apply = useCallback((next) => {
    document.documentElement.setAttribute('data-theme', next)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', tokens[next].bg)
    setThemeState(next)
  }, [])

  const setTheme = useCallback((next) => {
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* best effort */ }
    apply(next)
  }, [apply])

  // Follow the system until the visitor makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      let saved = null
      try { saved = localStorage.getItem(STORAGE_KEY) } catch { /* ignore */ }
      if (saved !== 'light' && saved !== 'dark') apply(mq.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [apply])

  // The inline script already set the attribute; only sync the browser chrome colour on mount.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', tokens[readTheme()].bg)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
