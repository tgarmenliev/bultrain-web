// Single source of truth for colour. Derived from the BulTrain app itself:
//   dark  : bg #08080A, cards #1C1E21, cobalt blue #2D69D6..#3273EC, red #EA4E3D
//   light : bg #F3F5FA, cards #DEE5F4, navy ink #081534, green #5EC269
// `npm run tokens` validates contrast (WCAG AA) and writes tokens.css.
export const tokens = {
  dark: {
    bg: '#09090C', surface: '#131519', raised: '#1C1E24',
    line: '#272A32', lineStrong: '#5C6370',
    ink: '#F5F7FB', ink2: '#AAB1BE', ink3: '#8A92A2',
    accent: '#6F9DF7', action: '#2D69D6', actionHover: '#3470E0', onAction: '#FFFFFF',
    ok: '#6FDD78', late: '#F4695B', warn: '#F5B13D',
    okBg: '#10301A', lateBg: '#3B1713', warnBg: '#3A2A0C',
    scrim: 'rgba(9,9,12,0.72)', shadow: '0 24px 60px -24px rgba(0,0,0,.8)',
  },
  light: {
    bg: '#F3F5FA', surface: '#FFFFFF', raised: '#E6ECF8',
    line: '#D6DEF0', lineStrong: '#7C88A4',
    ink: '#081534', ink2: '#3A4968', ink3: '#586583',
    accent: '#2459C4', action: '#2D69D6', actionHover: '#2459C4', onAction: '#FFFFFF',
    ok: '#1D7A38', late: '#B53427', warn: '#85580A',
    okBg: '#DCF2E0', lateBg: '#FBE2DE', warnBg: '#FBEBCB',
    scrim: 'rgba(243,245,250,0.78)', shadow: '0 24px 60px -28px rgba(8,21,52,.35)',
  },
}
