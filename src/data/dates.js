// Dates written in the source as 'YYYY-MM-DD' are calendar days, not moments in time. They are formatted in UTC, so
// the build and every visitor, wherever they are, write the same day (a visitor west of Greenwich used to see the day
// before, and the page was redrawn because it no longer matched the prerendered text).
export const formatDay = (iso, lang, options) =>
  new Date(iso).toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', { ...options, timeZone: 'UTC' })
