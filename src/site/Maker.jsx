import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import './maker.css'

const AWARDS = ['softuniada', '20under20', 'hacktues', 'bait', 'teenovator']
const EDUCATION = ['tues', 'tu']
const LINKS = [['LinkedIn', 'https://www.linkedin.com/in/tgarmenliev/'], ['Facebook', 'https://www.facebook.com/tgarmenliev']]

export default function Maker() {
  const { t } = useLanguage()
  const m = t.maker
  const ach = t.about.achievements

  return (
    <section className="maker" id="about" aria-labelledby="maker-name">
      <div className="wrap maker__grid">
        <figure className="maker__portrait">
          <img src="/img/photo/me-platform-700.webp" srcSet="/img/photo/me-platform-700.webp 700w, /img/photo/me-platform-1400.webp 1400w"
            sizes="(min-width: 900px) 440px, 100vw" alt={m.portraitAlt} width="700" height="933" loading="lazy" />
        </figure>

        <div className="maker__text">
          <h2 className="display maker__name" id="maker-name">{m.name}</h2>
          <p className="maker__role">{m.role}</p>
          <p className="maker__intro">{m.intro}</p>

          <blockquote className="maker__quote">
            <p>{m.quote}</p>
            <footer>{m.quoteBy}</footer>
          </blockquote>

          <div className="maker__lists">
            <section>
              <h3>{m.awardsTitle}</h3>
              <ul>
                <li className="is-major"><b>{m.johnAtanasov.label}</b><span>{m.johnAtanasov.detail}</span></li>
                <li><b>{m.dublin.label}</b><span>{m.dublin.detail}</span></li>
                {AWARDS.map((id) => <li key={id}><b>{ach[id].label}</b><span>{ach[id].detail}</span></li>)}
              </ul>
            </section>
            <section>
              <h3>{m.educationTitle}</h3>
              <ul>{EDUCATION.map((id) => <li key={id}><b>{ach[id].label}</b><span>{ach[id].detail}</span></li>)}</ul>
            </section>
          </div>

          <figure className="maker__president">
            <img src="/img/photo/event-president-800.webp" srcSet="/img/photo/event-president-800.webp 800w, /img/photo/event-president-1600.webp 1600w"
              sizes="(min-width: 900px) 560px, 100vw" alt={m.presidentAlt} width="800" height="767" loading="lazy" />
            <figcaption>{m.presidentCaption}</figcaption>
          </figure>

          <p className="maker__links">
            {LINKS.map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name} <ArrowUpRight size={15} /></a>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
