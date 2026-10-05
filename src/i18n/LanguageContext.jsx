import { createContext, useContext, useEffect, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { translations } from './translations'
import { langOf, stripLang, localize } from './routes'
import { STORAGE_KEY, SUPPORTED, savedLanguage } from './browser'

const LanguageContext = createContext(null)

// The language is part of the address ("/" Bulgarian, "/en" English), so search engines and shared links
// always get the same language. This provider only reads it, and moves between the two versions.
export function LanguageProvider({ children }) {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const lang = langOf(pathname)

  // Keep <html lang> in sync for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // A visitor who once chose English with the switcher gets English when they open a Bulgarian address.
  useEffect(() => {
    if (lang === 'bg' && savedLanguage() === 'en') {
      navigate(localize(pathname, 'en') + search + hash, { replace: true })
    }
    // only on first load of this page view
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLanguage = useCallback((next) => {
    if (!SUPPORTED.includes(next) || next === lang) return
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Persisting is best-effort; the address still changes.
    }
    navigate(localize(stripLang(pathname), next) + search + hash)
  }, [lang, pathname, search, hash, navigate])

  const value = useMemo(() => ({
    lang,
    setLanguage,
    toggleLanguage: () => setLanguage(lang === 'bg' ? 'en' : 'bg'),
    t: translations[lang],
    /** Link target for an internal page in the current language: to('/privacy') -> "/en/privacy" on the English site. */
    to: (path) => localize(path, lang),
  }), [lang, setLanguage])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>')
  }
  return ctx
}
