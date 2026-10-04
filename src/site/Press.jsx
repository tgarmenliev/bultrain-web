import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { sortedArticles, ratings } from '../data/press'
import './press.css'

const fmtRating = (v, lang) => v.toLocaleString(lang === 'bg' ? 'bg-BG' : 'en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const fmtDate = (iso, lang) => new Date(iso).toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' })

export default function Press() {
  const { lang, t } = useLanguage()
  const p = t.press
  const list = sortedArticles.filter((a) => {
    if (t.media.articles[a.id]) return true
    console.warn(`[Press] Missing translation for "${a.id}" in "${lang}" - skipped. Add it to src/i18n/translations.js.`)
    return false
  })
  const [lead, ...rest] = list
  const leadCopy = lead && t.media.articles[lead.id]

  return (
    <section className="press" id="media-coverage" aria-labelledby="press-title">
      <div className="wrap">
        <h2 className="display press__title" id="press-title">{p.title}</h2>

        {lead && (
          <article className="press__lead">
            {lead.photo && (
              <figure className="press__photo">
                <img src={`${lead.photo}-700.webp`} srcSet={`${lead.photo}-700.webp 700w, ${lead.photo}-1400.webp 1400w`} sizes="(min-width: 900px) 420px, 100vw" alt="" width="700" height="933" loading="lazy" />
                <figcaption>{p.dublinCaption}</figcaption>
              </figure>
            )}
            <div className="press__leadtext">
              <p className="press__outlet">{leadCopy.source}</p>
              <h3><a href={lead.url} target="_blank" rel="noopener noreferrer">{leadCopy.title}</a></h3>
              <p className="press__snippet">{leadCopy.snippet}</p>
              <a className="press__more" href={lead.url} target="_blank" rel="noopener noreferrer">{t.common.readMore} <ArrowUpRight size={16} /></a>
            </div>
          </article>
        )}

        <ol className="press__list">
          {rest.map((a) => {
            const c = t.media.articles[a.id]
            return (
              <li key={a.id}>
                <a href={a.url} target="_blank" rel="noopener noreferrer">
                  <span className="press__outlet">{c.source}</span>
                  <span className="press__ttl">{c.title}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ol>

        <div className="rev">
          <div className="rev__head">
            <h3>{p.storesLabel}</h3>
            <ul className="rev__ratings">
              {ratings.map((r) => (
                <li key={r.store}>
                  <b className="tnum">{fmtRating(r.value, lang)}</b>
                  <span>{r.store} <i>{p.outOf}</i></span>
                  <small className="tnum">{p.ratingCount.replace('{n}', r.count)}</small>
                </li>
              ))}
            </ul>
          </div>

          <ul className="rev__quotes">
            {p.reviews.map((r, i) => (
              <li key={r.name} className={i === 0 ? 'is-first' : ''}>
                <blockquote lang={lang === 'en' && r.lang === 'bg' ? 'en' : r.lang}>{r.text}</blockquote>
                <p className="rev__by"><b>{r.name}</b> <span>{r.store}</span> <span className="tnum">{fmtDate(r.date, lang)}</span></p>
                {lang === 'en' && r.lang === 'bg' && <p className="rev__tr">{p.translated}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
