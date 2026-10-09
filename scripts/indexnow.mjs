// Tells Bing, Yandex and other IndexNow search engines that the site has changed, right now.
// Run after a deploy:  npm run indexnow
// (Bing also feeds ChatGPT search, Copilot, DuckDuckGo, Yahoo and Ecosia.)
// The key is the file public/<key>.txt, which must be live at https://bultrain.eu/<key>.txt.
import { readFileSync } from 'node:fs'

const KEY = '24d0953e9c7b039f2c5a0a0630ac0ec6'
const HOST = 'bultrain.eu'
const urls = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
})
console.log(`IndexNow: ${urls.length} urls submitted, HTTP ${res.status}${res.status === 200 || res.status === 202 ? ' (accepted)' : ''}`)
