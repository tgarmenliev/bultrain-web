import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Trophy, Heart, Star, Award, Book } from 'lucide-react'

const achievements = [
  {
    id: 'tues',
    icon: GraduationCap,
    label: 'Завършил ТУЕС',
    detail: 'Технологично училище "Електронни системи"',
    color: '#3b82f6',
  },
  {
    id: 'tu',
    icon: Book,
    label: 'Студент в Технически университет - София',
    detail: 'Факултет по приложна математика и информатика',
    color: '#3bf641ff',
  },
  {
    id: 'hacktues',
    icon: Trophy,
    label: 'Победител в HackTUES 10',
    detail: 'Най-големият ученически хакатон на Балканите',
    color: '#f59e0b',
  },
  {
    id: 'teenovator',
    icon: Heart,
    label: 'Доброволец на Тийноватор',
    detail: 'Инициатива, която дава първи стъпки в предприемачеството на ученици',
    color: '#ec4899',
  },
  {
    id: '20under20',
    icon: Star,
    label: '"20 под 20" випуск 2025',
    detail: 'Съвместна инициатива на "Капитал" и Младежкия съвет към американския посланик',
    color: '#8b5cf6',
  },
  {
    id: 'bait',
    icon: Award,
    label: 'Номинация за наградите на БАИТ',
    detail: 'За BulTrain в категория "Младежки награди"',
    color: '#0A84FF',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

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
                  alt="BulTrain creator"
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
              Зад проекта
            </span>

            <h2 className="section-heading" style={{ marginBottom: 8 }}>
              Направено от<br />
              <span className="gradient-text">студент. За всички.</span>
            </h2>

            <p style={{
              fontSize: '17px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 16,
              marginTop: 24,
            }}>
              Тихомир Гърменлиев
            </p>

            <p style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              marginBottom: 32,
            }}>
              BulTrain не е просто поредното приложение, а лична мисия за модернизиране на железопътния транспорт в България. Проектът започна като смела идея и прерасна в цялостна екосистема – от мобилно приложение до собственоръчно разработен хардуерен e-ink дисплей за гарите. Всичко това, създадено с една цел: по-добро изживяване за всеки пътуващ.
            </p>

            {/* Achievements */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {achievements.map((a, i) => {
                const Icon = a.icon
                return (
                  <motion.div
                    key={a.id}
                    id={`achievement-${a.id}`}
                    className="achievement-pill"
                    title={a.detail}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon size={13} style={{ color: a.color, flexShrink: 0 }} />
                    <span>{a.label}</span>
                  </motion.div>
                )
              })}
            </div>
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
