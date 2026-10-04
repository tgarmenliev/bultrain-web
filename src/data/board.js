// Departure board data. Honesty rule: never present sample data as live.
//   VITE_BOARD_URL  e.g. https://api.example.com/board?station=Sofia&lang={lang}
// With no URL (or on failure) the bundled real sample is used and flagged source: 'sample'.
import sampleBg from './board-sample.bg.json'
import sampleEn from './board-sample.en.json'
import screens from './app-screens.json'

const BOARD_URL = import.meta.env.VITE_BOARD_URL

// The API's `time` is the expected time; when `isDelayed`, `delayedTime` is the original scheduled time.
function normalize(raw) {
  return {
    station: String(raw.station ?? '').trim(),
    trains: (raw.trains ?? []).map((t) => ({
      dest: String(t.direction ?? '').trim(),
      actual: t.time,
      scheduled: t.isDelayed ? String(t.delayedTime) : t.time,
      late: t.isDelayed ? Number(t.delayInfo?.delayMinutes ?? 0) : 0,
      code: `${t.type} ${t.trainNum}`,
    })),
  }
}

export async function loadBoard(lang, signal) {
  const sample = () => ({ ...normalize(lang === 'en' ? sampleEn : sampleBg), source: 'sample', at: null, lang })
  if (!BOARD_URL) return sample()
  try {
    const res = await fetch(BOARD_URL.replace('{lang}', lang), { signal })
    if (!res.ok) throw new Error(String(res.status))
    return { ...normalize(await res.json()), source: 'live', at: new Date(), lang }
  } catch (e) {
    if (e.name === 'AbortError') throw e
    return { ...sample(), source: 'sample' }
  }
}

// Pick a screenshot for the current theme + language, falling back gracefully.
export function appScreen(theme, lang, names) {
  const list = Array.isArray(names) ? names : [names]
  const other = theme === 'dark' ? 'light' : 'dark'
  const otherLang = lang === 'bg' ? 'en' : 'bg'
  // same theme + language first (any of the names), then the same language in the other theme, then other language
  for (const [th, lg] of [[theme, lang], [other, lang], [theme, otherLang], [other, otherLang]]) {
    for (const n of list) if (screens[th]?.[lg]?.[n]) return screens[th][lg][n]
  }
  return null
}
