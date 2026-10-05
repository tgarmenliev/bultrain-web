import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { appScreen, screenProps } from '../data/screens'
import './alarm.css'

/**
 * The alarm and trip tracking, as its own section: it is one of the most important parts of the app.
 * Screens come from the real app; an "alarm" screenshot is picked up automatically once it exists in
 * src/data/app-screens.json (see scripts/build-assets.mjs).
 */
export default function Alarm() {
  const { lang, t } = useLanguage()
  const { theme } = useTheme()
  const a = t.alarm
  const shots = [
    [appScreen(theme, lang, ['trip']), a.altTrip],
    [appScreen(theme, lang, ['route']), a.altRoute],
    [appScreen(theme, lang, ['alarm']), a.altAlarm],
  ].filter(([src]) => src)

  return (
    <section className="alarm" id="alarm" aria-labelledby="alarm-title">
      <div className="wrap alarm__grid">
        <div className="alarm__copy">
          <p className="alarm__tag">{a.tag}</p>
          <h2 className="display alarm__title" id="alarm-title">{a.title}</h2>
          <p className="alarm__lead">{a.lead}</p>
          <ol className="alarm__points">
            {a.points.map((p, i) => (
              <li key={p.title}>
                <span className="alarm__n tnum" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{p.title}</h3><p>{p.text}</p></div>
              </li>
            ))}
          </ol>
          <p className="alarm__note">{a.note}</p>
        </div>

        <div className="alarm__phones" data-count={shots.length}>
          {shots.map(([src, alt]) => (
            <div className="alarm__phone" key={src}>
              <div className="ds-device">
                <img className="themed" {...screenProps(src)} sizes="(min-width: 900px) 250px, 42vw" alt={alt} width="900" height="1948" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
