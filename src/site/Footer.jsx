import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import './footer.css'

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer
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
          <Link to="/" className="foot__brand" aria-label="BulTrain">
            <img src="/img/logo-128.webp" alt="" width="28" height="28" />
            <span>BulTrain</span>
          </Link>
          <nav className="foot__links" aria-label="Legal">
            {links.map(([id, to, label]) => (
              <Link key={id} id={id} to={to}>{label}</Link>
            ))}
          </nav>
        </div>
        <div className="foot__row foot__row--small">
          <p>{f.madeBy}</p>
          <p className="tnum">© {new Date().getFullYear()} BulTrain</p>
        </div>
        <p className="foot__disclaimer">{f.disclaimer}</p>
      </div>
    </footer>
  )
}
