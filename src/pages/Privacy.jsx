import { useLanguage } from '../i18n/LanguageContext'
import LegalPage from '../site/LegalPage'
import PolicyBody from '../site/PolicyBody'
import { PRIVACY_UPDATED } from '../site/legal-meta'

export default function Privacy() {
  const { t } = useLanguage()
  return (
    <LegalPage title={t.privacy.heading} updated={PRIVACY_UPDATED} lede={t.privacy.intro}>
      <PolicyBody policy={t.privacy} />
    </LegalPage>
  )
}
