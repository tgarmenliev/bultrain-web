import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ============================================================================
// IN THE PRESS / MEDIA COVERAGE CONFIGURATION
// ============================================================================
export const mediaArticles = [
  {
    id: 'article-1',
    title: 'Програмистът Тихомир Гърменлиев, който иска да решава проблеми на градската среда',
    url: 'http://capital.bg/politika_i_ikonomika/obrazovanie/2026/01/27/4876961_talantite_ot_20_pod_20_programistut_tihomir_gurmenliev/',
    thumbnail: '',
    snippet: 'Едва на 20 години, Тихомир вече има две платформи зад гърба си - с едната улеснява пътуването с влак из България, а с другата картографира опасните пешеходни участъци в столицата',
    source: 'Капитал'
  },
  {
    id: 'article-2',
    title: '"Как се пътува умно с БДЖ": Тихомир Гърменлиев в подкаста "Дума на седмицата"',
    url: 'https://www.dnevnik.bg/duma_na_sedmitsa/2026/04/01/4898677_kak_se_putuva_umno_s_bdj_tihomir_gurmenliev_v_podkasta/?ref=rss',
    thumbnail: '', 
    snippet: 'В специалната рубрика на подкаста "Дума на седмицата" с Ива Дойчинова, гостува 20-годишният Тихомир Гърменлиев, създател на BulTrain, мобилно приложение, което улеснява значително пътуването с влак из България',
    source: 'Дневник'
  },
  {
    id: 'article-3',
    title: 'Мобилно приложение предлага всичко за пътуването с влак у нас на едно място',
    url: 'https://economy.bg/featured/view/58604/Mobilno-prilozhenie-predlaga-vsichko-za-pytuvaneto-s-vlak-u-nas-na-edno-myasto',
    thumbnail: 'https://i.newsroom.bg/uploads/photo_assets/2024/2024-05-23/b_Sn-2-392e5662cc.jpg', 
    snippet: '„Пътуването с влак може да бъде наистина много приятно и много красиво“, казва Тихомир Гърменлиев, дванадесетокласник в ТУЕС и създател на приложението BulTrain',
    source: 'Economy.bg'
  },
  {
    id: 'article-4',
    title: 'Ученик създава приложение, следящо маршрути и разписания на българските влакове',
    url: 'https://www.bloombergtv.bg/a/16-biznes-start/131545-uchenik-sazdava-prilozhenie-sledyashto-marshruti-i-razpisaniya-na-balgarskite-vlakove',
    thumbnail: '',
    snippet: 'Тихомир Гърменлиев, създател на приложението BulTrain, в "Бизнес старт" 14.06.2024 г.',
    source: 'Bloomberg TV'
  }
];
// ============================================================================

const SKELETON_BG = 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1620023419356-9a5d15a51ebd?w=800&q=80&auto=format&fit=crop'; // A neat abstract dark blue premium texture

function ArticleCard({ article, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  
  const [thumbnailUrl, setThumbnailUrl] = useState(article.thumbnail || '')
  const [isLoadingImage, setIsLoadingImage] = useState(!article.thumbnail && !!article.url && article.url !== '#')
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (article.thumbnail || !article.url || article.url === '#') {
      return;
    }

    const fetchThumbnail = async () => {
      try {
        // opengraph.io proxy bypasses strict bot protections on sites like capital.bg
        const proxyUrl = `https://opengraph.io/api/1.1/site/${encodeURIComponent(article.url)}?app_id=58858c7bcf07b61e64257391`;
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        // Extract the best available image from the proxy response
        const imageUrl = data.hybridGraph?.image || data.openGraph?.image?.url || data.htmlInferred?.image;
        if (imageUrl) {
          setThumbnailUrl(imageUrl);
        } else {
          setThumbnailUrl(FALLBACK_IMAGE);
        }
      } catch (error) {
        console.error("Failed to fetch thumbnail for", article.url, error);
        setThumbnailUrl(FALLBACK_IMAGE);
      } finally {
        setIsLoadingImage(false);
      }
    };

    fetchThumbnail();
  }, [article.url, article.thumbnail]);

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
        {isLoadingImage ? (
          <motion.div
            style={{ width: '100%', height: '100%', background: SKELETON_BG, backgroundSize: '200% 100%' }}
            animate={{ backgroundPosition: ['100% 0%', '-100% 0%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <motion.img
            src={imageError ? FALLBACK_IMAGE : (thumbnailUrl || FALLBACK_IMAGE)}
            alt={article.title}
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
          {article.source}
        </span>
        
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.3,
          marginBottom: '12px',
          letterSpacing: '-0.01em'
        }}>
          {article.title}
        </h3>
        
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--color-text-secondary)',
          margin: 0,
          marginBottom: '20px',
          flexGrow: 1
        }}>
          {article.snippet}
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
          Прочети повече
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
            Медиите за нас
          </span>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>
            Какво казват <span className="gradient-text">другите?</span>
          </h2>
          <p className="section-subheading">
            Когато иновацията стъпи на релси, хората забелязват. Вижте отзвука за BulTrain в медийното пространство и защо технологичната общност заговори за бъдещето на пътуването.
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
