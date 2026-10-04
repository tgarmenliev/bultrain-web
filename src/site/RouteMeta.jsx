import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

const ORIGIN = 'https://bultrain.eu'

function setMeta(selector, attr, name, content) {
  let el = document.head.querySelector(selector)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

/** Keeps <title>, description, canonical and Open Graph in step with the page and the language. */
export default function RouteMeta() {
  const { pathname } = useLocation()
  const { lang, t } = useLanguage()

  useEffect(() => {
    const pages = {
      '/': [t.meta.title, t.meta.description],
      '/privacy': [`${t.privacy.heading} · BulTrain`, t.privacy.intro],
      '/terms': [`${t.terms.heading} · BulTrain`, t.terms.intro],
      '/contact': [`${t.contact.heading} · BulTrain`, t.contact.subheading],
      '/privacy-app': ['BulTrain App Privacy Policy', t.meta.description],
      '/design': [`${t.meta.design} · BulTrain`, t.meta.description],
    }
    const known = pathname in pages
    const [title, description] = pages[pathname] ?? [`${t.notFound.title} · BulTrain`, t.meta.description]

    document.title = title
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', ORIGIN + pathname)
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'bg' ? 'bg_BG' : 'en_GB')

    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', ORIGIN + (known ? pathname : '/'))

    // internal pages and unknown addresses must not be indexed
    const noindex = pathname === '/design' || !known
    let robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots) }
      robots.setAttribute('content', 'noindex')
    } else if (robots) robots.remove()
  }, [pathname, lang, t])

  return null
}
