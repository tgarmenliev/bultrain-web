// Live network data: /api/network (every 5 min) and /api/network/radar (every 60 s while on screen).
//
// Rules (from the backend contract) that this file enforces:
//  - one timer per resource, refresh only while the tab is visible, one fetch when it becomes visible again
//  - plain fetch (the browser uses the ETag itself): no cache-busting params, no localStorage
//  - 503 -> retry after Retry-After (default 15 s), a few times; 429 -> back off one minute
//  - network error -> keep the last good data and say how old it is
// Nothing is computed here: null means "no data" and is passed through untouched.
import { useEffect, useState, useSyncExternalStore } from 'react'

const API = import.meta.env.VITE_API_BASE || 'https://api.bultrain.eu'
export const STALE_MS = 15 * 60_000

function createResource(path, intervalMs) {
  let state = { data: null, status: 'idle', receivedAt: null }
  const listeners = new Set()
  let holders = 0
  let timer = null
  let inFlight = false
  let ctl = null
  let retries503 = 0

  const emit = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()) }
  const schedule = (ms) => { clearTimeout(timer); timer = setTimeout(load, ms) }

  async function load() {
    if (inFlight || holders === 0 || document.visibilityState !== 'visible') return
    inFlight = true
    ctl = new AbortController()
    try {
      const res = await fetch(API + path, { signal: ctl.signal })
      if (res.status === 503) {
        retries503 += 1
        const wait = (Number(res.headers.get('Retry-After')) || 15) * 1000
        if (retries503 <= 3) { emit({ status: 'starting' }); schedule(wait) } else { emit({ status: 'error' }); schedule(intervalMs) }
        return
      }
      if (res.status === 429) { emit({ status: 'rate-limited' }); schedule(60_000); return }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      retries503 = 0
      emit({ data, status: 'ok', receivedAt: Date.now() })
      schedule(intervalMs)
    } catch (e) {
      if (e.name === 'AbortError') {
        // Aborted because the last holder left, or the tab was hidden. If someone wants data again
        // (e.g. React remounted), start over instead of leaving the resource idle.
        if (holders > 0 && document.visibilityState === 'visible') schedule(0)
        return
      }
      if (import.meta.env.DEV && e instanceof TypeError) {
        // Almost always CORS in development: the API allows only localhost:5173 / 4173 / 3000.
        console.warn(`[live] ${path} failed (${location.origin}). The API allows only localhost:5173, :4173, :3000 and bultrain.eu. Run the dev server on 5173.`)
      }
      emit({ status: 'error' }) // keeps state.data: the last good snapshot stays on screen
      schedule(Math.min(intervalMs, 30_000))
    } finally {
      inFlight = false
    }
  }

  const onVisibility = () => {
    if (holders === 0) return
    if (document.visibilityState === 'visible') load()
    else { clearTimeout(timer); ctl?.abort() }
  }

  return {
    getSnapshot: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) },
    /** Start polling while at least one holder wants fresh data. Returns release(). */
    retain() {
      holders += 1
      if (holders === 1) { document.addEventListener('visibilitychange', onVisibility); load() }
      return () => {
        holders -= 1
        if (holders === 0) { document.removeEventListener('visibilitychange', onVisibility); clearTimeout(timer); ctl?.abort() }
      }
    },
  }
}

export const networkResource = createResource('/api/network', 5 * 60_000)
export const radarResource = createResource('/api/network/radar', 60_000)

/** Subscribe to a resource; `active=false` reads the last snapshot without polling. */
export function useResource(resource, active = true) {
  const snap = useSyncExternalStore(resource.subscribe, resource.getSnapshot)
  useEffect(() => (active ? resource.retain() : undefined), [resource, active])
  return snap
}

/** Re-render every `ms` so "updated X min ago" stays true. */
export function useNow(ms = 30_000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), ms); return () => clearInterval(id) }, [ms])
  return now
}

/** Age in whole minutes since the SERVER generated the snapshot (never the visitor's clock for the data itself). */
export const ageMinutes = (iso, now) => (iso ? Math.max(0, Math.floor((now - Date.parse(iso)) / 60_000)) : null)

// ---- presentation helpers (names only, no data is derived) -------------------------------------------

const EN_TYPE = { 'ПВ': 'PT', 'КПВ': 'SUT', 'БВ': 'FT', 'МБВ': 'IFT', 'ЕВ': 'ET' }
export const trainLabel = (type, num, lang) => {
  const t = type ? (lang === 'en' ? EN_TYPE[type] ?? type : type) : ''
  return `${t} ${num ?? ''}`.trim()
}

// Bulgarian "Streamlined System" transliteration, for station names on the English site.
const MAP = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht', ъ: 'a', ь: 'y', ю: 'yu', я: 'ya' }
export function stationName(name, lang) {
  const n = (name ?? '').trim()
  if (lang !== 'en' || !n) return n
  // JS \b is ASCII-only, so "end of word" is expressed as "not followed by a Cyrillic letter"
  return n.replace(/ия(?![а-яА-Я])/g, 'ia')
    .replace(/[а-яъьюя]/gi, (c) => {
      const r = MAP[c.toLowerCase()] ?? c
      return c === c.toLowerCase() ? r : r.charAt(0).toUpperCase() + r.slice(1)
    })
}
