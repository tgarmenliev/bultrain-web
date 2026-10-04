import { lazy, Suspense, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { networkResource, useResource, useNow, ageMinutes, STALE_MS, stationName, trainLabel } from '../data/live'
import EinkBoard from './EinkBoard'
const Radar = lazy(() => import('./Radar'))
import './network.css'

const fill = (str, vars) => Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, v), str)
const ageText = (n, t) => (n === null ? '' : n < 1 ? t.network.justNow : fill(t.network.minAgo, { n }))

/** What to tell the visitor about the state of the data. Returns { tone, text }. */
function freshness(snap, now, t) {
  const n = t.network
  const d = snap.data
  if (!d) {
    if (snap.status === 'error') return { tone: 'bad', text: n.unavailable }
    if (snap.status === 'rate-limited') return { tone: 'warn', text: n.rateLimited }
    return { tone: 'idle', text: n.starting }
  }
  const age = ageMinutes(d.generatedAt, now)
  if (snap.status === 'error') return { tone: 'warn', text: fill(n.offline, { age: ageText(age, t) }) }
  if (age !== null && now - Date.parse(d.generatedAt) > STALE_MS) return { tone: 'warn', text: fill(n.stale, { n: age }) }
  return { tone: 'live', text: fill(n.updated, { age: ageText(age, t) }) }
}

function Stat({ value, unit, label, note, empty }) {
  return (
    <div className="net__stat">
      {empty ? <b className="net__none">{empty}</b> : <b className="tnum">{value}{unit && <small>{unit}</small>}</b>}
      <span className="net__label">{label}</span>
      <span className="net__note">{note}</span>
    </div>
  )
}

export default function LiveNetwork() {
  const { lang, t } = useLanguage()
  const n = t.network
  const snap = useResource(networkResource, true)
  const now = useNow()
  const d = snap.data
  const fr = freshness(snap, now, t)
  const [tab, setTab] = useState('sofia')
  const tabRefs = useRef({})

  const available = d?.realtime.available === true
  const s = d?.summary
  const boardKeys = d ? Object.keys(d.boards) : []
  const board = d?.boards[tab] ?? (d ? d.boards[boardKeys[0]] : null)
  const stamp = d ? new Date(d.generatedAt).toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' }) : null

  return (
    <section className="net" id="live-network" aria-labelledby="net-title">
      <div className="wrap">
        <header className="net__head">
          <div>
            <h2 className="display net__title" id="net-title">{n.title}</h2>
            {d ? (
              <p className="net__lead tnum">
                {fill(available ? n.lead : n.leadNone, { running: s.running, withRealtime: s.withRealtime })}
              </p>
            ) : (
              <p className="net__lead is-ph" aria-hidden="true">00 00 00 00 00 00 00 00 00</p>
            )}
          </div>
          <p className="net__fresh" data-tone={fr.tone} role="status">
            <span className="net__dot" aria-hidden="true" />
            {fr.text}
          </p>
        </header>

        {!d && (
          // same markup as the loaded state, hidden, so the page does not jump when data arrives
          <div className="net__stats is-ph" aria-hidden="true">
            {[0, 1, 2].map((i) => <Stat key={i} label="00 00 00" value="00" unit=" 00" note="00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00" />)}
          </div>
        )}

        {d && !available && (
          <div className="net__stats net__stats--off">
            <Stat label={n.onTime + ' · ' + n.avg + ' · ' + n.max} empty={n.noRealtime} note={n.noRealtimeNote} />
          </div>
        )}

        {d && available && (
          <div className="net__stats">
            {/* null = no data: never drawn as 0 and never as "on time" */}
            <Stat label={n.onTime} value={s.onTimePercent} unit="%"
              empty={!available || s.onTimePercent === null ? n.noRealtime : null}
              note={!available || s.onTimePercent === null ? n.noRealtimeNote : fill(n.onTimeNote, { n: s.withRealtime, total: s.running })} />
            <Stat label={n.avg} value={s.avgDelayMin} unit={` ${n.unit}`}
              empty={!available || s.avgDelayMin === null ? n.noRealtime : null}
              note={!available || s.avgDelayMin === null ? n.noRealtimeNote : n.avgNote} />
            {available && s.maxDelay === null ? (
              <Stat label={n.max} empty={n.noDelayed} note={n.noDelayedNote} />
            ) : (
              <Stat label={n.max} value={s.maxDelay?.min} unit={` ${n.unit}`}
                empty={!available || !s.maxDelay ? n.noRealtime : null}
                note={available && s.maxDelay
                  ? `${trainLabel(s.maxDelay.type, s.maxDelay.trainNum, lang)} → ${stationName(s.maxDelay.to, lang)}`
                  : n.noRealtimeNote} />
            )}
          </div>
        )}

        <div className="net__boards">
          <div className="net__boardcol">
            {boardKeys.length > 1 && (
              <div className="net__tabs" role="tablist" aria-label={n.board.title}
                onKeyDown={(e) => {
                  const i = boardKeys.indexOf(board === d.boards[tab] ? tab : boardKeys[0])
                  const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
                  if (!step) return
                  e.preventDefault()
                  const next = boardKeys[(i + step + boardKeys.length) % boardKeys.length]
                  setTab(next); tabRefs.current[next]?.focus()
                }}>
                {boardKeys.map((k) => (
                  <button key={k} ref={(el) => (tabRefs.current[k] = el)} id={`board-tab-${k}`} role="tab" type="button"
                    aria-selected={board === d.boards[k]} aria-controls="board-panel" tabIndex={board === d.boards[k] ? 0 : -1}
                    onClick={() => setTab(k)}>
                    {stationName(d.boards[k].name, lang)}
                  </button>
                ))}
              </div>
            )}
            <div id="board-panel" role="tabpanel" aria-labelledby={`board-tab-${tab}`}>
              {d ? <EinkBoard board={board} lang={lang} labels={n.board} stamp={stamp} /> : <div className="net__skeleton" aria-hidden="true" />}
            </div>
            <p className="net__boardnote">{n.board.note}</p>
          </div>

          <figure className="net__photo">
            <img src="/img/photo/eink-1-900.webp" srcSet="/img/photo/eink-1-900.webp 900w, /img/photo/eink-1-1800.webp 1800w"
              sizes="(min-width: 960px) 600px, 100vw" alt={n.device.alt} width="900" height="1200" loading="lazy" />
            <figcaption>{n.device.caption}</figcaption>
          </figure>
        </div>

        <div className="net__radar">
          <h3 className="net__h3">{n.radar.title}</h3>
          <Suspense fallback={<div style={{ aspectRatio: '1072 / 722', maxWidth: '62%' }} aria-hidden="true" />}>
            <Radar lang={lang} t={t} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
