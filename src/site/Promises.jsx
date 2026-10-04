import { useLanguage } from '../i18n/LanguageContext'
import './promises.css'

/** The three promises, set as typography with rules, not as three cards. */
export default function Promises() {
  const { t } = useLanguage()
  const p = t.promises
  return (
    <section className="promises" aria-label="BulTrain">
      <div className="wrap promises__grid">
        <div>
          <p className="display promises__statement">{p.statement}</p>
          <p className="promises__sub">{p.sub}</p>
        </div>
        <ul className="promises__list">
          {p.items.map((it) => (
            <li key={it.title}><h3>{it.title}</h3><p>{it.text}</p></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
