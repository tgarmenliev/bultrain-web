// What the browser can tell us about the visitor's language. Used only to offer English, never to switch by itself.

export const SUPPORTED = ['bg', 'en']

export const STORAGE_KEY = 'bultrain-lang'

/** A language the visitor chose themselves with the switcher (the only thing we store). */
export function savedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return SUPPORTED.includes(saved) ? saved : null
  } catch {
    return null // storage unavailable (private mode, blocked) - behave as if nothing was saved
  }
}

/** Does this browser look Bulgarian (browser language or Sofia timezone)? Used only to offer English, never to switch. */
export function browserPrefersBulgarian() {
  try {
    const langs = [navigator.language, ...(navigator.languages || [])]
    if (langs.some((l) => l && l.toLowerCase().startsWith('bg'))) return true
    return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Sofia'
  } catch {
    return true // when unsure, do not nag
  }
}
