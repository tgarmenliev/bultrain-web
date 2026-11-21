// Assets for the November 2026 app update (live map, Android tracking notification, Apple Watch card).
// Sources are in design-source/inbox (not in git). Run: node scripts/build-app-update-assets.mjs
// Android notifications are cropped from a screen recording of the Android app (set ANDROID_VIDEO to its path).
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const IN = 'design-source/inbox'
const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'pipe' })
mkdirSync('public/video', { recursive: true })
mkdirSync('public/img/app', { recursive: true })

// 1) Map video: iPhone full-screen recording. The top 130 px (status bar with the red recording pill) are cut away,
//    audio is removed, 22 s, 540 px wide.
const REC = `${IN}/ScreenRecording_11-21-2026 16-37-09_1.MP4`
run('ffmpeg', ['-y', '-ss', '4', '-t', '22', '-i', REC, '-an', '-vf', 'crop=1170:2402:0:130,scale=540:-2,fps=20',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', 'public/video/map-live.mp4'])
run('ffmpeg', ['-y', '-i', 'public/video/map-live.mp4', '-frames:v', '1', '/tmp/map-poster.png'])
run('magick', ['/tmp/map-poster.png', '-strip', '-quality', '82', 'public/video/map-live-poster.webp'])

// 2) iPhone map stills (raw screenshots) at 480/640/900 px.
for (const [file, name] of [['IMG_0728 2.PNG', 'map-overview'], ['IMG_0727 2.PNG', 'map-train']]) {
  for (const w of [480, 640, 900]) {
    run('magick', [`${IN}/${file}`, '-strip', '-resize', `${w}x`, '-quality', '82', `public/img/app/light-bg-${name}${w === 900 ? '' : `-${w}`}.webp`])
  }
}

// 3) Apple Watch card.
run('magick', [`${IN}/incoming-6182C332-C56F-46B7-938F-7FEE051FC620.PNG`, '-strip', '-quality', '88', 'public/img/app/watch-bg-stack.webp'])

// 4) Android notification crops. The recording is 1080x1920 with the phone screen letterboxed; the three moments are
//    at 28 s (departs), 48 s (arrives, with progress bar) and 60 s (approaching).
const ANDROID = process.env.ANDROID_VIDEO
if (ANDROID) {
  const crops = [['departs', 28, '806x256+137+337', []], ['arrives', 48, '806x306+137+338', []], ['approaching', 60, '790x262+158+104', ['-level', '0%,91%']]]
  for (const [name, t, geo, extra] of crops) {
    run('ffmpeg', ['-y', '-ss', String(t), '-i', ANDROID, '-frames:v', '1', `/tmp/android-${name}.png`])
    run('magick', [`/tmp/android-${name}.png`, '-crop', geo, '+repage', ...extra, '-strip', '-resize', '640x', '-quality', '88', `public/img/app/android-${name}.webp`])
  }
} else {
  console.log('ANDROID_VIDEO not set: Android crops left as they are')
}
console.log('done')
