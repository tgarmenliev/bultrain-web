import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { appScreen, appScreenInLang, screenProps } from '../data/screens'
import './alarm.css'

const ANDROID = ['departs', 'arrives', 'approaching'] // real notification crops from the Android app, in order
const WATCH = '/img/app/watch-bg-stack.webp' // Bulgarian card, so the Watch tab is shown only on the Bulgarian site

/**
 * The alarm and trip tracking, as its own section: it is one of the most important parts of the app.
 * One journey, shown on the platform the visitor uses: iPhone (Live Activity), Android (ongoing notification),
 * Apple Watch (journey card). Screens come from the real apps (scripts/build-assets.mjs, build-app-update-assets.mjs).
 */
export default function Alarm() {
  const { lang, t } = useLanguage()
  const { theme } = useTheme()
  const a = t.alarm
  const [platform, setPlatform] = useState('ios')
  const tabs = useRef({})

  // iPhone: the alarm notification and the Live Activity are the point, but those screens exist only in the languages
  // they were captured in (Bulgarian so far); in other languages the save-trip and route screens fill in.
  const alarm = appScreenInLang(theme, lang, ['alarm'])
  const live = appScreenInLang(theme, lang, ['live'])
  const shots = (alarm && live
    ? [[alarm, a.altAlarm], [live, a.altLive]]
    : [[appScreen(theme, lang, ['trip']), a.altTrip], [appScreen(theme, lang, ['route']), a.altRoute]]
  ).filter(([src]) => src)

  const order = lang === 'bg' ? ['ios', 'android', 'watch'] : ['ios', 'android']
  const onKey = (e) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = order[(order.indexOf(platform) + step + order.length) % order.length]
    setPlatform(next); tabs.current[next]?.focus()
  }

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

        <div className="alarm__stage">
          <div className="alarm__tabs" role="tablist" aria-label={a.platformsLabel} onKeyDown={onKey}>
            {order.map((id) => (
              <button key={id} ref={(el) => (tabs.current[id] = el)} id={`plat-tab-${id}`} role="tab" type="button"
                aria-selected={platform === id} aria-controls="plat-panel" tabIndex={platform === id ? 0 : -1}
                onClick={() => setPlatform(id)}>{a.platforms[id]}</button>
            ))}
          </div>
          <p className="alarm__platnote" aria-live="polite">{a.platformText[platform]}</p>

          <div id="plat-panel" role="tabpanel" aria-labelledby={`plat-tab-${platform}`}>
            {platform === 'ios' && (
              <div className="alarm__phones" data-count={shots.length}>
                {shots.map(([src, alt]) => (
                  <div className="alarm__phone" key={src}>
                    <div className="ds-device">
                      <img className="themed" {...screenProps(src)} sizes="(min-width: 900px) 250px, 42vw" alt={alt} width="900" height="1948" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {platform === 'android' && (
              <div className="alarm__android">
                <ol>
                  {ANDROID.map((id, i) => (
                    <li key={id}>
                      <span className="alarm__step">{a.androidSteps[i]}</span>
                      <img src={`/img/app/android-${id}.webp`} alt={a.altAndroid[i]} width="640" height={id === 'arrives' ? 243 : id === 'departs' ? 203 : 214} loading="lazy" />
                    </li>
                  ))}
                </ol>
                {a.androidNote && <p className="alarm__shotnote">{a.androidNote}</p>}
              </div>
            )}

            {platform === 'watch' && (
              <div className="alarm__watch">
                <img src={WATCH} alt={a.altWatch} width="396" height="484" loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
