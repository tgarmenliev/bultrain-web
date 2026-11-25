import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { TrainFront } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { appScreen, appScreenInLang, screenProps } from '../data/screens'
import './tour.css'

const APP_STORE = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'
const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.bultrain.vlak_app_test'
const KINDS = ['results', 'board', 'map', 'lock', 'alarm'] // what each step shows, in order
// The journey has four moments; each step belongs to one of them (the train on the stage rides to it).
const PHASE = [0, 1, 2, 2, 3]
// On a phone the device is bigger than its window and the "camera" moves to what the step is about:
// 0 = the top of the screen, 1 = the bottom (where the notifications are).
const FOCUS = { results: 0, board: 0, map: 0.5, alarm: 1, 'lock-ios': 1, 'lock-android': 0.04, 'lock-watch': 0.5 }
const STACKED = '(max-width: 900px) and (min-height: 560px)' // phone layout: the stage is pinned on top
const VIDEO = '/video/map-live.mp4'
const POSTER = '/video/map-live-poster.webp'
const WATCH = '/img/app/watch-bg-stack.webp' // Bulgarian card: the Watch is offered on the Bulgarian site only
const SHADE = '/img/app/android-bg-shade' // a real Samsung notification shade, in Bulgarian

// The visitor's own phone decides which device is shown first (Android phone -> Android, everything else -> iPhone).
const never = () => () => {}
const detect = () => (/android/i.test(navigator.userAgent) ? 'android' : 'ios')

/** The device the screen sits in. The stage morphs between them: a phone, an Android phone, a watch. */
function Frame({ kind, children }) {
  if (kind === 'watch') return <div className="ds-watch">{children}</div>
  return <div className={`ds-device${kind === 'android' ? ' ds-device--android' : ''}`}>{children}</div>
}

/** A short muted loop of the real app. Plays while it is wanted (the stage tells it) or, on its own, while on screen. */
function LoopVideo({ active, alt = '', lazy }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    v.muted = true
    if (active === undefined) {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) { v.pause(); return }
        v.poster = POSTER
        if (!still) v.play().catch(() => {})
      }, { threshold: 0.25 })
      io.observe(v)
      return () => io.disconnect()
    }
    if (active && !still) v.play().catch(() => {}); else v.pause()
  }, [active])
  return (
    <video ref={ref} muted loop playsInline preload={lazy ? 'none' : 'metadata'} poster={lazy ? undefined : POSTER} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} width="540" height="1108">
      <source src={VIDEO} type="video/mp4" />
    </video>
  )
}

export default function Tour() {
  const { lang, t } = useLanguage()
  const { theme } = useTheme()
  const tour = t.tour
  const [active, setActive] = useState(0)
  const [picked, setPicked] = useState(null)
  const [reach, setReach] = useState(0) // the furthest step whose screen the stage has asked for
  const stepRefs = useRef([])
  const radios = useRef({})

  const detected = useSyncExternalStore(never, detect, () => 'ios')
  const order = lang === 'bg' ? ['ios', 'android', 'watch'] : ['ios', 'android']
  const platform = order.includes(picked) ? picked : detected

  // The step crossing a line of the viewport is the active one (no scroll listener). The line is in the middle on
  // wide screens, and in the free area under the pinned stage on phones.
  useEffect(() => {
    const mq = window.matchMedia(STACKED)
    let io
    const watch = () => {
      io?.disconnect()
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (!e.isIntersecting) return
          const i = Number(e.target.dataset.i)
          setActive(i)
          setReach((r) => Math.max(r, i + 1))
        }),
        { rootMargin: mq.matches ? '-74% 0px -25% 0px' : '-45% 0px -45% 0px' },
      )
      stepRefs.current.forEach((el) => el && io.observe(el))
    }
    watch()
    mq.addEventListener('change', watch)
    return () => { mq.removeEventListener('change', watch); io.disconnect() }
  }, [])

  const onKey = (e) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = order[(order.indexOf(platform) + step + order.length) % order.length]
    setPicked(next); radios.current[next]?.focus()
  }

  // Every scene the stage can show. `node(alt)` draws its screen; the frame is chosen per scene.
  const img = (src, alt) => <img className="themed" {...screenProps(src)} sizes="300px" alt={alt} width="900" height="1948" loading="lazy" />
  const alarm = appScreenInLang(theme, lang, ['alarm']) || appScreen(theme, lang, ['trip'])
  const lockIos = appScreen(theme, lang, ['lock'])
  const scenes = [
    { id: 'results', kind: 'results', frame: 'ios', node: (alt) => img(appScreen(theme, lang, ['results']), alt) },
    { id: 'board', kind: 'board', frame: 'ios', node: (alt) => img(appScreen(theme, lang, ['board', 'results']), alt) },
    { id: 'map', kind: 'map', frame: 'ios', node: (alt) => <LoopVideo alt={alt} lazy /> },
    { id: 'alarm', kind: 'alarm', frame: 'ios', node: (alt) => img(alarm, alt) },
    { id: 'lock-ios', kind: 'lock', platform: 'ios', frame: 'ios', node: (alt) => img(lockIos, alt) },
    {
      id: 'lock-android', kind: 'lock', platform: 'android', frame: 'android',
      node: (alt) => lang === 'bg'
        ? <img src={`${SHADE}.webp`} srcSet={`${SHADE}-480.webp 480w, ${SHADE}-640.webp 640w, ${SHADE}.webp 738w`} sizes="300px" alt={alt} width="738" height="1599" loading="lazy" />
        // no Bulgarian-free capture exists for English yet: the three real notifications, stacked like the shade
        : (
          <div className="tour__shade">
            {['departs', 'arrives', 'approaching'].map((id, i) => <img key={id} src={`/img/app/android-${id}.webp`} alt={alt ? tour.androidAlts[i] : ''} width="640" height="220" loading="lazy" />)}
          </div>
        ),
    },
    ...(lang === 'bg' ? [{ id: 'lock-watch', kind: 'lock', platform: 'watch', frame: 'watch', node: (alt) => <img src={WATCH} alt={alt} width="396" height="484" loading="lazy" /> }] : []),
  ]
  const shown = (s, kind) => s.kind === kind && (!s.platform || s.platform === platform)
  const sceneFor = (kind) => scenes.find((s) => shown(s, kind))
  const focus = FOCUS[sceneFor(KINDS[active])?.id] ?? 0

  return (
    <section className="tour" id="tour" aria-labelledby="tour-title">
      <div className="wrap">
        <header className="tour__head">
          <h2 className="display tour__title" id="tour-title">{tour.title}</h2>
          <p className="tour__lead">{tour.lead}</p>
        </header>

        <div className="tour__grid">
          <ol className="tour__steps">
            {tour.steps.map((s, i) => {
              const kind = KINDS[i]
              const scene = sceneFor(kind)
              const isLock = kind === 'lock'
              const alt = isLock ? tour.platformAlt[platform] : s.alt
              return (
                <li key={s.title} ref={(el) => (stepRefs.current[i] = el)} data-i={i} className="tour__step" data-active={active === i}>
                  <span className="tour__n">{tour.phases[PHASE[i]]}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>

                  {isLock && (
                    <>
                      <div className="tour__devices" role="radiogroup" aria-label={tour.platformsLabel} onKeyDown={onKey}>
                        {order.map((id) => (
                          <button key={id} ref={(el) => (radios.current[id] = el)} type="button" role="radio" aria-checked={platform === id}
                            tabIndex={platform === id ? 0 : -1} onClick={() => setPicked(id)}>{tour.platforms[id]}</button>
                        ))}
                      </div>
                      <p className="tour__devnote" aria-live="polite">{tour.platformText[platform]}</p>
                    </>
                  )}

                  {/* the device stack under each step on small screens; the sticky stage is for wide ones */}
                  {scene && (
                    <div className={`tour__inline is-${scene.frame}`}><Frame kind={scene.frame}>{scene.node(alt, false, false)}</Frame></div>
                  )}

                  {i === tour.steps.length - 1 && (
                    <div className="tour__avail" data-first={detected}>
                      <a className="ds-btn ds-btn--primary tour__store tour__store--ios" href={APP_STORE} target="_blank" rel="noopener noreferrer">{tour.ctaIos}</a>
                      <a className="ds-btn ds-btn--primary tour__store tour__store--android" href={GOOGLE_PLAY} target="_blank" rel="noopener noreferrer">{tour.ctaAndroid}</a>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>

          <div className="tour__stage" aria-hidden="true">
            <div className="tour__window" style={{ '--focus': focus }}>
              <div className="tour__phone">
                {scenes.map((s) => {
                  const on = shown(s, KINDS[active])
                  return (
                    <div key={s.id} className={`tour__scene is-${s.frame}`} data-on={on}>
                      {KINDS.indexOf(s.kind) <= reach && (
                        <Frame kind={s.frame}>
                          {s.kind === 'map' ? <LoopVideo active={on} /> : s.node('', false)}
                        </Frame>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="tour__rail" style={{ '--p': PHASE[active] / (tour.phases.length - 1) }}>
              <div className="tour__track">
                <i className="tour__fill" />
                <span className="tour__loco"><TrainFront size={18} strokeWidth={2} /></span>
              </div>
              <ol className="tour__stations">
                {tour.phases.map((p, i) => (
                  <li key={p} data-state={i < PHASE[active] ? 'done' : i === PHASE[active] ? 'now' : 'next'}><i /><span>{p}</span></li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
