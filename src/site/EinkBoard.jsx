import { stationName, trainLabel } from '../data/live'
import './eink.css'

const hhmm = (iso) => {
  if (!iso) return null
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : d.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })
}

/**
 * A board drawn like the e-ink display I built: paper, ink, no colour.
 * Honesty: a delay is shown only when isDelayed is true. A train that is not
 * delayed gets NO "on time" label, because the feed does not say whether it
 * has live data. trains === null means the board is unavailable (not "empty").
 */
export default function EinkBoard({ board, lang, labels, stamp }) {
  const trains = board?.trains
  return (
    <div className="eink" role="group" aria-label={labels.title}>
      <div className="eink__screen">
        <div className="eink__bar">
          <span>{stationName(board?.name, lang) || labels.title}</span>
          <span className="eink__clock">{hhmm(board?.fetchedAt) ?? stamp ?? ''}</span>
        </div>

        {trains === null && (
          <div className="eink__msg"><b>{labels.unavailable}</b><span>{labels.unavailableNote}</span></div>
        )}
        {trains && trains.length === 0 && <div className="eink__msg"><span>{labels.empty}</span></div>}

        {trains && trains.length > 0 && (
          <>
            <div className="eink__head"><span>{labels.time}</span><span>{labels.to}</span><span /></div>
            <ol className="eink__rows">
              {trains.map((x, i) => (
                <li key={`${x.type}${x.trainNum}${x.time}${i}`} className={i % 2 ? 'is-alt' : ''}>
                  <span className="eink__time tnum">
                    {x.isDelayed && <s>{x.delayedTime}</s>}
                    {x.time}
                  </span>
                  <span className="eink__dest">
                    <b>{stationName(x.direction, lang)}</b>
                    <i className="tnum">{trainLabel(x.type, x.trainNum, lang)}</i>
                  </span>
                  <span className="eink__status">
                    {x.isDelayed && <em className="tnum">+{x.delayInfo?.delayMinutes} {lang === 'en' ? 'min' : 'мин'}</em>}
                  </span>
                </li>
              ))}
            </ol>
          </>
        )}

        <div className="eink__foot">{labels.updated} {hhmm(board?.fetchedAt) ?? stamp ?? '—'}</div>
      </div>
    </div>
  )
}
