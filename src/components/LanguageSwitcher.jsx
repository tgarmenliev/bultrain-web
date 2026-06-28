import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const OPTIONS = [
  { code: 'bg', label: 'BG' },
  { code: 'en', label: 'EN' },
]

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        padding: 3,
        borderRadius: 100,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--color-border)',
      }}
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.code
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            aria-pressed={active}
            style={{
              position: 'relative',
              padding: '5px 12px',
              borderRadius: 100,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.02em',
              color: active
                ? 'var(--color-text-primary)'
                : 'var(--color-text-muted)',
              transition: 'color 0.2s ease',
              zIndex: 1,
            }}
          >
            {active && (
              <motion.span
                layoutId="lang-switch-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 100,
                  background: 'var(--color-accent-glow)',
                  border: '1px solid var(--color-border-accent)',
                  zIndex: -1,
                }}
              />
            )}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
