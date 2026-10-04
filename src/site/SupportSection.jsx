import { Coffee, CreditCard, Mail, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import './support.css'

export default function SupportSection() {
  const { t } = useLanguage()
  const s = t.support
  return (
    <section className="support" id="support" aria-labelledby="support-title">
      <div className="wrap support__grid">
        <div>
          <h2 className="display support__title" id="support-title">{s.headingLine1} {s.headingAccent}</h2>
          <p className="support__text">{s.subheading}</p>
        </div>
        <div className="support__actions">
          <a id="support-coffee" className="ds-btn ds-btn--primary" href="https://www.buymeacoffee.com/tgarmenliev" target="_blank" rel="noopener noreferrer">
            <Coffee size={18} /> {s.coffee}
          </a>
          <a id="support-revolut" className="ds-btn ds-btn--ghost" href="https://revolut.me/tgarmenliev" target="_blank" rel="noopener noreferrer">
            <CreditCard size={18} /> {s.revolut} <ArrowUpRight size={15} />
          </a>
          <p className="support__contact">
            <span>{s.contactLabel}</span>
            <a id="contact-email" href="mailto:bultrain.app@gmail.com"><Mail size={16} /> bultrain.app@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  )
}
