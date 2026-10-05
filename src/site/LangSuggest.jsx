import { useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { savedLanguage, browserPrefersBulgarian } from '../i18n/browser'
import './lang-suggest.css'

const SEEN = 'bultrain-lang-offer'

const never = () => () => {}
const wasSeen = () => { try { return sessionStorage.getItem(SEEN) === '1' } catch { return false } }
// Only a visitor whose browser is not Bulgarian and who has never picked a language is offered English.
const eligible = () => !wasSeen() && savedLanguage() === null && !browserPrefersBulgarian()

/**
 * A quiet offer in English, shown once per session. It never switches the language by itself: the Bulgarian address
 * stays Bulgarian for everyone (including search engines), and the visitor decides.
 */
export default function LangSuggest() {
  const { lang, setLanguage } = useLanguage()
  const { pathname } = useLocation()
  const [dismissed, setDismissed] = useState(false)
  // false on the server and while hydrating, then the real answer from this browser
  const allowed = useSyncExternalStore(never, eligible, () => false)

  if (!allowed || dismissed || lang !== 'bg' || pathname === '/privacy-app') return null
  const close = () => {
    try { sessionStorage.setItem(SEEN, '1') } catch { /* ignore */ }
    setDismissed(true)
  }

  return (
    <div className="lang-offer" role="region" aria-label="Language" lang="en">
      <p>This site is also available in English.</p>
      <button type="button" className="lang-offer__go" onClick={() => { close(); setLanguage('en') }}>Read in English</button>
      <button type="button" className="lang-offer__x" onClick={close} aria-label="Dismiss"><X size={16} /></button>
    </div>
  )
}
