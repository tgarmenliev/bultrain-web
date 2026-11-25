import { useLanguage } from '../i18n/LanguageContext'
import { releases } from '../data/releases'
import { formatDay } from '../data/dates'
import './releases.css'

const fmt = (iso, precision, lang) =>
  formatDay(iso, lang, precision === 'month' ? { month: 'long', year: 'numeric' } : { day: 'numeric', month: 'long', year: 'numeric' })

/**
 * The line of releases: a railway line with one station per release. New work is one entry in src/data/releases.js,
 * not a new section. Oldest on the left, newest at the end of the line (on a phone the newest is on top).
 */
export default function Releases() {
  const { lang, t } = useLanguage()
  const r = t.releases
  const items = releases.filter((x) => r.items[x.id])

  return (
    <section className="rel" id="releases" aria-labelledby="rel-title">
      <div className="wrap">
        <header className="rel__head">
          <h2 className="display rel__title" id="rel-title">{r.title}</h2>
          <p className="rel__lead">{r.lead}</p>
        </header>

        <ol className="rel__line">
          {items.map((x, i) => {
            const c = r.items[x.id]
            return (
              <li key={x.id} className="rel__stop" style={{ '--o': items.length - i }}>
                <span className="rel__dot" aria-hidden="true" />
                <p className="rel__when tnum"><time dateTime={x.date}>{fmt(x.date, x.precision, lang)}</time> <span>{x.platform}</span></p>
                <div className="rel__card">
                  <img src={x.thumb} alt="" width="640" height="480" loading="lazy" style={{ objectPosition: x.pos }} />
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
