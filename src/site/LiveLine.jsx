import { useLanguage } from '../i18n/LanguageContext'
import { networkResource, useResource, useNow, ageMinutes } from '../data/live'
import './liveline.css'

const fill = (s, vars) => Object.entries(vars).reduce((a, [k, v]) => a.replace(`{${k}}`, v), s)

/** One quiet line under the hero. Same data and the same honesty rules as the full section. */
export default function LiveLine() {
  const { t } = useLanguage()
  const l = t.network.line
  const snap = useResource(networkResource, true)
  const now = useNow()
  const d = snap.data
  const available = d?.realtime.available === true
  const age = d ? ageMinutes(d.generatedAt, now) : null
  const tone = !d ? 'idle' : available ? 'live' : 'off'

  return (
    <a className="liveline" href="#live-network" data-tone={tone}>
      <span className="liveline__dot" aria-hidden="true" />
      <span className="liveline__tag">{available ? l.live : l.sample}</span>
      {!d && <span className="liveline__txt">{snap.status === 'error' ? l.unavailable : '…'}</span>}
      {d && (
        <>
          <span className="liveline__txt tnum">{fill(l.running, { n: d.summary.running })}</span>
          {available && d.summary.onTimePercent !== null
            ? <span className="liveline__txt tnum">{fill(l.onTime, { p: d.summary.onTimePercent })}</span>
            : <span className="liveline__txt">{l.noRealtime}</span>}
          {age !== null && <span className="liveline__age tnum">{age < 1 ? t.network.justNow : fill(t.network.minAgo, { n: age })}</span>}
        </>
      )}
      <span className="liveline__more">{l.more} <i aria-hidden="true">↓</i></span>
    </a>
  )
}
