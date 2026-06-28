import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations } from './translations'

const STORAGE_KEY = 'bultrain-lang'
const SUPPORTED = ['bg', 'en']

// ----------------------------------------------------------------------------
// Zero-API locale detection.
// Priority: saved preference > browser language / timezone > English default.
// ----------------------------------------------------------------------------
function detectLanguage() {
  // 1. A manual choice in localStorage always wins on subsequent visits.
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED.includes(saved)) return saved
  } catch {
    // localStorage may be unavailable (private mode / SSR) — fall through.
  }

  // 2. Automatic detection from the browser environment.
  try {
    const langs = [navigator.language, ...(navigator.languages || [])]
    const isBgLang = langs.some((l) => l && l.toLowerCase().startsWith('bg'))

    let isSofiaTz = false
    try {
      isSofiaTz =
        Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Sofia'
    } catch {
      // Intl/timezone unavailable — ignore.
    }

    if (isBgLang || isSofiaTz) return 'bg'
  } catch {
    // navigator unavailable — fall through.
  }

  // 3. Everywhere else in the world defaults to English.
  return 'en'
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage)

  // Keep <html lang> in sync for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLanguage = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Persisting is best-effort; the in-memory state still updates.
    }
    setLang(next)
  }, [])

  const value = {
    lang,
    setLanguage,
    toggleLanguage: () => setLanguage(lang === 'bg' ? 'en' : 'bg'),
    t: translations[lang],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>')
  }
  return ctx
}
