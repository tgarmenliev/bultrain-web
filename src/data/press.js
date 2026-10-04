// ============================================================================
// IN THE PRESS
//
// HOW TO ADD AN ARTICLE (2 steps):
//   1. Add an entry at the BOTTOM of the list below with the next number
//      (the last one is article-6, so the next is 'article-7').
//   2. In src/i18n/translations.js add the same key ('article-7') under
//      media.articles in BOTH `bg` and `en` (title, snippet, source).
//
// The HIGHEST number is shown first (newest on top). The newest article is the large one.
// An article whose translation is missing is skipped (with a console warning).
// No remote thumbnails: nothing is hotlinked, so nothing can break or leak. An article may carry
// one of our own photos: photo: '/img/photo/<name>' (files <name>-<w>.webp, see scripts/build-assets.mjs).
// ============================================================================
export const articles = [
  { id: 'article-1', url: 'https://www.bloombergtv.bg/a/16-biznes-start/131545-uchenik-sazdava-prilozhenie-sledyashto-marshruti-i-razpisaniya-na-balgarskite-vlakove' },
  { id: 'article-2', url: 'https://economy.bg/featured/view/58604/Mobilno-prilozhenie-predlaga-vsichko-za-pytuvaneto-s-vlak-u-nas-na-edno-myasto' },
  { id: 'article-3', url: 'https://www.dnevnik.bg/duma_na_sedmitsa/2026/04/01/4898677_kak_se_putuva_umno_s_bdj_tihomir_gurmenliev_v_podkasta/?ref=rss' },
  { id: 'article-4', url: 'http://capital.bg/politika_i_ikonomika/obrazovanie/2026/01/27/4876961_talantite_ot_20_pod_20_programistut_tihomir_gurmenliev/' },
  { id: 'article-5', url: 'https://bnrnews.bg/horizont/post/492979/tihomir-garmenliev-i-bultrain-za-po-informiran-zhelezopaten-transport' },
  { id: 'article-6', url: 'https://www.economy.bg/bulgaria/view/64492/Celta-mi-vinagi-e-bila-da-resha-svoj-ili-chuzhd-problem-s-pomoshtta-na-tehnologiite', photo: '/img/photo/event-dublin' },
]

const num = (a) => Number(a.id.replace(/\D/g, ''))
export const sortedArticles = [...articles].sort((a, b) => num(b) - num(a))

// Store numbers (from design-source/inbox/data/numbers.md). Shown with their counts, honestly.
export const ratings = [
  { store: 'Google Play', value: 4.8, count: 40 },
  { store: 'App Store', value: 5, count: 4 },
]
