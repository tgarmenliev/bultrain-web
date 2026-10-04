import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import LegalPage from '../site/LegalPage'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const rows = [
    ['contact-email', c.methods.email.label, 'bultrain.app@gmail.com', 'mailto:bultrain.app@gmail.com', c.methods.email.description],
    ['contact-linkedin', c.methods.linkedin.label, 'Tihomir Garmenliev', 'https://www.linkedin.com/in/tgarmenliev/', c.methods.linkedin.description],
  ]
  return (
    <LegalPage title={c.heading} lede={c.subheading}>
      <ul className="contact__list">
        {rows.map(([id, label, value, href, desc]) => (
          <li key={id}>
            <a id={id} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              <span className="contact__label">{label}</span>
              <span className="contact__value">{value}</span>
              <p className="contact__desc">{desc}</p>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <div className="contact__note">
        <h2>{c.ctaTitle}</h2>
        <p>{c.ctaText}</p>
      </div>
    </LegalPage>
  )
}
