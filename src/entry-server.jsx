import { Buffer } from 'node:buffer'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'
export { pageMeta } from './site/seo.js'

/** Build-time only: renders one address to an HTML string (see scripts/prerender.mjs). */
export async function render(url) {
  // `prerender` waits for everything (lazy pages and sections included) and returns finished HTML: no
  // streaming placeholders and no inline scripts.
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <LanguageProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LanguageProvider>
    </StaticRouter>,
    // never split a big section into a deferred segment (that needs inline scripts): inline everything
    { progressiveChunkSize: Infinity },
  )
  const chunks = []
  for await (const chunk of prelude) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}
