import { Component } from 'react'

const COPY = {
  bg: ['Нещо се обърка.', 'Опитай да опресниш страницата. Ако проблемът остане, пиши ни на bultrain.app@gmail.com.', 'Опресни'],
  en: ['Something went wrong.', 'Try refreshing the page. If the problem persists, write to bultrain.app@gmail.com.', 'Refresh'],
}

/** Last line of defence: a failed render shows a calm message instead of a blank page. Styled inline on purpose,
    so it works even if the stylesheet or the design tokens failed to load. */
export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error) { console.error('[BulTrain] render failed:', error) }

  render() {
    if (!this.state.failed) return this.props.children
    const [title, text, button] = COPY[document.documentElement.lang === 'en' ? 'en' : 'bg']
    return (
      <div role="alert" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#09090C', color: '#F5F7FB', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
        <div style={{ maxWidth: 440 }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>{title}</h1>
          <p style={{ margin: '14px 0 24px', lineHeight: 1.6, color: '#AAB1BE' }}>{text}</p>
          <button type="button" onClick={() => window.location.reload()} style={{ minHeight: 48, padding: '0 22px', border: 0, borderRadius: 14, background: '#2D69D6', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{button}</button>
        </div>
      </div>
    )
  }
}
