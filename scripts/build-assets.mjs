// Turns the originals in design-source/inbox (NOT in git) into optimised web assets in public/img.
// - HEIC/JPG photos -> WebP at 2 widths, EXIF/GPS stripped
// - App screenshots -> WebP 900px wide
// Run: node scripts/build-assets.mjs
import { execFileSync } from 'node:child_process'
import { mkdirSync, existsSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const IN = 'design-source/inbox'
const OUT = 'public/img'
const TMP = join(tmpdir(), 'bultrain-assets')
mkdirSync(TMP, { recursive: true })
mkdirSync(`${OUT}/photo`, { recursive: true })
rmSync(`${OUT}/app`, { recursive: true, force: true })
mkdirSync(`${OUT}/app`, { recursive: true })

const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'pipe' })

// --- photos: [source, name, widths]
const photos = [
  ['photos/trains/IMG_4721_edited.JPG', 'loco-evening', [2000, 1000]],
  ['photos/trains/IMG_5280.HEIC', 'sunset-platform', [2000, 1000]],
  ['photos/eink-display/IMG_5830.HEIC', 'eink-1', [1800, 900]],
  ['photos/eink-display/IMG_5831.HEIC', 'eink-2', [1800, 900]],
  ['photos/me/IMG_7708.heic', 'me-platform', [1400, 700]],
]
for (const [src, name, widths] of photos) {
  const full = join(TMP, `${name}.jpg`)
  run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '95', join(IN, src), '--out', full]) // also applies EXIF orientation
  for (const w of widths) {
    run('magick', [full, '-auto-orient', '-strip', '-resize', `${w}x`, '-quality', '80', `${OUT}/photo/${name}-${w}.webp`])
  }
  console.log('photo', name, widths.join('/'))
}

// --- app screens: theme/lang -> { name: file }
const S = 'screens/ios'
// Verified by eye against labelled contact sheets (file numbers are NOT in a uniform order across sets).
const screens = {
  dark: {
    bg: { home: '9741', homeLive: '9777', results: '9742', trip: '9743', board: '9744', route: '9745', info: '9746', lock: '9778' },
    en: { home: '9769', results: '9770', trip: '9771', board: 'F:Screenshot 2026-10-04 at 20.57.18.png', route: '9772', info: '9773' },
  },
  light: {
    bg: { home: '9750', results: '9751', trip: 'F:Screenshot 2026-10-04 at 19.58.29.png', board: '9753', route: '9754', info: '9756' },
    en: { home: '9759', results: '9760', trip: '9761', board: '9762', route: '9763', info: '9764', lock: '9768' },
  },
}
const manifest = {}
for (const [theme, langs] of Object.entries(screens)) {
  manifest[theme] = {}
  for (const [lang, names] of Object.entries(langs)) {
    manifest[theme][lang] = {}
    for (const [name, n] of Object.entries(names)) {
      const src = join(IN, S, theme, lang, n.startsWith('F:') ? n.slice(2) : `IMG_${n}.PNG`)
      if (!existsSync(src)) { console.log('MISSING', src); continue }
      const out = `${OUT}/app/${theme}-${lang}-${name}.webp`
      run('magick', [src, '-alpha', 'off', '-strip', '-resize', '900x', '-quality', '84', out])
      manifest[theme][lang][name] = `/img/app/${theme}-${lang}-${name}.webp`
    }
  }
}
mkdirSync('src/data', { recursive: true })
writeFileSync('src/data/app-screens.json', JSON.stringify(manifest, null, 1) + '\n')
rmSync(TMP, { recursive: true, force: true })
console.log('app screens ->', Object.values(manifest).flatMap((l) => Object.values(l)).reduce((a, n) => a + Object.keys(n).length, 0))
