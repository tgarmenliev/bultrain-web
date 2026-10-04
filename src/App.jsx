import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './site/Nav'
import Hero from './site/Hero'
import LiveNetwork from './site/LiveNetwork'
import Tour from './site/Tour'
import Promises from './site/Promises'
import Footer from './site/Footer'
import DesignSystem from './site/DesignSystem'
import MediaCoverage from './components/MediaCoverage'
import About from './components/About'
import Support from './components/Support'
import ScrollProgress from './components/ScrollProgress'
import Privacy from './pages/Privacy'
import PrivacyApp from './pages/PrivacyApp'
import Terms from './pages/Terms'
import Contact from './pages/Contact'

// Sections not yet migrated to the new design system keep a fixed dark theme,
// so the page stays coherent in light mode while we rebuild them one by one.
function Legacy({ children }) {
  return <div data-theme="dark" className="legacy">{children}</div>
}

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LiveNetwork />
        <Tour />
        <Promises />
        <Legacy>
          <MediaCoverage />
          <About />
          <Support />
        </Legacy>
      </main>
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div style={{ position: 'relative' }}>
      <ScrollProgress />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<><Nav /><DesignSystem /></>} />
        <Route path="/privacy" element={<Legacy><Privacy /></Legacy>} />
        <Route path="/privacy-app" element={<Legacy><PrivacyApp /></Legacy>} />
        <Route path="/terms" element={<Legacy><Terms /></Legacy>} />
        <Route path="/contact" element={<Legacy><Contact /></Legacy>} />
      </Routes>
      <Footer />
    </div>
  )
}
