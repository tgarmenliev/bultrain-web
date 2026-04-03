import { motion } from 'framer-motion'
import { ArrowRight, Coffee, Train, MapPin, Clock, Wifi, ChevronLeft, SlidersHorizontal, TrainFront, CalendarDays, Ticket, BookOpen, AlertTriangle } from 'lucide-react'

// Apple App Store SVG badge (official proportions)
function AppStoreBadge() {
  return (
    <a
      id="hero-appstore"
      href="https://apps.apple.com/us/app/bultrain-train-schedules-bg/id6759790703"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '11px 20px',
          background: '#000',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 14,
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        {/* Apple logo */}
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        <div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', fontWeight: 500, letterSpacing: '0.04em', lineHeight: 1, textTransform: 'uppercase' }}>
            Свали от
          </div>
          <div style={{ fontSize: 16, color: '#fff', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            App Store
          </div>
        </div>
      </motion.div>
    </a>
  )
}

function GooglePlayBadge() {
  return (
    <a
      id="hero-googleplay"
      href="https://play.google.com/store/apps/details?id=com.bultrain.vlak_app_test"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '11px 20px',
          background: '#000',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 14,
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        {/* High-quality official Google Play logo */}
        <img 
          src="https://www.vectorlogo.zone/logos/google_play/google_play-icon.svg" 
          alt="Google Play" 
          style={{ width: 22, height: 22 }}
        />
        <div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', fontWeight: 500, letterSpacing: '0.04em', lineHeight: 1, textTransform: 'uppercase' }}>
            ПРЕДЛАГА СЕ В
          </div>
          <div style={{ fontSize: 16, color: '#fff', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            Google Play
          </div>
        </div>
      </motion.div>
    </a>
  )
}

// Floating iPhone mockup with app UI preview
function PhoneMockup() {
  const trains = [
    { time: '16:49', dest: 'Волуяк', type: 'КПВ 10215', status: 'НАВРЕМЕ', color: '#22c55e' },
    { time: '17:08', dest: 'Пловдив', type: 'БВ 1691', status: 'НАВРЕМЕ', color: '#22c55e' },
    { oldTime: '17:43', time: '18:04', dest: 'Варна', type: 'БВ 8650', status: '+21 МИН', color: '#ef4444' },
    { time: '17:27', dest: 'Костенец', type: 'БВ 10224', status: 'НАВРЕМЕ', color: '#22c55e' },
    { time: '17:31', dest: 'Враца', type: 'БВ 20104', status: 'НАВРЕМЕ', color: '#22c55e' },
    { time: '17:38', dest: 'Волуяк', type: 'БВ 10209', status: 'НАВРЕМЕ', color: '#22c55e' },
  ]

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Glow behind phone */}
      <div style={{
        position: 'absolute',
        width: '70%',
        height: '60%',
        bottom: -20,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse, rgba(10,132,255,0.3) 0%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      {/* Phone frame */}
      <motion.div
        style={{
          width: 280,
          height: 606,
          borderRadius: 48,
          background: '#090a10', // exact background match
          border: '2px solid rgba(255,255,255,0.12)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.04)',
            '0 60px 120px rgba(0,0,0,0.7)',
            'inset 0 1px 0 rgba(255,255,255,0.1)',
          ].join(', '),
          position: 'relative',
          overflow: 'hidden',
          rotate: -4,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#090a10' }}>
          
          {/* Status bar */}
          <div style={{ padding: '14px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 20 }}>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>16:58</span>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <Wifi size={12} color="#fff" strokeWidth={2.5} />
              <div style={{ width: 14, height: 10, background: 'transparent', border: '1px solid #fff', borderRadius: 3, position: 'relative' }}>
                 <div style={{ position: 'absolute', left: 1, top: 1, bottom: 1, width: 9, background: '#fff', borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 26,
            background: '#000',
            borderRadius: 20,
            zIndex: 10,
          }} />

          {/* Header */}
          <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#1c1f2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={18} color="#94a3b8" />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '0.05em', margin: 0 }}>С О Ф И Я</h3>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#1c1f2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SlidersHorizontal size={16} color="#94a3b8" />
            </div>
          </div>

          {/* Toggle */}
          <div style={{ margin: '8px 20px 16px', display: 'flex', background: 'transparent', borderRadius: 10, border: '1px solid #1e293b', padding: 2 }}>
            <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', borderRadius: 8, background: '#1e293b', color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>Заминаващи</div>
            <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', color: '#3b82f6', fontSize: 12, fontWeight: 600 }}>Пристигащи</div>
          </div>

          {/* Table Header */}
          <div style={{ display: 'flex', padding: '0 20px 8px', fontSize: 9, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div style={{ width: 77 }}>ВРЕМЕ</div>
            <div style={{ flex: 1 }}>От</div>
            <div style={{ width: 60, textAlign: 'right' }}>СТАТУС</div>
          </div>

          {/* Train List */}
          <div style={{ flex: 1, overflow: 'visible', display: 'flex', flexDirection: 'column', gap: 8, padding: '0 12px 90px' }}>
            {trains.map((train, i) => (
              <motion.div
                key={i}
                style={{
                  background: '#131620',
                  borderRadius: 12,
                  border: train.oldTime ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255,255,255,0.06)',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: 65, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {train.oldTime ? (
                    <>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textDecoration: 'line-through' }}>{train.oldTime}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#ef4444', letterSpacing: '-0.02em', lineHeight: 1 }}>{train.time}</div>
                    </>
                  ) : (
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>{train.time}</div>
                  )}
                </div>
                
                <div style={{ flex: 1, paddingLeft: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#f8fafc', letterSpacing: '0.02em', marginBottom: 2 }}>{train.dest}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrainFront size={11} style={{ color: '#3b82f6' }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8' }}>{train.type}</span>
                  </div>
                </div>

                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 4, 
                    padding: '4px 6px', borderRadius: 4, 
                    background: train.color === '#22c55e' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.15)',
                    border: train.color === '#22c55e' ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(239,68,68,0.3)',
                  }}>
                    {train.color === '#22c55e' ? (
                      <div style={{ width: 5, height: 5, borderRadius: 2.5, background: '#22c55e' }} />
                    ) : (
                      <AlertTriangle size={9} color="#ef4444" />
                    )}
                    <span style={{ fontSize: 8, fontWeight: 800, color: train.color, letterSpacing: '0.05em' }}>{train.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom tab bar */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 84,
            background: 'linear-gradient(180deg, rgba(9,10,16,0) 0%, rgba(9,10,16,0.9) 20%, rgba(9,10,16,1) 100%)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            paddingTop: 10,
            backdropFilter: 'blur(10px)',
          }}>
            {[
              { Icon: CalendarDays, label: 'Разписание', active: false },
              { Icon: Clock, label: 'Табло', active: true },
              { Icon: Ticket, label: 'Пътувания', active: false },
              { Icon: BookOpen, label: 'Наръчник', active: false },
            ].map(({ Icon, label, active }, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 44,
                  height: 28,
                  background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
                  borderRadius: 14,
                }}>
                  <Icon size={18} style={{ color: active ? '#3b82f6' : '#64748b' }} strokeWidth={active ? 2.5 : 2} />
                </div>
                <span style={{ fontSize: 9, color: active ? '#3b82f6' : '#64748b', fontWeight: 600 }}>
                  {label}
                </span>
              </div>
            ))}
            
            {/* iOS home indicator */}
            <div style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 4,
              background: 'rgba(255,255,255,0.4)',
              borderRadius: 4,
            }} />
          </div>
        </div>
      </motion.div>

      {/* Floating notification card */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 80,
          right: -30,
          background: 'rgba(17,17,24,0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
          minWidth: 180,
          zIndex: 30,
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'var(--color-accent-glow)',
          border: '1px solid var(--color-border-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <MapPin size={16} style={{ color: 'var(--color-accent)' }} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            Пристигане в Пловдив
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
            Умна аларма · след 2 спирки
          </div>
        </div>
      </motion.div>

      {/* Floating status chip */}
      <motion.div
        style={{
          position: 'absolute',
          top: 60,
          left: -20,
          background: 'rgba(17,17,24,0.95)',
          border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: 100,
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
          zIndex: 30,
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <motion.div
          style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#22c55e' }}>На живо</span>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
        paddingBottom: 80,
      }}
    >
      {/* Background orbs */}
      <div className="orb orb-orange" style={{ width: 700, height: 700, top: -200, right: -200 }} />
      <div className="orb orb-blue" style={{ width: 500, height: 500, bottom: -100, left: -100 }} />

      {/* Grid lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }} className="hero-grid">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Logo Image
            <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
              <img 
                src="/assets/logo-no-bg.png" 
                alt="BulTrain Icon" 
                style={{ 
                  width: 90, 
                  height: 90, 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 12px 24px rgba(10, 132, 255, 0.6))'
                }} 
              />
            </motion.div> */}

            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="tag" style={{ marginBottom: 28 }}>
                <Wifi size={11} />
                Всички влакове на едно място
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                color: 'var(--color-text-primary)',
                marginBottom: 24,
                margin: 0,
              }}
            >
              Пътувай умно.<br />
              И не изпускай<br />
              <span className="gradient-text">гарата си.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: 'var(--color-text-secondary)',
                marginBottom: 40,
                marginTop: 24,
                maxWidth: 440,
              }}
            >
              Разписания и табла на БДЖ в реално време. Умни аларми по локация, които те известяват преди твоята спирка — създадено специално за теб.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="hero-buttons"
              style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}
            >
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>

              <a
                id="hero-support"
                href="#support"
                className="btn btn-ghost"
                style={{ gap: 8, padding: '12px 24px', fontSize: '14px' }}
              >
                <Coffee size={16} />
                Подкрепи проекта
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="hero-social-proof"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 20,
                marginTop: 48,
                paddingTop: 32,
                borderTop: '1px solid var(--color-border)',
              }}
            >
              {[
                { value: 'Безплатно', label: 'за да пътуваш приятно' },
                { value: 'Офлайн', label: 'за да пътуваш спокойно' },
                { value: 'iOS & Android', label: 'за да пътуваш лесно' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 500, marginTop: 2 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Phone mockup */}
          <motion.div
            className="hero-mockup-container"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #hero {
            padding-top: 140px !important;
          }
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 60px !important;
            text-align: center;
            width: 100%;
            overflow: hidden;
          }
          .hero-grid > div {
            width: 100%;
          }
          .hero-grid p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hero-buttons {
            justify-content: center !important;
            align-items: center !important;
          }
          .hero-buttons > div {
            justify-content: center !important;
          }
          .hero-social-proof {
            justify-content: center !important;
          }
        }
        @media (max-width: 400px) {
          .hero-mockup-container {
            transform: scale(0.8);
            transform-origin: top center;
          }
          .hero-grid p {
            font-size: 15px !important;
          }
        }
      `}</style>
    </section>
  )
}
