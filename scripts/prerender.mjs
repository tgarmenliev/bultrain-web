// Runs after the client build and the server bundle (see "build" in package.json).
// Renders every page, in both languages, to a plain HTML file in dist/ - so search engines, link previews and
// slow phones get the real page without waiting for JavaScript. The browser then "hydrates" it.
//
//   /            -> dist/index.html          /en            -> dist/en.html
//   /privacy     -> dist/privacy.html        /en/privacy    -> dist/en/privacy.html   ...
//   (unknown)    -> dist/404.html            sitemap.xml    -> dist/sitemap.xml
//
// Flat "name.html" files work with clean URLs on Netlify, Cloudflare Pages, Vercel and nginx alike.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const { render, pageMeta, ratings } = await import(pathToFileURL(join(process.cwd(), '.ssr/entry-server.js')).href)

const template = readFileSync('dist/index.html', 'utf8')

// CSS is inlined into every page (the stylesheet is ~9 KB compressed): the first paint then needs no extra request.
// A page also needs the CSS of the lazy chunk it renders (the legal pages), found through Vite's manifest.
const manifest = JSON.parse(readFileSync('dist/.vite/manifest.json', 'utf8'))
const cssOfChunk = (key, seen = new Set()) => {
  const e = manifest[key]
  if (!e || seen.has(key)) return []
  seen.add(key)
  return [...(e.css ?? []), ...(e.imports ?? []).flatMap((k) => cssOfChunk(k, seen))]
}
// lazy chunks each page renders at build time (their CSS must be in the page, or they paint unstyled first)
const PAGE_CHUNKS = {
  '/': ['src/site/Radar.jsx'],
  '/privacy': ['src/pages/Privacy.jsx'], '/privacy-app': ['src/pages/PrivacyApp.jsx'], '/terms': ['src/pages/Terms.jsx'],
  '/contact': ['src/pages/Contact.jsx'], '/design': ['src/site/DesignSystem.jsx'],
}
const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry)
const baseCss = [...new Set(cssOfChunk(entryKey))]
const NOT_FOUND_CHUNKS = ['src/pages/NotFound.jsx']
const inlineCss = (files) => files.map((f) => `<style>${readFileSync(join('dist', f), 'utf8')}</style>`).join('\n    ')

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function once(html, re, replacement) {
  if (!re.test(html)) throw new Error(`prerender: template is missing ${re}`)
  return html.replace(re, replacement)
}

// Structured data (schema.org), the part search engines and AI assistants read most reliably.
// Ratings come from src/data/press.js - the same numbers the page shows.
const STORE_APPLE = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'
const STORE_PLAY = 'https://play.google.com/store/apps/details?id=com.bultrain.vlak_app_test'
const rated = ratings.reduce((n, r) => n + r.count, 0)
const ratingAvg = Math.round((ratings.reduce((s, r) => s + r.value * r.count, 0) / rated) * 10) / 10
const person = {
  '@type': 'Person', '@id': 'https://bultrain.eu/#creator', name: 'Tihomir Garmenliev', alternateName: 'Тихомир Гърменлиев',
  url: 'https://www.linkedin.com/in/tgarmenliev/',
  sameAs: ['https://www.linkedin.com/in/tgarmenliev/', 'https://www.facebook.com/tgarmenliev'],
  jobTitle: 'Creator of BulTrain', alumniOf: 'Technical University of Sofia',
  award: ['John Atanasov Certificate – Project with High Public Impact (for BulTrain)', 'First place, Softuniada 2024 (Software Projects)', 'Winner, HackTUES 10'],
}
const jsonLd = (m) => JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': 'https://bultrain.eu/#website', url: 'https://bultrain.eu/', name: 'BulTrain', inLanguage: ['bg', 'en'], publisher: { '@id': 'https://bultrain.eu/#creator' } },
    person,
    {
      '@type': 'MobileApplication', '@id': 'https://bultrain.eu/#app', name: 'BulTrain', url: 'https://bultrain.eu/',
      alternateName: 'БулТрейн', applicationCategory: 'TravelApplication', operatingSystem: 'iOS, Android',
      description: m.lang === 'bg'
        ? 'BulTrain показва закъснения и позиции на влаковете в България в реално време, табла на гари, умна аларма за пристигане и запазени пътувания.'
        : 'Real-time delays, positions and station boards for trains in Bulgaria, a smart arrival alarm and saved trips.',
      image: 'https://bultrain.eu/og.jpg', inLanguage: ['bg', 'en'],
      screenshot: ['https://bultrain.eu/img/app/dark-bg-board.webp', 'https://bultrain.eu/img/app/dark-bg-route.webp', 'https://bultrain.eu/img/app/dark-bg-alarm.webp'],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      installUrl: [STORE_APPLE, STORE_PLAY], downloadUrl: [STORE_APPLE, STORE_PLAY], sameAs: [STORE_APPLE, STORE_PLAY],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: ratingAvg, ratingCount: rated, bestRating: 5, worstRating: 1 },
      author: { '@id': 'https://bultrain.eu/#creator' }, publisher: { '@id': 'https://bultrain.eu/#creator' },
    },
  ],
})

function page(url, body) {
  const m = pageMeta(url)
  const path = url.replace(/^\/en(?=\/|$)/, '') || '/'
  const chunks = PAGE_CHUNKS[path] ?? NOT_FOUND_CHUNKS
  const css = [...new Set([...baseCss, ...chunks.flatMap((c) => cssOfChunk(c))])]
  let html = template
  html = once(html, /<link rel="stylesheet"[^>]*>/, inlineCss(css))
  html = once(html, /<html lang="[^"]*"/, `<html lang="${m.lang}"`)
  html = once(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(m.title)}</title>`)
  html = once(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttr(m.description)}" />`)
  html = once(html, /<link rel="canonical" href="[^"]*" \/>/, [
    `<link rel="canonical" href="${m.canonical}" />`,
    ...m.alternates.map((a) => `    <link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
  ].join('\n'))
  html = once(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(m.title)}" />`)
  html = once(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(m.description)}" />`)
  html = once(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${m.url}" />`)
  html = once(html, /<script type="application\/ld\+json" data-generated="prerender"><\/script>/, `<script type="application/ld+json">${jsonLd(m)}</script>`)
  html = once(html, /<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${m.locale}" />`)
  html = once(html, /<meta property="og:locale:alternate" content="[^"]*" \/>/, `<meta property="og:locale:alternate" content="${m.localeAlt}" />`)
  if (m.noindex) html = once(html, /<\/title>/, '</title>\n    <meta name="robots" content="noindex" />')
  return once(html, /<div id="root"><\/div>/, `<div id="root" data-prerendered="${url}">${body}</div>`)
}

// path -> file inside dist/
const fileFor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`)
const targets = []
for (const lang of ['bg', 'en']) {
  for (const p of ['/', '/privacy', '/privacy-app', '/terms', '/contact']) {
    targets.push(lang === 'en' ? (p === '/' ? '/en' : `/en${p}`) : p)
  }
}
targets.push('/design') // internal design-system page: prerendered so the address works, but noindex

const inlineScripts = (html) => [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].length
for (const url of targets) {
  const html = page(url, await render(url))
  if (inlineScripts(html) !== 1) throw new Error(`prerender: ${url} has ${inlineScripts(html)} inline scripts (the CSP allows exactly the theme script)`)
  const file = join('dist', fileFor(url))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

// Unknown addresses: a real 404 page (hosts serve dist/404.html with status 404 automatically).
writeFileSync('dist/404.html', page('/404', await render('/404')))

// Sitemap with the language alternates of each page (the bilingual app policy has one address).
const indexable = targets.filter((u) => !pageMeta(u).noindex && pageMeta(u).canonical.endsWith(u === '/' ? '.eu/' : u))
const entries = indexable.map((u) => {
  const m = pageMeta(u)
  const alts = m.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n')
  return `  <url>\n    <loc>${m.url}</loc>\n${alts}${alts ? '\n' : ''}  </url>`
})
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`)

rmSync('.ssr', { recursive: true, force: true })
rmSync('dist/.vite', { recursive: true, force: true })
console.log(`prerender: ${targets.length + 1} pages + sitemap (${indexable.length} urls)`)
