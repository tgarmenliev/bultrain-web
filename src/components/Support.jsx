import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Coffee, CreditCard, Mail, ExternalLink } from 'lucide-react'

export default function Support() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="support" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            position: 'relative',
            borderRadius: 28,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(10,132,255,0.3) 0%, rgba(59,130,246,0.15) 50%, rgba(10,132,255,0.1) 100%)',
          }}
        >
          <div style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 26,
            padding: '64px 56px',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}>
            {/* Background glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              background: 'radial-gradient(ellipse, rgba(10,132,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <span className="tag" style={{ marginBottom: 24, display: 'inline-flex' }}>
              Подкрепи проекта
            </span>

            <h2
              className="section-heading"
              style={{ marginBottom: 20, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}
            >
              BulTrain е безплатен.<br />
              <span className="gradient-text">Твоята подкрепа го поддържа.</span>
            </h2>

            <p
              className="section-subheading"
              style={{ maxWidth: 500, margin: '0 auto 48px', fontSize: '16px' }}
            >
              Това е проект, създаден със страст, не с цел печалба. Ако BulTrain те е спасил от изпуснат влак или спирка, или е направил пътуването ти по-приятно, можеш да подкрепиш развитието му. Благодаря!
            </p>

            {/* Support buttons */}
            <div style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 56,
            }}>
              <motion.a
                id="support-coffee"
                href="https://www.buymeacoffee.com/tgarmenliev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ gap: 10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Coffee size={18} />
                Почерпи ме кафе
              </motion.a>

              <motion.a
                id="support-revolut"
                href="https://revolut.me/tgarmenliev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ gap: 10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CreditCard size={18} />
                Подкрепи чрез Revolut
                <ExternalLink size={14} style={{ opacity: 0.5 }} />
              </motion.a>
            </div>

            <hr className="divider" style={{ maxWidth: 400, margin: '0 auto 40px' }} />

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                Свържи се с мен
              </p>
              <a
                id="contact-email"
                href="mailto:bultrain.app@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-text-primary)'}
              >
                <Mail size={16} style={{ color: 'var(--color-accent)' }} />
                bultrain.app@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #support .container > div > div {
            padding: 40px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
