import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { networkResource, useResource, useNow, ageMinutes, stationName, trainLabel } from '../data/live'
import './heroboard.css'

const ROWS = 5
const SPAN = { time: 5, dest: 16, train: 9, status: 7 } // cells per column, like the real boards
const ROTATE_MS = 14_000
const CYR = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЮЯ'
const LAT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const hhmm = (iso) => {
  if (!iso) return null
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : d.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })
}
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const pad = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s.padEnd(n, ' '))

/**
 * One group of split-flap cells. The text is always in the DOM (for the page, for search engines and for the
 * screen reader: the group carries the full text, the cells are decoration). When the text changes after the
 * board has been seen, each cell spins through a few characters and lands on the new one.
 */
function Flap({ text, n, row, armed, lang, className = '' }) {
  const ref = useRef(null)
  const prev = useRef(null)
  const timers = useRef([])
  const chars = [...pad(text, n)]

  useEffect(() => {
    const el = ref.current
    if (!el || !armed) return
    const cells = [...el.children]
    const before = prev.current
    prev.current = chars.join('')
    if (reduced() || before === prev.current) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    cells.forEach((cell, i) => {
      const target = chars[i]
      if (before !== null && before[i] === target) return
      if (target === ' ' || target === ':' || target === '+' || target === '…') return
      const pool = /\d/.test(target) ? '0123456789' : lang === 'en' ? LAT : CYR
      const ticks = 4 + (i % 3)
      for (let k = 0; k <= ticks; k++) {
        timers.current.push(setTimeout(() => {
          cell.textContent = k === ticks ? target : pool[Math.floor(Math.random() * pool.length)]
          cell.classList.remove('is-flip'); void cell.offsetWidth; cell.classList.add('is-flip')
        }, row * 110 + i * 22 + k * 58))
      }
    })
    return () => { timers.current.forEach(clearTimeout) }
    // the target text is what matters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, armed])

  return (
    <span className={`hb__grp ${className}${text.trim() ? '' : ' is-empty'}`} ref={ref} role="img" aria-label={text.trim() || undefined}>
      {chars.map((c, i) => <i key={i} className={`hb__cell${c === ' ' ? ' is-blank' : ''}`} aria-hidden="true">{c === ' ' ? '' : c}</i>)}
    </span>
  )
}

/**
 * The first screen's signature: a departure board in the style of a station's own, filled with the REAL next
 * trains from the BulTrain feed. Same honesty as the rest of the site: a delay is shown only when the feed says so,
 * nothing is invented, and when the feed is down the board says so instead of showing old rows as current.
 */
export default function HeroBoard() {
  const { lang, t } = useLanguage()
  const n = t.network
  const snap = useResource(networkResource, true)
  const now = useNow()
  const d = snap.data
  const keys = d ? Object.keys(d.boards) : []
  const [pick, setPick] = useState(null) // a station chosen by the visitor stops the automatic rotation
  const [auto, setAuto] = useState(0)
  const [armed, setArmed] = useState(false)
  const panel = useRef(null)

  const key = pick && keys.includes(pick) ? pick : keys[auto % Math.max(keys.length, 1)]
  const board = d && key ? d.boards[key] : null
  const trains = board?.trains ?? null
  const available = d?.realtime.available === true
  const age = d ? ageMinutes(d.generatedAt, now) : null

  // The flaps wake up once the board is on screen; the stations rotate while it is watched.
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = panel.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { setSeen(e.isIntersecting); if (e.isIntersecting) setArmed(true) }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!seen || pick || keys.length < 2 || reduced()) return
    const id = setInterval(() => setAuto((a) => a + 1), ROTATE_MS)
    return () => clearInterval(id)
  }, [seen, pick, keys.length])

  const rows = Array.from({ length: ROWS }, (_, i) => trains?.[i] ?? null)
  const up = (s) => (s ?? '').toLocaleUpperCase(lang === 'en' ? 'en' : 'bg')

  return (
    <section className="hb" aria-labelledby="hb-title">
      <div className="hb__panel" ref={panel}>
       <div className="hb__inner">
        <header className="hb__head">
          <h2 className="hb__title" id="hb-title">
            <span>{n.board.departures}</span>
            <b>{board ? up(stationName(board.name, lang)) : '…'}</b>
          </h2>
          <div className="hb__tools">
            {keys.length > 1 && (
              <div className="hb__tabs" role="group" aria-label={n.board.title}>
                {keys.map((k) => (
                  <button key={k} type="button" aria-pressed={k === key} onClick={() => setPick(k)}>{stationName(d.boards[k].name, lang)}</button>
                ))}
              </div>
            )}
            <p className="hb__live" data-tone={!d ? 'idle' : available ? 'live' : 'off'}>
              <i aria-hidden="true" />
              {!d ? '…' : available ? n.line.live : n.line.sample}
              {age !== null && <span className="tnum">{hhmm(board?.fetchedAt) ?? ''}</span>}
            </p>
          </div>
        </header>

        {snap.status === 'error' && !d && <p className="hb__msg">{n.line.unavailable}</p>}
        {d && trains === null && <p className="hb__msg">{n.board.unavailable}. {n.board.unavailableNote}</p>}
        {d && trains && trains.length === 0 && <p className="hb__msg">{n.board.empty}</p>}

        {!(snap.status === 'error' && !d) && trains !== null && (
          <ol className="hb__rows" aria-live="off">
            {rows.map((x, r) => (
              <li key={r} className="hb__row">
                <span className="hb__time">
                  <Flap text={x ? x.time : ''} n={SPAN.time} row={r} armed={armed} lang={lang} />
                  {x?.isDelayed && <s className="tnum">{x.delayedTime}</s>}
                </span>
                <Flap text={x ? up(stationName(x.direction, lang)) : ''} n={SPAN.dest} row={r} armed={armed} lang={lang} className="hb__dest" />
                <Flap text={x ? up(trainLabel(x.type, x.trainNum, lang)) : ''} n={SPAN.train} row={r} armed={armed} lang={lang} className="hb__train" />
                <Flap text={x?.isDelayed ? `+${x.delayInfo?.delayMinutes} ${lang === 'en' ? 'MIN' : 'МИН'}` : ''} n={SPAN.status} row={r} armed={armed} lang={lang} className="hb__late" />
              </li>
            ))}
          </ol>
        )}

        <footer className="hb__foot">
          <p>{n.board.note}</p>
          <a href="#live-network">{n.line.more} <i aria-hidden="true">↓</i></a>
        </footer>
       </div>
      </div>
    </section>
  )
}
