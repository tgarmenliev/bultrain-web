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
  ['photos/trains/IMG_4721_edited.JPG', 'loco-evening', [2000, 1000, 800]],
  ['photos/eink-display/IMG_5831.HEIC', 'eink-1', [1800, 900], '2160x2700+637+1112'], // cropped around the display, 4:5
  ['photos/me/IMG_7708.heic', 'me-platform', [1400, 700]],
  ['photos/events/IMG_6085.HEIC', 'event-dublin', [1400, 700]],
  ['photos/events/N97A6470.jpg', 'event-president', [1600, 800]],
]
for (const [src, name, widths, crop] of photos) {
  const full = join(TMP, `${name}.jpg`)
  run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '95', join(IN, src), '--out', full]) // also applies EXIF orientation
  for (const w of widths) {
    run('magick', [full, '-auto-orient', ...(crop ? ['-crop', crop, '+repage'] : []), '-strip', '-resize', `${w}x`, '-quality', '80', `${OUT}/photo/${name}-${w}.webp`])
  }
  console.log('photo', name, widths.join('/'))
}

// --- app screens: theme/lang -> { name: file }
const S = 'screens/ios'
// Verified by eye against labelled contact sheets (file numbers are NOT in a uniform order across sets).
// Only the screens the site actually shows (hero: board/results/route, tour: results/board/route/lock).
const screens = {
  dark: {
    bg: { results: '9742', board: '9744', route: '9745', trip: '9743', lock: '9778' },
    en: { results: '9770', board: 'F:Screenshot 2026-10-04 at 20.57.18.png', route: '9772', trip: '9771' },
  },
  light: {
    bg: { results: '9751', board: '9753', route: '9754', trip: 'F:Screenshot 2026-10-04 at 19.58.29.png' },
    en: { results: '9760', board: '9762', route: '9763', trip: '9761', lock: '9768' },
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
      run('magick', [src, '-alpha', 'off', '-strip', '-resize', '900x', '-quality', '82', out])
      for (const w of [480, 640]) run('magick', [src, '-alpha', 'off', '-strip', '-resize', `${w}x`, '-quality', '82', out.replace('.webp', `-${w}.webp`)])
      manifest[theme][lang][name] = `/img/app/${theme}-${lang}-${name}.webp`
    }
  }
}
mkdirSync('src/data', { recursive: true })
writeFileSync('src/data/app-screens.json', JSON.stringify(manifest, null, 1) + '\n')
rmSync(TMP, { recursive: true, force: true })
console.log('app screens ->', Object.values(manifest).flatMap((l) => Object.values(l)).reduce((a, n) => a + Object.keys(n).length, 0))
