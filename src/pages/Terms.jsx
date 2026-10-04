import { useLanguage } from '../i18n/LanguageContext'
import LegalPage from '../site/LegalPage'
import { LEGAL_UPDATED } from '../site/legal-meta'

export default function Terms() {
  const { t } = useLanguage()
  return (
    <LegalPage title={t.terms.heading} updated={LEGAL_UPDATED} lede={t.terms.intro}>
      {t.terms.sections.map((s, i) => (
        <section key={i}>
          <h3>{s.title}</h3>
          {/* our own static translation strings (contain <strong>), never user input */}
          <p dangerouslySetInnerHTML={{ __html: s.body }} />
        </section>
      ))}
    </LegalPage>
  )
}
