import { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from 'react'
import { tokens } from '../design/tokens.mjs'

const STORAGE_KEY = 'bultrain-theme'
const ThemeContext = createContext(null)

// The theme lives on <html data-theme>. The inline script in index.html sets it before first paint; this
// store just lets React read it. The server (prerender) always renders "dark"; after hydration React
// re-reads the real value, so a visitor in light mode gets the right screenshots without a mismatch.
const listeners = new Set()
const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn) }
const getTheme = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark')
const getServerTheme = () => 'dark'

function applyTheme(next) {
  document.documentElement.setAttribute('data-theme', next)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', tokens[next].bg)
  listeners.forEach((fn) => fn())
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)

  const setTheme = useCallback((next) => {
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* best effort */ }
    applyTheme(next)
  }, [])

  // Follow the system until the visitor makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      let saved = null
      try { saved = localStorage.getItem(STORAGE_KEY) } catch { /* ignore */ }
      if (saved !== 'light' && saved !== 'dark') applyTheme(mq.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Hydrated: the prerendered theme-dependent images may now be shown (see .themed in base.css).
  useEffect(() => {
    document.documentElement.setAttribute('data-hydrated', '')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', tokens[getTheme()].bg)
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
