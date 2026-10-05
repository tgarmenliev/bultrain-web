// Language lives in the address: Bulgarian is the root ("/", "/privacy"), English sits under "/en" ("/en", "/en/privacy").
// These helpers are used by the router, the links, the page meta and the build-time prerender.

export const SITE_ORIGIN = 'https://bultrain.eu'

/** "/en/privacy" -> "/privacy", "/en" -> "/", anything else unchanged. */
export const stripLang = (pathname) => {
  if (pathname === '/en' || pathname === '/en/') return '/'
  return pathname.startsWith('/en/') ? pathname.slice(3) : pathname
}

export const langOf = (pathname) => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'bg')

/** The same page in another language: localize('/privacy', 'en') -> "/en/privacy"; '/' -> '/en'. */
export const localize = (path, lang) => {
  const p = stripLang(path)
  if (lang !== 'en') return p
  return p === '/' ? '/en' : `/en${p}`
}

/** No trailing slash (except the root), so "/privacy/" and "/privacy" are the same page. */
export const normalizePath = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname)

/** Pages that exist in both languages (privacy-app is one bilingual page). */
export const PAGES = ['/', '/privacy', '/privacy-app', '/terms', '/contact']
