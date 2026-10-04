import { useLanguage } from '../i18n/LanguageContext'
import LegalPage from '../site/LegalPage'
import { LEGAL_UPDATED } from '../site/legal-meta'

export default function Privacy() {
  const { t } = useLanguage()
  const lastIndex = t.privacy.sections.length - 1
  return (
    <LegalPage title={t.privacy.heading} updated={LEGAL_UPDATED} lede={t.privacy.intro}>
      {t.privacy.sections.map((s, i) => (
        <section key={i}>
          <h3>{s.title}</h3>
          <p>
            {/* our own static translation strings (contain <strong>), never user input */}
            <span dangerouslySetInnerHTML={{ __html: s.body }} />
            {i === lastIndex && <> <a href="mailto:bultrain.app@gmail.com">bultrain.app@gmail.com</a>.</>}
          </p>
        </section>
      ))}
    </LegalPage>
  )
}
