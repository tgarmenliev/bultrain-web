// "Reduce Motion" means less movement, not none. The rule on this site:
//   - kept: fades, colour changes and small movements in place (the train on the tour's line, progress bars, switches)
//   - replaced by a fade: anything large - panning, zooming, flying across the map, sliding blocks
//   - off: endless pulsing, smooth scrolling over long distances, and video that starts by itself
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** The gentle replacement for a movement: show the new state and fade it in. */
export const fadeIn = (el, from = 0) => el?.animate?.([{ opacity: from }, { opacity: 1 }], { duration: 360, easing: 'ease-out' })
