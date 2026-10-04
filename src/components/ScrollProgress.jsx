import { useEffect, useRef } from 'react'

/** A 4px rail across the top of the page showing read progress. One passive listener, one rAF per frame. */
export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={bar} aria-hidden="true" style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 4, zIndex: 200, pointerEvents: 'none',
      transformOrigin: '0 50%', transform: 'scaleX(0)',
      background: 'linear-gradient(90deg, color-mix(in srgb, var(--accent) 45%, transparent), var(--accent))',
    }} />
  )
}
