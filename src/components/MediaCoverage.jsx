import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

// ============================================================================
// IN THE PRESS / MEDIA COVERAGE
//
// HOW TO ADD A NEW ARTICLE (2 steps):
//   1. Add an entry at the BOTTOM of the list below with the next number
//      (the last one is article-6, so the next is 'article-7').
//   2. In src/i18n/translations.js add the same key ('article-7') under
//      media.articles in BOTH `bg` and `en` (title, snippet, source).
//
// Display order is automatic: the HIGHEST number is shown FIRST, so the newest
// article always appears at the top. The order of this list does not matter.
// An article whose translation is missing is skipped (with a console warning)
// instead of breaking the page.
// ============================================================================
export const mediaArticles = [
  {
    id: 'article-1', // Bloomberg TV
    url: 'https://www.bloombergtv.bg/a/16-biznes-start/131545-uchenik-sazdava-prilozhenie-sledyashto-marshruti-i-razpisaniya-na-balgarskite-vlakove',
    thumbnail: '',
  },
  {
    id: 'article-2', // Economy.bg (2024)
    url: 'https://economy.bg/featured/view/58604/Mobilno-prilozhenie-predlaga-vsichko-za-pytuvaneto-s-vlak-u-nas-na-edno-myasto',
    thumbnail: 'https://i.newsroom.bg/uploads/photo_assets/2024/2024-05-23/b_Sn-2-392e5662cc.jpg',
  },
  {
    id: 'article-3', // Дневник
    url: 'https://www.dnevnik.bg/duma_na_sedmitsa/2026/04/01/4898677_kak_se_putuva_umno_s_bdj_tihomir_gurmenliev_v_podkasta/?ref=rss',
    thumbnail: 'https://image-cdn-ak.spotifycdn.com/image/ab6772ab000015bea07e6d5cef51900f74943a84',
  },
  {
    id: 'article-4', // Капитал
    url: 'http://capital.bg/politika_i_ikonomika/obrazovanie/2026/01/27/4876961_talantite_ot_20_pod_20_programistut_tihomir_gurmenliev/',
    thumbnail: '',
  },
  {
    id: 'article-5', // Българско национално радио
    url: 'https://bnrnews.bg/horizont/post/492979/tihomir-garmenliev-i-bultrain-za-po-informiran-zhelezopaten-transport',
    thumbnail: 'https://bnrnews.bg/api/media/d1913cc6-690b-473a-9a2d-0b538cdc80e7?Size=large',
  },
  {
    id: 'article-6', // Economy.bg (2026)
    url: 'https://www.economy.bg/bulgaria/view/64492/Celta-mi-vinagi-e-bila-da-resha-svoj-ili-chuzhd-problem-s-pomoshtta-na-tehnologiite',
    thumbnail: 'https://i.newsroom.bg/uploads/photo_assets/2026/2026-07-16/b_TUD-086-6a883ac671.jpg',
  },
];

// Newest first: highest article number on top.
const articleNumber = (a) => Number(a.id.replace(/\D/g, ''))
const sortedArticles = [...mediaArticles].sort((a, b) => articleNumber(b) - articleNumber(a))
// ============================================================================

const SKELETON_BG = 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1620023419356-9a5d15a51ebd?w=800&q=80&auto=format&fit=crop'; // A neat abstract dark blue premium texture

function ArticleCard({ article, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()
  const copy = t.media.articles[article.id]

  const hasLink = article.url && article.url !== '#'
  const [thumbnailUrl, setThumbnailUrl] = useState(article.thumbnail || '')
  const [isLoadingImage, setIsLoadingImage] = useState(!article.thumbnail && hasLink)
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (article.thumbnail || !hasLink) {
      return;
    }

    let cancelled = false;
    const fetchThumbnail = async () => {
      try {
        // opengraph.io proxy bypasses strict bot protections on sites like capital.bg
        const proxyUrl = `https://opengraph.io/api/1.1/site/${encodeURIComponent(article.url)}?app_id=58858c7bcf07b61e64257391`;
        const response = await fetch(proxyUrl);
        const data = await response.json();

        // Extract the best available image from the proxy response
        const imageUrl = data.hybridGraph?.image || data.openGraph?.image?.url || data.htmlInferred?.image;
        if (!cancelled) setThumbnailUrl(imageUrl || FALLBACK_IMAGE);
      } catch (error) {
        console.error("Failed to fetch thumbnail for", article.url, error);
        if (!cancelled) setThumbnailUrl(FALLBACK_IMAGE);
      } finally {
        if (!cancelled) setIsLoadingImage(false);
      }
    };

    fetchThumbnail();
    return () => { cancelled = true; };
  }, [article.url, article.thumbnail, hasLink]);

  return (
    <motion.a
      href={article.url}
      target={hasLink ? '_blank' : undefined}
      rel="noopener noreferrer"
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, borderColor: 'rgba(10, 132, 255, 0.4)', boxShadow: '0 20px 40px rgba(10, 132, 255, 0.15)' }}
      className="media-card"
    >
      {/* Thumbnail Container with Overflow Hidden */}
      <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--color-bg-elevated)' }}>
        {isLoadingImage ? (
          <motion.div
            style={{ width: '100%', height: '100%', background: SKELETON_BG, backgroundSize: '200% 100%' }}
            animate={{ backgroundPosition: ['100% 0%', '-100% 0%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <motion.img
            src={imageError ? FALLBACK_IMAGE : (thumbnailUrl || FALLBACK_IMAGE)}
            alt={copy.title}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            className="media-image"
          />
        )}
        <div style={{
           position: 'absolute',
           bottom: 0,
           left: 0,
           right: 0,
           height: '80px',
           background: 'linear-gradient(to top, var(--color-bg-surface), transparent)'
        }} />
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '10px',
          display: 'block'
        }}>
          {copy.source}
        </span>

        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.3,
          marginBottom: '12px',
          letterSpacing: '-0.01em'
        }}>
          {copy.title}
        </h3>

        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--color-text-secondary)',
          margin: 0,
          marginBottom: '20px',
          flexGrow: 1
        }}>
          {copy.snippet}
        </p>

        <div style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: 'auto'
        }} className="read-more">
          {t.common.readMore}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </motion.a>
  )
}

export default function MediaCoverage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t, lang } = useLanguage()

  return (
    <section id="media-coverage" className="section" style={{ position: 'relative', zIndex: 1 }}>
      {/* Background Orbs for Premium feel */}
      <div className="orb orb-blue" style={{ width: 600, height: 600, top: '20%', left: '-10%' }} />
      <div className="orb" style={{ width: 500, height: 500, bottom: '0%', right: '-5%', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.15) 0%, transparent 70%)' }} />

      <div className="container">
        <motion.div
          ref={ref}
          style={{ marginBottom: 56, textAlign: 'center', maxWidth: 700, margin: '0 auto 56px auto' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>
            {t.media.tag}
          </span>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>
            {t.media.headingLine1} <span className="gradient-text">{t.media.headingAccent}</span>
          </h2>
          <p className="section-subheading">
            {t.media.subheading}
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          position: 'relative',
          zIndex: 2
        }}>
          {sortedArticles
            .filter((article) => {
              if (t.media.articles[article.id]) return true
              console.warn(`[MediaCoverage] Missing translation for "${article.id}" in "${lang}" - skipped. Add it to src/i18n/translations.js.`)
              return false
            })
            .map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
        </div>
      </div>

      <style>{`
        .media-card:hover .media-image {
          transform: scale(1.05);
        }
        .media-card .read-more svg {
          transition: transform 0.3s ease;
        }
        .media-card:hover .read-more svg {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  )
}
