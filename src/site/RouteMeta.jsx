import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageMeta } from './seo'

function setMeta(selector, attr, name, content) {
  let el = document.head.querySelector(selector)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

/**
 * Keeps <title>, description, canonical, language alternates and Open Graph in step when the visitor
 * navigates inside the app. The first load already has the right values (written at build time).
 */
export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const m = pageMeta(pathname)
    document.title = m.title
    setMeta('meta[name="description"]', 'name', 'description', m.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', m.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', m.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', m.url)
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', m.locale)
    setMeta('meta[property="og:locale:alternate"]', 'property', 'og:locale:alternate', m.localeAlt)

    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', m.canonical)

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
    for (const a of m.alternates) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = a.hreflang
      link.href = a.href
      document.head.appendChild(link)
    }

    let robots = document.head.querySelector('meta[name="robots"]')
    if (m.noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots) }
      robots.setAttribute('content', 'noindex')
    } else if (robots) robots.remove()
  }, [pathname])

  return null
}
