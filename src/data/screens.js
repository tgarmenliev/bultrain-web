import screens from './app-screens.json'

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
