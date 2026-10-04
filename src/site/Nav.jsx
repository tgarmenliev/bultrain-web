import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

// On the home page a hash link scrolls; elsewhere it goes home first, then scrolls.
function Anchor({ hash, home, children, ...rest }) {
  return home ? <a href={hash} {...rest}>{children}</a> : <Link to={`/${hash}`} {...rest}>{children}</Link>
}

export default function Nav() {
  const { t } = useLanguage()
  const home = useLocation().pathname === '/'
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
    ['tour', '#tour', t.nav.tour],
    ['media', '#media-coverage', t.nav.media],
    ['about', '#about', t.nav.about],
    ['support', '#support', t.nav.support],
  ]
  const store = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { const m = document.getElementById('main'); if (m) { e.preventDefault(); m.focus(); m.scrollIntoView() } }}>{t.nav.skip}</a>
      <div ref={sentinel} className="nav-sentinel" aria-hidden="true" />
      <header className="nav" data-scrolled={scrolled} data-open={open}>
        <div className="wrap nav__bar">
          <Anchor className="nav__logo" hash="#" home={home} aria-label="BulTrain">
            <img src="/img/logo-128.webp" alt="" width="32" height="32" />
            <span>BulTrain</span>
          </Anchor>

          <nav className="nav__links" aria-label="Main">
            {links.map(([id, href, label]) => (
              <Anchor key={id} hash={href} home={home}>{label}</Anchor>
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
              <Anchor key={id} hash={href} home={home} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{label}</Anchor>
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
