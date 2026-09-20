import { useEffect, useRef } from 'react'

/**
 * Illuminates a card's border under the cursor.
 *
 * Writes CSS custom properties straight to the node on pointermove — no React
 * state, so moving the mouse never triggers a re-render. Skipped entirely on
 * coarse pointers and when the user prefers reduced motion.
 *
 * Usage: const ref = useSpotlight(); <div ref={ref} className="bento-card" />
 */
export function useSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || calm.matches) return

    let frame = 0

    const onMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const r = el.getBoundingClientRect()
        el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
        el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
      })
    }

    const onEnter = () => el.style.setProperty('--spot-opacity', '1')
    const onLeave = () => el.style.setProperty('--spot-opacity', '0')

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return ref
}
