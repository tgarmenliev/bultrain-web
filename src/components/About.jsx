import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Trophy, Heart, Star, Award, Book, User, Globe, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

// id/icon/color are structural; label + detail are localized under
// about.achievements, keyed by id.
const achievementConfig = [
  { id: 'tues', icon: GraduationCap, color: '#3b82f6' },
  { id: 'tu', icon: Book, color: '#3bf641ff' },
  { id: 'hacktues', icon: Trophy, color: '#f59e0b' },
  { id: 'teenovator', icon: Heart, color: '#ec4899' },
  { id: '20under20', icon: Star, color: '#8b5cf6' },
  { id: 'bait', icon: Award, color: '#0A84FF' },
  { id: 'softuniada', icon: Sparkles, color: '#f59f0ba9' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  return (
    <section id="about" className="section">
      <div className="orb" style={{ width: 700, height: 700, top: '-15%', right: '-20%', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.3) 0%, transparent 60%)' }} />
      <div className="orb" style={{ width: 800, height: 800, bottom: '-15%', left: '-20%', background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 60%)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 80,
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left — Avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div style={{ position: 'relative' }}>
              {/* Decorative rings */}
              <div style={{
                position: 'absolute',
                inset: -24,
                borderRadius: '50%',
                border: '1px solid rgba(10,132,255,0.1)',
              }} />
              <div style={{
                position: 'absolute',
                inset: -48,
                borderRadius: '50%',
                border: '1px solid rgba(10,132,255,0.05)',
              }} />

              {/* Avatar */}
              <div style={{
                width: '100%',
                aspectRatio: '1/1',
                maxWidth: 340,
                margin: '0 auto',
                borderRadius: 28,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
              }}>
                {/* Try to load the creator photo first */}
                <img
                  src="/assets/creator-photo.jpg"
                  alt={t.about.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                {/* Fallback initials placeholder */}
                <div style={{
                  display: 'none',
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'var(--color-accent-glow)',
                    border: '1px solid var(--color-border-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    fontWeight: 800,
                    color: 'var(--color-accent)',
                  }}>
                    TG
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
                    /assets/creator-photo.jpg
                  </span>
                </div>

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="tag" style={{ marginBottom: 24, display: 'inline-flex' }}>
              {t.about.tag}
            </span>

            <h2 className="section-heading" style={{ marginBottom: 8 }}>
              {t.about.headingLine1}<br />
              <span className="gradient-text">{t.about.headingAccent}</span>
            </h2>

            <p style={{
              fontSize: '17px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 16,
              marginTop: 24,
            }}>
              {t.about.name}
            </p>

            <p style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              marginBottom: 32,
            }}>
              {t.about.bio}
            </p>

            {/* Achievements */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {achievementConfig.map((a, i) => {
                const Icon = a.icon
                const copy = t.about.achievements[a.id]
                return (
                  <motion.div
                    key={a.id}
                    id={`achievement-${a.id}`}
                    className="achievement-pill"
                    title={copy.detail}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon size={13} style={{ color: a.color, flexShrink: 0 }} />
                    <span>{copy.label}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* Social Buttons */}
            <motion.div 
              style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <a 
                href="https://www.linkedin.com/in/tgarmenliev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-ghost"
                style={{ padding: '10px 20px', fontSize: '14px' }}
              >
                <User size={16} />
                LinkedIn
              </a>
              <a 
                href="https://www.facebook.com/tgarmenliev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-ghost"
                style={{ padding: '10px 20px', fontSize: '14px' }}
              >
                <Globe size={16} />
                Facebook
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
