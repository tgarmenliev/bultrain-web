import { useEffect, useRef, useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import './nav.css'

function LangSwitch() {
  const { lang, setLanguage, t } = useLanguage()
  return (
    <div className="nav-lang" role="group" aria-label={t.nav.language} data-lang={lang}>
      <span className="nav-lang__thumb" aria-hidden="true" />
      {['bg', 'en'].map((code) => (
        <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLanguage(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { toggleTheme } = useTheme()
  const { t } = useLanguage()
  return (
    <button type="button" className="nav-theme" onClick={toggleTheme} aria-label={t.nav.theme}>
      <Sun size={18} strokeWidth={1.8} className="nav-theme__sun" />
      <Moon size={18} strokeWidth={1.8} className="nav-theme__moon" />
    </button>
  )
}

export default function Nav() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sentinel = useRef(null)

  // A 1px sentinel at the top: no scroll listener needed.
  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const links = [
    ['live', '#live-network', t.nav.live],
    ['features', '#features', t.nav.features],
    ['whats-new', '#whats-new', t.nav.whatsNew],
    ['media', '#media-coverage', t.nav.media],
    ['gallery', '#screenshots', t.nav.gallery],
    ['about', '#about', t.nav.about],
    ['support', '#support', t.nav.support],
  ]
  const store = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'

  return (
    <>
      <div ref={sentinel} className="nav-sentinel" aria-hidden="true" />
      <header className="nav" data-scrolled={scrolled} data-open={open}>
        <div className="wrap nav__bar">
          <a className="nav__logo" href="#" aria-label="BulTrain">
            <img src="/favicon.svg" alt="" width="32" height="32" />
            <span>BulTrain</span>
          </a>

          <nav className="nav__links" aria-label="Main">
            {links.map(([id, href, label]) => (
              <a key={id} href={href}>{label}</a>
            ))}
          </nav>

          <div className="nav__tools">
            <LangSwitch />
            <ThemeToggle />
            <a className="ds-btn ds-btn--primary ds-btn--sm nav__cta" href={store} target="_blank" rel="noopener noreferrer">
              {t.nav.cta}
            </a>
            <button type="button" className="nav__burger" aria-label={t.nav.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className="nav__sheet" aria-hidden={!open}>
          <div className="wrap">
            {links.map(([id, href, label]) => (
              <a key={id} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <a className="ds-btn ds-btn--primary nav__sheet-cta" href={store} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
              {t.nav.cta}
            </a>
          </div>
        </div>
      </header>
    </>
  )
}
