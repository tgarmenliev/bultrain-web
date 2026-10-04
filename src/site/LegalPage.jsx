import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { formatLegalDate } from './legal-meta'
import './legal.css'

/** Shared shell for text-heavy pages: back link, title, optional date, lede, then the body. */
export default function LegalPage({ title, updated, lede, wide, children }) {
  const { lang, t } = useLanguage()
  return (
    <main className="legal">
      <div className={`wrap legal__inner${wide ? ' is-wide' : ''}`}>
        <Link to="/" className="legal__back"><ArrowLeft size={16} /> {t.common.backHome}</Link>
        <h1 className="display legal__title">{title}</h1>
        {updated && <p className="legal__meta tnum">{t.privacy.lastUpdated}: {formatLegalDate(updated, lang)}</p>}
        {lede && <p className="legal__lede">{lede}</p>}
        <div className="legal__body">{children}</div>
      </div>
    </main>
  )
}
