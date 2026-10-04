import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { loadBoard } from '../data/board'
import './livestrip.css'

const SHOW = 4
const fmt = (d) => d.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })

export default function LiveStrip() {
  const { lang, t } = useLanguage()
  const l = t.live
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const ctl = new AbortController()
    let timer
    const tick = async () => {
      try {
        const b = await loadBoard(lang, ctl.signal)
        setBoard(b)
        if (b.source === 'live') timer = setTimeout(tick, 60_000)
      } catch { /* aborted */ }
    }
    tick()
    return () => { ctl.abort(); clearTimeout(timer) }
  }, [lang])

  // While the new language's data loads, show the skeleton instead of stale rows.
  const current = board?.lang === lang ? board : null
  const live = current?.source === 'live'
  const trains = current?.trains.slice(0, SHOW) ?? []
  const lateCount = current ? current.trains.filter((x) => x.late > 0).length : 0

  return (
    <section className="live" aria-label={l.headline} data-source={current?.source ?? 'loading'}>
      <div className="live__head">
        <p className="live__tag">
          <span className="live__dot" />
          {live ? l.live : l.sample}
          <span className="live__title">{l.headline}</span>
        </p>
        <p className="live__meta">
          {current && (live ? `${l.updated} ${fmt(current.at)}` : l.sampleNote)}
        </p>
      </div>

      <ol className="live__list">
        {(current ? trains : Array.from({ length: SHOW })).map((x, i) => (
          <li key={i} className={`live__item${x ? '' : ' is-skeleton'}`}>
            {x && (
              <>
                <span className="live__time tnum" data-late={x.late > 0}>
                  {x.late > 0 && <s>{x.scheduled}</s>}
                  {x.actual}
                </span>
                <span className="live__dest">{x.dest}</span>
                <span className="live__code tnum">{x.code}</span>
                {x.late > 0 && <span className="ds-chip ds-chip--late">+{x.late} {l.late}</span>}
              </>
            )}
          </li>
        ))}
      </ol>

      {current && (
        <p className="live__summary">
          {lateCount === 0 ? l.summaryNone : l.summary.replace('{late}', lateCount).replace('{total}', current.trains.length)}
        </p>
      )}
    </section>
  )
}
