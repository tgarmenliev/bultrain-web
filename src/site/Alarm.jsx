import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { appScreen, appScreenInLang, screenProps } from '../data/screens'
import './alarm.css'

/**
 * The alarm and trip tracking, as its own section: it is one of the most important parts of the app.
 * Screens come from the real app (scripts/build-assets.mjs). An English alarm screenshot is picked up
 * automatically once it is added there.
 */
export default function Alarm() {
  const { lang, t } = useLanguage()
  const { theme } = useTheme()
  const a = t.alarm
  // Save the trip -> the alarm -> the lock screen. Notification screens exist only in the languages they were
  // captured in; where they are missing, the route screen fills in.
  const alarm = appScreenInLang(theme, lang, ['alarm'])
  const live = appScreenInLang(theme, lang, ['live'])
  const shots = [
    [appScreen(theme, lang, ['trip']), a.altTrip],
    [alarm, a.altAlarm],
    [live, a.altLive],
    !alarm && [appScreen(theme, lang, ['route']), a.altRoute],
  ].filter((s) => s && s[0])

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

        <div className="alarm__phones" data-count={shots.length} role="group" aria-label={a.tag} tabIndex={0}>
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
