import screens from './app-screens.json'

/** src + srcSet for a screenshot path returned by appScreen (files: <name>-480.webp, <name>-640.webp, <name>.webp = 900w). */
export function screenProps(path) {
  if (!path) return {}
  const base = path.replace(/\.webp$/, '')
  return { src: path, srcSet: `${base}-480.webp 480w, ${base}-640.webp 640w, ${path} 900w` }
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
