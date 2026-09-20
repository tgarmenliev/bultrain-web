import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * A hairline rail across the very top of the page showing read progress.
 * Spring-smoothed so it trails the scroll slightly instead of snapping.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        zIndex: 200,
        background:
          'linear-gradient(90deg, rgba(10,132,255,0.4) 0%, var(--color-accent) 55%, #60A5FA 100%)',
        pointerEvents: 'none',
      }}
    />
  )
}
