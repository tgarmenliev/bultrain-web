import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { screenProps } from '../data/screens'
import './livemap.css'

const OVERVIEW = '/img/app/light-bg-map-overview.webp'
const VIDEO = '/video/map-live.mp4'
const POSTER = '/video/map-live-poster.webp'

/**
 * A short, muted loop of the real app. It plays only while it is on screen, and not at all for visitors who ask their
 * system for reduced motion (they see the still poster instead).
 */
function LoopVideo({ alt }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    v.muted = true
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={POSTER} aria-label={alt} width="540" height="1108">
      <source src={VIDEO} type="video/mp4" />
    </video>
  )
}

/** The live map of the app: what it shows, and that it refreshes every 10 seconds. Real screens, no mock-ups. */
export default function LiveMap() {
  const { t } = useLanguage()
  const m = t.map

  return (
    <section className="lmap" id="map" aria-labelledby="map-title">
      <div className="wrap lmap__grid">
        <div className="lmap__phones">
          <div className="lmap__phone">
            <div className="ds-device">
              <img {...screenProps(OVERVIEW)} sizes="(min-width: 900px) 250px, 46vw" alt={m.altOverview} width="900" height="1948" loading="lazy" />
            </div>
          </div>
          <div className="lmap__phone">
            <div className="ds-device"><LoopVideo alt={m.altVideo} /></div>
          </div>
        </div>

        <div className="lmap__copy">
          <p className="lmap__tag">{m.tag}</p>
          <h2 className="display lmap__title" id="map-title">{m.title}</h2>
          <p className="lmap__lead">{m.lead}</p>
          <p className="lmap__tick">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle className="lmap__ring-bg" cx="12" cy="12" r="9" /><circle className="lmap__ring" cx="12" cy="12" r="9" pathLength="100" /></svg>
            <span>{m.tick}</span>
          </p>
          <ol className="lmap__points">
            {m.points.map((p, i) => (
              <li key={p.title}>
                <span className="lmap__n tnum" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{p.title}</h3><p>{p.text}</p></div>
              </li>
            ))}
          </ol>
          <p className="lmap__note">{m.note}{m.shotNote && <> {m.shotNote}</>}</p>
        </div>
      </div>
    </section>
  )
}
