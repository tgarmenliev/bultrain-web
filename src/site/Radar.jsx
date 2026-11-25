import { useRef, useState } from 'react'
import { Search, TrainFront } from 'lucide-react'
import { BG_PATH, BG_SIZE, BG_CITIES, project } from '../data/bg-outline'
import { stationName, trainLabel, routeText } from '../data/live'
import { keyOf, fill, kind, delayText as sayDelay, clock, useOnScreen, useTrainPicker } from './useTrainPicker'
import './radar.css'

const PAD = 36
const VB = { x: -PAD, y: -PAD, w: BG_SIZE.width + PAD * 2, h: BG_SIZE.height + PAD * 2 }
const APP_STORE = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'
const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.bultrain.vlak_app_test'
const LIST_SHORT = 6

/**
 * Pick a train, see it (wide screens; phones use RadarPhone). The same thing the app does with a tap,
 * with the real feed (about 80 running trains):
 * search by number or station, or click a dot on the map. Only what the feed contains is shown: type, number,
 * from, to, delay, how far along the route it is and where it is. No stops and no route line (the app has those),
 * nothing estimated: a missing value is said to be missing.
 */
export default function Radar({ lang, t }) {
  const r = t.network.radar
  const wrap = useRef(null)
  const svgRef = useRef(null)
  const onScreen = useOnScreen(wrap)
  const { snap, trains, placed, current, curKey, gone, mostLate, matches, query, setQuery, searching, setPicked, randomKey, reset } = useTrainPicker(lang, onScreen)
  const [hover, setHover] = useState(null)
  const [all, setAll] = useState(false)
  const listed = all ? matches : matches.slice(0, LIST_SHORT)

  // Choosing a train closes the search.
  const choose = (key) => {
    setPicked(key); setQuery(''); setAll(false)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }

  // The nearest dot to the pointer within about 28 px: easy to hit on a phone, where a dot is tiny.
  const nearest = (e) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect || !placed.length) return null
    const kx = VB.w / rect.width
    const px = VB.x + (e.clientX - rect.left) * kx
    const py = VB.y + (e.clientY - rect.top) * (VB.h / rect.height)
    let best = null
    let bd = Infinity
    for (const x of placed) {
      const [cx, cy] = project(x.lon, x.lat)
      const d = Math.hypot(cx - px, cy - py)
      if (d < bd) { bd = d; best = x }
    }
    return bd <= 28 * kx ? best : null
  }

  const delayText = (d) => sayDelay(r, d)
  const full = (x) => r.fullType[x.type] ?? null
  const missing = trains.length - placed.length
  const stamp = clock(snap.data?.realtime?.positionsUpdatedAt) ?? clock(snap.data?.generatedAt)

  return (
    <div className="rad" ref={wrap}>
      <div className="rad__mapcol">
        <div className="rad__map">
          <svg ref={svgRef} viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} role="img" aria-label={r.map}
            onPointerMove={(e) => { if (e.pointerType === 'mouse') { const n = nearest(e); setHover(n ? keyOf(n) : null) } }}
            onPointerLeave={() => setHover(null)}
            onClick={(e) => { const n = nearest(e); if (n) choose(keyOf(n)) }}>
            <path d={BG_PATH} className="rad__land" />
            {BG_CITIES.map(([name, lon, lat]) => {
              const [x, y] = project(lon, lat)
              return (
                <g key={name} className="rad__city">
                  <circle cx={x} cy={y} r="3" />
                  <text x={x + 11} y={y + 7}>{stationName(name, lang)}</text>
                </g>
              )
            })}
            {placed.map((x) => {
              const k = keyOf(x)
              const [px, py] = project(x.lon, x.lat)
              const kd = kind(x.delayMin)
              const sel = k === curKey
              return (
                <g key={k} className={`rad__dot rad__dot--${kd}${sel ? ' is-sel' : ''}${k === hover ? ' is-hov' : ''}`}
                  data-dim={curKey && !sel ? 'true' : undefined} style={{ transform: `translate(${px}px, ${py}px)` }}>
                  {sel && <circle className="rad__ring" r="18" />}
                  <circle r={kd === 'late' ? 11 : 8.5} />
                </g>
              )
            })}
            {/* label of the selected / hovered train, drawn last so nothing covers it */}
            {placed.filter((x) => keyOf(x) === curKey || keyOf(x) === hover).map((x) => {
              const [px, py] = project(x.lon, x.lat)
              return <text key={keyOf(x)} className="rad__lbl" x={px} y={py - 26}>{trainLabel(x.type, x.trainNum, lang)}</text>
            })}
          </svg>
          {!snap.data && <p className="rad__state">{snap.status === 'error' ? t.network.unavailable : t.network.starting}</p>}
          {snap.data && placed.length === 0 && <p className="rad__state">{r.none}</p>}
        </div>

        <ul className="rad__legend">
          <li><i className="rad__sw rad__sw--ok" />{r.legendOk}</li>
          <li><i className="rad__sw rad__sw--late" />{r.legendLate}</li>
          <li><i className="rad__sw rad__sw--unknown" />{r.legendUnknown}</li>
        </ul>
        {snap.data && (
          <p className="rad__count tnum">
            {missing === 0 ? fill(r.allOnMap, { total: trains.length }) : fill(r.onMap, { shown: placed.length, total: trains.length, missing })}
          </p>
        )}
      </div>

      <div className="rad__side">
        <label className="rad__search">
          <Search size={18} aria-hidden="true" />
          <input type="search" value={query} enterKeyHint="search" autoComplete="off" placeholder={r.search} aria-label={r.searchLabel}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && matches[0]) { e.preventDefault(); choose(keyOf(matches[0])) } else if (e.key === 'Escape') setQuery('') }} />
        </label>
        <div className="rad__chips" hidden={searching}>
          <button type="button" disabled={!mostLate} onClick={() => choose(keyOf(mostLate))}>{r.quickLate}</button>
          <button type="button" disabled={!placed.length} onClick={() => choose(randomKey())}>{r.quickRandom}</button>
        </div>

        {searching && (
          <div className="rad__results">
            <p className="sr-only" role="status">{fill(r.resultsCount, { n: matches.length })}</p>
            {matches.length === 0 && <p className="rad__small">{r.noResults}</p>}
            <ul className="rad__list is-all">
              {matches.map((x) => (
                <li key={keyOf(x)}>
                  <button type="button" aria-pressed={keyOf(x) === curKey} onClick={() => choose(keyOf(x))}>
                    <b className="tnum">{trainLabel(x.type, x.trainNum, lang)}</b>
                    <span>{routeText(x.from, x.to, lang)}</span>
                    <em className={`tnum rad__delay--${kind(x.delayMin)}`}>{x.delayMin === null || x.delayMin === undefined ? '–' : `${x.delayMin}′`}</em>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rad__panel" aria-live="polite">
          {current && (
            <>
              {/* train types without a full name (IFT, ET) show only the label below, once */}
              {full(current) && <p className="rad__type">{full(current)}</p>}
              <p className="rad__num tnum">{full(current) ? current.trainNum : trainLabel(current.type, current.trainNum, lang)}</p>
              <p className="rad__route">{routeText(current.from, current.to, lang)}</p>
              <p className={`rad__delay rad__delay--${kind(current.delayMin)}`}>{delayText(current.delayMin)}</p>
              {current.progress !== null && current.progress !== undefined ? (
                <div className="rad__rail">
                  <div className="rad__bar" role="img" aria-label={fill(r.progressLabel, { p: Math.round(current.progress * 100) })}>
                    <i style={{ width: `${current.progress * 100}%` }} />
                    <b style={{ left: `${current.progress * 100}%` }}><TrainFront size={15} strokeWidth={2.2} /></b>
                  </div>
                  <p className="tnum">{fill(r.progressLabel, { p: Math.round(current.progress * 100) })}</p>
                </div>
              ) : <p className="rad__small">{r.noProgress}</p>}
              <p className="rad__small tnum">{current.lat === null ? r.noPosition : stamp ? fill(r.positionAt, { time: stamp }) : ''}</p>
              <p className="rad__bridge">{r.bridge}</p>
              <p className="rad__stores">
                <a className="ds-btn ds-btn--sm ds-btn--ghost" href={APP_STORE} target="_blank" rel="noopener noreferrer">App Store</a>
                <a className="ds-btn ds-btn--sm ds-btn--ghost" href={GOOGLE_PLAY} target="_blank" rel="noopener noreferrer">Google Play</a>
              </p>
              <p className="rad__small">{r.refresh}</p>
            </>
          )}
          {gone && (
            <>
              <p className="rad__type">{r.gone}</p>
              <p className="rad__stores"><button type="button" className="ds-btn ds-btn--sm ds-btn--ghost" onClick={reset}>{r.pickAnother}</button></p>
            </>
          )}
          {!current && !gone && <p className="rad__small">{snap.data ? r.none : t.network.starting}</p>}
        </div>

        {!searching && (
          <>
          <p className="rad__listhead">{r.listLate}</p>
            <ul className={`rad__list${all ? ' is-all' : ''}`}>
            {listed.map((x) => (
              <li key={keyOf(x)}>
                <button type="button" aria-pressed={keyOf(x) === curKey} onClick={() => setPicked(keyOf(x))}>
                  <b className="tnum">{trainLabel(x.type, x.trainNum, lang)}</b>
                  <span>{routeText(x.from, x.to, lang)}</span>
                  <em className={`tnum rad__delay--${kind(x.delayMin)}`}>{x.delayMin === null || x.delayMin === undefined ? '–' : `${x.delayMin}′`}</em>
                </button>
              </li>
            ))}
          </ul>
          {matches.length > LIST_SHORT && (
            <button type="button" className="rad__more" onClick={() => setAll((v) => !v)}>{all ? r.showLess : fill(r.showAll, { n: matches.length })}</button>
          )}
          </>
        )}
      </div>
    </div>
  )
}
