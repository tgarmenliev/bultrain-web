import { translations } from '../i18n/translations'
import { SITE_ORIGIN, PAGES, stripLang, langOf, localize } from '../i18n/routes'

const abs = (path) => SITE_ORIGIN + (path === '/' ? '/' : path)

/**
 * Everything a page puts in <head> that depends on the address: title, description, canonical, language
 * alternates, robots. One function, used by the browser (RouteMeta) and by the build-time prerender,
 * so the two can never drift apart.
 */
export function pageMeta(pathname) {
  const lang = langOf(pathname)
  const path = stripLang(pathname)
  const t = translations[lang]
  const pages = {
    '/': [t.meta.title, t.meta.description],
    '/privacy': [`${t.privacy.heading} · BulTrain`, t.privacy.intro],
    '/terms': [`${t.terms.heading} · BulTrain`, t.terms.intro],
    '/contact': [`${t.contact.heading} · BulTrain`, t.contact.subheading],
    '/privacy-app': ['BulTrain App Privacy Policy', t.meta.description],
    '/design': [`${t.meta.design} · BulTrain`, t.meta.description],
  }
  const known = path in pages
  const [title, description] = pages[path] ?? [`${t.notFound.title} · BulTrain`, t.meta.description]
  const indexable = PAGES.includes(path)

  // The bilingual app policy has a single canonical address; every other page points to itself.
  const canonicalPath = !known ? '/' : path === '/privacy-app' ? path : localize(path, lang)
  const alternates = indexable && path !== '/privacy-app'
    ? [
        { hreflang: 'bg', href: abs(localize(path, 'bg')) },
        { hreflang: 'en', href: abs(localize(path, 'en')) },
        { hreflang: 'x-default', href: abs(localize(path, 'bg')) },
      ]
    : []

  return {
    lang, title, description,
    url: abs(canonicalPath),
    canonical: abs(canonicalPath),
    alternates,
    locale: lang === 'bg' ? 'bg_BG' : 'en_GB',
    localeAlt: lang === 'bg' ? 'en_GB' : 'bg_BG',
    noindex: !indexable,
  }
}
