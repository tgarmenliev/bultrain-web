import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Smartphone, BellRing, SearchCheck, WifiOff, Clock, TrainFront } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useSpotlight } from '../hooks/useSpotlight'

const EASE = [0.25, 0.46, 0.45, 0.94]
const APP_STORE = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'

// A ready-made device mockup (transparent WebP, already tilted, with its own
// frame). If this file exists it is shown as-is; if not, the coded lock screen
// below is used instead.
const SCREENSHOT_SRC = '/assets/screenshot-live-activity.webp'

// Icons for the three feature rows, in the same order as whatsNew.features.
const FEATURE_ICONS = [Smartphone, BellRing, SearchCheck]

/* -------------------------------------------------------------------------- */
/* Lock screen — coded stand-in used until the real screenshot exists         */
/* -------------------------------------------------------------------------- */

function LockScreen({ m }) {
  return (
    <div className="ls" aria-hidden="true">
      <div className="ls-island" />

      <div className="ls-top">
        <span className="ls-date">{m.date}</span>
        <span className="ls-time">{m.time}</span>
      </div>

      <div className="la-card">
        <div className="la-head">
          <span className="la-app">
            <span className="la-app-icon">
              <TrainFront size={11} strokeWidth={2.4} />
            </span>
            <span className="la-train">{m.train}</span>
            <span className="la-route">
              {m.from} <i>→</i> {m.to}
            </span>
          </span>
          <span className="la-live" />
        </div>

        <div className="la-main">
          <div className="la-delay">
            <b>{m.late}</b>
            <small>{m.lateLabel}</small>
          </div>
          <div className="la-arrive">
            <small>{m.arrives}</small>
            <b>{m.arrivesAt}</b>
            <em>{m.arrivesIn}</em>
          </div>
        </div>

        <div className="la-progress">
          <span className="la-track">
            <span className="la-fill" />
            <span className="la-marker">
              <TrainFront size={10} strokeWidth={2.6} />
            </span>
          </span>
          <span className="la-ends">
            <i>{m.from}</i>
            <i>{m.to}</i>
          </span>
        </div>
      </div>

      <div className="ls-buttons">
        <span />
        <span />
      </div>
      <div className="ls-home" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Phone stage — tilted, top dissolves into the page                          */
/* -------------------------------------------------------------------------- */

function PhoneStage({ m, alt }) {
  const [hasShot, setHasShot] = useState(true)

  return (
    <div className="wn-stage">
      <div className="wn-glow" />

      <motion.div
        className="wn-float"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {hasShot ? (
          <img
            src={SCREENSHOT_SRC}
            alt={alt}
            onError={() => setHasShot(false)}
            className="wn-mockup"
            draggable={false}
          />
        ) : (
          <div className="wn-tilt">
            <div className="wn-phone">
              <LockScreen m={m} />
            </div>
          </div>
        )}
      </motion.div>

      {/* Progressive blur over the top of the phone, fading to nothing. */}
      <div className="wn-blur" aria-hidden="true" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Bottom cards                                                               */
/* -------------------------------------------------------------------------- */

function InfoCard({ index, className = '', children }) {
  const ref = useSpotlight()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={`bento-card wn-card ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function WhatsNew() {
  const { t } = useLanguage()
  const w = t.whatsNew
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="whats-new" className="section wn">
      <div className="orb" style={{ width: 800, height: 800, top: '-5%', left: '-25%', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.28) 0%, transparent 60%)' }} />
      <div className="orb" style={{ width: 600, height: 600, bottom: '-10%', right: '-15%', background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 60%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="wn-grid">
          {/* Copy */}
          <motion.div
            ref={ref}
            className="wn-copy"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>
              {w.tag}
            </span>

            <h2 className="section-heading" style={{ marginBottom: 16 }}>
              {w.headingLine1}
              <br />
              <span className="gradient-text">{w.headingAccent}</span>
            </h2>

            <p className="section-subheading" style={{ maxWidth: 520 }}>
              {w.subheading}
            </p>

            <ul className="wn-list">
              {w.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i]
                return (
                  <motion.li
                    key={f.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: EASE }}
                  >
                    <span className="icon-box wn-icon">
                      <Icon size={19} strokeWidth={1.6} />
                    </span>
                    <span>
                      <strong>{f.title}</strong>
                      <span>{f.description}</span>
                    </span>
                  </motion.li>
                )
              })}
            </ul>

            <div className="wn-actions">
              <a
                id="whatsnew-cta"
                href={APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ gap: 10 }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {w.cta}
              </a>

              <div className="wn-avail">
                <span className="wn-pill is-live">
                  <i />
                  {w.availability.ios}
                  <em>{w.availability.iosStatus}</em>
                </span>
                <span className="wn-pill">
                  <Clock size={12} />
                  {w.availability.androidSoon}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            className="wn-visual"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <PhoneStage m={w.mock} alt={w.features[0].title} />
          </motion.div>
        </div>

        {/* Trust row — deliberately asymmetric, not three equal boxes */}
        <div className="wn-cards">
          <InfoCard index={0}>
            <span className="wn-label">{w.honesty.label}</span>
            <h3>{w.honesty.title}</h3>
            <p>{w.honesty.text}</p>

          </InfoCard>

          <InfoCard index={1} className="wn-card-alarm">
            <div className="icon-box wn-alarm-icon">
              <WifiOff size={20} strokeWidth={1.5} />
            </div>
            <span className="wn-label">{w.alarm.label}</span>
            <h3>{w.alarm.title}</h3>
            <p>{w.alarm.text}</p>
            <div className="wn-chips">
              {w.alarm.chips.map((c) => (
                <span key={c} className="wn-chip">{c}</span>
              ))}
            </div>
          </InfoCard>
        </div>
      </div>

      <style>{`
        .wn { overflow-x: clip; }

        .wn-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
          gap: 40px;
          align-items: center;
        }
        .wn-grid > * { min-width: 0; }
        .wn-visual { order: -1; display: flex; justify-content: center; width: 100%; }

        /* ---- Copy -------------------------------------------------------- */
        .wn-list {
          list-style: none;
          margin: 40px 0 0;
          padding: 0;
        }
        .wn-list li {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 18px;
          padding: 20px 0;
          border-top: 1px solid var(--color-border);
        }
        .wn-list li:last-child { border-bottom: 1px solid var(--color-border); }
        .wn-icon { margin: 0 !important; }
        .wn-list li > span:last-child { display: flex; flex-direction: column; gap: 5px; }
        .wn-list strong {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
        }
        .wn-list li > span:last-child > span {
          font-size: 14px;
          line-height: 1.65;
          color: var(--color-text-secondary);
        }

        .wn-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px 20px;
          margin-top: 32px;
        }
        .wn-avail { display: flex; flex-wrap: wrap; gap: 8px; }
        .wn-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--color-border);
          background: rgba(255, 255, 255, 0.03);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-secondary);
        }
        .wn-pill em { font-style: normal; font-weight: 500; color: var(--color-text-muted); }
        .wn-pill.is-live em { color: #22c55e; }
        .wn-pill i {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e;
          animation: wn-pulse 2s ease-in-out infinite;
        }

        /* ---- Phone ------------------------------------------------------- */
        .wn-stage {
          position: relative;
          width: 100%;
          max-width: 460px;
          height: 690px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }
        .wn-glow {
          position: absolute;
          left: 50%; bottom: 4%;
          width: 78%; height: 62%;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(10,132,255,0.32) 0%, transparent 70%);
          filter: blur(34px);
          pointer-events: none;
        }
        .wn-float { position: relative; z-index: 1; }
        .wn-tilt {
          transform: perspective(1600px) rotateY(-14deg) rotateX(4deg) rotateZ(3.5deg);
          transform-origin: 50% 70%;
        }
        .wn-phone {
          position: relative;
          width: 312px;
          height: 656px;
          border-radius: 48px;
          overflow: hidden;
          border: 5px solid #1c1c1e;
          background: #090a10;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 40px 90px rgba(0,0,0,0.6);
          /* The top of the device dissolves into the page. */
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 52%);
          mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 52%);
        }
        /* Ready-made mockup: free-standing, no extra frame or tilt. The image
           is square with transparent margins, so it is drawn wider than its
           column and centred; the top dissolves into the page. */
        .wn-mockup {
          display: block;
          flex-shrink: 0;
          width: 720px;
          max-width: none;
          height: auto;
          margin: -28px 0 -22px;
          user-select: none;
          -webkit-mask-image: linear-gradient(to bottom, transparent 3%, rgba(0,0,0,0.4) 24%, #000 54%);
          mask-image: linear-gradient(to bottom, transparent 3%, rgba(0,0,0,0.4) 24%, #000 54%);
        }

        .wn-blur {
          position: absolute;
          inset: 0 0 auto 0;
          height: 52%;
          z-index: 2;
          pointer-events: none;
          -webkit-backdrop-filter: blur(9px);
          backdrop-filter: blur(9px);
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.55) 45%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.55) 45%, transparent 100%);
        }

        /* ---- Coded lock screen ------------------------------------------ */
        .ls {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          background:
            radial-gradient(120% 60% at 80% 0%, rgba(10,132,255,0.38) 0%, transparent 60%),
            linear-gradient(175deg, #0d1b36 0%, #0e1224 48%, #07080f 100%);
          font-family: system-ui, -apple-system, 'Inter', sans-serif;
          color: #fff;
        }
        .ls-island {
          position: absolute; top: 10px; left: 50%;
          transform: translateX(-50%);
          width: 88px; height: 25px; border-radius: 20px; background: #000;
        }
        .ls-top { margin-top: 70px; text-align: center; display: flex; flex-direction: column; gap: 2px; }
        .ls-date { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.78); }
        .ls-time {
          font-size: 84px; font-weight: 700; letter-spacing: -0.04em; line-height: 1;
          font-variant-numeric: tabular-nums;
          color: rgba(255,255,255,0.92);
        }

        .la-card {
          margin: auto 12px 14px;
          padding: 14px 15px 13px;
          border-radius: 26px;
          background: rgba(28, 30, 40, 0.86);
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 30px rgba(0,0,0,0.4);
          display: flex; flex-direction: column; gap: 13px;
        }
        .la-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .la-app { display: flex; align-items: center; gap: 7px; min-width: 0; font-size: 11px; font-weight: 600; }
        .la-app-icon {
          width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0;
          background: var(--color-accent);
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .la-train { color: rgba(255,255,255,0.55); font-variant-numeric: tabular-nums; white-space: nowrap; }
        .la-route { color: #fff; white-space: nowrap; }
        .la-route i { font-style: normal; opacity: 0.45; margin: 0 1px; }
        .la-live {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          background: #22c55e;
          animation: wn-pulse 1.8s ease-in-out infinite;
        }

        .la-main { display: flex; align-items: flex-end; justify-content: space-between; }
        .la-delay { display: flex; flex-direction: column; gap: 3px; }
        .la-delay b { font-size: 30px; line-height: 1; font-weight: 800; letter-spacing: -0.03em; color: #f59e0b; font-variant-numeric: tabular-nums; }
        .la-delay small, .la-arrive small { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.5); }
        .la-arrive { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; }
        .la-arrive b { font-size: 21px; line-height: 1.1; font-weight: 700; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
        .la-arrive em { font-style: normal; font-size: 10px; font-weight: 600; color: var(--color-accent); }

        .la-progress { display: flex; flex-direction: column; gap: 7px; }
        .la-track { position: relative; display: block; height: 4px; border-radius: 4px; background: rgba(255,255,255,0.12); }
        .la-fill {
          position: absolute; left: 0; top: 0; bottom: 0; width: 62%;
          border-radius: 4px;
          background: linear-gradient(90deg, rgba(10,132,255,0.55), var(--color-accent));
        }
        .la-marker {
          position: absolute; left: 62%; top: 50%;
          width: 22px; height: 22px; margin: -11px 0 0 -11px;
          border-radius: 50%;
          background: var(--color-accent); color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 3px rgba(28,30,40,0.9);
        }
        .la-marker::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          border: 1.5px solid var(--color-accent);
          animation: wn-ring 2.4s ease-out infinite;
        }
        .la-ends { display: flex; justify-content: space-between; }
        .la-ends i { font-style: normal; font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.45); }

        .ls-buttons { display: flex; justify-content: space-between; padding: 0 30px 34px; }
        .ls-buttons span {
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .ls-home {
          position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
          width: 112px; height: 4px; border-radius: 4px; background: rgba(255,255,255,0.4);
        }

        @keyframes wn-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes wn-ring {
          0% { transform: scale(1); opacity: 0.7; }
          80%, 100% { transform: scale(1.9); opacity: 0; }
        }

        /* ---- Bottom cards ------------------------------------------------ */
        .wn-cards {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 16px;
          margin-top: 56px;
        }
        .wn-card { padding: 32px; }
        .wn-card h3 {
          margin: 6px 0 10px;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--color-text-primary);
        }
        .wn-card p {
          margin: 0;
          max-width: 56ch;
          font-size: 14px;
          line-height: 1.7;
          color: var(--color-text-secondary);
        }
        .wn-card-alarm { display: flex; flex-direction: column; }
        .wn-alarm-icon { position: absolute; top: 26px; right: 26px; margin: 0 !important; }
        .wn-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 26px; }
        .wn-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-accent);
        }

        .wn-chip {
          display: inline-flex; align-items: center;
          padding: 5px 11px; border-radius: 6px; white-space: nowrap;
          font-size: 11px; font-weight: 700; letter-spacing: 0.03em;
          color: var(--color-text-muted);
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--color-border);
        }

        /* ---- Responsive -------------------------------------------------- */
        @media (max-width: 900px) {
          .wn-grid { grid-template-columns: minmax(0, 1fr); gap: 8px; }
          .wn-visual { order: 0; margin-top: 28px; }
          .wn-stage { height: 560px; }
          .wn-mockup { width: 600px; margin: 0 0 -38px; }
          .wn-tilt { transform: perspective(1400px) rotateY(-9deg) rotateX(3deg) rotateZ(3deg); }
          .wn-cards { grid-template-columns: 1fr; margin-top: 24px; }
          .wn-card { padding: 26px; }
        }
        @media (max-width: 420px) {
          .wn-phone { width: 268px; height: 564px; border-radius: 42px; }
          .wn-stage { height: 500px; }
          .wn-mockup { width: 540px; margin: 0 0 -34px; }
          .ls-time { font-size: 74px; }
          .la-delay b { font-size: 27px; }
        }
      `}</style>
    </section>
  )
}
