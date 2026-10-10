import LegalPage from '../site/LegalPage'
import PolicyBody from '../site/PolicyBody'
import { PRIVACY_UPDATED, formatLegalDate } from '../site/legal-meta'
import { translations } from '../i18n/translations'

// The page linked from the App Store and Google Play. It shows the same policy as /privacy, in English and in
// Bulgarian on one page, so the store listing works for everyone and the text lives in a single place
// (src/i18n/privacy-policy.js).
const DISCLAIMER = {
  en: ['Disclaimer', 'BulTrain is an independent mobile application. It is not affiliated with, endorsed by, or connected to BDZ (Bulgarian State Railways), NRIC (National Railway Infrastructure Company), the Ministry of Transport, any government body, or any official institution. The app uses only publicly available information and is developed privately for user convenience.'],
  bg: ['Отказ от отговорност (Disclaimer)', 'BulTrain е независимо мобилно приложение. То не е свързано с, не е одобрено от и не е обвързано по какъвто и да е начин с БДЖ (Български държавни железници), НКЖИ (Национална компания железопътна инфраструктура), Министерството на транспорта и съобщенията, държавен орган или друга официална институция. Приложението използва единствено публично достъпна информация и е разработено частно за удобство на потребителите.'],
}

export default function PrivacyApp() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <LegalPage title="BulTrain App Privacy Policy" wide>
      <p className="legal__meta">
        Last updated: {formatLegalDate(PRIVACY_UPDATED, 'en')} / Последна актуализация: {formatLegalDate(PRIVACY_UPDATED, 'bg')}
      </p>
      <div className="legal-jump">
        <button type="button" onClick={() => scrollTo('en')}>English</button>
        <button type="button" onClick={() => scrollTo('bg')}>Български</button>
      </div>

      <div className="legal__policy">
        {['en', 'bg'].map((code, i) => (
          <div key={code} id={code} lang={code}>
            {i === 1 && <hr className="legal-split" />}
            <div className="legal-callout"><strong>{DISCLAIMER[code][0]}</strong>{DISCLAIMER[code][1]}</div>
            <h2>{translations[code].privacy.heading}</h2>
            <p className="legal__lede">{translations[code].privacy.intro}</p>
            <PolicyBody policy={translations[code].privacy} headingLevel={3} idPrefix={`${code}-`} />
          </div>
        ))}
      </div>
    </LegalPage>
  )
}
