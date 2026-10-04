import { tokens } from '../design/tokens.mjs'
import { appScreen, screenProps } from '../data/screens'
import { useLanguage } from '../i18n/LanguageContext'
import './design-system.css'

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
const lum = (h) => { const [r, g, b] = [1, 3, 5].map((i) => lin(parseInt(h.slice(i, i + 2), 16))); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }

const PAIRS = [
  ['ink', 'bg'], ['ink2', 'bg'], ['ink3', 'bg'], ['accent', 'bg'], ['onAction', 'action'], ['ok', 'okBg'], ['late', 'lateBg'], ['warn', 'warnBg'],
]

function Panel({ name, theme }) {
  const { lang } = useLanguage()
  const t = tokens[theme]
  const shot = appScreen(theme, lang, ['board', 'results'])
  return (
    <section className="dsx" data-theme={theme}>
      <h2 className="dsx__name">{name}</h2>

      <h3>Цвят</h3>
      <div className="dsx__swatches">
        {Object.entries(t).filter(([, v]) => v.startsWith('#')).map(([k, v]) => (
          <div key={k} className="dsx__sw"><span style={{ background: v }} /><b>{k}</b><i className="tnum">{v}</i></div>
        ))}
      </div>

      <h3>Контраст (WCAG AA = 4,5)</h3>
      <ul className="dsx__contrast">
        {PAIRS.map(([f, b]) => {
          const r = ratio(t[f], t[b])
          return <li key={f + b}><span>{f} / {b}</span><b className={r >= 4.5 ? 'ok' : 'bad'}>{r.toFixed(1)}</b></li>
        })}
      </ul>

      <h3>Типография (Manrope)</h3>
      <p className="display dsx__h1" lang="bg">Пътувай умно.</p>
      <p className="display dsx__h1" lang="en">Travel smarter.</p>
      <p className="dsx__body" lang="bg">Основен текст със стандартни форми: докато ти гледаш през прозореца, закъснението се обновява само.</p>
      <p className="tnum dsx__nums">20:38 &nbsp; 21:00 &nbsp; БВ 8657 &nbsp; 0123456789</p>

      <h3>Бутони и статус</h3>
      <div className="dsx__row">
        <a className="ds-btn ds-btn--primary">Свали безплатно</a>
        <a className="ds-btn ds-btn--ghost">Второстепенно</a>
        <span className="ds-chip ds-chip--ok">Навреме</span>
        <span className="ds-chip ds-chip--late">+5 мин</span>
        <span className="ds-chip ds-chip--warn">Промяна</span>
      </div>

      <h3>Рамка на устройство</h3>
      {shot && <div className="dsx__phone"><div className="ds-device"><img {...screenProps(shot)} sizes="190px" alt="" /></div></div>}
    </section>
  )
}

export default function DesignSystem() {
  return (
    <main className="dsx-page">
      <div className="wrap">
        <h1 className="display dsx-page__title" lang="bg">Дизайн система</h1>
        <p className="dsx-page__lead">Токени, типография и компоненти в двете теми. Цветовете са взети от самото приложение; контрастът е изчислен на живо от токените.</p>
      </div>
      <div className="dsx__grid"><Panel name="Тъмна тема" theme="dark" /><Panel name="Светла тема" theme="light" /></div>
    </main>
  )
}
