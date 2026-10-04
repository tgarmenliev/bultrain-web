import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { appScreen, screenProps } from '../data/screens'
import './tour.css'

const APP_STORE = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'
// Which real screenshot belongs to each step (first one found for the current theme/language wins).
const SCREENS = [['results'], ['board', 'results'], ['route'], ['lock']]

export default function Tour() {
  const { lang, t } = useLanguage()
  const { theme } = useTheme()
  const tour = t.tour
  const [active, setActive] = useState(0)
  const stepRefs = useRef([])

  // The step crossing the middle of the viewport is the active one (no scroll listener).
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    stepRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const shots = SCREENS.map((names) => appScreen(theme, lang, names))

  return (
    <section className="tour" id="tour" aria-labelledby="tour-title">
      <div className="wrap">
        <header className="tour__head">
          <h2 className="display tour__title" id="tour-title">{tour.title}</h2>
          <p className="tour__lead">{tour.lead}</p>
        </header>

        <div className="tour__grid">
          <ol className="tour__steps">
            {tour.steps.map((s, i) => (
              <li key={s.title} ref={(el) => (stepRefs.current[i] = el)} data-i={i} className="tour__step" data-active={active === i}>
                <span className="tour__n tnum">{String(i + 1).padStart(2, '0')}</span>
                {s.tag && <span className="tour__tag">{s.tag}</span>}
                <h3>{s.title}</h3>
                <p>{s.text}</p>

                {/* phones stack under each step on small screens; the sticky phone is for wide ones */}
                {shots[i] && (
                  <div className="tour__inline"><div className="ds-device"><img {...screenProps(shots[i])} sizes="250px" alt={s.alt} width="900" height="1948" loading="lazy" /></div></div>
                )}

                {i === tour.steps.length - 1 && (
                  <div className="tour__avail">
                    <a className="ds-btn ds-btn--primary" href={APP_STORE} target="_blank" rel="noopener noreferrer">{tour.cta}</a>
                    <span className="tour__pill is-live"><i />{tour.ios} <em>{tour.iosStatus}</em></span>
                    <span className="tour__pill">{tour.androidSoon}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div className="tour__stage" aria-hidden="true">
            <div className="tour__phone">
              <div className="ds-device">
                <div className="tour__screens">
                  {shots.map((src, i) => src && (
                    <img key={i} {...screenProps(src)} sizes="300px" alt="" width="900" height="1948" data-on={active === i} loading={i === 0 ? 'eager' : 'lazy'} />
                  ))}
                </div>
              </div>
            </div>
            <ol className="tour__dots">
              {tour.steps.map((s, i) => <li key={s.title} data-on={active === i} />)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
