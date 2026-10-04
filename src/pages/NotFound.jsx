import { useLanguage } from '../i18n/LanguageContext'
import LegalPage from '../site/LegalPage'

export default function NotFound() {
  const { t } = useLanguage()
  return <LegalPage title={t.notFound.title} lede={t.notFound.text} />
}
