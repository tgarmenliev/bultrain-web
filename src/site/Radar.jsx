import { useEffect, useRef, useState } from 'react'
import { BG_PATH, BG_SIZE, BG_CITIES, project } from '../data/bg-outline'
import { radarResource, useResource, stationName, trainLabel } from '../data/live'
import './radar.css'

const PAD = 36
const trainId = (t) => `${t.type ?? ''}${t.trainNum ?? ''}`

// Colour is never the only carrier: unknown = hollow ring, late = larger dot, plus the legend and the list below.
function kind(delayMin) {
  if (delayMin === null || delayMin === undefined) return 'unknown'
  return delayMin >= 5 ? 'late' : 'ok'
}

function useOnScreen(ref) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return on
}

export default function Radar({ lang, t }) {
  const r = t.network.radar
  const ref = useRef(null)
  const onScreen = useOnScreen(ref)
  const snap = useResource(radarResource, onScreen) // polls only while the map is on screen
  const trains = snap.data?.trains ?? []
  const placed = trains.filter((x) => x.lat !== null && x.lon !== null)
  const [tip, setTip] = useState(null)

  const sorted = [...trains].sort((a, b) => (b.delayMin ?? -1) - (a.delayMin ?? -1))
  const missing = trains.length - placed.length

  return (
    <div className="rad" ref={ref}>
      <div className="rad__map">
        <svg viewBox={`${-PAD} ${-PAD} ${BG_SIZE.width + PAD * 2} ${BG_SIZE.height + PAD * 2}`} role="img" aria-label={r.map} onPointerLeave={() => setTip(null)}>
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
            const [px, py] = project(x.lon, x.lat)
            const k = kind(x.delayMin)
            return (
              <g key={trainId(x)} className={`rad__dot rad__dot--${k}`} style={{ transform: `translate(${px}px, ${py}px)` }}
                 onPointerEnter={() => setTip({ x, px, py })} onPointerDown={() => setTip({ x, px, py })}>
                <circle r={k === 'late' ? 11 : 8.5} />
                <circle r="16" className="rad__hit" />
              </g>
            )
          })}
        </svg>

        {tip && (
          <div className="rad__tip" style={{ left: `${((tip.px + PAD) / (BG_SIZE.width + PAD * 2)) * 100}%`, top: `${((tip.py + PAD) / (BG_SIZE.height + PAD * 2)) * 100}%` }}>
            <b className="tnum">{trainLabel(tip.x.type, tip.x.trainNum, lang)}</b>
            <span>{stationName(tip.x.from, lang)} → {stationName(tip.x.to, lang)}</span>
            <span className="tnum">
              {tip.x.delayMin === null ? `${r.delay}: ${r.unknownDelay}` : `${r.delay}: ${tip.x.delayMin} ${t.network.unit}`}
            </span>
          </div>
        )}

        {!snap.data && <p className="rad__state">{snap.status === 'error' ? t.network.unavailable : t.network.starting}</p>}
        {snap.data && placed.length === 0 && <p className="rad__state">{r.none}</p>}
      </div>

      <div className="rad__side">
        <ul className="rad__legend">
          <li><i className="rad__sw rad__sw--ok" />{r.legendOk}</li>
          <li><i className="rad__sw rad__sw--late" />{r.legendLate}</li>
          <li><i className="rad__sw rad__sw--unknown" />{r.legendUnknown}</li>
        </ul>
        {snap.data && (
          <p className="rad__count tnum">
            {missing === 0
              ? r.allOnMap.replace('{total}', trains.length)
              : r.onMap.replace('{shown}', placed.length).replace('{total}', trains.length).replace('{missing}', missing)}
          </p>
        )}

        <details className="rad__list">
          <summary>{r.list}</summary>
          <table>
            <thead><tr><th>{r.route}</th><th>{r.delay}</th><th>{r.progress}</th></tr></thead>
            <tbody>
              {sorted.map((x) => (
                <tr key={trainId(x)}>
                  <td><b className="tnum">{trainLabel(x.type, x.trainNum, lang)}</b><span>{stationName(x.from, lang)} → {stationName(x.to, lang)}</span></td>
                  <td className={`tnum rad__d rad__d--${kind(x.delayMin)}`}>{x.delayMin === null ? r.unknownDelay : `${x.delayMin} ${t.network.unit}`}</td>
                  <td className="tnum">{x.progress === null ? '—' : `${Math.round(x.progress * 100)}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    </div>
  )
}
