import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { appScreen } from '../data/screens'
import LiveLine from './LiveLine'
import './hero.css'

const APP_STORE = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'
const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.bultrain.vlak_app_test'

export default function Hero() {
  const { lang, t } = useLanguage()
  const { theme } = useTheme()
  const h = t.hero
  const screen = appScreen(theme, lang, ['board', 'results', 'route'])

  return (
    <section className="hero" id="hero">
      <div className="wrap">
        <div className="hero__grid">
          <div className="hero__copy">
            <h1 className="display hero__title" data-rise style={{ '--i': 0 }}>
              <span>{h.headlineLine1}</span>{' '}
              <span>{h.headlineLine2} {h.headlineAccent}</span>
            </h1>
            <p className="hero__lead" data-rise style={{ '--i': 1 }}>{h.subheading}</p>

            <div className="hero__actions" data-rise style={{ '--i': 2 }}>
              <a className="hero__badge hero__badge--apple" id="hero-appstore" href={APP_STORE} target="_blank" rel="noopener noreferrer">
                <img src={`/img/badges/appstore-${lang === 'bg' ? 'bg' : 'en'}.svg`} alt="App Store" width="150" height="50" />
              </a>
              <a className="hero__badge hero__badge--play" id="hero-googleplay" href={GOOGLE_PLAY} target="_blank" rel="noopener noreferrer">
                <img src={`/img/badges/googleplay-${lang === 'bg' ? 'bg' : 'en'}.png`} alt="Google Play" width="175" height="52" />
              </a>
            </div>

            <ul className="hero__facts" data-rise style={{ '--i': 3 }}>
              {h.facts.map((f) => (
                <li key={f.label}>
                  <b className="tnum">{f.value}</b>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__visual" data-rise style={{ '--i': 2 }}>
            <figure className="hero__photo">
              <img
                src="/img/photo/loco-evening-1000.webp"
                srcSet="/img/photo/loco-evening-1000.webp 1000w, /img/photo/loco-evening-2000.webp 2000w"
                sizes="(min-width: 960px) 560px, 100vw"
                alt={h.photoAlt}
                width="1000" height="750"
                fetchPriority="high"
              />
              <figcaption>{h.photoCredit}</figcaption>
            </figure>
            {screen && (
              <div className="hero__phone" data-rise style={{ '--i': 4 }}>
                <div className="ds-device">
                  <img src={screen} alt={`BulTrain, ${t.screenshots.labels.station}`} width="900" height="1948" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div data-rise style={{ '--i': 5 }}>
          <LiveLine />
        </div>
      </div>
    </section>
  )
}
