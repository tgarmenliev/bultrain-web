import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Train, Bell, Server, Moon } from 'lucide-react'

const cards = [
  {
    id: 'smart-alarms',
    title: 'Умни аларми по локация',
    description: 'Избери маршрут, запази пътуване и BulTrain ще ти изпрати известие преди да пристигнеш. Вече няма нужда да следиш всяка гара, просто можеш да се насладиш на пътуването, а за останалото ще ти помогне приложението.',
    icon: Bell,
    size: 'large',
    accent: true,
    gridArea: 'alarm',
  },
  {
    id: 'live-boards',
    title: 'Електронни Табла на живо',
    description: 'Заминаващи и пристигащи влакове в реално време от всяка гара в България с информация за закъснения — като истинско табло, но в джоба ти.',
    icon: Server,
    size: 'medium',
    gridArea: 'live',
  },
  {
    id: 'offline-schedules',
    title: 'Пълно разписание офлайн',
    description: 'Достъп до разписанието без връзка с интернет за твоето запазено пътуване. Запази веднъж и пътувай спокойно.',
    icon: Train,
    size: 'medium',
    gridArea: 'offline',
  },
  {
    id: 'dark-mode',
    title: 'Удобен тъмен режим',
    description: 'Красиво проектиран за нощни пътувания. Всеки детайл е оптимизиран за комфорт при слаба светлина. Всичко е направено така, че да ти е удобно.',
    icon: Moon,
    size: 'small',
    gridArea: 'dark',
  },
]

function BentoCard({ card, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const Icon = card.icon

  return (
    <motion.div
      ref={ref}
      id={`feature-${card.id}`}
      className="bento-card"
      style={{ gridArea: card.gridArea }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {card.accent && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          background: 'radial-gradient(circle, rgba(10,132,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
          pointerEvents: 'none',
        }} />
      )}

      <div className="icon-box">
        <Icon size={20} strokeWidth={1.5} />
      </div>

      <h3 style={{
        fontSize: card.size === 'large' ? '1.5rem' : '1.15rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--color-text-primary)',
        marginBottom: '10px',
        lineHeight: 1.2,
      }}>
        {card.title}
      </h3>

      <p style={{
        fontSize: '14px',
        lineHeight: 1.7,
        color: 'var(--color-text-secondary)',
        margin: 0,
      }}>
        {card.description}
      </p>

      {card.accent && (
        <div style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-accent)',
                opacity: 0.3 + i * 0.35,
              }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="section">
      <div className="orb" style={{ width: 800, height: 800, top: '-10%', left: '-20%', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.35) 0%, transparent 60%)' }} />
      <div className="orb" style={{ width: 700, height: 700, bottom: '-15%', right: '-15%', background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 60%)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          style={{ marginBottom: 64, maxWidth: 600 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>
            Функции
          </span>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>
            Всичко, от което се нуждаеш при пътуване<br />
            <span className="gradient-text">по релси.</span>
          </h2>
          <p className="section-subheading">
            BulTrain обединява всички инструменти, от които се нуждае всеки пътуващ с влак в България — в едно красиво приложение.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateAreas: `
              "alarm alarm live"
              "offline dark dark"
            `,
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '16px',
          }}
          className="bento-grid"
        >
          {cards.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-areas:
              "alarm"
              "live"
              "offline"
              "dark" !important;
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
