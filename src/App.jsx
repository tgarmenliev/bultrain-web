import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './site/Nav'
import RouteMeta from './site/RouteMeta'
import Hero from './site/Hero'
import LiveNetwork from './site/LiveNetwork'
import Tour from './site/Tour'
import Alarm from './site/Alarm'
import Promises from './site/Promises'
import Press from './site/Press'
import Maker from './site/Maker'
import SupportSection from './site/SupportSection'
import Footer from './site/Footer'
import ScrollProgress from './components/ScrollProgress'
import LangSuggest from './site/LangSuggest'
import { stripLang } from './i18n/routes'
// Pages other than the home page load on demand. `loaders` lets the entry point fetch the right one *before*
// hydrating, so a prerendered page is never swapped for a loading placeholder.
const loaders = {
  '/design': () => import('./site/DesignSystem'),
  '/privacy': () => import('./pages/Privacy'),
  '/privacy-app': () => import('./pages/PrivacyApp'),
  '/terms': () => import('./pages/Terms'),
  '/contact': () => import('./pages/Contact'),
  '*': () => import('./pages/NotFound'),
}
const page = (path) => lazy(loaders[path])
const DesignSystem = page('/design')
const Privacy = page('/privacy')
const PrivacyApp = page('/privacy-app')
const Terms = page('/terms')
const Contact = page('/contact')
const NotFound = page('*')

/** Start loading the code for a language-less path (e.g. "/privacy"); resolves when it is ready. The home page's lazy part is the radar map. */
// eslint-disable-next-line react-refresh/only-export-components
export const preloadRoute = (path) => (path === '/' ? import('./site/Radar') : (loaders[path] ?? loaders['*'])())

function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <LiveNetwork />
      <Tour />
      <Alarm />
      <Promises />
      <Press />
      <Maker />
      <SupportSection />
    </main>
  )
}

// New page -> top. A hash link (also from another page) -> that section.
function ScrollToTop() {
  const location = useLocation()
  const path = stripLang(location.pathname) // switching language keeps the scroll position
  const { hash } = location
  useEffect(() => {
    const target = hash.length > 1 ? document.getElementById(hash.slice(1)) : null
    // jump, don't glide: this runs on arrival at a page, where a long animated scroll would be disorienting
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [path, hash])
  return null
}

export default function App() {
  // routes are written without the language prefix: "/en/privacy" is matched as "/privacy"
  const location = useLocation()
  const routed = { ...location, pathname: stripLang(location.pathname) }
  return (
    <div style={{ position: 'relative' }}>
      <ScrollProgress />
      <ScrollToTop />
      <RouteMeta />
      <LangSuggest />
      <Nav />
      <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
      <Routes location={routed}>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/privacy-app" element={<PrivacyApp />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/design" element={<DesignSystem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}
