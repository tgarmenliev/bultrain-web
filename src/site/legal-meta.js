// The date the TEXT of the policies last changed. Update it only when the wording changes
// (it used to show "today", which made every visit look like a fresh legal update).
export const LEGAL_UPDATED = '2026-10-04'
// The privacy policy has its own date: it was rewritten on 10 Oct 2026 (server-side data, retention, deletion).
export const PRIVACY_UPDATED = '2026-10-10'

export const formatLegalDate = (iso, lang) =>
  new Date(iso).toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
