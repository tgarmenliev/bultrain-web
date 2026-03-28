import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const screenshots = [
  { id: 'schedule', label: 'Разписание', bg: '#1a1a2e' },
  { id: 'station', label: 'Табло на живо', bg: '#0f1b2a' },
  { id: 'alarm', label: 'Умна аларма', bg: '#1a1220' },
  { id: 'journey', label: 'Детайли за пътуване', bg: '#0a1a15' },
  { id: 'search', label: 'Търсене на гара', bg: '#1a1510' },
]

function ScreenshotCard({ screenshot, index }) {
  return (
    <motion.div
      id={`screenshot-${screenshot.id}`}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 280,
        height: 606,
        borderRadius: 40,
        overflow: 'hidden',
        border: '5px solid #1c1c1e',
        cursor: 'default',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.5)',
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Try to load real asset first, else show styled placeholder */}
      <img
        src={`/assets/screenshot-${screenshot.id}.png`}
        alt={`BulTrain ${screenshot.label} screen`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
      />
      {/* Placeholder fallback */}
      <div
        style={{
          display: 'none',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(160deg, ${screenshot.bg} 0%, #0a0a14 100%)`,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: 24,
        }}
      >
        {/* iOS-style top notch */}
        <div style={{
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80,
          height: 24,
          background: '#000',
          borderRadius: 20,
        }} />

        {/* Animated skeleton lines */}
        <div style={{ width: '100%', marginTop: 60 }}>
          {[100, 70, 85, 60, 75, 50, 90].map((w, i) => (
            <motion.div
              key={i}
              style={{
                height: 8,
                width: `${w}%`,
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 4,
                marginBottom: 10,
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>

        <div style={{
          position: 'absolute',
          bottom: 40,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          textAlign: 'center',
        }}>
          {screenshot.label}
          <div style={{ color: 'rgba(255,255,255,0.1)', fontWeight: 400, letterSpacing: 0, textTransform: 'none', marginTop: 4 }}>
            /assets/screenshot-{screenshot.id}.png
          </div>
        </div>

        {/* Subtle gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 60%, rgba(10,132,255,0.06) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Always visible glow frame on hover */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 40,
          border: '1px solid rgba(10,132,255,0)',
          pointerEvents: 'none',
        }}
        whileHover={{ borderColor: 'rgba(10,132,255,0.4)' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function Screenshots() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="screenshots" className="section" style={{ overflow: 'hidden' }}>
      <div className="orb" style={{ width: 900, height: 900, top: '10%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.35) 0%, transparent 60%)' }} />
      <div className="orb" style={{ width: 600, height: 600, bottom: '-20%', left: '-20%', background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 60%)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          style={{ marginBottom: 56, maxWidth: 600 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>
            Галерия
          </span>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>
            Създадено с мисъл<br />
            <span className="gradient-text">за всеки пътуващ.</span>
          </h2>
          <p className="section-subheading">
            Всеки екран е проектиран с мисъл за удобство и яснота — от късните нощни пътувания до ранните сутрешни преходи.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed horizontal scroll */}
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'visible',
          paddingBottom: '64px', /* Increased to prevent clipping of shadows */
          paddingTop: '24px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
        }}
        className="scroll-container"
      >
        <div
          className="screenshots-track"
          style={{
            display: 'flex',
            gap: 32,
            padding: '0 24px',
            alignItems: 'center',
          }}
        >
          {screenshots.map((s, i) => (
            <div key={s.id} className={`screenshot-wrapper sw-${i}`} style={{ scrollSnapAlign: 'center', flexShrink: 0 }}>
              <ScreenshotCard screenshot={s} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scroll-container::-webkit-scrollbar { display: none; }
        .scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
        @media (min-width: 900px) {
          .screenshots-track {
            margin: 0 auto;
            width: max-content;
          }
          .sw-1, .sw-3 {
            margin-top: 60px;
          }
        }
        @media (max-width: 899px) {
          .screenshots-track {
            padding-right: calc(50vw - 140px) !important; 
            padding-left: calc(50vw - 140px) !important;
          }
        }
      `}</style>
    </section>
  )
}
