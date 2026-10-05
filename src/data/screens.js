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

/** Like appScreen, but only a screenshot in the visitor's own language (either theme); null if there is none.
 *  Used for screens that are mostly text (notifications), which must not appear in the wrong language. */
export function appScreenInLang(theme, lang, names) {
  const list = Array.isArray(names) ? names : [names]
  const other = theme === 'dark' ? 'light' : 'dark'
  for (const th of [theme, other]) {
    for (const n of list) if (screens[th]?.[lang]?.[n]) return screens[th][lang][n]
  }
  return null
}
