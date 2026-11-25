import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import './footer.css'

/* global __BUILD_YEAR__ */
// The prerendered page carries the year it was built in; after it starts, the visitor sees the current one. Reading the
// clock directly would make every page mismatch (and redraw) from 1 January until the next build.
const never = () => () => {}

export default function Footer() {
  const { t, to: localTo } = useLanguage()
  const f = t.footer
  const year = useSyncExternalStore(never, () => new Date().getFullYear(), () => __BUILD_YEAR__)
  const links = [
    ['link-privacy', '/privacy', f.privacy],
    ['link-privacy-app', '/privacy-app', f.privacyApp],
    ['link-terms', '/terms', f.terms],
    ['link-contact', '/contact', f.contact],
  ]
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__row">
          <Link to={localTo('/')} className="foot__brand" aria-label="BulTrain">
            <img src="/img/logo-128.webp" alt="" width="28" height="28" />
            <span>BulTrain</span>
          </Link>
          <nav className="foot__links" aria-label="Legal">
            {links.map(([id, to, label]) => (
              <Link key={id} id={id} to={localTo(to)}>{label}</Link>
            ))}
          </nav>
        </div>
        <div className="foot__row foot__row--small">
          <p>{f.madeBy}</p>
          <p className="tnum">© {year} BulTrain</p>
        </div>
        <p className="foot__disclaimer">{f.disclaimer}</p>
      </div>
    </footer>
  )
}
