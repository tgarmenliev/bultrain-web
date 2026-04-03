import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { id: 'nav-features', href: '#features', label: 'Функции' },
  { id: 'nav-screenshots', href: '#screenshots', label: 'Галерия' },
  { id: 'nav-about', href: '#about', label: 'Зад проекта' },
  { id: 'nav-support', href: '#support', label: 'Подкрепа' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (y) => setScrolled(y > 40))
  }, [scrollY])

  return (
    <motion.header
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 0' : '20px 0',
        transition: 'padding 0.3s ease',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="container">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a
            id="nav-logo"
            href="#"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
          >
            <img 
              src="/favicon.svg" 
              alt="BulTrain Logo" 
              style={{
                width: 36,
                height: 36,
                borderRadius: '25%',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(10,132,255,0.35)',
              }}
            />
            <span style={{
              fontWeight: 800,
              fontSize: 17,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}>
              BulTrain
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-links">
            {navLinks.map(link => (
              <a
                key={link.id}
                id={link.id}
                href={link.href}
                style={{
                  padding: '8px 16px',
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.target.style.color = 'var(--color-text-primary)'
                  e.target.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'var(--color-text-secondary)'
                  e.target.style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              id="nav-cta"
              href="https://apps.apple.com/us/app/bultrain-train-schedules-bg/id6759790703"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: 13, padding: '10px 20px' }}
            >
              Свали безплатно
            </a>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: '1px solid var(--color-border)',
                borderRadius: 8,
                padding: '8px',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
              }}
              className="mobile-toggle"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 12,
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 16,
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </motion.header>
  )
}
