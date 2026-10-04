import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './site/Nav'
import Hero from './site/Hero'
import LiveNetwork from './site/LiveNetwork'
import Tour from './site/Tour'
import Promises from './site/Promises'
import Press from './site/Press'
import Maker from './site/Maker'
import SupportSection from './site/SupportSection'
import Footer from './site/Footer'
import DesignSystem from './site/DesignSystem'
import ScrollProgress from './components/ScrollProgress'
import Privacy from './pages/Privacy'
import PrivacyApp from './pages/PrivacyApp'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function Home() {
  return (
    <main>
      <Hero />
      <LiveNetwork />
      <Tour />
      <Promises />
      <Press />
      <Maker />
      <SupportSection />
    </main>
  )
}

// New page -> top. A hash link (also from another page) -> that section.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const target = hash.length > 1 ? document.getElementById(hash.slice(1)) : null
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div style={{ position: 'relative' }}>
      <ScrollProgress />
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/privacy-app" element={<PrivacyApp />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/design" element={<DesignSystem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}
