// Runs after `vite build` (npm "postbuild"): writes the host config files into dist/.
//  - _headers   : security + caching headers (Netlify and Cloudflare Pages read this file)
//  - _redirects : single-page-app fallback so /privacy, /terms ... work on a direct visit
// The Content-Security-Policy needs the SHA-256 of the inline theme script in index.html, so it is
// computed here from the built file and can never go stale.
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const html = readFileSync('dist/index.html', 'utf8')
const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
if (inline.length !== 1) throw new Error(`expected exactly 1 inline script, found ${inline.length}`)
const hash = createHash('sha256').update(inline[0]).digest('base64')

const csp = [
  "default-src 'self'",
  `script-src 'self' 'sha256-${hash}'`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://api.bultrain.eu",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const headers = `/*
  Content-Security-Policy: ${csp}
  Referrer-Policy: strict-origin-when-cross-origin
  X-Content-Type-Options: nosniff
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Cross-Origin-Opener-Policy: same-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=604800

/index.html
  Cache-Control: no-cache
`
writeFileSync('dist/_headers', headers)
writeFileSync('dist/_redirects', '/*  /index.html  200\n')
console.log('post-build: _headers (CSP script hash sha256-' + hash.slice(0, 10) + '...) and _redirects written')
