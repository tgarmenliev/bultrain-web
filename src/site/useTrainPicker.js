// The logic of "pick a train", shared by the desktop radar and the phone map: which trains run, which one is chosen,
// and what a search finds. Only what the feed contains; nothing is estimated.
import { useEffect, useMemo, useState } from 'react'
import { radarResource, useResource, stationName, trainLabel } from '../data/live'

export const keyOf = (x) => `${x.type ?? ''}${x.trainNum ?? ''}`
export const fill = (s, vars) => Object.entries(vars).reduce((a, [k, v]) => a.replace(`{${k}}`, v), s)
// Colour is never the only carrier: unknown = hollow ring, late = larger dot, and the card says it in words.
export const kind = (d) => (d === null || d === undefined ? 'unknown' : d >= 5 ? 'late' : 'ok')
export const delayText = (r, d) => (d === null || d === undefined ? r.delayUnknown : d === 0 ? r.delayNone : fill(r.delayLate, { n: d }))
export const clock = (iso) => {
  const d = iso ? new Date(iso) : null
  return d && !Number.isNaN(d.getTime()) ? d.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : null
}

export function useOnScreen(ref) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return on
}

export function useTrainPicker(lang, onScreen) {
  const snap = useResource(radarResource, onScreen) // polls only while the map is on screen
  const trains = useMemo(() => snap.data?.trains ?? [], [snap.data])
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState(null) // key chosen by the visitor

  const placed = useMemo(() => trains.filter((x) => x.lat !== null && x.lon !== null), [trains])
  const byDelay = useMemo(() => [...trains].sort((a, b) => (b.delayMin ?? -1) - (a.delayMin ?? -1)), [trains])
  // Until the visitor chooses, an ordinary train in the middle of its route is shown (so the card is never empty and
  // not a record-breaking outlier). It is chosen once and then kept: it must not change under the visitor every minute.
  const mostLate = byDelay.find((x) => x.lat !== null && x.delayMin !== null) ?? null
  const sample = useMemo(() => {
    const fast = new Set(['БВ', 'МБВ', 'ЕВ'])
    return [...placed]
      .filter((x) => x.delayMin !== null && x.progress !== null && x.progress >= 0.15 && x.progress <= 0.85 && x.from && x.to)
      .sort((a, b) => (fast.has(b.type) ? 1 : 0) - (fast.has(a.type) ? 1 : 0) || Math.abs(a.progress - 0.5) - Math.abs(b.progress - 0.5))[0] ?? placed[0] ?? null
  }, [placed])
  const [auto, setAuto] = useState(null)
  if (auto === null && sample) setAuto(keyOf(sample))
  const current = trains.find((x) => keyOf(x) === (picked ?? auto)) ?? null
  const gone = Boolean((picked ?? auto) && !current && snap.data)
  const curKey = current ? keyOf(current) : null

  const q = query.trim().toLowerCase()
  const matches = q
    ? trains.filter((x) => [trainLabel(x.type, x.trainNum, lang), x.trainNum, x.from, x.to, stationName(x.from, lang), stationName(x.to, lang)].some((v) => (v ?? '').toLowerCase().includes(q)))
    : byDelay

  const randomKey = () => (placed.length ? keyOf(placed[Math.floor(Math.random() * placed.length)]) : null)
  const reset = () => { setPicked(null); setAuto(null) }

  return { snap, trains, placed, current, curKey, gone, mostLate, matches, query, setQuery, searching: q.length > 0, setPicked, randomKey, reset }
}
