import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

// ============================================================================
// IN THE PRESS / MEDIA COVERAGE CONFIGURATION
// Only the structural data lives here (id, url, thumbnail). The title,
// snippet and source are localized in the translation dictionary, keyed by id
// under media.articles.
// ============================================================================
export const mediaArticles = [
  {
    id: 'article-1',
    url: 'https://bnrnews.bg/horizont/post/492979/tihomir-garmenliev-i-bultrain-za-po-informiran-zhelezopaten-transport',
    thumbnail: 'https://bnrnews.bg/api/media/d1913cc6-690b-473a-9a2d-0b538cdc80e7?Size=large',
  },
  {
    id: 'article-2',
    url: 'http://capital.bg/politika_i_ikonomika/obrazovanie/2026/01/27/4876961_talantite_ot_20_pod_20_programistut_tihomir_gurmenliev/',
    thumbnail: 'https://img.capital.bg/shimg/zx1200y630captrw_4877072.jpg',
  },
  {
    id: 'article-3',
    url: 'https://www.dnevnik.bg/duma_na_sedmitsa/2026/04/01/4898677_kak_se_putuva_umno_s_bdj_tihomir_gurmenliev_v_podkasta/?ref=rss',
    thumbnail: 'https://img.dnevnik.bg/shimg/zx1200y630d_4898674.jpg',
  },
  {
    id: 'article-4',
    url: 'https://economy.bg/featured/view/58604/Mobilno-prilozhenie-predlaga-vsichko-za-pytuvaneto-s-vlak-u-nas-na-edno-myasto',
    thumbnail: 'https://i.newsroom.bg/uploads/photo_assets/2024/2024-05-23/b_Sn-2-392e5662cc.jpg',
  },
  {
    id: 'article-5',
    url: 'https://www.bloombergtv.bg/a/16-biznes-start/131545-uchenik-sazdava-prilozhenie-sledyashto-marshruti-i-razpisaniya-na-balgarskite-vlakove',
    thumbnail: 'https://www.bloombergtv.bg/media/files/resized/article/1280x720/f58/85d6bff41e593bdcedc9c7c470f4ff58-bdz-plan-reforma-1-3276-760x0-541-1140x0.jpg',
  },
];
// ============================================================================

const SKELETON_BG = 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)';
const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1a2b"/><stop offset="50%" stop-color="#133454"/><stop offset="100%" stop-color="#0a84ff"/></linearGradient></defs><rect width="1200" height="675" fill="url(#g)"/><circle cx="950" cy="120" r="220" fill="rgba(255,255,255,0.08)"/><circle cx="180" cy="560" r="260" fill="rgba(255,255,255,0.06)"/></svg>'
  );

const DEFAULT_ARTICLE_COPY = {
  title: 'BulTrain media coverage',
  snippet: 'Read the latest media coverage about BulTrain.',
  source: 'BulTrain',
};

function ArticleCard({ article, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()
  const copy = t?.media?.articles?.[article.id] || DEFAULT_ARTICLE_COPY

  const thumbnailUrl = article.thumbnail || FALLBACK_IMAGE
  const [imageError, setImageError] = useState(false);

  return (
    <motion.a
      href={article.url}
      target="_blank"
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
        <motion.img
          src={imageError ? FALLBACK_IMAGE : thumbnailUrl}
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
  const { t } = useLanguage()

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
          {mediaArticles.map((article, i) => (
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
