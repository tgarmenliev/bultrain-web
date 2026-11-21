// ============================================================================
// HOW BULTRAIN GROWS: the line of releases under the tour
//
// HOW TO ADD A RELEASE (2 steps):
//   1. Add an entry at the BOTTOM of the list below (newest last).
//        id        a short unique key, e.g. 'ios-1-4'
//        date      'YYYY-MM-DD' (or 'YYYY-MM-01' with precision: 'month' when the day is unknown)
//        platform  the small label under the date, e.g. 'iOS 1.4' or 'Android'
//        thumb     one of our own images (a screenshot, or a poster frame of a video)
//        pos       CSS object-position, to choose which part of a tall screenshot is shown
//   2. In src/i18n/translations.js add the same id under releases.items in BOTH `bg` and `en` (title, text).
//
// The page needs no other change: no new section and no new menu link. A release whose translation is missing is skipped.
// ============================================================================
export const releases = [
  { id: 'ios-1-0', date: '2026-04-03', platform: 'iOS 1.0', thumb: '/img/app/dark-bg-results-480.webp', pos: '50% 18%' },
  { id: 'ios-1-1', date: '2026-09-12', platform: 'iOS 1.1', thumb: '/img/app/dark-bg-live-640.webp', pos: '50% 84%' },
  { id: 'ios-1-2', date: '2026-10-17', platform: 'iOS 1.2', thumb: '/video/map-live-poster.webp', pos: '50% 34%' },
  { id: 'ios-1-3', date: '2026-11-21', platform: 'iOS 1.3', thumb: '/img/app/watch-bg-stack.webp', pos: '50% 86%' },
  { id: 'android-tracking', date: '2026-11-21', precision: 'month', platform: 'Android', thumb: '/img/app/android-bg-shade-640.webp', pos: '50% 22%' },
]
