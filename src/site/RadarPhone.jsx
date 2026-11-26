import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronUp, LocateFixed, Maximize, Minus, Plus, Search, TrainFront, X } from 'lucide-react'
import { BG_PATH, BG_SIZE, BG_CITIES, BG_TOWNS, project } from '../data/bg-outline'
import { BG_RAIL } from '../data/bg-rail'
import { stationName, trainLabel, routeText } from '../data/live'
import { keyOf, fill, kind, delayText, clock, useOnScreen, useTrainPicker } from './useTrainPicker'
import { prefersReducedMotion as reduced, fadeIn } from '../data/motion'
import './radar-phone.css'

const APP_STORE = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'
const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.bultrain.vlak_app_test'
const FOLLOW = 3.2 // zoom when following a train, relative to "the whole country fits"
const MAX_ZOOM = 9
const NEAR = 2.2 // from this zoom on the smaller towns are labelled
const SHOWN_WHEN_IDLE = 8
const BIG = new Set(['София', 'Пловдив', 'Варна', 'Бургас']) // the only names on the whole-country view
const EAST = 27.2 // towns east of this are labelled to their left, so nothing runs off the screen

const ease = (p) => 1 - (1 - p) ** 3

/**
 * The map on a phone, laid out like the app: the map fills the screen, the search sits on top of it, the chosen
 * train's card sits at the bottom, and the map flies to that train. Nothing scrolls the page away from the map.
 * Dots and labels keep the same size on screen at every zoom.
 */
export default function RadarPhone({ lang, t }) {
  const r = t.network.radar
  const stageRef = useRef(null)
  const svgRef = useRef(null)
  const topRef = useRef(null)
  const sheetRef = useRef(null)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)
  const box = useRef(null) // the current viewBox, so a new flight starts where the last one is
  const fit = useRef(1) // screen pixels per map unit when the whole country fits
  const flight = useRef(0) // the running animation
  const manual = useRef(false) // the visitor moved the map: leave it where they put it until they ask for something
  const onScreen = useOnScreen(stageRef)
  const { snap, trains, placed, current, curKey, gone, mostLate, matches, query, setQuery, searching, setPicked, randomKey, reset } = useTrainPicker(lang, onScreen)
  const [view, setView] = useState({ follow: false }) // a new object = "fly there again"
  const [moved, setMoved] = useState(false)
  const [hint, setHint] = useState(false)
  const [open, setOpen] = useState(false) // search list
  const [more, setMore] = useState(false) // full card
  const [size, setSize] = useState(null) // { w, h, top, bottom, right }

  const spot = current && current.lat !== null && current.lon !== null ? project(current.lon, current.lat) : null
  const [sx, sy] = spot ?? [null, null]

  // Measure the free part of the stage: between the search at the top and the (collapsed) card at the bottom.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const measure = () => {
      const w = stage.clientWidth
      const h = stage.clientHeight
      const top = (topRef.current?.offsetHeight ?? 0) + 8
      const sheet = sheetRef.current
      if (sheet && sheet.offsetWidth === 0) return // hidden while searching: the camera stays as it is
      const side = sheet && sheet.offsetWidth < w * 0.7 // sideways phone: the card is a column on the right
      const bottom = side ? 12 : sheet && sheet.dataset.open !== 'true' ? sheet.offsetHeight + 16 : null
      const right = side ? sheet.offsetWidth + 20 : 0
      setSize((s) => {
        const next = { w, h, top: side ? 12 : top, bottom: bottom ?? s?.bottom ?? 170, right }
        return s && Object.keys(next).every((k) => s[k] === next[k]) ? s : next
      })
    }
    const ro = new ResizeObserver(measure)
    ;[stage, topRef.current, sheetRef.current].forEach((el) => el && ro.observe(el))
    return () => ro.disconnect()
  }, [])

  const apply = useCallback((v) => {
    const svg = svgRef.current
    const width = stageRef.current?.clientWidth
    if (!svg || !width) return
    box.current = v
    svg.setAttribute('viewBox', v.join(' '))
    svg.style.setProperty('--u', String(v[2] / width)) // map units per screen pixel
    svg.dataset.zoom = width / v[2] / fit.current >= NEAR ? 'near' : 'far'
  }, [])

  const flyTo = useCallback((to) => {
    cancelAnimationFrame(flight.current)
    const from = box.current
    if (!from) { apply(to); return }
    if (reduced()) {
      // no flight: show the new view and fade it in (small corrections, e.g. a train that moved a little, stay silent)
      const far = Math.hypot(to[0] - from[0], to[1] - from[1]) > from[2] * 0.08 || Math.abs(to[2] - from[2]) > from[2] * 0.08
      apply(to)
      if (far) fadeIn(svgRef.current, 0.1)
      return
    }
    const t0 = performance.now()
    const step = (now) => {
      const p = ease(Math.min(1, Math.max(0, now - t0) / 650))
      apply(from.map((v, i) => v + (to[i] - v) * p))
      if (p < 1) flight.current = requestAnimationFrame(step)
    }
    flight.current = requestAnimationFrame(step)
  }, [apply])

  // The camera: the whole country, or centred on the chosen train in the free space above its card.
  useEffect(() => {
    if (!size?.w) return
    const free = Math.max(120, size.h - size.top - size.bottom)
    const wide = size.w - size.right
    fit.current = Math.min((wide - 20) / (BG_SIZE.width + 30), free / (BG_SIZE.height + 30))
    if (manual.current) return
    const follow = view.follow && sx !== null
    const scale = fit.current * (follow ? FOLLOW : 1)
    const [cx, cy] = follow ? [sx, sy] : [BG_SIZE.width / 2, BG_SIZE.height / 2]
    flyTo([cx - wide / 2 / scale, cy - (size.top + free / 2) / scale, size.w / scale, size.h / scale])
  }, [size, view, sx, sy, flyTo])
  useEffect(() => () => cancelAnimationFrame(flight.current), [])

  const goTo = useCallback((follow) => { manual.current = false; setMoved(false); setView({ follow }) }, [])

  /** Zoom by `k` keeping the map point under (px, py) - screen pixels inside the stage - where it is, then shift. */
  const zoomAt = useCallback((start, k, px, py, dx = 0, dy = 0) => {
    const stage = stageRef.current
    const w = stage.clientWidth
    const now = w / start[2]
    const scale = Math.min(fit.current * MAX_ZOOM, Math.max(fit.current * 0.8, now * k))
    const mx = start[0] + px / now
    const my = start[1] + py / now
    const x = Math.min(BG_SIZE.width - 80, Math.max(80 - w / scale, mx - (px + dx) / scale))
    const y = Math.min(BG_SIZE.height - 80, Math.max(80 - stage.clientHeight / scale, my - (py + dy) / scale))
    return [x, y, w / scale, stage.clientHeight / scale]
  }, [])

  // Like an embedded map: one finger scrolls the page, two fingers move and zoom the map.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    let pinch = null
    let one = null
    let timer = 0
    const points = (e) => {
      const rect = svg.getBoundingClientRect()
      const [a, b] = [e.touches[0], e.touches[1]]
      return { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), x: (a.clientX + b.clientX) / 2 - rect.left, y: (a.clientY + b.clientY) / 2 - rect.top }
    }
    const start = (e) => {
      if (e.touches.length === 2 && box.current) {
        e.preventDefault()
        cancelAnimationFrame(flight.current)
        pinch = { ...points(e), box: box.current }
        one = null
        setHint(false)
      } else if (e.touches.length === 1) one = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    const move = (e) => {
      if (pinch && e.touches.length === 2) {
        e.preventDefault()
        const p = points(e)
        apply(zoomAt(pinch.box, p.d / Math.max(1, pinch.d), pinch.x, pinch.y, p.x - pinch.x, p.y - pinch.y))
        if (!manual.current) { manual.current = true; setMoved(true) }
      } else if (one && e.touches.length === 1) {
        // a sideways drag with one finger means "I want to move the map": say how
        const dx = Math.abs(e.touches[0].clientX - one.x)
        if (dx > 36 && dx > Math.abs(e.touches[0].clientY - one.y) * 1.4) {
          one = null
          setHint(true)
          clearTimeout(timer)
          timer = setTimeout(() => setHint(false), 1800)
        }
      }
    }
    const end = (e) => { if (e.touches.length < 2) pinch = null }
    svg.addEventListener('touchstart', start, { passive: false })
    svg.addEventListener('touchmove', move, { passive: false })
    svg.addEventListener('touchend', end)
    svg.addEventListener('touchcancel', end)
    return () => {
      clearTimeout(timer)
      svg.removeEventListener('touchstart', start)
      svg.removeEventListener('touchmove', move)
      svg.removeEventListener('touchend', end)
      svg.removeEventListener('touchcancel', end)
    }
  }, [apply, zoomAt])

  const zoomBy = (k) => {
    const stage = stageRef.current
    if (!box.current || !size) return
    manual.current = true
    setMoved(true)
    flyTo(zoomAt(box.current, k, (stage.clientWidth - size.right) / 2, (size.top + stage.clientHeight - size.bottom) / 2))
  }

  // While searching, the list ends above the on-screen keyboard.
  useEffect(() => {
    const vv = window.visualViewport
    if (!open || !vv) return
    const fitList = () => {
      const el = resultsRef.current
      if (el) el.style.maxHeight = `${Math.max(150, vv.offsetTop + vv.height - el.getBoundingClientRect().top - 8)}px`
    }
    fitList()
    // Once the keyboard is up (iOS scrolls the page by its own rules while it opens), put the search right under the
    // header, so as many results as possible are visible above the keyboard.
    const later = setTimeout(() => stageRef.current?.scrollIntoView({ block: 'start', behavior: reduced() ? 'auto' : 'smooth' }), 400)
    vv.addEventListener('resize', fitList)
    vv.addEventListener('scroll', fitList)
    window.addEventListener('scroll', fitList, { passive: true })
    return () => { clearTimeout(later); vv.removeEventListener('resize', fitList); vv.removeEventListener('scroll', fitList); window.removeEventListener('scroll', fitList) }
  }, [open])

  const close = () => { setOpen(false); setQuery(''); inputRef.current?.blur() }
  const choose = (key) => {
    if (!key) return
    setPicked(key); setMore(false); goTo(true); close()
  }

  // The nearest dot within a fingertip.
  const tap = (e) => {
    if (open) { close(); return }
    const rect = svgRef.current.getBoundingClientRect()
    const v = box.current
    if (!v) return
    const px = v[0] + ((e.clientX - rect.left) / rect.width) * v[2]
    const py = v[1] + ((e.clientY - rect.top) / rect.height) * v[3]
    let best = null
    let bd = Infinity
    for (const x of placed) {
      const [x1, y1] = project(x.lon, x.lat)
      const d = Math.hypot(x1 - px, y1 - py)
      if (d < bd) { bd = d; best = x }
    }
    if (best && bd <= (30 * v[2]) / rect.width) choose(keyOf(best))
  }

  const focusSearch = () => {
    setOpen(true); setMore(false)
    stageRef.current?.scrollIntoView({ block: 'start', behavior: reduced() ? 'auto' : 'smooth' })
  }

  const ends = current ? [current.from, current.to] : []
  const places = [...BG_CITIES.map((c) => [...c, !BIG.has(c[0])]), ...BG_TOWNS.map((c) => [...c, true])]
  const following = view.follow && !moved
  const list = searching ? matches : matches.slice(0, SHOWN_WHEN_IDLE)
  const stamp = clock(snap.data?.realtime?.positionsUpdatedAt) ?? clock(snap.data?.generatedAt)
  const full = current ? r.fullType[current.type] ?? null : null
  const pct = current && current.progress !== null && current.progress !== undefined ? Math.round(current.progress * 100) : null
  const missing = trains.length - placed.length

  return (
    <div className="pm">
      <div className="pm__stage" ref={stageRef} data-searching={open}>
        <svg ref={svgRef} className="pm__map" role="img" aria-label={r.map} onClick={tap}>
          <path d={BG_PATH} className="pm__land" />
          <path d={BG_RAIL} className="pm__rail-lines" />
          {places.map(([name, lon, lat, town]) => {
            const [x, y] = project(lon, lat)
            const end = ends.includes(name)
            const left = lon > EAST
            return (
              <g key={name} style={{ transform: `translate(${x}px, ${y}px)` }} className={`pm__city${town && !end ? ' pm__town' : ''}${end ? ' is-end' : ''}`}>
                <g className="pm__s"><circle r={end ? 4.5 : 2.5} /><text x={left ? -8 : 8} y="4" textAnchor={left ? 'end' : 'start'}>{stationName(name, lang)}</text></g>
              </g>
            )
          })}
          {placed.map((x) => {
            const k = keyOf(x)
            if (k === curKey) return null // drawn last, on top
            const [px, py] = project(x.lon, x.lat)
            return (
              <g key={k} style={{ transform: `translate(${px}px, ${py}px)` }} className={`pm__dot pm__dot--${kind(x.delayMin)}`}>
                <g className="pm__s"><circle r={kind(x.delayMin) === 'late' ? 6.5 : 5.5} /></g>
              </g>
            )
          })}
          {spot && (
            <g style={{ transform: `translate(${sx}px, ${sy}px)` }} className={`pm__me pm__dot--${kind(current.delayMin)}`}>
              <g className="pm__s">
                <circle className="pm__ring" r="15" />
                <circle className="pm__core" r="11" />
                <text className="pm__lbl" y="-22">{trainLabel(current.type, current.trainNum, lang)}</text>
              </g>
            </g>
          )}
        </svg>

        <div className="pm__top" ref={topRef}>
          <div className="pm__search">
            <Search size={18} aria-hidden="true" />
            <input ref={inputRef} type="search" value={query} enterKeyHint="search" autoComplete="off" placeholder={r.search} aria-label={r.searchLabel}
              onFocus={focusSearch} onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
              onKeyDown={(e) => { if (e.key === 'Enter' && matches[0]) { e.preventDefault(); choose(keyOf(matches[0])) } else if (e.key === 'Escape') close() }} />
            {open && <button type="button" onClick={close} aria-label={r.closeSearch}><X size={18} /></button>}
          </div>
          {!open && (
            <div className="pm__chips">
              <button type="button" disabled={!mostLate} onClick={() => choose(mostLate && keyOf(mostLate))}>{r.quickLate}</button>
              <button type="button" disabled={!placed.length} onClick={() => choose(randomKey())}>{r.quickRandom}</button>
            </div>
          )}
        </div>

        {open && (
          <div className="pm__results" ref={resultsRef}>
            <p className="pm__resulthead">{searching ? r.listResults : r.listLate}</p>
            <p className="sr-only" role="status">{searching ? fill(r.resultsCount, { n: matches.length }) : ''}</p>
            {searching && matches.length === 0 && <p className="pm__empty">{r.noResults}</p>}
            <ul>
              {list.map((x) => (
                <li key={keyOf(x)}>
                  <button type="button" onClick={() => choose(keyOf(x))}>
                    <b className="tnum">{trainLabel(x.type, x.trainNum, lang)}</b>
                    <span>{routeText(x.from, x.to, lang) || r.noRoute}</span>
                    <em className={`tnum pm__d--${kind(x.delayMin)}`}>{x.delayMin === null || x.delayMin === undefined ? '–' : `${x.delayMin}′`}</em>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!open && !more && (
          <div className="pm__zoom" style={size ? { bottom: size.bottom + 4, right: size.right + 10 } : undefined}>
            <button type="button" onClick={() => zoomBy(1 / 1.6)} aria-label={r.zoomOut}><Minus size={19} /></button>
            <button type="button" onClick={() => zoomBy(1.6)} aria-label={r.zoomIn}><Plus size={19} /></button>
            {following || moved
              ? <button type="button" onClick={() => goTo(false)} aria-label={r.zoomAll}><Maximize size={18} /></button>
              : <button type="button" className="is-main" disabled={sx === null} onClick={() => goTo(true)} aria-label={r.zoomTrain}><LocateFixed size={19} /></button>}
            {moved && <button type="button" className="is-main" disabled={sx === null} onClick={() => goTo(true)} aria-label={r.zoomTrain}><LocateFixed size={19} /></button>}
          </div>
        )}
        {hint && <p className="pm__hint" role="status">{r.twoFingers}</p>}

        <div className="pm__sheet" ref={sheetRef} data-open={more} aria-live="polite" hidden={open}>
          {current && (
            <>
              <button type="button" className="pm__summary" onClick={() => setMore((m) => !m)} aria-expanded={more}>
                <span className="pm__who">
                  {(full || !current.type) && <span className="pm__type">{full ?? r.trainWord}</span>}
                  <b className="tnum">{full ? current.trainNum : trainLabel(current.type, current.trainNum, lang)}</b>
                </span>
                <span className={`pm__delay pm__d--${kind(current.delayMin)}`}>{kind(current.delayMin) === 'unknown' ? r.delayUnknownShort : delayText(r, current.delayMin)}</span>
                <span className="pm__route">{routeText(current.from, current.to, lang) || r.noRoute}</span>
                {pct !== null && (
                  <span className="pm__rail">
                    <span className="pm__bar" role="img" aria-label={fill(r.progressLabel, { p: pct })}><i style={{ width: `${pct}%` }} /><em style={{ left: `${pct}%` }}><TrainFront size={13} strokeWidth={2.4} /></em></span>
                    <span className="pm__pct tnum">{pct}%</span>
                  </span>
                )}
                {current.lat === null && <span className="pm__small">{r.noPosition}</span>}
                <span className="pm__toggle">{more ? r.less : r.details} <ChevronUp size={15} aria-hidden="true" /></span>
              </button>
              {more && (
                <div className="pm__more">
                  <p className="pm__small tnum">{pct === null ? r.noProgress : fill(r.progressLabel, { p: pct })}{stamp && current.lat !== null ? ` · ${fill(r.positionAt, { time: stamp })}` : ''}</p>
                  <p>{r.bridge}</p>
                  <p className="pm__stores">
                    <a className="ds-btn ds-btn--sm ds-btn--ghost" href={APP_STORE} target="_blank" rel="noopener noreferrer">App Store</a>
                    <a className="ds-btn ds-btn--sm ds-btn--ghost" href={GOOGLE_PLAY} target="_blank" rel="noopener noreferrer">Google Play</a>
                  </p>
                  <p className="pm__small">{r.refresh}</p>
                </div>
              )}
            </>
          )}
          {gone && (
            <div className="pm__more">
              <p>{r.gone}</p>
              <p className="pm__stores"><button type="button" className="ds-btn ds-btn--sm ds-btn--ghost" onClick={reset}>{r.pickAnother}</button></p>
            </div>
          )}
          {!current && !gone && <p className="pm__small pm__wait">{snap.status === 'error' ? t.network.unavailable : snap.data ? r.none : t.network.starting}</p>}
        </div>
      </div>

      <ul className="pm__legend">
        <li><i className="pm__sw pm__sw--ok" />{r.legendOk}</li>
        <li><i className="pm__sw pm__sw--late" />{r.legendLate}</li>
        <li><i className="pm__sw pm__sw--unknown" />{r.legendUnknown}</li>
      </ul>
      {snap.data && <p className="pm__count tnum">{missing === 0 ? fill(r.allOnMap, { total: trains.length }) : fill(r.onMap, { shown: placed.length, total: trains.length, missing })}</p>}
    </div>
  )
}
